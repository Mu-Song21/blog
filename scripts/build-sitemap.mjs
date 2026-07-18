import { writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { loadArticlesFromMarkdown } from './loadArticles.mjs'
import { PROJECTS } from '../src/data/projects.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SITE_URL = 'https://musong-blog.netlify.app'

const staticPages = [
  { path: '/', priority: '1.0' },
  { path: '/projects', priority: '0.9' },
  { path: '/blog', priority: '0.8' },
  { path: '/tags', priority: '0.7' },
  { path: '/about', priority: '0.8' }
]

const articles = loadArticlesFromMarkdown()
  .filter((a) => a.status === 'published')
  .sort((a, b) => a.id - b.id)

const projectPages = PROJECTS.map((p) => ({
  path: `/projects/${p.slug}`,
  priority: '0.85'
}))

const urls = [
  ...staticPages.map(
    (p) => `  <url>
    <loc>${SITE_URL}${p.path === '/' ? '/' : p.path}</loc>
    <priority>${p.priority}</priority>
  </url>`
  ),
  ...projectPages.map(
    (p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <priority>${p.priority}</priority>
  </url>`
  ),
  ...articles.map(
    (a) => `  <url>
    <loc>${SITE_URL}/blog/${a.id}</loc>
    <lastmod>${a.updatedAt || a.createdAt}</lastmod>
    <priority>0.6</priority>
  </url>`
  )
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

const publicFile = resolve(ROOT, 'public/sitemap.xml')
const distDir = resolve(ROOT, 'dist')
mkdirSync(distDir, { recursive: true })
writeFileSync(publicFile, xml, 'utf8')
writeFileSync(resolve(distDir, 'sitemap.xml'), xml, 'utf8')
console.log(
  `✅ Sitemap generated: ${staticPages.length} pages + ${projectPages.length} projects + ${articles.length} articles`
)