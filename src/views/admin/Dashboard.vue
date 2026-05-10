<template>
  <div class="admin-page">
    <aside class="admin-sidebar">
      <div class="sidebar-brand">
        <span class="logo-icon">▸</span>
        <span>目送后台</span>
      </div>
      <nav class="sidebar-nav">
        <button :class="{ active: tab === 'articles' }" @click="tab = 'articles'">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M5 5h6M5 8h6M5 11h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          文章管理
        </button>
        <button :class="{ active: tab === 'editor' }" @click="openEditor(null)">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
          写文章
        </button>
      </nav>
      <div class="sidebar-footer">
        <router-link to="/" class="sidebar-link">← 返回前台</router-link>
        <button class="sidebar-link logout" @click="handleLogout">退出登录</button>
      </div>
    </aside>

    <main class="admin-main">
      <header class="admin-header">
        <h1>{{ tab === 'articles' ? '文章管理' : (editingId ? '编辑文章' : '写新文章') }}</h1>
        <button v-if="tab === 'articles'" class="btn btn-primary" @click="openEditor(null)">+ 新建文章</button>
      </header>

      <div v-if="tab === 'articles'" class="articles-table">
        <div class="sort-bar">
          <span class="sort-label">排序：</span>
          <button
            v-for="opt in sortOptions"
            :key="opt.key"
            class="sort-btn"
            :class="{ active: sortBy === opt.key }"
            @click="toggleSort(opt.key)"
          >
            {{ opt.label }}
            <span v-if="sortBy === opt.key" class="sort-arrow">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>标题</th>
              <th>分类</th>
              <th>状态</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in sortedArticles" :key="article.id">
              <td class="id-cell">{{ article.id }}</td>
              <td class="title-cell">{{ article.title }}</td>
              <td>{{ article.category }}</td>
              <td>
                <span class="status-badge" :class="article.status">
                  {{ article.status === 'published' ? '已发布' : '草稿' }}
                </span>
              </td>
              <td class="date-cell">{{ article.createdAt }}</td>
              <td class="action-cell">
                <button class="action-btn" @click="openEditor(article)">编辑</button>
                <button class="action-btn danger" @click="confirmDelete(article)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="tab === 'editor'" class="editor-section">
        <div class="editor-form">
          <div class="form-row">
            <div class="form-group flex-1">
              <label>文章标题</label>
              <input v-model="form.title" placeholder="请输入文章标题" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>分类</label>
              <input v-model="form.category" placeholder="如：物联网、AI" />
            </div>
            <div class="form-group">
              <label>标签（逗号分隔）</label>
              <input v-model="form.tagsStr" placeholder="Spring Boot, Vue 3" />
            </div>
            <div class="form-group">
              <label>状态</label>
              <select v-model="form.status">
                <option value="published">发布</option>
                <option value="draft">草稿</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group flex-1">
              <label>摘要</label>
              <textarea v-model="form.excerpt" rows="2" placeholder="文章摘要"></textarea>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group flex-1">
              <label>正文（支持 Markdown）</label>
              <textarea v-model="form.content" rows="18" placeholder="使用 Markdown 格式编写正文..."></textarea>
            </div>
          </div>
          <div class="form-row">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.featured" />
              设为精选文章
            </label>
          </div>
          <div class="form-actions">
            <button class="btn btn-primary" @click="saveArticle">保存</button>
            <button class="btn btn-secondary" @click="tab = 'articles'">取消</button>
          </div>
          <p class="save-msg" v-if="saveMsg" :class="saveMsgType">{{ saveMsg }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../../stores/blog'

const router = useRouter()
const store = useBlogStore()
const tab = ref('articles')
const editingId = ref(null)
const saveMsg = ref('')
const saveMsgType = ref('')

const form = reactive({
  title: '',
  excerpt: '',
  content: '',
  category: '',
  tagsStr: '',
  status: 'published',
  featured: false
})

const sortBy = ref('date')
const sortDir = ref('desc')
const sortOptions = [
  { key: 'id', label: 'ID' },
  { key: 'date', label: '时间' },
  { key: 'title', label: '标题' }
]

function toggleSort(key) {
  if (sortBy.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = key
    sortDir.value = key === 'title' ? 'asc' : 'desc'
  }
}

const sortedArticles = computed(() => {
  const list = [...store.articles]
  const dir = sortDir.value === 'asc' ? 1 : -1
  if (sortBy.value === 'id') {
    list.sort((a, b) => (a.id - b.id) * dir)
  } else if (sortBy.value === 'date') {
    list.sort((a, b) => (new Date(a.createdAt) - new Date(b.createdAt)) * dir)
  } else if (sortBy.value === 'title') {
    list.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN') * dir)
  }
  return list
})

onMounted(() => {
  if (!store.isLoggedIn()) {
    router.push('/admin/login')
  }
})

function openEditor(article) {
  tab.value = 'editor'
  if (article) {
    editingId.value = article.id
    form.title = article.title
    form.excerpt = article.excerpt
    form.content = article.content
    form.category = article.category
    form.tagsStr = article.tags.join(', ')
    form.status = article.status
    form.featured = article.featured
  } else {
    editingId.value = null
    form.title = ''
    form.excerpt = ''
    form.content = ''
    form.category = ''
    form.tagsStr = ''
    form.status = 'published'
    form.featured = false
  }
  saveMsg.value = ''
}

function saveArticle() {
  if (!form.title.trim()) {
    saveMsg.value = '请输入文章标题'
    saveMsgType.value = 'error'
    return
  }

  const data = {
    title: form.title,
    excerpt: form.excerpt,
    content: form.content,
    category: form.category || '未分类',
    tags: form.tagsStr.split(',').map(t => t.trim()).filter(Boolean),
    status: form.status,
    featured: form.featured,
    updatedAt: new Date().toISOString().split('T')[0]
  }

  if (editingId.value) {
    store.updateArticle(editingId.value, data)
    saveMsg.value = '文章已更新'
  } else {
    data.createdAt = data.updatedAt
    store.addArticle(data)
    saveMsg.value = '文章已发布'
  }

  saveMsgType.value = 'success'
  setTimeout(() => {
    tab.value = 'articles'
    saveMsg.value = ''
  }, 1000)
}

function confirmDelete(article) {
  if (confirm(`确定删除文章「${article.title}」吗？`)) {
    store.deleteArticle(article.id)
  }
}

function handleLogout() {
  store.logout()
  router.push('/')
}
</script>

<style scoped>
.admin-page {
  display: flex;
  min-height: 100vh;
}

.admin-sidebar {
  width: 240px;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 20px 24px;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid var(--border);
}

.logo-icon {
  color: var(--accent);
  font-size: 14px;
}

.sidebar-nav {
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar-nav button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 14px;
  font-family: var(--font-sans);
  cursor: pointer;
  transition: all var(--transition);
  text-align: left;
  width: 100%;
}

.sidebar-nav button:hover {
  background: var(--bg-card);
  color: var(--text-primary);
}

.sidebar-nav button.active {
  background: var(--accent-glow);
  color: var(--accent-light);
}

.sidebar-footer {
  padding: 16px 12px;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar-link {
  display: block;
  padding: 8px 12px;
  font-size: 13px;
  color: var(--text-muted);
  border-radius: var(--radius-sm);
  transition: all var(--transition);
  border: none;
  background: none;
  cursor: pointer;
  font-family: var(--font-sans);
  text-align: left;
  width: 100%;
}

.sidebar-link:hover {
  color: var(--text-primary);
  background: var(--bg-card);
}

.sidebar-link.logout:hover {
  color: var(--danger);
}

.admin-main {
  flex: 1;
  margin-left: 240px;
  padding: 32px;
}

.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.admin-header h1 {
  font-size: 24px;
  font-weight: 600;
}

.articles-table {
  overflow-x: auto;
}

.sort-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
  border: 1px solid var(--border);
}

.sort-label {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
}

.sort-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: transparent;
  color: var(--text-muted);
  font-size: 13px;
  cursor: pointer;
  transition: all var(--transition);
}

