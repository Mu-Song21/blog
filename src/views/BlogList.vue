<template>
  <div class="blog-page">
    <section class="blog-hero">
      <div class="container">
        <div class="section-label reveal">BLOG</div>
        <h1 class="blog-hero-title reveal reveal-delay-1">技术文章</h1>
        <p class="blog-hero-desc reveal reveal-delay-2">记录开发过程中的思考、实践与总结</p>
      </div>
    </section>

    <section class="section container">
      <div class="search-filter-bar reveal">
        <div class="search-box">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索文章标题、摘要、标签..."
            class="search-input"
          />
          <button v-if="searchQuery" class="search-clear" @click="searchQuery = ''">×</button>
        </div>
        <div class="filter-bar">
          <button
            class="filter-btn"
            :class="{ active: activeCategory === 'all' }"
            @click="setFilter('all', $event)"
          >全部</button>
          <button
            class="filter-btn"
            :class="{ active: activeCategory === cat }"
            v-for="cat in categories"
            :key="cat"
            @click="setFilter(cat, $event)"
          >{{ cat }}</button>
        </div>
      </div>
      <div class="article-grid" v-if="filteredArticles.length > 0">
        <div v-for="(article, i) in filteredArticles" :key="article.id" class="reveal" :class="'reveal-delay-' + (i % 3 + 1)">
          <ArticleCard :article="article" />
        </div>
      </div>
      <div class="empty-state" v-else>
        <div class="empty-icon">🔍</div>
        <p class="empty-title">{{ searchQuery ? '未找到匹配的文章' : '暂无文章' }}</p>
        <p class="empty-desc" v-if="searchQuery">试试换个关键词，或者清除筛选条件</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useBlogStore } from '../stores/blog'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useRipple } from '../composables/useRipple'
import ArticleCard from '../components/ArticleCard.vue'

const store = useBlogStore()
const activeCategory = ref('all')
const searchQuery = ref('')
const { observeNew } = useScrollReveal()
const { createRipple } = useRipple()

const categories = computed(() => {
  const cats = new Set(store.publishedArticles.map(a => a.category))
  return [...cats]
})

const filteredArticles = computed(() => {
  let list = store.publishedArticles
  if (activeCategory.value !== 'all') {
    list = list.filter(a => a.category === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    list = list.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q)) ||
      a.category.toLowerCase().includes(q)
    )
  }
  return list
})

watch(searchQuery, () => { observeNew() })

function setFilter(cat, e) {
  activeCategory.value = cat
  createRipple(e)
  observeNew()
}
</script>

<style scoped>
.blog-hero {
  padding: 80px 0 40px;
  position: relative;
}

.blog-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 50% 80% at 50% 0%, var(--accent-glow) 0%, transparent 70%);
  pointer-events: none;
}

.blog-hero .container {
  position: relative;
}

.blog-hero-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.blog-hero-desc {
  font-size: 18px;
  color: var(--text-muted);
}

.search-filter-bar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 8px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  color: var(--text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 40px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 14px;
  color: var(--text-primary);
  font-family: var(--font-sans);
  outline: none;
  transition: border-color var(--transition), box-shadow var(--transition);
}

.search-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-clear {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 20px;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
  transition: color var(--transition);
}

.search-clear:hover {
  color: var(--text-primary);
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
}

.filter-btn {
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  font-family: var(--font-sans);
  cursor: pointer;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  transition: all var(--transition);
  position: relative;
  overflow: hidden;
}

.filter-btn:hover {
  border-color: var(--accent);
  color: var(--accent-light);
  background: var(--accent-glow);
}

.filter-btn:active {
  transform: scale(0.95);
}

.filter-btn.active {
  background: var(--accent-glow-strong);
  border-color: var(--accent);
  color: var(--accent-light);
  box-shadow: 0 0 12px var(--accent-glow);
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.empty-state {
  text-align: center;
  padding: 80px 0;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-title {
  font-size: 18px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.empty-desc {
  font-size: 14px;
}

@media (max-width: 768px) {
  .blog-hero-title {
    font-size: 32px;
  }

  .article-grid {
    grid-template-columns: 1fr;
  }
}
</style>
