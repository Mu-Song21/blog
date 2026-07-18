import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { DEFAULT_ARTICLES } from '../data/articles'

const LEGACY_ARTICLE_KEYS = ['blog_articles', 'blog_data_version']

function cloneArticles() {
  return structuredClone(DEFAULT_ARTICLES)
}

function clearLegacyArticleCache() {
  for (const key of LEGACY_ARTICLE_KEYS) {
    localStorage.removeItem(key)
  }
}

export const useBlogStore = defineStore('blog', () => {
  // 前台内容始终以构建产物（Markdown）为准，不再用 localStorage 覆盖整站文章
  clearLegacyArticleCache()

  const articles = ref(cloneArticles())
  const adminToken = ref(localStorage.getItem('blog_admin_token') || '')

  const publishedArticles = computed(() =>
    articles.value
      .filter((a) => a.status === 'published')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  )

  const featuredArticles = computed(() =>
    publishedArticles.value.filter((a) => a.featured)
  )

  function resetToSource() {
    articles.value = cloneArticles()
  }

  function addArticle(article) {
    const maxId = articles.value.reduce((max, a) => Math.max(max, a.id), 0)
    articles.value.push({ ...article, id: maxId + 1 })
  }

  function updateArticle(id, data) {
    const idx = articles.value.findIndex((a) => a.id === id)
    if (idx !== -1) {
      articles.value[idx] = { ...articles.value[idx], ...data }
    }
  }

  function deleteArticle(id) {
    articles.value = articles.value.filter((a) => a.id !== id)
  }

  function getArticle(id) {
    return articles.value.find((a) => a.id === Number(id))
  }

  async function login(password) {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
    if (hashHex === '359b2a5906204e976dd382c2efdcbdcb5ffc8bac3cc7477f7885ffd95a6047ab') {
      const token = 'admin_' + Date.now()
      adminToken.value = token
      localStorage.setItem('blog_admin_token', token)
      return true
    }
    return false
  }

  function logout() {
    adminToken.value = ''
    localStorage.removeItem('blog_admin_token')
    // 退出后台时丢弃会话内未写入 Markdown 的编辑
    resetToSource()
  }

  function isLoggedIn() {
    return !!adminToken.value
  }

  return {
    articles,
    publishedArticles,
    featuredArticles,
    adminToken,
    addArticle,
    updateArticle,
    deleteArticle,
    getArticle,
    resetToSource,
    login,
    logout,
    isLoggedIn
  }
})
