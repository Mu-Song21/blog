<template>
  <div class="projects-page">
    <section class="projects-hero">
      <div class="container">
        <div class="section-label reveal">PROJECTS</div>
        <h1 class="projects-hero-title reveal reveal-delay-1">项目展示</h1>
        <p class="projects-hero-desc reveal reveal-delay-2">每一个项目都是一段探索的旅程，从需求分析到技术选型，从架构设计到功能落地。</p>
      </div>
    </section>

    <section class="section container">
      <div class="project-list">
        <div class="project-item reveal" v-for="(project, index) in projects" :key="project.name" :class="'reveal-delay-' + (index % 3 + 1)">
          <div class="project-left">
            <div class="project-index">{{ String(index + 1).padStart(2, '0') }}</div>
            <div class="project-icon" :style="{ background: project.gradient }">
              <span>{{ project.icon }}</span>
            </div>
          </div>
          <div class="project-body">
            <div class="project-header">
              <h3 class="project-name">{{ project.name }}</h3>
              <span class="project-category">{{ project.category }}</span>
            </div>
            <p class="project-desc">{{ project.description }}</p>
            <p class="project-detail">{{ project.detail }}</p>
            <div class="project-tech">
              <span class="tag" v-for="t in project.tech" :key="t">{{ t }}</span>
            </div>
            <div class="project-features">
              <div class="feature" v-for="f in project.features" :key="f">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span>{{ f }}</span>
              </div>
            </div>
            <div class="project-highlights">
              <div class="highlight" v-for="h in project.highlights" :key="h.label">
                <span class="highlight-value">{{ h.value }}</span>
                <span class="highlight-label">{{ h.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useScrollReveal } from '../composables/useScrollReveal'
useScrollReveal()

const projects = [
  {
    name: 'ElderGuard 独居老人居家守护终端',
    category: '物联网 · 智慧养老',
    description: '基于 Spring Boot + MQTT + Redis 构建的实时健康监测与异常报警系统',
    detail: '通过传感器采集环境数据，MQTT 协议传输，Redis 缓存实时数据，WebSocket 推送告警到微信小程序，实现对独居老人居家安全的全方位守护。',
    icon: '🛡️',
    gradient: 'linear-gradient(135deg, #f59e0b33, #f9731633)',
    tech: ['Spring Boot', 'MQTT', 'Redis', 'WebSocket', '微信小程序'],
    features: [
      '多传感器实时数据采集',
      'MQTT 消息可靠传输与重试',
      '多级告警（提示/警告/紧急）',
      '微信小程序实时监控与推送',
      '设备在线状态管理'
    ],
    highlights: [
      { value: '12+', label: '传感器类型' },
      { value: '<1s', label: '告警延迟' },
      { value: 'QoS 1', label: '消息可靠性' }
    ]
  },
  {
    name: '安隅智能社区管理平台',
    category: '企业应用 · 智慧社区',
    description: '以若依框架为基座，Spring Boot + Vue 2 构建的社区综合管理平台',
    detail: '涵盖住户管理、报修投诉、物业缴费、公告通知、访客预约等核心模块，基于 ECharts 构建数据可视化大屏，助力社区数字化转型。',
    icon: '🏘️',
    gradient: 'linear-gradient(135deg, #3b82f633, #6366f133)',
    tech: ['若依框架', 'Spring Boot', 'Vue 2', 'Element UI', 'MyBatis-Plus', 'ECharts'],
    features: [
      '楼栋-单元-房屋三级管理',
      '报修工单全流程跟踪',
      '在线缴费与统计报表',
      '富文本公告编辑与推送',
      '数据可视化大屏'
    ],
    highlights: [
      { value: '8+', label: '核心模块' },
      { value: 'RBAC', label: '权限体系' },
      { value: 'ECharts', label: '数据大屏' }
    ]
  },
  {
    name: '智能盲杖辅助导航系统',
    category: 'AI + IoT · 无障碍',
    description: '融合 AI、高德地图、百度语音技术的视障辅助出行系统',
    detail: '提供 GPS 实时定位、电子围栏、轨迹回放、AI 语音助手、路径导航和紧急求助功能，基于 uni-app 一套代码适配 H5 和微信小程序。',
    icon: '🦯',
    gradient: 'linear-gradient(135deg, #8b5cf633, #a78bfa33)',
    tech: ['Spring Boot', 'AI 大模型', '高德地图', '百度语音', 'Vue 3', 'TypeScript', 'uni-app'],
    features: [
      'GPS 实时定位与轨迹回放',
      '电子围栏安全区域监控',
      'AI 智能语音对话交互',
      '无障碍路径导航',
      '一键 SOS 紧急求助'
    ],
    highlights: [
      { value: 'AI', label: '语音交互' },
      { value: '跨端', label: 'H5 + 小程序' },
      { value: 'LBS', label: '位置服务' }
    ]
  }
]
</script>

<style scoped>
.projects-hero {
  padding: 80px 0 40px;
  position: relative;
}

.projects-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 50% 80% at 50% 0%, var(--accent-glow) 0%, transparent 70%);
  pointer-events: none;
}

.projects-hero .container {
  position: relative;
}

.projects-hero-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.projects-hero-desc {
  font-size: 18px;
  color: var(--text-muted);
  max-width: 600px;
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.project-item {
  display: flex;
  gap: 32px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 36px;
  transition: all var(--transition);
}

.project-item:hover {
  border-color: var(--border-light);
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.project-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.project-index {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.project-icon {
  width: 64px;
  height: 64px;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.project-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.project-name {
  font-size: 22px;
  font-weight: 600;
}

.project-category {
  font-size: 12px;
  color: var(--accent);
  font-weight: 500;
  letter-spacing: 1px;
}

.project-desc {
  font-size: 15px;
  color: var(--text-secondary);
  font-weight: 500;
}

.project-detail {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.7;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.project-features {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
  margin-top: 8px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-secondary);
}

.project-highlights {
  display: flex;
  gap: 24px;
  padding-top: 16px;
  margin-top: 8px;
  border-top: 1px solid var(--border);
}

.highlight {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.highlight-value {
  font-size: 20px;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--accent-light);
}

.highlight-label {
  font-size: 12px;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .projects-hero-title {
    font-size: 32px;
  }

  .project-item {
    flex-direction: column;
    gap: 20px;
    padding: 24px;
  }

  .project-left {
    flex-direction: row;
  }

  .project-features {
    grid-template-columns: 1fr;
  }

  .project-highlights {
    flex-wrap: wrap;
  }
}
</style>
