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
  result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />')
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
    const internal = url.startsWith('/') && !url.startsWith('//')
    return internal
      ? `<a href="${url}">${text}</a>`
      : `<a href="${url}" target="_blank" rel="noopener">${text}</a>`
  })
  result = result.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  result = result.replace(/\*(.+?)\*/g, '<em>$1</em>')
  result = result.replace(/~~(.+?)~~/g, '<del>$1</del>')
  return result
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\w一-鿿\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function renderMarkdown(md) {
  if (!md) return { html: '', toc: [] }
  const lines = md.split('\n')
  let html = ''
  const toc = []
  let inCodeBlock = false
  let codeContent = ''
  let codeLang = ''
  let inTable = false
  let inBlockquote = false
  let blockquoteContent = ''
  let listType = null // 'ul' or 'ol'

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
    }
  }

  function closeList() {
    if (listType) {
      html += `</${listType}>`
      listType = null
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.trim().startsWith('```')) {
      if (!inCodeBlock) {
        closeBlockquote()
        closeTable()
        closeList()
        inCodeBlock = true
        codeLang = line.trim().slice(3).trim()
        codeContent = ''
        continue
      } else {
        const langClass = codeLang ? ` class="language-${escapeHtml(codeLang)}"` : ''
        const langAttr = codeLang ? ` data-lang="${escapeHtml(codeLang)}"` : ''
        html += `<div class="code-block"${langAttr}><pre><code${langClass}>${escapeHtml(codeContent)}</code></pre></div>`
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
      closeList()
      continue
    }

    if (line.trim().startsWith('> ')) {
      closeTable()
      closeList()
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
        closeList()
        inTable = true
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
      closeList()
      const level = headingMatch[1].length
      const text = headingMatch[2].replace(/[*`~]/g, '')
      const id = slugify(text)
      html += `<h${level} id="${id}">${parseInline(headingMatch[2])}</h${level}>`
      if (level === 2 || level === 3) {
        toc.push({ id, text, level })
      }
      continue
    }

    const ulMatch = line.match(/^(\s*)[-*+]\s+(.+)$/)
    if (ulMatch) {
      if (listType !== 'ul') {
        closeList()
        html += '<ul>'
        listType = 'ul'
      }
      html += `<li>${parseInline(ulMatch[2])}</li>`
      continue
    }

    const olMatch = line.match(/^(\s*)\d+\.\s+(.+)$/)
    if (olMatch) {
      if (listType !== 'ol') {
        closeList()
        html += '<ol>'
        listType = 'ol'
      }
      html += `<li>${parseInline(olMatch[2])}</li>`
      continue
    }

    if (line.trim().startsWith('---') || line.trim().startsWith('***') || line.trim().startsWith('___')) {
      if (line.trim().replace(/[-*_]/g, '').trim() === '') {
        closeList()
        html += '<hr />'
        continue
      }
    }

    closeList()
    html += `<p>${parseInline(line)}</p>`
  }

  closeBlockquote()
  closeTable()
  closeList()

  return { html, toc }
}
