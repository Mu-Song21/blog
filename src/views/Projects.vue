<template>
  <div class="projects-page">
    <section class="projects-hero">
      <div class="container">
        <div class="section-label reveal">PROJECTS</div>
        <h1 class="projects-hero-title reveal reveal-delay-1">项目展示</h1>
        <p class="projects-hero-desc reveal reveal-delay-2">围绕 Java 后端、物联网通信、家庭健康管理、AI 算法与车载安全监测场景，记录从需求分析到系统落地的完整实践。</p>
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
    gradient: 'linear-gradient(135deg, #06b6d433, #0891b233)',
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
    gradient: 'linear-gradient(135deg, #f59e0b22, #d9770622)',
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
  },
  {
    name: '健康管家家庭康养管理平台',
    category: '企业应用 · 家庭健康',
    description: '面向家庭康养场景的前后端分离平台，子女 Web 端 + 父母小程序端双端协同',
    detail: '子女通过 Vue 3 Web 管理台关注父母健康，父母通过 uni-app 小程序完成日常打卡与语音录入。后端基于 Spring Boot 3 + MyBatis-Plus 构建，覆盖健康档案、健康记录（血压/血糖）、病例管理、用药提醒、AI 食谱生成、月度健康报告和 AI 健康助手等完整模块，文本 AI 走讯飞星火，语音 ASR/TTS 走百度智能云。',
    icon: '🏥',
    gradient: 'linear-gradient(135deg, #10b98133, #06b6d433)',
    tech: ['Spring Boot 3', 'MyBatis-Plus', 'JWT', 'Vue 3', 'uni-app', 'ECharts', '讯飞星火', '百度语音'],
    features: [
      '子女 Web 端 + 父母微信小程序双端，数据经 parentId 与家庭绑定统一汇聚',
      '健康档案驱动 AI：食谱生成、月度报告、AI 助手均基于真实档案与近期记录',
      '讯飞星火并发生成七日食谱（21 餐），支持异步 AI 任务轮询',
      '百度 ASR 语音录入血压/血糖，正则意图解析后自动写入健康记录',
      'SSE 流式输出 AI 健康助手，月度聚合分析生成健康评分与建议'
    ],
    highlights: [
      { value: '双端', label: '子女 + 父母' },
      { value: 'AI', label: '档案驱动' },
      { value: '语音', label: 'ASR 录入' }
    ]
  },
  {
    name: '智能车载疲劳驾驶监测装置',
    category: 'AI + IoT · 行车安全',
    description: '基于 MediaPipe + OpenCV + 树莓派的车载疲劳与分心驾驶实时监测系统',
    detail: '围绕行车安全场景，通过摄像头实时采集驾驶员面部图像，融合眼部闭合状态（EAR/PERCLOS）、哈欠检测、头部姿态（低头/侧脸）、持续驾驶时长等多维度指标进行综合疲劳评分，实现三级分级预警（提醒/预警/告警），支持声光报警、CSV 事件日志记录与 Web 实时可视化仪表盘，可部署至树莓派实现车载实时监测。',
    icon: '🚗',
    gradient: 'linear-gradient(135deg, #3b82f633, #f59e0b33)',
    tech: ['Python', 'MediaPipe', 'OpenCV', '树莓派', 'Flask', 'WebSocket', 'pyttsx3'],
    features: [
      '多维度融合疲劳判定：EAR 闭眼率、PERCLOS 滑动窗口、哈欠检测',
      '头部姿态分析：低头 / 侧脸分心角度实时检测',
      '个人自适应 EAR 基线校准，降低误报与漏报',
      '三级分级预警（提醒 / 预警 / 告警）+ 语音与声光联动',
      'Web 实时仪表盘：EAR / MAR / PERCLOS 可视化与告警事件日志'
    ],
    highlights: [
      { value: '三级', label: '分级预警' },
      { value: '多维', label: '融合判定' },
      { value: '自适应', label: '阈值校准' }
    ]
  },
  {
    name: '校园综合管理系统',
    category: '企业应用 · 校园教务',
    description: '基于 Spring Boot 3 + Vue 3 + JWT 的校园教务与学工一体化管理平台',
    detail: '面向高校教务与学工场景，实现学生、教师、管理员三种角色的统一登录与权限控制，支持学生信息、课程与选课、成绩、考勤、通知公告等核心模块，后端通过 JWT、方法级权限控制、统一异常处理和数据校验保证接口安全与稳定，前端基于 Vue 3 + Element Plus 实现角色差异化首页与数据可视化大屏。',
    icon: '🏫',
    gradient: 'linear-gradient(135deg, #6366f133, #0ea5e933)',
    tech: ['Spring Boot 3', 'Spring Security', 'JWT', 'MyBatis-Plus', 'MySQL 8', 'Vue 3', 'Element Plus', 'ECharts'],
    features: [
      '基于 JWT 的多角色登录与权限控制（ADMIN / TEACHER / STUDENT）',
      '学生、课程、选课、成绩、考勤、通知公告等教务与学工模块',
      '方法级 @PreAuthorize 权限、统一业务异常 BizException 与全局异常处理',
      '学生表单前后端双重校验，手机号/邮箱等关键字段格式约束',
      'Dashboard 大屏展示角色差异化首页与多维度统计图表'
    ],
    highlights: [
      { value: '3', label: '用户角色' },
      { value: '可视化', label: '数据大屏' },
      { value: '校验', label: '异常处理' }
    ]
  }
]
</script>

<style scoped>
.projects-hero {
  padding: 100px 0 48px;
  position: relative;
}

.projects-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 50% 80% at 50% 0%, rgba(245, 158, 11, 0.06) 0%, transparent 70%);
  pointer-events: none;
}

.projects-hero .container {
  position: relative;
}

.projects-hero-title {
  font-size: 52px;
  font-weight: 400;
  font-family: var(--font-display);
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.projects-hero-desc {
  font-size: 17px;
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
  padding: 40px;
  transition: all var(--transition);
}

.project-item:hover {
  border-color: var(--border-light);
  box-shadow: var(--shadow);
  transform: translateY(-3px);
}

.project-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.project-index {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  font-family: var(--font-mono);
  letter-spacing: 2px;
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
  gap: 14px;
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.project-name {
  font-size: 24px;
  font-weight: 400;
  font-family: var(--font-display);
}

.project-category {
  font-size: 11px;
  color: var(--accent);
  font-weight: 500;
  letter-spacing: 2px;
  font-family: var(--font-mono);
  text-transform: uppercase;
}

.project-desc {
  font-size: 15px;
  color: var(--text-secondary);
  font-weight: 500;
}

.project-detail {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.8;
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
  gap: 32px;
  padding-top: 20px;
  margin-top: 8px;
  border-top: 1px solid var(--border);
}

.highlight {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.highlight-value {
  font-size: 20px;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--accent-light);
}

.highlight-label {
  font-size: 11px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .projects-hero-title {
    font-size: 36px;
  }

  .project-item {
    flex-direction: column;
    gap: 20px;
    padding: 28px;
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
