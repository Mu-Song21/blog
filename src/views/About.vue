<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="container">
        <div class="section-label reveal">ABOUT ME</div>
        <h1 class="about-title reveal reveal-delay-1">关于我</h1>
        <p class="about-subtitle reveal reveal-delay-2">用代码守护生活，用技术温暖世界</p>
      </div>
    </section>

    <section class="section container">
      <div class="about-layout">
        <div class="about-main">
          <div class="about-content reveal">
            <p>你好，我是<strong>目送</strong>。</p>
            <p>
              一个热爱技术、热爱创造的开发者。我相信代码不只是冰冷的逻辑，它可以是有温度的——
              可以守护独居老人的安全，可以让社区运转得更高效，可以帮助视障朋友更自由地出行。
            </p>
            <p>
              "目送"这个名字，取自龙应台的散文。目送是关于成长、关于放手、关于注视着那些远去的背影。
              写代码也是一样——我们构建系统，然后目送它们在真实的场景中运行、成长。
            </p>
            <p>
              这个博客记录我在技术路上的思考与实践，既是对自己的总结，也希望能给同行者一些参考。
            </p>
          </div>

          <div class="philosophy-section reveal">
            <h2 class="sub-title">我的信条</h2>
            <div class="philosophy-grid">
              <div class="philosophy-card" v-for="p in philosophies" :key="p.title">
                <span class="phil-icon">{{ p.icon }}</span>
                <h3>{{ p.title }}</h3>
                <p>{{ p.desc }}</p>
              </div>
            </div>
          </div>

          <div class="skills-section reveal">
            <h2 class="sub-title">技术栈</h2>
            <div class="skill-groups">
              <div class="skill-group" v-for="group in skillGroups" :key="group.name">
                <h3 class="group-label">{{ group.name }}</h3>
                <div class="skill-list">
                  <span class="skill-tag" v-for="skill in group.items" :key="skill">{{ skill }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="interests-section reveal">
            <h2 class="sub-title">技术之外</h2>
            <div class="interests-list">
              <div class="interest-item" v-for="interest in interests" :key="interest.name">
                <span class="interest-icon">{{ interest.icon }}</span>
                <div>
                  <h4>{{ interest.name }}</h4>
                  <p>{{ interest.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside class="about-sidebar">
          <div class="sidebar-card card reveal">
            <div class="avatar-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="var(--text-muted)" stroke-width="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/></svg>
            </div>
            <h3 class="sidebar-name">目送</h3>
            <p class="sidebar-role">全栈开发者</p>
            <div class="sidebar-links">
              <a href="javascript:void(0)" class="sidebar-link" @click="ripple">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" fill="var(--text-secondary)"/></svg>
                GitHub
              </a>
              <a href="mailto:your@email.com" class="sidebar-link" @click="ripple">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" stroke-width="1.5"/><path d="M2 7l8.9 5.3a2 2 0 002.2 0L22 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                邮箱
              </a>
            </div>
          </div>

          <div class="sidebar-card card reveal reveal-delay-1">
            <h3 class="sidebar-card-title">关于博客</h3>
            <p class="sidebar-card-text">
              本博客使用 Vue 3 + Vite 构建，暗色科技风格设计，支持后台文章管理。
            </p>
            <div class="tech-stack-mini">
              <span class="mini-tag">Vue 3</span>
              <span class="mini-tag">Vite</span>
              <span class="mini-tag">Pinia</span>
              <span class="mini-tag">Vue Router</span>
            </div>
          </div>

          <div class="sidebar-card card sidebar-quote reveal reveal-delay-2">
            <div class="mini-quote-mark">"</div>
            <p class="mini-quote-text">所谓父女母子一场，只不过意味着，你和他的缘分就是今生今世不断地在目送他的背影渐行渐远。</p>
            <span class="mini-quote-author">— 龙应台</span>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useScrollReveal } from '../composables/useScrollReveal'
import { useRipple } from '../composables/useRipple'

useScrollReveal()
const { createRipple } = useRipple()
function ripple(e) { createRipple(e) }

const philosophies = [
  { icon: '🌱', title: '技术向善', desc: '技术应当服务于人，尤其是那些最需要帮助的群体。让代码产生真实的社会价值。' },
  { icon: '🔧', title: '知行合一', desc: '纸上得来终觉浅，绝知此事要躬行。每一个理论都值得用项目去验证。' },
  { icon: '📐', title: '优雅架构', desc: '好的架构如诗，既要有力量，又要有美感。简洁、可扩展、易维护是我的追求。' },
  { icon: '🤝', title: '开源精神', desc: '站在巨人的肩膀上，也为后来者铺路。分享让技术生态更加繁荣。' },
]

const skillGroups = [
  { name: '后端', items: ['Java', 'Spring Boot', 'MyBatis-Plus', 'MQTT', 'Redis', 'MySQL', 'WebSocket'] },
  { name: '前端', items: ['Vue 2 / Vue 3', 'TypeScript', 'Element UI', 'uni-app', '微信小程序', 'ECharts'] },
  { name: '其他', items: ['AI 大模型 API', '高德地图', '百度语音', '若依框架', 'Git'] },
]

const interests = [
  { icon: '📖', name: '技术写作', desc: '记录开发中的思考与心得，把经验沉淀为知识。' },
  { icon: '🏔️', name: '户外徒步', desc: '走出代码世界，在自然中找回灵感与平静。' },
  { icon: '🎵', name: '音乐', desc: '编程时的最佳伴侣，让思路在旋律中流淌。' },
  { icon: '📷', name: '摄影', desc: '用镜头捕捉生活中的美好瞬间。' },
]
</script>

<style scoped>
.about-hero {
  padding: 80px 0 40px;
  position: relative;
}

.about-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 50% 80% at 50% 0%, var(--accent-glow) 0%, transparent 70%);
  pointer-events: none;
}

