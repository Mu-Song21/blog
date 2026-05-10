<template>
  <div class="home">
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-glow"></div>
        <div class="hero-grid"></div>
      </div>
      <div class="container hero-content">
        <div class="hero-label reveal">JAVA BACKEND · IOT · SMART CARE</div>
        <h1 class="hero-title reveal reveal-delay-1">
          <span class="line">你好，我是</span>
          <span class="line accent">目送</span>
        </h1>
        <p class="hero-desc reveal reveal-delay-2">
          我是
          <TypedText :strings="typedStrings" :type-speed="70" :delete-speed="35" :pause-time="2500" />
          <br />
          专注 Spring Boot、Redis、WebSocket、MQTT 与 Vue，用代码连接设备、数据与真实生活场景。
        </p>
        <div class="hero-actions reveal reveal-delay-3">
          <router-link to="/projects" class="btn btn-primary btn-glow" @click="ripple">
            <span>查看项目</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </router-link>
          <router-link to="/blog" class="btn btn-secondary" @click="ripple">阅读文章</router-link>
          <router-link to="/about" class="btn btn-secondary" @click="ripple">在线简历</router-link>
        </div>
        <div class="hero-stats reveal reveal-delay-4">
          <div class="stat-item">
            <CountUp :end="3" suffix="+" />
            <span class="stat-text">个项目</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <CountUp :end="store.publishedArticles.length" suffix="" />
            <span class="stat-text">篇文章</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <CountUp :end="15" suffix="+" />
            <span class="stat-text">项技术栈</span>
          </div>
        </div>
      </div>
      <div class="scroll-hint">
        <div class="scroll-mouse">
          <div class="scroll-dot"></div>
        </div>
        <span>向下滚动</span>
      </div>
    </section>

    <section class="section container">
      <div class="section-header reveal">
        <div class="section-label">FEATURED ARTICLES</div>
        <h2 class="section-title">精选文章</h2>
        <p class="section-subtitle">记录开发过程中的思考、踩坑与收获</p>
      </div>
      <div class="article-grid">
        <div v-for="(article, i) in store.featuredArticles.slice(0, 3)" :key="article.id" class="reveal" :class="'reveal-delay-' + (i + 1)">
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
        <p class="section-subtitle">每一个项目，都是一次从 0 到 1 的探索旅程</p>
      </div>
      <div class="project-grid">
        <div v-for="(project, i) in projects" :key="project.name" class="reveal" :class="'reveal-delay-' + (i + 1)">
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
        <div class="section-label">TECH STACK</div>
        <h2 class="section-title">技术栈全景</h2>
        <p class="section-subtitle">全链路技术能力覆盖，从硬件通信到云端服务再到前端交互</p>
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
          <p class="quote-text">我慢慢地、慢慢地了解到，所谓父女母子一场，只不过意味着，你和他的缘分就是今生今世不断地在目送他的背影渐行渐远。</p>
          <footer class="quote-author">— 龙应台《目送》</footer>
        </blockquote>
      </div>
    </section>

    <section class="cta-section">
      <div class="container cta-inner reveal">
        <div class="cta-glow"></div>
        <h2 class="cta-title">让我们一起探索技术的边界</h2>
        <p class="cta-desc">如果你对我的项目感兴趣，或者有任何合作想法，欢迎随时联系我。</p>
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
  '一个物联网探索者',
  '一个 Java 后端开发者',
  '一个智慧养老实践者',
  '一个实时告警系统实践者'
]

const projects = [
  {
    name: 'ElderGuard 独居老人守护终端',
    description: '基于 Spring Boot + Redis + WebSocket + MQTT 的智慧养老监护系统，覆盖老人档案、设备管理、异常告警、告警闭环和通知中心。',
    icon: '🛡️',
    gradient: 'linear-gradient(135deg, #f59e0b22, #f9731622)',
    tech: ['Spring Boot', 'JPA', 'Redis', 'MQTT', 'WebSocket'],
    stats: [
      { value: '闭环', label: '告警处理' },
      { value: '实时', label: '数据推送' }
    ]
  },
  {
    name: '安隅智能社区',
    description: '基于若依框架二次开发的智慧社区管理平台，涵盖住户、房屋、费用、预约、投诉、访客和公告等物业业务。',
    icon: '🏘️',
    gradient: 'linear-gradient(135deg, #3b82f622, #6366f122)',
    tech: ['若依', 'Spring Security', 'JWT', 'Redis', 'MyBatis-Plus'],
    stats: [
      { value: '8+', label: '核心模块' },
      { value: 'RBAC', label: '权限体系' }
    ]
  },
  {
    name: '智能盲杖辅助系统',
    description: '面向视障人士的智能硬件管理平台，支持传感器数据上报、跌倒检测、电子围栏、轨迹回放和 AI 按键唤醒。',
    icon: '🦯',
    gradient: 'linear-gradient(135deg, #8b5cf622, #a78bfa22)',
    tech: ['Spring Boot', 'MyBatis', 'WebSocket', 'GPS', 'uni-app'],
    stats: [
      { value: 'AI', label: '语音交互' },
      { value: '跨端', label: 'H5 + 小程序' }
    ]
  }
]

