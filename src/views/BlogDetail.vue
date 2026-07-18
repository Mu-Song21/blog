<template>
  <div class="detail-page" v-if="article">
    <section class="section container">
      <router-link to="/blog" class="back-link" @click="ripple">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        返回文章列表
      </router-link>
      <div class="article-layout">
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
            <div v-if="relatedProjects.length" class="related-projects">
              <span class="related-projects-label">相关项目</span>
              <router-link
                v-for="p in relatedProjects"
                :key="p.slug"
                :to="`/projects#${p.slug}`"
                class="related-project-chip"
                @click="ripple"
              >
                <span class="rp-icon" :style="{ background: p.gradient }">{{ p.icon }}</span>
                <span class="rp-text">
                  <span class="rp-name">{{ p.name }}</span>
                  <span class="rp-sub">{{ p.subtitle }}</span>
                </span>
              </router-link>
            </div>
          </header>
          <div class="article-body markdown-body" v-html="renderedHtml"></div>
          <ShareBar :title="article.title" :url="shareUrl" />
          <Comment />
        </article>
        <ArticleToc :toc="toc" />
      </div>
      <div class="related-section reveal" v-if="relatedArticles.length > 0">
        <div class="related-header">
          <span class="related-label">相关推荐</span>
          <span class="related-divider"></span>
        </div>
        <div class="related-grid">
          <router-link
            v-for="ra in relatedArticles"
            :key="ra.id"
            :to="`/blog/${ra.id}`"
            class="related-card card"
            @click="ripple"
          >
            <span class="related-category">{{ ra.category }}</span>
            <h4 class="related-title">{{ ra.title }}</h4>
            <div class="related-tags">
              <span class="tag" v-for="t in ra.tags.slice(0, 3)" :key="t">{{ t }}</span>
            </div>
          </router-link>
        </div>
      </div>
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
import { computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useRipple } from '../composables/useRipple'
import { renderMarkdown } from '../utils/markdown'
import hljs from '../utils/hljs'
import { getProjectsForArticle, getProjectArticleIds } from '../data/projects'
import ArticleToc from '../components/ArticleToc.vue'
import Comment from '../components/Comment.vue'
import ShareBar from '../components/ShareBar.vue'
import 'highlight.js/styles/atom-one-dark.css'

const route = useRoute()
const store = useBlogStore()
const { observeNew } = useScrollReveal()
const { createRipple } = useRipple()
function ripple(e) { createRipple(e) }

const article = computed(() => store.getArticle(route.params.id))
const relatedProjects = computed(() =>
  article.value ? getProjectsForArticle(article.value.id) : []
)

const publishedList = computed(() => store.publishedArticles)
const currentIndex = computed(() => publishedList.value.findIndex(a => a.id === Number(route.params.id)))
const prevArticle = computed(() => currentIndex.value > 0 ? publishedList.value[currentIndex.value - 1] : null)
const nextArticle = computed(() => currentIndex.value < publishedList.value.length - 1 ? publishedList.value[currentIndex.value + 1] : null)

const renderResult = computed(() => renderMarkdown(article.value?.content))
const renderedHtml = computed(() => renderResult.value.html)
const toc = computed(() => renderResult.value.toc)

