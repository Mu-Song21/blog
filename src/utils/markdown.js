const ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ESCAPE_MAP[c])
}

function parseInline(text) {
  let result = escapeHtml(text)
  result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
  result = result.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  result = result.replace(/\*(.+?)\*/g, '<em>$1</em>')
  result = result.replace(/~~(.+?)~~/g, '<del>$1</del>')
  return result
}

export function renderMarkdown(md) {
  if (!md) return ''
  const lines = md.split('\n')
  let html = ''
  let inCodeBlock = false
  let codeContent = ''
  let codeLang = ''
  let inTable = false
  let tableHeaders = []
  let inBlockquote = false
  let blockquoteContent = ''

  function closeBlockquote() {
    if (inBlockquote && blockquoteContent) {
      html += `<blockquote>${blockquoteContent}</blockquote>`
      blockquoteContent = ''
      inBlockquote = false
    }
  }

  function closeTable() {
    if (inTable) {
      html += '</tbody></table></div>'
      inTable = false
      tableHeaders = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.trim().startsWith('```')) {
      if (!inCodeBlock) {
        closeBlockquote()
        closeTable()
        inCodeBlock = true
        codeLang = line.trim().slice(3).trim()
        codeContent = ''
        continue
      } else {
        const langAttr = codeLang ? ` data-lang="${escapeHtml(codeLang)}"` : ''
        html += `<div class="code-block"${langAttr}><pre><code>${escapeHtml(codeContent)}</code></pre></div>`
        inCodeBlock = false
        codeContent = ''
        codeLang = ''
        continue
      }
    }

    if (inCodeBlock) {
      codeContent += (codeContent ? '\n' : '') + line
      continue
    }

    if (line.trim() === '') {
      closeBlockquote()
      closeTable()
      continue
    }

    if (line.trim().startsWith('> ')) {
      closeTable()
      if (!inBlockquote) {
        inBlockquote = true
        blockquoteContent = ''
      }
      blockquoteContent += `<p>${parseInline(line.trim().slice(2))}</p>`
      continue
    } else if (inBlockquote && line.trim().startsWith('>')) {
      blockquoteContent += `<p>${parseInline(line.trim().slice(1))}</p>`
      continue
    } else {
      closeBlockquote()
    }

    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const cells = line.trim().slice(1, -1).split('|').map(c => c.trim())

      if (!inTable && i + 1 < lines.length && /^[\s|:-]+$/.test(lines[i + 1].trim())) {
        closeTable()
        inTable = true
        tableHeaders = cells
        html += '<div class="table-wrapper"><table><thead><tr>'
        cells.forEach(c => { html += `<th>${parseInline(c)}</th>` })
        html += '</tr></thead><tbody>'
        i++
        continue
      }

      if (inTable && !/^[\s|:-]+$/.test(line.trim())) {
        html += '<tr>'
        cells.forEach(c => { html += `<td>${parseInline(c)}</td>` })
        html += '</tr>'
        continue
      }
    } else {
      closeTable()
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      html += `<h${level}>${parseInline(headingMatch[2])}</h${level}>`
      continue
    }

    const ulMatch = line.match(/^(\s*)[-*+]\s+(.+)$/)
    if (ulMatch) {
      html += `<li>${parseInline(ulMatch[2])}</li>`
      continue
    }

    const olMatch = line.match(/^(\s*)\d+\.\s+(.+)$/)
    if (olMatch) {
      html += `<li>${parseInline(olMatch[2])}</li>`
      continue
    }

    if (line.trim().startsWith('---') || line.trim().startsWith('***') || line.trim().startsWith('___')) {
      if (line.trim().replace(/[-*_]/g, '').trim() === '') {
        html += '<hr />'
        continue
      }
    }

    html += `<p>${parseInline(line)}</p>`
  }

  closeBlockquote()
  closeTable()

  html = html.replace(/((?:<li>.*<\/li>\s*)+)/g, (match) => {
    return `<ul>${match}</ul>`
  })

  return html
}