const techCategories = [
  {
    name: '后端开发',
    icon: '⚙️',
    items: [
      { name: 'Java', color: '#f89820' },
      { name: 'Spring Boot', color: '#6db33f' },
      { name: 'MyBatis-Plus', color: '#e3342f' },
      { name: 'MQTT', color: '#660066' },
      { name: 'Redis', color: '#dc382d' },
      { name: 'MySQL', color: '#4479a1' },
      { name: 'WebSocket', color: '#00897b' },
    ]
  },
  {
    name: '前端开发',
    icon: '🎨',
    items: [
      { name: 'Vue 2 / Vue 3', color: '#42b883' },
      { name: 'TypeScript', color: '#3178c6' },
      { name: 'Element UI', color: '#409eff' },
      { name: 'uni-app', color: '#2b9939' },
      { name: '微信小程序', color: '#07c160' },
      { name: 'ECharts', color: '#aa344d' },
    ]
  },
  {
    name: 'AI & 云服务',
    icon: '🤖',
    items: [
      { name: 'AI 大模型 API', color: '#8b5cf6' },
      { name: '高德地图', color: '#0090ff' },
      { name: '百度语音', color: '#2932e1' },
      { name: '若依框架', color: '#e74c3c' },
      { name: 'Netlify', color: '#00c7b7' },
    ]
  }
]

const timeline = [
  { date: '2024', title: '初识编程', desc: '第一次接触 Java，写下了 Hello World。从此打开了新世界的大门。', color: '#f59e0b' },
  { date: '2025 上', title: '第一个完整项目', desc: '独立完成安隅智能社区平台，从需求分析到架构设计，理解了企业级开发的全貌。', color: '#3b82f6' },
  { date: '2025 下', title: '物联网探索', desc: '搭建 ElderGuard 独居老人守护终端，打通传感器 → MQTT → 云端 → 小程序的完整链路。', color: '#6366f1' },
  { date: '2026', title: 'AI 赋能无障碍', desc: '开发智能盲杖系统，融合 AI 对话与地图导航，践行"技术向善"的理念。', color: '#8b5cf6' },
  { date: '现在', title: '持续精进', desc: '深耕全栈技术，探索 AI 更多落地场景。目送每一个项目远去，也目送自己不断成长。', color: '#a78bfa' },
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
    radial-gradient(ellipse 60% 50% at 50% 0%, var(--accent-glow) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse 30% 30% at 20% 60%, rgba(6, 182, 212, 0.05) 0%, transparent 60%);
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 80%);
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 3px;
  color: var(--accent);
  margin-bottom: 24px;
  font-family: var(--font-mono);
}

.hero-title {
  font-size: 60px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -1.5px;
  margin-bottom: 28px;
}

.hero-title .line {
  display: block;
}

.hero-title .accent {
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 2;
  max-width: 560px;
  margin-bottom: 40px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 64px;
}

.btn-glow {
  box-shadow: 0 0 20px var(--accent-glow), 0 4px 15px rgba(99, 102, 241, 0.2);
}

.btn-glow:hover {
  box-shadow: 0 0 30px var(--accent-glow-strong), 0 8px 25px rgba(99, 102, 241, 0.3);
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
  font-size: 14px;
  font-weight: 400;
  color: var(--text-muted);
  font-family: var(--font-sans);
}

.stat-divider {
  width: 1px;
  height: 28px;
  background: var(--border);
}

.scroll-hint {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 12px;
  animation: float 2.5s ease-in-out infinite;
}

.scroll-mouse {
  width: 22px;
  height: 34px;
  border: 2px solid var(--border-light);
  border-radius: 11px;
  position: relative;
}

.scroll-dot {
  width: 3px;
  height: 8px;
  background: var(--accent);
  border-radius: 2px;
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  animation: scrollDot 2s ease-in-out infinite;
}

@keyframes scrollDot {
  0%, 100% { opacity: 1; top: 6px; }
  50% { opacity: 0.3; top: 18px; }
}

@keyframes float {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-6px); }
}

.section-subtitle {
  margin-top: 12px;
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

.view-more {
  text-align: center;
  margin-top: 40px;
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
  width: 2px;
  background: linear-gradient(to bottom, transparent, var(--accent), var(--accent-light), transparent);
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
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 3px solid var(--bg-primary);
  box-shadow: 0 0 12px currentColor;
  z-index: 1;
}

.timeline-item.left .timeline-dot {
  right: -7px;
}

.timeline-item.right .timeline-dot {
  left: -7px;
}

.timeline-card {
  display: inline-block;
  text-align: left;
  max-width: 400px;
}

.timeline-date {
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--accent);
  letter-spacing: 1px;
}

.timeline-title {
  font-size: 18px;
  font-weight: 600;
  margin: 6px 0 8px;
}

.timeline-desc {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
}

.quote-section {
  padding: 40px 0 80px;
}

.quote-block {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  padding: 48px 40px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  position: relative;
}

.quote-mark {
  font-size: 80px;
  font-weight: 700;
  color: var(--accent);
  opacity: 0.2;
  line-height: 1;
  position: absolute;
  top: 12px;
  left: 24px;
}

.quote-text {
  font-size: 18px;
  line-height: 2;
  color: var(--text-secondary);
  font-style: italic;
  position: relative;
}

.quote-author {
  margin-top: 20px;
  font-size: 14px;
  color: var(--text-muted);
  font-style: normal;
}

.cta-section {
  padding: 40px 0 80px;
}

.cta-inner {
  text-align: center;
  padding: 72px 40px;
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
    radial-gradient(ellipse 50% 50% at 50% 0%, var(--accent-glow) 0%, transparent 70%),
    radial-gradient(ellipse 30% 30% at 20% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 70%),
    radial-gradient(ellipse 30% 30% at 80% 80%, rgba(6, 182, 212, 0.06) 0%, transparent 70%);
  pointer-events: none;
}

.cta-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  position: relative;
}

.cta-desc {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 36px;
  position: relative;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  position: relative;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 38px;
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
  .tech-showcase {
    grid-template-columns: 1fr;
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
    left: 13px;
    right: auto;
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;
  }

  .quote-block {
    padding: 36px 24px;
  }

  .quote-text {
    font-size: 16px;
  }

  .scroll-hint {
    display: none;
  }
}
</style>