.about-hero .container {
  position: relative;
}

.about-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.about-subtitle {
  font-size: 18px;
  color: var(--text-muted);
}

.about-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;
  align-items: start;
}

.about-content p {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.9;
  margin-bottom: 16px;
}

.about-content strong {
  color: var(--accent-light);
}

.philosophy-section {
  margin-top: 48px;
}

.sub-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 24px;
}

.philosophy-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.philosophy-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  transition: all var(--transition);
}

.philosophy-card:hover {
  border-color: var(--border-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.phil-icon {
  font-size: 28px;
  display: block;
  margin-bottom: 12px;
}

.philosophy-card h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.philosophy-card p {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
}

.skills-section {
  margin-top: 48px;
}

.skill-groups {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.group-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  padding: 6px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 13px;
  color: var(--text-secondary);
  transition: all var(--transition);
}

.skill-tag:hover {
  border-color: var(--accent);
  color: var(--accent-light);
  background: var(--accent-glow);
  transform: translateY(-1px);
}

.interests-section {
  margin-top: 48px;
}

.interests-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.interest-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  transition: all var(--transition);
}

.interest-item:hover {
  border-color: var(--border-light);
  transform: translateX(4px);
}

.interest-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.interest-item h4 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
}

.interest-item p {
  font-size: 13px;
  color: var(--text-muted);
}

.about-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: calc(var(--nav-height) + 24px);
}

.sidebar-card {
  text-align: center;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.sidebar-name {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
}

.sidebar-role {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.sidebar-links {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.sidebar-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--text-secondary);
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid var(--border);
  transition: all var(--transition);
  position: relative;
  overflow: hidden;
}

.sidebar-link:hover {
  border-color: var(--accent);
  color: var(--accent-light);
}

.sidebar-card-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: left;
}

.sidebar-card-text {
  font-size: 14px;
  color: var(--text-muted);
  text-align: left;
  margin-bottom: 16px;
}

.tech-stack-mini {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.mini-tag {
  font-size: 11px;
  padding: 3px 10px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-muted);
}

.sidebar-quote {
  text-align: left;
  padding: 24px;
}

.mini-quote-mark {
  font-size: 40px;
  font-weight: 700;
  color: var(--accent);
  opacity: 0.3;
  line-height: 1;
  margin-bottom: 4px;
}

.mini-quote-text {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.8;
  font-style: italic;
  margin-bottom: 12px;
}

.mini-quote-author {
  font-size: 12px;
  color: var(--text-muted);
  opacity: 0.7;
}

@media (max-width: 768px) {
  .about-layout {
    grid-template-columns: 1fr;
  }

  .about-title {
    font-size: 32px;
  }

  .about-sidebar {
    position: static;
  }

  .philosophy-grid {
    grid-template-columns: 1fr;
  }
}
</style>