.sort-btn:hover {
  border-color: var(--accent);
  color: var(--text-primary);
}

.sort-btn.active {
  background: rgba(99, 102, 241, 0.1);
  border-color: var(--accent);
  color: var(--accent-light);
}

.sort-arrow {
  font-size: 11px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}

th {
  color: var(--text-muted);
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.id-cell {
  font-family: var(--font-mono);
  color: var(--text-muted);
}

.title-cell {
  font-weight: 500;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.date-cell {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-muted);
}

.status-badge {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.published {
  background: rgba(52, 211, 153, 0.15);
  color: var(--success);
}

.status-badge.draft {
  background: rgba(251, 191, 36, 0.15);
  color: var(--warning);
}

.action-cell {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-family: var(--font-sans);
  cursor: pointer;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  transition: all var(--transition);
}

.action-btn:hover {
  border-color: var(--accent);
  color: var(--accent-light);
}

.action-btn.danger:hover {
  border-color: var(--danger);
  color: var(--danger);
}

.editor-section {
  max-width: 800px;
}

.editor-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.form-group label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 10px 14px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 14px;
  color: var(--text-primary);
  font-family: var(--font-sans);
  outline: none;
  transition: border-color var(--transition);
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: var(--accent);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-muted);
}

.form-group textarea {
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.6;
}

.form-group select {
  cursor: pointer;
}

.form-group select option {
  background: var(--bg-secondary);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: var(--accent);
}

.form-actions {
  display: flex;
  gap: 12px;
}

.save-msg {
  font-size: 14px;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
}

.save-msg.success {
  color: var(--success);
  background: rgba(52, 211, 153, 0.1);
}

.save-msg.error {
  color: var(--danger);
  background: rgba(248, 113, 113, 0.1);
}

@media (max-width: 768px) {
  .admin-sidebar {
    display: none;
  }

  .admin-main {
    margin-left: 0;
    padding: 16px;
  }

  .form-row {
    flex-direction: column;
  }
}
</style>
