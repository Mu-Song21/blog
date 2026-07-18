import { readdirSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { parseArticleMarkdown } from './lib/parseArticleMd.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ARTICLES_DIR = resolve(__dirname, '../content/articles')

export function loadArticlesFromMarkdown() {
  const files = readdirSync(ARTICLES_DIR)
    .filter((name) => name.endsWith('.md'))
    .sort()

  const articles = files.map((name) => {
    const full = resolve(ARTICLES_DIR, name)
    const raw = readFileSync(full, 'utf8')
    return parseArticleMarkdown(raw, name)
  })

  articles.sort((a, b) => a.id - b.id)
  return articles
}
