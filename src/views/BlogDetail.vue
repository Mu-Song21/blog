<template>
  <div class="detail-page" v-if="article">
    <section class="section container">
      <router-link to="/blog" class="back-link" @click="ripple">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        返回文章列表
      </router-link>
      <article class="article reveal">
        <header class="article-header">
          <span class="category">{{ article.category }}</span>
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <span class="date">发布于 {{ article.createdAt }}</span>
            <span v-if="article.updatedAt !== article.createdAt" class="date">更新于 {{ article.updatedAt }}</span>
            <span class="read-time">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              {{ readTime }} 阅读
            </span>
          </div>
          <div class="article-tags">
            <span class="tag" v-for="tag in article.tags" :key="tag">{{ tag }}</span>
          </div>
        </header>
        <div class="article-body markdown-body" v-html="renderedContent"></div>
      </article>
      <div class="article-nav reveal" v-if="prevArticle || nextArticle">
        <router-link v-if="prevArticle" :to="`/blog/${prevArticle.id}`" class="nav-card card" @click="ripple">
          <span class="nav-label">← 上一篇</span>
          <span class="nav-title">{{ prevArticle.title }}</span>
        </router-link>
        <router-link v-if="nextArticle" :to="`/blog/${nextArticle.id}`" class="nav-card card" @click="ripple">
          <span class="nav-label">下一篇 →</span>
          <span class="nav-title">{{ nextArticle.title }}</span>
        </router-link>
      </div>
    </section>
  </div>
  <div class="not-found container" v-else>
    <h2>文章不存在</h2>
    <router-link to="/blog" class="btn btn-secondary" style="margin-top:16px;" @click="ripple">返回文章列表</router-link>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useRipple } from '../composables/useRipple'
import { renderMarkdown } from '../utils/markdown'

const route = useRoute()
const store = useBlogStore()
const { observeNew } = useScrollReveal()
const { createRipple } = useRipple()
function ripple(e) { createRipple(e) }

const article = computed(() => store.getArticle(route.params.id))

const publishedList = computed(() => store.publishedArticles)
const currentIndex = computed(() => publishedList.value.findIndex(a => a.id === Number(route.params.id)))
const prevArticle = computed(() => currentIndex.value > 0 ? publishedList.value[currentIndex.value - 1] : null)
const nextArticle = computed(() => currentIndex.value < publishedList.value.length - 1 ? publishedList.value[currentIndex.value + 1] : null)

watch(() => route.params.id, () => { observeNew() })

const renderedContent = computed(() => renderMarkdown(article.value?.content))

const readTime = computed(() => {
  const content = article.value?.content || ''
  const words = content.replace(/[#*`\-\[\]()>|]/g, '').length
  return Math.max(1, Math.ceil(words / 400))
})
</script>

<style scoped>
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 32px;
  transition: color var(--transition);
  position: relative;
  overflow: hidden;
}

.back-link:hover {
  color: var(--accent-light);
}

.article {
  max-width: 760px;
}

.article-header {
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border);
}

.category {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 16px;
  display: block;
}

.article-title {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.5px;
  margin-bottom: 16px;
}

.article-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.date {
  font-size: 13px;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.read-time {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--text-muted);
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.article-body {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.article-body :deep(h1),
.article-body :deep(h2),
.article-body :deep(h3) {
  color: var(--text-primary);
  margin: 32px 0 16px;
  line-height: 1.3;
}

.article-body :deep(h2) {
  font-size: 24px;
  font-weight: 600;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.article-body :deep(h3) {
  font-size: 18px;
  font-weight: 600;
}

.article-body :deep(strong) {
  color: var(--text-primary);
  font-weight: 600;
}

.article-body :deep(ul) {
  list-style: none;
  padding: 0;
  margin: 16px 0;
}

.article-body :deep(li) {
  position: relative;
  padding-left: 20px;
  margin-bottom: 8px;
}

.article-body :deep(li::before) {
  content: '›';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: 700;
}

.article-body :deep(p) {
  margin-bottom: 16px;
}

.article-body :deep(.code-block) {
  position: relative;
  margin: 20px 0;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid var(--border);
}

.article-body :deep(.code-block[data-lang])::before {
  content: attr(data-lang);
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 12px;
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--text-muted);
  background: var(--bg-secondary);
  border-bottom-left-radius: var(--radius-sm);
  border-left: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.article-body :deep(.code-block pre) {
  margin: 0;
  padding: 20px;
  background: var(--bg-secondary);
  overflow-x: auto;
}

.article-body :deep(.code-block code) {
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.7;
  color: var(--text-secondary);
}

.article-body :deep(.inline-code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
  padding: 2px 8px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--accent-light);
}

.article-body :deep(.table-wrapper) {
  overflow-x: auto;
  margin: 20px 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
}

.article-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
}

.article-body :deep(th),
.article-body :deep(td) {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}

.article-body :deep(th) {
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-weight: 600;
  font-size: 13px;
}

.article-body :deep(tr:last-child td) {
  border-bottom: none;
}

.article-body :deep(tr:hover td) {
  background: var(--bg-card);
}

.article-body :deep(blockquote) {
  margin: 20px 0;
  padding: 16px 24px;
  border-left: 3px solid var(--accent);
  background: var(--bg-card);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.article-body :deep(blockquote p) {
  color: var(--text-secondary);
  font-style: italic;
  margin-bottom: 8px;
}

.article-body :deep(blockquote p:last-child) {
  margin-bottom: 0;
}

.article-body :deep(a) {
  color: var(--accent-light);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color var(--transition);
}

.article-body :deep(a:hover) {
  color: var(--accent);
}

.article-body :deep(img) {
  max-width: 100%;
  border-radius: var(--radius-sm);
  margin: 16px 0;
  border: 1px solid var(--border);
}

.article-body :deep(hr) {
  border: none;
  height: 1px;
  background: var(--border);
  margin: 32px 0;
}

.article-body :deep(del) {
  color: var(--text-muted);
  text-decoration: line-through;
}

.article-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 60px;
  max-width: 760px;
}

.nav-card {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
}

.nav-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.nav-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.4;
}

.not-found {
  padding: 120px 24px;
  text-align: center;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .article-title {
    font-size: 26px;
  }

  .article-nav {
    grid-template-columns: 1fr;
  }
}
</style>