const readTime = computed(() => {
  const content = article.value?.content || ''
  const words = content.replace(/[#*`\-\[\]()>|]/g, '').length
  return Math.max(1, Math.ceil(words / 400))
})

const shareUrl = computed(() => `https://musong-blog.netlify.app/blog/${route.params.id}`)

const relatedArticles = computed(() => {
  if (!article.value) return []
  const currentTags = article.value.tags
  const projectArticleIds = new Set(
    relatedProjects.value.flatMap((p) => getProjectArticleIds(p))
  )
  return store.publishedArticles
    .filter(a => a.id !== article.value.id)
    .map(a => ({
      ...a,
      score:
        a.tags.filter(t => currentTags.includes(t)).length +
        (projectArticleIds.has(a.id) ? 2 : 0)
    }))
    .filter(a => a.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
})

function highlightCode() {
  nextTick(() => {
    document.querySelectorAll('.article-body pre code').forEach(block => {
      hljs.highlightElement(block)
    })
    // 添加复制按钮
    document.querySelectorAll('.article-body .code-block').forEach(block => {
      if (block.querySelector('.copy-btn')) return
      const btn = document.createElement('button')
      btn.className = 'copy-btn'
      btn.textContent = '复制'
      btn.addEventListener('click', () => {
        const code = block.querySelector('code').textContent
        navigator.clipboard.writeText(code).then(() => {
          btn.textContent = '已复制 ✓'
          btn.classList.add('copied')
          setTimeout(() => {
            btn.textContent = '复制'
            btn.classList.remove('copied')
          }, 2000)
        })
      })
      block.appendChild(btn)
    })
  })
}

watch(() => route.params.id, () => {
  observeNew()
  highlightCode()
})

// 当文章 HTML 内容变化时（包括首次加载），重新高亮代码块
watch(renderedHtml, () => {
  highlightCode()
}, { immediate: true })
</script>

<style scoped>
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 40px;
  transition: color var(--transition);
  position: relative;
  overflow: hidden;
  font-family: var(--font-mono);
  letter-spacing: 0.5px;
}

.back-link:hover {
  color: var(--accent-light);
}

.article-layout {
  display: flex;
  gap: 48px;
  max-width: 1020px;
}

.article {
  max-width: 760px;
  flex: 1;
  min-width: 0;
}

.article-header {
  margin-bottom: 48px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--border);
}

.category {
  font-size: 11px;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 20px;
  display: block;
  font-family: var(--font-mono);
}

.article-title {
  font-size: 40px;
  font-weight: 400;
  font-family: var(--font-display);
  line-height: 1.25;
  letter-spacing: -0.5px;
  margin-bottom: 20px;
}

.article-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
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

.related-projects {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.related-projects-label {
  font-size: 12px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
}

.related-project-chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px 8px 8px;
  border: 1px solid var(--border);
  border-radius: 10px;
  text-decoration: none;
  transition: border-color var(--transition), background var(--transition);
  max-width: 100%;
}

.related-project-chip:hover {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}

.rp-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.rp-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.rp-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.2;
}

.rp-sub {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 260px;
}

.article-body {
  font-size: 16px;
  line-height: 1.9;
  color: var(--text-secondary);
}

.article-body :deep(h1),
.article-body :deep(h2),
.article-body :deep(h3) {
  color: var(--text-primary);
  margin: 40px 0 20px;
  line-height: 1.3;
}

