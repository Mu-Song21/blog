/** 解析带 YAML-ish frontmatter 的文章 Markdown（tags/title 等用 JSON 字面量） */
export function parseArticleMarkdown(raw, source = 'unknown') {
  const text = String(raw).replace(/^\uFEFF/, '')
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) {
    throw new Error(`Invalid article markdown (missing frontmatter): ${source}`)
  }

  const meta = {}
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()

    if (value === 'true') value = true
    else if (value === 'false') value = false
    else if (key === 'id' && /^\d+$/.test(value)) value = Number(value)
    else if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith('[') && value.endsWith(']'))
    ) {
      value = JSON.parse(value)
    }

    meta[key] = value
  }

  const required = ['id', 'title', 'excerpt', 'category', 'tags', 'createdAt', 'status']
  for (const key of required) {
    if (meta[key] === undefined) {
      throw new Error(`Missing frontmatter "${key}" in ${source}`)
    }
  }

  return {
    id: meta.id,
    title: meta.title,
    excerpt: meta.excerpt,
    category: meta.category,
    tags: meta.tags,
    createdAt: meta.createdAt,
    updatedAt: meta.updatedAt || meta.createdAt,
    featured: Boolean(meta.featured),
    status: meta.status,
    content: match[2].replace(/^\r?\n/, '').replace(/\s+$/, '') + '\n'
  }
}
