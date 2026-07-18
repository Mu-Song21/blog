<template>
  <div class="case-page" v-if="project && showcase">
    <section class="case-hero">
      <div class="container">
        <router-link to="/projects" class="back-link">← 返回项目列表</router-link>
        <div class="hero-row">
          <div class="hero-icon" :style="{ background: project.gradient }">{{ project.icon }}</div>
          <div class="hero-copy">
            <span class="hero-track">{{ project.track || project.category }}</span>
            <h1 class="hero-title">
              <span class="brand">{{ project.name }}</span>
              <span class="sub">{{ project.subtitle }}</span>
            </h1>
            <p class="hero-lead">{{ project.description }}</p>
            <div class="hero-meta">
              <div v-for="h in project.highlights" :key="h.label" class="meta-chip">
                <strong>{{ h.value }}</strong>
                <span>{{ h.label }}</span>
              </div>
            </div>
          </div>
        </div>
        <nav class="case-toc">
          <a href="#background">01 业务背景</a>
          <a href="#architecture">02 系统架构</a>
          <a href="#challenges">03 难点方案</a>
          <a href="#code">04 关键代码</a>
          <a href="#stack">05 技术栈</a>
          <a v-if="articleIds.length" href="#articles">06 配套文章</a>
        </nav>
      </div>
    </section>

    <div class="container case-body">
      <section id="background" class="case-section">
        <header class="section-head">
          <span class="num">01</span>
          <div>
            <h2>业务背景</h2>
            <p>这个项目为谁服务，解决什么真实问题。</p>
          </div>
        </header>
        <div class="bg-cards">
          <article class="bg-card">
            <h3>面向谁</h3>
            <p>{{ showcase.background.audience }}</p>
          </article>
          <article class="bg-card">
            <h3>痛点</h3>
            <p>{{ showcase.background.problem }}</p>
          </article>
          <article class="bg-card accent">
            <h3>目标</h3>
            <p>{{ showcase.background.goal }}</p>
          </article>
        </div>
        <p class="detail-text">{{ project.detail }}</p>
      </section>

      <section id="architecture" class="case-section">
        <header class="section-head">
          <span class="num">02</span>
          <div>
            <h2>系统架构</h2>
            <p>自上而下的分层：客户端到数据 / 设备 / AI。</p>
          </div>
        </header>
        <div class="flow">
          <template v-for="(row, i) in showcase.architecture" :key="row.layer">
            <div class="flow-node">
              <div class="flow-label">{{ row.layer }}</div>
              <div class="flow-content">
                <span v-for="item in row.items" :key="item">{{ item }}</span>
              </div>
            </div>
            <div v-if="i < showcase.architecture.length - 1" class="flow-arrow" aria-hidden="true">↓</div>
          </template>
        </div>
      </section>

      <section id="challenges" class="case-section">
        <header class="section-head">
          <span class="num">03</span>
          <div>
            <h2>核心难点与方案</h2>
            <p>不是功能清单，而是做过取舍的工程问题。</p>
          </div>
        </header>
        <div class="challenge-grid">
          <article v-for="(c, i) in showcase.challenges" :key="c.title" class="challenge">
            <span class="challenge-idx">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3>{{ c.title }}</h3>
            <div class="challenge-cols">
              <div>
                <span class="k">问题</span>
                <p>{{ c.problem }}</p>
              </div>
              <div>
                <span class="k">方案</span>
                <p>{{ c.solution }}</p>
              </div>
            </div>
          </article>
        </div>
        <ul class="feature-list">
          <li v-for="f in project.features" :key="f">{{ f }}</li>
        </ul>
      </section>

      <section id="code" class="case-section">
        <header class="section-head">
          <span class="num">04</span>
          <div>
            <h2>关键代码</h2>
            <p>{{ showcase.snippet.title }}</p>
          </div>
        </header>
        <div class="code-wrap">
          <div class="code-bar">
            <span>{{ showcase.snippet.lang }}</span>
            <button type="button" class="copy-btn" @click="copyCode">{{ copied ? '已复制' : '复制' }}</button>
          </div>
          <pre><code ref="codeEl" :class="`language-${showcase.snippet.lang}`">{{ showcase.snippet.code }}</code></pre>
        </div>
      </section>

      <section id="stack" class="case-section">
        <header class="section-head">
          <span class="num">05</span>
          <div>
            <h2>技术栈</h2>
            <p>实际用到的技术，不堆未交付名词。</p>
          </div>
        </header>
        <div class="tech-cloud">
          <span v-for="t in project.tech" :key="t" class="tech-pill">{{ t }}</span>
        </div>
      </section>

      <section v-if="articleIds.length" id="articles" class="case-section">
        <header class="section-head">
          <span class="num">06</span>
          <div>
            <h2>配套文章</h2>
            <p>工程复盘与专题深挖。</p>
          </div>
        </header>
        <div class="article-links">
          <router-link
            v-for="(id, idx) in articleIds"
            :key="id"
            :to="`/blog/${id}`"
            class="article-link"
          >
            <span class="al-kind">{{ idx === 0 ? '项目复盘' : '专题' }}</span>
            <span class="al-title">{{ articleTitle(id) }}</span>
            <span class="al-go">阅读 →</span>
          </router-link>
        </div>
      </section>

      <div class="case-footer">
        <router-link to="/projects" class="btn btn-secondary">查看全部项目</router-link>
        <router-link
          v-if="nextProject"
          :to="`/projects/${nextProject.slug}`"
          class="btn btn-primary"
        >
          下一个：{{ nextProject.name }} →
        </router-link>
      </div>
    </div>
  </div>
  <div v-else class="not-found container">
    <h2>项目不存在</h2>
    <router-link to="/projects" class="btn btn-secondary" style="margin-top:16px;">返回项目列表</router-link>
  </div>
