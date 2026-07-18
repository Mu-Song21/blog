<template>
  <div class="home">
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-glow"></div>
        <div class="hero-grid"></div>
      </div>
      <div class="container hero-content">
        <div class="hero-main">
          <div class="hero-copy">
            <div class="hero-label reveal">JAVA BACKEND · IOT · AI PRACTICE</div>
            <h1 class="hero-title reveal reveal-delay-1">
              <span class="line">用 Java 后端</span>
              <span class="line accent">把业务与数据串成闭环</span>
            </h1>
            <p class="hero-desc reveal reveal-delay-2">
              我是
              <TypedText :strings="typedStrings" :type-speed="70" :delete-speed="35" :pause-time="2500" />
              <br />
              主线是 Spring Boot 业务系统；同时用 WebSocket / Redis 做实时告警，并用 AI API 把能力接到康养与出行场景。
            </p>
            <div class="hero-actions reveal reveal-delay-3">
              <router-link to="/projects" class="btn btn-primary btn-glow" @click="ripple">
                <span>查看项目作品集</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </router-link>
              <router-link to="/blog" class="btn btn-secondary" @click="ripple">阅读技术文章</router-link>
              <router-link to="/about" class="btn btn-secondary" @click="ripple">在线简历</router-link>
            </div>
            <div class="hero-stats reveal reveal-delay-4">
              <div class="stat-item">
                <CountUp :end="3" suffix="" />
                <span class="stat-text">能力主线</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <CountUp :end="projects.length" suffix="" />
                <span class="stat-text">代表项目</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <CountUp :end="store.publishedArticles.length" suffix="" />
                <span class="stat-text">技术文章</span>
              </div>
            </div>
          </div>
          <div class="hero-panel reveal reveal-delay-2">
            <div class="panel-header">
              <span class="panel-dot"></span>
              <span>BackendLoop.java</span>
            </div>
            <div class="system-flow">
              <div v-for="item in systemFlow" :key="item.name" class="flow-node">
                <div class="flow-icon">{{ item.icon }}</div>
                <div>
                  <h3>{{ item.name }}</h3>
                  <p>{{ item.desc }}</p>
                </div>
              </div>
            </div>
            <div class="panel-footer">
              <span>Spring Boot</span>
              <span>JWT</span>
              <span>Redis</span>
              <span>WebSocket</span>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-hint">
        <div class="scroll-line"></div>
        <span>SCROLL</span>
      </div>
    </section>

    <section class="section container">
      <div class="section-header reveal">
        <div class="section-label">DEEP INSIGHTS</div>
        <h2 class="section-title">精选技术文章</h2>
        <p class="section-subtitle">从接口鉴权、实时推送到 AI 接入，记录可复查的工程细节</p>
      </div>
      <div class="article-grid">
        <div v-for="(article, i) in store.publishedArticles.slice(0, 6)" :key="article.id" class="reveal" :class="'reveal-delay-' + (i % 3 + 1)">
          <ArticleCard :article="article" />
        </div>
      </div>
      <div class="view-more reveal">
        <router-link to="/blog" class="btn btn-secondary" @click="ripple">
          查看全部文章
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </router-link>
      </div>
    </section>

    <section class="section container">
      <div class="section-header reveal">
        <div class="section-label">PROJECTS</div>
        <h2 class="section-title">项目实践</h2>
        <p class="section-subtitle">点击卡片直达详情；卡片右上角标明所属主线</p>
      </div>
      <div class="project-grid">
        <div v-for="(project, i) in projects" :key="project.slug" class="reveal" :class="'reveal-delay-' + (i % 3 + 1)">
          <ProjectCard :project="project" />
        </div>
      </div>
      <div class="view-more reveal">
        <router-link to="/projects" class="btn btn-secondary" @click="ripple">
          查看项目详情
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </router-link>
      </div>
    </section>

    <section class="section container">
      <div class="section-header reveal">
        <div class="section-label">CORE VALUE</div>
        <h2 class="section-title">我的求职亮点</h2>
        <p class="section-subtitle">后端主业清晰，实时与 AI 是加分项——按项目边界诚实表达</p>
      </div>
      <div class="value-grid">
        <div v-for="(value, i) in coreValues" :key="value.title" class="value-card reveal" :class="'reveal-delay-' + (i + 1)">
          <div class="value-index">0{{ i + 1 }}</div>
          <h3>{{ value.title }}</h3>
          <p>{{ value.desc }}</p>
        </div>
      </div>
    </section>

    <section class="section container">
      <div class="section-header reveal">
        <div class="section-label">TECH STACK</div>
        <h2 class="section-title">技术武器库</h2>
        <p class="section-subtitle">覆盖企业后台、物联网实时链路与 AI API 接入的常用工具</p>
      </div>
      <div class="tech-showcase reveal">
        <div class="tech-category" v-for="cat in techCategories" :key="cat.name">
          <div class="tech-cat-header">
            <span class="tech-cat-icon">{{ cat.icon }}</span>
            <h3>{{ cat.name }}</h3>
          </div>
          <div class="tech-items">
            <div class="tech-item" v-for="t in cat.items" :key="t.name">
              <span class="tech-dot" :style="{ background: t.color }"></span>
              <span class="tech-name">{{ t.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section timeline-section">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">JOURNEY</div>
          <h2 class="section-title">成长历程</h2>
          <p class="section-subtitle">每一次挑战，都是一次蜕变</p>
        </div>
        <div class="timeline">
          <div class="timeline-item reveal" v-for="(item, i) in timeline" :key="i" :class="[i % 2 === 0 ? 'left' : 'right', 'reveal-delay-' + (i % 3 + 1)]">
            <div class="timeline-dot" :style="{ background: item.color }"></div>
            <div class="timeline-card card">
              <span class="timeline-date">{{ item.date }}</span>
              <h3 class="timeline-title">{{ item.title }}</h3>
              <p class="timeline-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section quote-section">
      <div class="container reveal">
        <blockquote class="quote-block">
          <div class="quote-mark">"</div>
          <p class="quote-text">我希望自己的项目不只是能运行，而是能解决真实场景里的问题：让设备数据被看见，让异常告警被及时处理，让技术真正落到生活里。</p>
          <footer class="quote-author">— 目送的开发理念</footer>
        </blockquote>
      </div>
    </section>

    <section class="cta-section">
      <div class="container cta-inner reveal">
        <div class="cta-glow"></div>
        <h2 class="cta-title">正在寻找 Java 后端方向机会</h2>
        <p class="cta-desc">也欢迎关注物联网实时系统与 AI 落地相关岗位。想了解项目细节，可先看作品集或直接联系我。</p>
        <div class="cta-actions">
          <router-link to="/about" class="btn btn-primary btn-glow" @click="ripple">了解更多</router-link>
          <router-link to="/blog" class="btn btn-secondary" @click="ripple">阅读博客</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useBlogStore } from '../stores/blog'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useRipple } from '../composables/useRipple'
