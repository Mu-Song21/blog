<template>
  <div class="projects-page">
    <section class="projects-hero">
      <div class="container">
        <div class="section-label reveal">PROJECTS</div>
        <h1 class="projects-hero-title reveal reveal-delay-1">项目展示</h1>
        <p class="projects-hero-desc reveal reveal-delay-2">围绕 Java 后端、物联网通信、实时告警和智慧民生场景，记录从需求分析到系统落地的完整实践。</p>
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
    description: '基于 Spring Boot + Redis + WebSocket + MQTT 构建的智慧养老监护系统',
    detail: '围绕独居老人居家安全场景，实现老人档案、设备管理、心跳检测、异常告警、告警闭环、通知中心和数据看板等能力，后端负责设备数据接入、状态分析、告警生成和实时推送。',
    icon: '🛡️',
    gradient: 'linear-gradient(135deg, #f59e0b33, #f9731633)',
    tech: ['Spring Boot', 'JPA', 'MySQL', 'Redis', 'MQTT', 'WebSocket', 'Vue 3'],
    features: [
      '老人、设备、告警和通知中心分层接口设计',
      '设备心跳检测与离线告警生成',
      '告警处理闭环、处理记录和通知家属流程',
      'Redis 缓存异常状态与 Dashboard 统计数据',
      'WebSocket 实时推送告警和统计刷新'
    ],
    highlights: [
      { value: '闭环', label: '告警处理' },
      { value: '实时', label: '数据推送' },
      { value: '缓存', label: '统计优化' }
    ]
  },
  {
    name: '安隅智能社区管理平台',
    category: '企业应用 · 智慧社区',
    description: '基于若依框架二次开发的智慧社区综合管理平台',
    detail: '围绕物业数字化管理场景，扩展社区、房屋、费用、预约、投诉、访客、公告等业务模块，后端基于若依多模块架构完成权限控制、分页查询、数据维护和 Excel 导出等通用后台能力。',
    icon: '🏘️',
    gradient: 'linear-gradient(135deg, #3b82f633, #6366f133)',
    tech: ['若依框架', 'Spring Boot', 'Spring Security', 'JWT', 'Redis', 'MyBatis-Plus', 'Quartz'],
    features: [
      '若依多模块架构下的业务模块扩展',
      'Spring Security + JWT 认证鉴权',
      '角色、菜单和按钮级权限控制',
      'PageHelper 分页与多条件查询',
      'Quartz 定时任务与 POI 数据导出'
    ],
    highlights: [
      { value: '8+', label: '核心模块' },
      { value: 'RBAC', label: '权限体系' },
      { value: '多模块', label: '工程结构' }
    ]
  },
  {
    name: '智能盲杖辅助导航系统',
    category: 'AI + IoT · 无障碍',
    description: '面向视障人士的智能盲杖设备管理与安全预警系统',
    detail: '系统通过智能盲杖上报障碍物距离、三轴加速度、GPS、温湿度和电量等数据，后端完成传感器数据存储、跌倒判断、电子围栏越界判断、轨迹回放和告警推送，支撑管理后台和小程序端协同使用。',
    icon: '🦯',
    gradient: 'linear-gradient(135deg, #8b5cf633, #a78bfa33)',
    tech: ['Spring Boot', 'MyBatis', 'MySQL', 'WebSocket', 'GPS', '高德地图', 'uni-app'],
    features: [
      '传感器数据上报、存储和最新数据查询',
      '基于三轴加速度的跌倒置信度计算',
      'GPS 轨迹回放与电子围栏越界判断',
      'WebSocket 推送告警、围栏状态和 AI 唤醒事件',
      '设备测试模拟与多端数据联调'
    ],
    highlights: [
      { value: 'IoT', label: '硬件接入' },
      { value: 'LBS', label: '位置服务' },
      { value: '实时', label: '告警推送' }
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