</template>

<script setup>
import { computed, ref, watch, nextTick, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { PROJECTS, getProjectArticleIds } from '../data/projects'
import { getProjectShowcase } from '../data/projectShowcases'
import { useBlogStore } from '../stores/blog'
import hljs from '../utils/hljs'
import 'highlight.js/styles/atom-one-dark.css'

const route = useRoute()
const store = useBlogStore()
const codeEl = ref(null)
const copied = ref(false)

const project = computed(() =>
  PROJECTS.find((p) => p.slug === route.params.slug) || null
)
const showcase = computed(() =>
  project.value ? getProjectShowcase(project.value.slug) : null
)
const articleIds = computed(() => getProjectArticleIds(project.value))
const nextProject = computed(() => {
  if (!project.value) return null
  const i = PROJECTS.findIndex((p) => p.slug === project.value.slug)
  return PROJECTS[(i + 1) % PROJECTS.length] || null
})

function articleTitle(id) {
  return store.getArticle(id)?.title || `文章 #${id}`
}

function highlight() {
  nextTick(() => {
    if (codeEl.value) {
      codeEl.value.removeAttribute('data-highlighted')
      hljs.highlightElement(codeEl.value)
    }
  })
}

async function copyCode() {
  const text = showcase.value?.snippet?.code || ''
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1600)
  } catch (_) { /* ignore */ }
}

watch(() => route.params.slug, () => highlight(), { immediate: false })
onMounted(highlight)
watch(showcase, highlight)
</script>

<style scoped>
.case-hero {
  padding: 100px 0 0;
  position: relative;
}