import { PROJECTS, toHomeProject } from '../data/projects'
import ArticleCard from '../components/ArticleCard.vue'
import ProjectCard from '../components/ProjectCard.vue'
import TypedText from '../components/TypedText.vue'
import CountUp from '../components/CountUp.vue'

const store = useBlogStore()
useScrollReveal()
const { createRipple } = useRipple()

function ripple(e) {
  createRipple(e)
}

const typedStrings = [
  '一个 Java 后端开发者',
  '一个业务系统构建者',
  '一个实时告警实践者',
  '一个 AI 接入落地者'
]

const systemFlow = [
  { name: '接口与鉴权', desc: 'Spring Boot + JWT / Security，把角色与数据权限落到接口层', icon: '🔐' },
  { name: '业务落库', desc: 'MyBatis / JPA 建模，完成台账、告警、档案等核心业务', icon: '⚙️' },
  { name: '状态与缓存', desc: 'Redis 维护异常状态、短时统计，降低热路径压力', icon: '⚡' },
  { name: '实时与 AI', desc: 'WebSocket 推告警；SSE / 大模型 API 接入康养等场景', icon: '✨' }
]

const coreValues = [
  { title: 'Java 后端业务闭环', desc: '从实体建模、接口设计、Service 到持久化，能独立完成后台主流程（青衿、安隅、安康）。' },
  { title: '实时告警与状态机', desc: 'WebSocket 推送 + Redis 状态：守望的告警闭环与夜间离床规则是代表案例。' },
  { title: 'AI 能力工程化接入', desc: '不是调戏一下 Chat，而是 SSE 流式、并发任务与档案上下文（颐康云 / 明眼助手）。' },
  { title: '软硬件协同经验', desc: '引路项目打通 ESP32 HTTPS 上报、跌倒/围栏判断与多端监护；MQTT 在守望中为可插拔能力。' }
]

const projects = PROJECTS.map(toHomeProject)

const techCategories = [
  {
    name: '后端开发',
    icon: '⚙️',
    items: [
      { name: 'Java', color: '#f89820' },
      { name: 'Spring Boot', color: '#6db33f' },
      { name: 'MyBatis-Plus', color: '#e3342f' },
      { name: 'Redis', color: '#dc382d' },
      { name: 'MySQL', color: '#4479a1' },
      { name: 'WebSocket', color: '#00897b' },
      { name: 'JWT', color: '#000000' },
    ]
  },
  {
    name: '前端开发',
    icon: '🎨',
    items: [
      { name: 'Vue 2 / Vue 3', color: '#42b883' },
      { name: 'Three.js', color: '#049ef4' },
      { name: 'Element Plus', color: '#409eff' },
      { name: 'uni-app', color: '#2b9939' },
      { name: '微信小程序', color: '#07c160' },
      { name: 'ECharts', color: '#aa344d' },
    ]
  },
  {
    name: 'IoT & AI',
    icon: '🤖',
    items: [
      { name: 'MQTT（可插拔）', color: '#660066' },
      { name: 'ESP32', color: '#e7352c' },
      { name: '讯飞星火', color: '#f59e0b' },
      { name: 'DeepSeek', color: '#4d6bfe' },
      { name: 'MediaPipe', color: '#00a3a1' },
      { name: '高德地图', color: '#0090ff' },
    ]
  }
]

