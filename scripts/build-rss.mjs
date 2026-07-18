import { Feed } from 'feed'
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// 动态导入文章数据
const { DEFAULT_ARTICLES } = await import('../src/data/articles.js')

const SITE_URL = 'https://musong-blog.netlify.app'
const SITE_TITLE = '目送 - 技术博客'
const SITE_DESCRIPTION = 'Java 后端 · 物联网 · Vue 前端 — 一个大学生的技术探索'

const feed = new Feed({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  id: SITE_URL,
  link: SITE_URL,
  language: 'zh-CN',
  copyright: `© ${new Date().getFullYear()} 目送`,
  feedLinks: {
    rss2: `${SITE_URL}/rss.xml`
  },
  author: {
    name: '目送',
    link: `${SITE_URL}/about`
  }
})

const published = DEFAULT_ARTICLES
  .filter(a => a.status === 'published')
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

for (const article of published) {
  // 去掉 markdown 标记，提取纯文本摘要
  const plainText = (article.excerpt || article.content || '')
    .replace(/[#*`\-\[\]()>|]/g, '')
    .replace(/\n+/g, ' ')
    .trim()

  feed.addItem({
    title: article.title,
    id: `${SITE_URL}/blog/${article.id}`,
    link: `${SITE_URL}/blog/${article.id}`,
    description: plainText,
    content: plainText,
    author: [{ name: '目送' }],
    date: new Date(article.createdAt),
    category: [{ name: article.category }]
  })
}

writeFileSync(resolve(ROOT, 'dist', 'rss.xml'), feed.rss2())
console.log(`✅ RSS feed generated: ${published.length} articles`)