.article-body :deep(h2) {
  font-size: 26px;
  font-weight: 400;
  font-family: var(--font-display);
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.article-body :deep(h3) {
  font-size: 20px;
  font-weight: 600;
}

.article-body :deep(strong) {
  color: var(--text-primary);
  font-weight: 600;
}

.article-body :deep(ul),
.article-body :deep(ol) {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.article-body :deep(li) {
  position: relative;
  padding-left: 24px;
  margin-bottom: 10px;
}

.article-body :deep(ul > li::before) {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: 600;
}

.article-body :deep(ol) {
  counter-reset: ol-counter;
}

.article-body :deep(ol > li) {
  counter-increment: ol-counter;
}

.article-body :deep(ol > li::before) {
  content: counter(ol-counter, decimal-leading-zero);
  position: absolute;
  left: 0;
  color: var(--accent);
  font-size: 12px;
  font-family: var(--font-mono);
  font-weight: 600;
}

.article-body :deep(p) {
  margin-bottom: 20px;
}

.article-body :deep(.code-block) {
  position: relative;
  margin: 24px 0;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid var(--border);
}

.article-body :deep(.code-block[data-lang])::before {
  content: attr(data-lang);
  position: absolute;
  top: 0;
  left: 0;
  padding: 4px 14px;
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--text-muted);
  background: rgba(0, 0, 0, 0.3);
  border-bottom-right-radius: var(--radius-sm);
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  text-transform: uppercase;
  letter-spacing: 2px;
  z-index: 1;
}

.article-body :deep(.code-block pre) {
  margin: 0;
  padding: 24px;
  background: #282c34;
  overflow-x: auto;
}

.article-body :deep(.code-block pre code) {
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.8;
  color: #abb2bf;
  background: transparent;
  padding: 0;
}

/* 复制按钮 */
.article-body :deep(.copy-btn) {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 12px;
  font-size: 11px;
  font-family: var(--font-mono);
  color: #abb2bf;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0;
  z-index: 2;
}

.article-body :deep(.code-block:hover .copy-btn) {
  opacity: 1;
}

.article-body :deep(.copy-btn:hover) {
  background: rgba(255, 255, 255, 0.15);
  color: #e5c07b;
}

.article-body :deep(.copy-btn.copied) {
  color: #98c379;
  border-color: rgba(152, 195, 121, 0.3);
}

.article-body :deep(.inline-code) {
  font-family: var(--font-mono);
  font-size: 0.88em;
  padding: 2px 8px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--accent-light);
}

.article-body :deep(.table-wrapper) {
  overflow-x: auto;
  margin: 24px 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
}

.article-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
}

.article-body :deep(th),
.article-body :deep(td) {
  padding: 14px 18px;
  text-align: left;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}

.article-body :deep(th) {
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-family: var(--font-mono);
}

.article-body :deep(tr:last-child td) {
  border-bottom: none;
}

.article-body :deep(tr:hover td) {
  background: var(--bg-card);
}

.article-body :deep(blockquote) {
  margin: 24px 0;
  padding: 20px 28px;
  border-left: 2px solid var(--accent);
  background: var(--bg-card);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.article-body :deep(blockquote p) {
  color: var(--text-secondary);
  font-style: italic;
  margin-bottom: 10px;
  font-family: var(--font-display);
}

.article-body :deep(blockquote p:last-child) {
  margin-bottom: 0;
}

.article-body :deep(a) {
  color: var(--accent-light);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(245, 158, 11, 0.3);
  transition: all var(--transition);
}

.article-body :deep(a:hover) {
  color: var(--accent);
  text-decoration-color: var(--accent);
}

.article-body :deep(img) {
  max-width: 100%;
  border-radius: var(--radius-sm);
  margin: 20px 0;
  border: 1px solid var(--border);
}

.article-body :deep(hr) {
  border: none;
  height: 1px;
  background: var(--border);
  margin: 40px 0;
}

.article-body :deep(del) {
  color: var(--text-muted);
  text-decoration: line-through;
}

/* 相关推荐 */
.related-section {
  margin-top: 64px;
  max-width: 760px;
}

.related-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.related-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 3px;
  font-family: var(--font-mono);
  white-space: nowrap;
}

.related-divider {
  flex: 1;
  height: 1px;
  background: var(--border);
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.related-card {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  cursor: pointer;
}

.related-category {
  font-size: 10px;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: var(--font-mono);
}

.related-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.4;
}

.related-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
}

.related-tags .tag {
  font-size: 10px;
  padding: 2px 8px;
}

@media (max-width: 768px) {
  .related-grid {
    grid-template-columns: 1fr;
  }
}

.article-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 72px;
  max-width: 760px;
}

.nav-card {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
}

.nav-label {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 500;
  font-family: var(--font-mono);
  letter-spacing: 1px;
}

.nav-title {
  font-size: 16px;
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
  .article-layout {
    flex-direction: column;
    gap: 0;
  }

  .article-title {
    font-size: 28px;
  }

  .article-nav {
    grid-template-columns: 1fr;
  }
}
</style>