const timeline = [
  { date: '2024', title: '初识编程', desc: '第一次接触 Java，打开后端学习路径。', color: '#f59e0b' },
  { date: '2025', title: '企业后台入门', desc: '安隅：在若依多模块上扩展社区业务 CRUD，熟悉权限与脚手架。', color: '#06b6d4' },
  { date: '2025–2026', title: '实时与硬件', desc: '守望打通告警闭环；引路完成 ESP32 → 云端 → 小程序监护。', color: '#f59e0b' },
  { date: '2026', title: 'AI 与数字文化', desc: '颐康云接入星火 SSE；青衿做多角色教务；SmartCar 完成视觉检测原型；墨境落地国风 Web3D 展馆闭环。', color: '#10b981' },
  { date: '现在', title: '持续精进', desc: '深耕 Java 后端，诚实打磨作品集表达。目送项目远去，也目送自己成长。', color: '#fbbf24' },
]
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 50% 0%, rgba(245, 158, 11, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 80% 20%, rgba(6, 182, 212, 0.05) 0%, transparent 60%),
    radial-gradient(ellipse 30% 30% at 20% 60%, rgba(245, 158, 11, 0.03) 0%, transparent 60%);
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(245, 158, 11, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245, 158, 11, 0.02) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 80%);
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-main {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.92fr);
  align-items: center;
  gap: 64px;
}

.hero-copy {
  min-width: 0;
}

.hero-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 4px;
  color: var(--accent);
  margin-bottom: 28px;
  font-family: var(--font-mono);
}

.hero-title {
  font-size: 64px;
  font-weight: 400;
  font-family: var(--font-display);
  line-height: 1.15;
  letter-spacing: -1px;
  margin-bottom: 32px;
}

.hero-title .line {
  display: block;
}

.hero-title .accent {
  color: var(--accent);
  font-style: italic;
}

.hero-desc {
  font-size: 17px;
  color: var(--text-secondary);
  line-height: 2;
  max-width: 560px;
  margin-bottom: 44px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 64px;
}

.btn-glow {
  box-shadow: 0 0 24px var(--accent-glow), 0 4px 16px rgba(245, 158, 11, 0.15);
}

.btn-glow:hover {
  box-shadow: 0 0 36px var(--accent-glow-strong), 0 8px 28px rgba(245, 158, 11, 0.2);
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 28px;
}

.stat-item {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: 28px;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--text-primary);
}

.stat-text {
  font-size: 13px;
  font-weight: 400;
  color: var(--text-muted);
  font-family: var(--font-sans);
}

.stat-divider {
  width: 1px;
  height: 28px;
  background: var(--border);
}

.hero-panel {
  background:
    linear-gradient(135deg, rgba(245, 158, 11, 0.06), rgba(6, 182, 212, 0.02)),
    var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
}

.hero-panel::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: radial-gradient(circle at 20% 0%, rgba(245, 158, 11, 0.1), transparent 35%);
  pointer-events: none;
}

.panel-header,
.panel-footer,
.system-flow {
  position: relative;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 18px;
  margin-bottom: 18px;
  border-bottom: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 13px;
  font-family: var(--font-mono);
}

.panel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 12px var(--accent-glow-strong);
}

.system-flow {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.flow-node {
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 14px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.02);
  transition: all var(--transition);
}

.flow-node:hover {
  border-color: rgba(245, 158, 11, 0.15);
  background: rgba(245, 158, 11, 0.03);
}

.flow-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(245, 158, 11, 0.1);
}

.flow-node h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
}

.flow-node p {
  font-size: 13px;
  line-height: 1.7;
  color: var(--text-muted);
}

.panel-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

.panel-footer span {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--accent-light);
  background: rgba(245, 158, 11, 0.06);
  font-size: 11px;
  font-family: var(--font-mono);
  letter-spacing: 0.5px;
}

.scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--text-muted);
  font-size: 10px;
  font-family: var(--font-mono);
  letter-spacing: 3px;
}

.scroll-line {
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, var(--accent), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 1; transform: scaleY(1); }
  50% { opacity: 0.3; transform: scaleY(0.6); }
}