.case-hero::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 420px;
  background: radial-gradient(ellipse 55% 70% at 30% 0%, rgba(245, 158, 11, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.back-link {
  display: inline-block;
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 28px;
  text-decoration: none;
}

.back-link:hover {
  color: var(--accent);
}

.hero-row {
  display: flex;
  gap: 28px;
  align-items: flex-start;
  position: relative;
}

.hero-icon {
  width: 88px;
  height: 88px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}

.hero-track {
  display: block;
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.hero-title {
  margin: 0 0 14px;
  font-family: var(--font-display);
  font-weight: 400;
  line-height: 1.25;
}

.hero-title .brand {
  display: block;
  font-size: 48px;
  color: var(--text-primary);
  letter-spacing: -0.5px;
}

.hero-title .sub {
  display: block;
  margin-top: 8px;
  font-size: 20px;
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-weight: 500;
}

.hero-lead {
  font-size: 17px;
  line-height: 1.75;
  color: var(--text-secondary);
  max-width: 640px;
  margin: 0 0 22px;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.meta-chip {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 12px;
  min-width: 100px;
}

.meta-chip strong {
  font-family: var(--font-mono);
  font-size: 18px;
  color: var(--accent-light);
}

.meta-chip span {
  font-size: 11px;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.case-toc {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  margin-top: 40px;
  padding: 18px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  position: relative;
}

.case-toc a {
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--text-muted);
  text-decoration: none;
  letter-spacing: 0.04em;
}

.case-toc a:hover {
  color: var(--accent);
}

.case-body {
  padding: 48px 0 96px;
}

.case-section {
  margin-bottom: 72px;
  scroll-margin-top: 96px;
}

.section-head {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  margin-bottom: 28px;
}

.section-head .num {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--accent);
  padding-top: 6px;
}

.section-head h2 {
  margin: 0 0 6px;
  font-size: 28px;
  font-weight: 400;
  font-family: var(--font-display);
}

.section-head p {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
}

.bg-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.bg-card {
  padding: 22px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--bg-card);
}

.bg-card.accent {
  border-color: color-mix(in srgb, var(--accent) 45%, var(--border));
  background: color-mix(in srgb, var(--accent) 8%, var(--bg-card));
}

.bg-card h3 {
  margin: 0 0 10px;
  font-size: 12px;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  color: var(--accent);
  text-transform: uppercase;
}

.bg-card p {
  margin: 0;
  font-size: 15px;
  line-height: 1.75;
  color: var(--text-secondary);
}

.detail-text {
  font-size: 15px;
  line-height: 1.85;
  color: var(--text-muted);
  margin: 0;
  padding: 20px 22px;
  border-left: 2px solid var(--accent);
  background: color-mix(in srgb, var(--bg-card) 70%, transparent);
}

.flow {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 720px;
}

.flow-node {
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  background: var(--bg-card);
}

.flow-label {
  padding: 10px 16px;
  font-size: 12px;
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
  color: var(--accent-light);
  border-bottom: 1px solid var(--border);
  background: color-mix(in srgb, var(--accent) 6%, transparent);
}

.flow-content {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 14px 16px;
}

.flow-content span {
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  color: var(--text-secondary);
}

.flow-arrow {
  text-align: center;
  color: var(--accent);
  font-size: 18px;
  padding: 6px 0;
  opacity: 0.7;
}

.challenge-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 28px;
}

.challenge {
  padding: 22px 24px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--bg-card);
}

.challenge-idx {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
}

.challenge h3 {
  margin: 6px 0 16px;
  font-size: 18px;
  font-weight: 600;
}

.challenge-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.challenge-cols .k {
  display: block;
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--accent);
  letter-spacing: 0.08em;
  margin-bottom: 6px;
}

.challenge-cols p {
  margin: 0;
  font-size: 14px;
  line-height: 1.75;
  color: var(--text-secondary);
}

.feature-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 20px;
}

.feature-list li {
  position: relative;
  padding-left: 18px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-secondary);
}

.feature-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.7;
}

.code-wrap {
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
}

.code-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: #1e222a;
  border-bottom: 1px solid #323842;
  font-family: var(--font-mono);
  font-size: 12px;
  color: #9aa3b2;
}

.copy-btn {
  appearance: none;
  border: 1px solid #3d4450;
  background: transparent;
  color: #c8d0dc;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.copy-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.code-wrap pre {
  margin: 0;
  padding: 20px;
  overflow-x: auto;
  background: #282c34;
  font-size: 13px;
  line-height: 1.7;
}

.code-wrap code {
  font-family: var(--font-mono);
}

.tech-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tech-pill {
  font-size: 13px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  background: var(--bg-card);
}

.article-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.article-link {
  display: grid;
  grid-template-columns: 88px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 18px 20px;
  border: 1px solid var(--border);
  border-radius: 14px;
  text-decoration: none;
  color: inherit;
  background: var(--bg-card);
  transition: border-color var(--transition), transform var(--transition);
}

.article-link:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.al-kind {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--accent);
  letter-spacing: 0.06em;
}

.al-title {
  font-size: 15px;
  color: var(--text-primary);
  line-height: 1.45;
}

.al-go {
  font-size: 13px;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.case-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.not-found {
  padding: 120px 0;
  text-align: center;
}

@media (max-width: 900px) {
  .bg-cards,
  .challenge-cols,
  .feature-list {
    grid-template-columns: 1fr;
  }

  .article-link {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .hero-title .brand {
    font-size: 36px;
  }

  .hero-row {
    flex-direction: column;
  }
}
</style>
