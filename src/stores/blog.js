import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { DEFAULT_ARTICLES } from '../data/articles'

const DATA_VERSION = 11

export const useBlogStore = defineStore('blog', () => {
  const storedVersion = Number(localStorage.getItem('blog_data_version') || '0')

  let initialArticles = DEFAULT_ARTICLES
  if (storedVersion === DATA_VERSION) {
    const stored = localStorage.getItem('blog_articles')
    if (stored) {
      try {
        initialArticles = JSON.parse(stored)
      } catch (e) {
        initialArticles = DEFAULT_ARTICLES
      }
    }
  } else {
    localStorage.setItem('blog_data_version', DATA_VERSION)
  }

  const articles = ref(initialArticles)
  const adminToken = ref(localStorage.getItem('blog_admin_token') || '')

  const publishedArticles = computed(() =>
    articles.value.filter(a => a.status === 'published').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  )

  const featuredArticles = computed(() =>
    publishedArticles.value.filter(a => a.featured)
  )

  function save() {
    localStorage.setItem('blog_articles', JSON.stringify(articles.value))
    localStorage.setItem('blog_data_version', DATA_VERSION)
  }

  function addArticle(article) {
    const maxId = articles.value.reduce((max, a) => Math.max(max, a.id), 0)
    articles.value.push({ ...article, id: maxId + 1 })
    save()
  }

  function updateArticle(id, data) {
    const idx = articles.value.findIndex(a => a.id === id)
    if (idx !== -1) {
      articles.value[idx] = { ...articles.value[idx], ...data }
      save()
    }
  }

  function deleteArticle(id) {
    articles.value = articles.value.filter(a => a.id !== id)
    save()
  }

  function getArticle(id) {
    return articles.value.find(a => a.id === Number(id))
  }

  async function login(password) {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
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
  }

  function isLoggedIn() {
    return !!adminToken.value
  }

  return {
    articles, publishedArticles, featuredArticles, adminToken,
    addArticle, updateArticle, deleteArticle, getArticle,
    login, logout, isLoggedIn
  }
})