.section-subtitle {
  margin-top: 16px;
  font-size: 16px;
  color: var(--text-muted);
  max-width: 560px;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.value-card {
  min-height: 220px;
  padding: 28px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background:
    linear-gradient(180deg, rgba(245, 158, 11, 0.04), transparent),
    var(--bg-card);
  transition: all var(--transition);
}

.value-card:hover {
  transform: translateY(-4px);
  border-color: rgba(245, 158, 11, 0.2);
  box-shadow: 0 8px 32px rgba(245, 158, 11, 0.08);
}

.value-index {
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--accent);
  margin-bottom: 28px;
  letter-spacing: 2px;
}

.value-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

.value-card p {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-muted);
}

.view-more {
  text-align: center;
  margin-top: 48px;
}

.tech-showcase {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.tech-category {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  transition: all var(--transition);
}

.tech-category:hover {
  border-color: var(--border-light);
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.tech-cat-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.tech-cat-icon {
  font-size: 20px;
}

.tech-cat-header h3 {
  font-size: 16px;
  font-weight: 600;
}

.tech-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text-secondary);
  transition: color var(--transition);
}

.tech-item:hover {
  color: var(--text-primary);
}

.tech-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 6px currentColor;
}

.timeline-section {
  position: relative;
}

.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, transparent, var(--accent-dim), var(--accent), var(--accent-dim), transparent);
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  width: 50%;
  padding: 0 40px 40px;
}

.timeline-item.left {
  padding-right: 60px;
  text-align: right;
}

.timeline-item.right {
  left: 50%;
  padding-left: 60px;
}

.timeline-dot {
  position: absolute;
  top: 8px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--bg-primary);
  box-shadow: 0 0 16px currentColor;
  z-index: 1;
}

.timeline-item.left .timeline-dot {
  right: -6px;
}

.timeline-item.right .timeline-dot {
  left: -6px;
}

.timeline-card {
  display: inline-block;
  text-align: left;
  max-width: 400px;
}

.timeline-date {
  font-size: 11px;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--accent);
  letter-spacing: 2px;
}

.timeline-title {
  font-size: 18px;
  font-weight: 600;
  margin: 8px 0 10px;
}

.timeline-desc {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.7;
}

.quote-section {
  padding: 40px 0 80px;
}

.quote-block {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  padding: 56px 48px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  position: relative;
}

.quote-mark {
  font-size: 80px;
  font-family: var(--font-display);
  color: var(--accent);
  opacity: 0.15;
  line-height: 1;
  position: absolute;
  top: 16px;
  left: 28px;
}

.quote-text {
  font-size: 18px;
  font-family: var(--font-display);
  line-height: 2;
  color: var(--text-secondary);
  font-style: italic;
  position: relative;
}

.quote-author {
  margin-top: 24px;
  font-size: 13px;
  color: var(--text-muted);
  font-style: normal;
  font-family: var(--font-mono);
  letter-spacing: 1px;
}

.cta-section {
  padding: 40px 0 80px;
}

.cta-inner {
  text-align: center;
  padding: 80px 48px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
}

.cta-glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 50% 50% at 50% 0%, rgba(245, 158, 11, 0.08) 0%, transparent 70%),
    radial-gradient(ellipse 30% 30% at 20% 80%, rgba(6, 182, 212, 0.04) 0%, transparent 70%),
    radial-gradient(ellipse 30% 30% at 80% 80%, rgba(245, 158, 11, 0.04) 0%, transparent 70%);
  pointer-events: none;
}

.cta-title {
  font-size: 32px;
  font-family: var(--font-display);
  font-weight: 400;
  margin-bottom: 16px;
  position: relative;
}

.cta-desc {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 40px;
  position: relative;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  position: relative;
}

@media (max-width: 768px) {
  .hero-main {
    grid-template-columns: 1fr;
    gap: 40px;
    padding-top: 80px;
  }

  .hero-title {
    font-size: 40px;
  }

  .hero-desc {
    font-size: 16px;
  }

  .hero-actions {
    flex-direction: column;
    gap: 12px;
  }

  .hero-stats {
    flex-wrap: wrap;
    gap: 16px;
  }

  .article-grid,
  .project-grid,
  .value-grid,
  .tech-showcase {
    grid-template-columns: 1fr;
  }

  .hero-panel {
    padding: 18px;
  }

  .timeline::before {
    left: 20px;
  }

  .timeline-item,
  .timeline-item.left,
  .timeline-item.right {
    width: 100%;
    left: 0;
    padding-left: 56px;
    padding-right: 0;
    text-align: left;
  }

  .timeline-item.left .timeline-dot,
  .timeline-item.right .timeline-dot {
    left: 14px;
    right: auto;
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;
  }

  .quote-block {
    padding: 40px 28px;
  }

  .quote-text {
    font-size: 16px;
  }

  .scroll-hint {
    display: none;
  }
}
</style>
