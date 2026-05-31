<template>
  <div class="tags-page">
    <section class="section container">
      <div class="section-header reveal">
        <span class="section-label">TAGS</span>
        <h1 class="section-title">标签</h1>
        <p class="section-desc">共 {{ tagList.length }} 个标签，{{ totalArticles }} 篇文章</p>
      </div>

      <div class="tags-cloud reveal">
        <button
          v-for="tag in tagList"
          :key="tag.name"
          class="tag-item"
          :class="{ active: selectedTag === tag.name }"
          :style="{ '--tag-size': getTagSize(tag.count) }"
          @click="toggleTag(tag.name)"
        >
          <span class="tag-name">{{ tag.name }}</span>
          <span class="tag-count">{{ tag.count }}</span>
        </button>
      </div>

      <TransitionGroup name="list" tag="div" class="filtered-articles" v-if="selectedTag">
        <div class="filtered-header">
          <span class="filtered-label">标签：</span>
          <span class="filtered-tag">{{ selectedTag }}</span>
          <button class="clear-btn" @click="selectedTag = ''">清除筛选</button>
        </div>
        <router-link
          v-for="article in filteredArticles"
          :key="article.id"
          :to="`/blog/${article.id}`"
          class="article-row card"
          @click="ripple"
        >
          <span class="article-category">{{ article.category }}</span>
          <h3 class="article-title">{{ article.title }}</h3>
          <div class="article-meta">
            <span class="date">{{ article.createdAt }}</span>
            <div class="article-tags">
              <span class="tag" v-for="t in article.tags" :key="t">{{ t }}</span>
            </div>
          </div>
        </router-link>
      </TransitionGroup>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useBlogStore } from '../stores/blog'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useRipple } from '../composables/useRipple'

const store = useBlogStore()
const { observeNew } = useScrollReveal()
const { createRipple } = useRipple()
function ripple(e) { createRipple(e) }

const selectedTag = ref('')

const tagList = computed(() => {
  const map = {}
  store.publishedArticles.forEach(a => {
    a.tags.forEach(t => {
      map[t] = (map[t] || 0) + 1
    })
  })
  return Object.entries(map)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

const totalArticles = computed(() => store.publishedArticles.length)

const maxCount = computed(() => Math.max(...tagList.value.map(t => t.count), 1))

function getTagSize(count) {
  const min = 13
  const max = 22
  const size = min + ((count / maxCount.value) * (max - min))
  return size + 'px'
}

function toggleTag(name) {
  selectedTag.value = selectedTag.value === name ? '' : name
}

const filteredArticles = computed(() => {
  if (!selectedTag.value) return []
  return store.publishedArticles.filter(a => a.tags.includes(selectedTag.value))
})
</script>

<style scoped>
.tags-page {
  min-height: 80vh;
}

.section-desc {
  font-size: 15px;
  color: var(--text-muted);
  margin-top: 12px;
}

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 48px;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition);
  font-size: var(--tag-size, 14px);
  color: var(--text-secondary);
  font-family: var(--font-sans);
}

.tag-item:hover {
  border-color: var(--accent);
  color: var(--accent-light);
  background: var(--accent-glow);
}

.tag-item.active {
  border-color: var(--accent);
  background: var(--accent-glow);
  color: var(--accent);
}

.tag-count {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--text-muted);
  background: var(--bg-secondary);
  padding: 2px 8px;
  border-radius: 4px;
}

.filtered-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}

.filtered-label {
  font-size: 13px;
  color: var(--text-muted);
}

.filtered-tag {
  font-size: 13px;
  color: var(--accent);
  font-weight: 600;
}

.clear-btn {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-family: var(--font-mono);
  transition: all var(--transition);
  margin-left: auto;
}

.clear-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.filtered-articles {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article-row {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
  cursor: pointer;
}

.article-row .article-category {
  font-size: 11px;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: var(--font-mono);
}

.article-row .article-title {
  font-size: 20px;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.4;
}

.article-row .article-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.article-row .date {
  font-size: 13px;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.article-row .article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* 列表过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}
</style>
