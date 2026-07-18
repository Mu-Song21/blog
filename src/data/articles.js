export const DEFAULT_ARTICLES = [
  {
    id: 1,
    title: '守望：独居老人非接触式居家主动守护系统实践',
    excerpt: 'Spring Boot 告警中枢 + Vue 监控大屏 + 微信小程序：WebSocket 实时推送、Redis 夜间离床状态机与告警闭环处置的物联网实践。',
    content: `## 项目背景

独居老人在家中发生离床过久、跌倒风险等情况时，往往难以及时被发现。本项目「守望」面向这一场景，构建一套**非接触式居家主动守护**方案：以后端为告警中枢，把设备上报、状态判断、实时推送和家属处置串成闭环。

## 技术架构

系统采用 **设备/模拟上报 → Spring Boot → MySQL / Redis → WebSocket 大屏 + 小程序** 的链路：

- **接入层**：HTTP 模拟告警、设备心跳；MQTT 订阅能力已预留（可开关接入）
- **服务层**：Spring Boot 3 + JPA 落库，Redis 维护老人异常状态与夜间离床状态
- **推送层**：WebSocket 向监控大屏广播告警与统计刷新
- **客户端**：Vue 3 运营大屏（主端）+ 微信小程序（家属轻端）

## 核心功能

### 告警全链路
告警写入 MySQL 后，同步更新 Redis 异常标记，并通过 WebSocket 推送 \`ALARM\` / \`STATS\`，大屏无需轮询即可刷新。

### 夜间离床状态机
在夜间时段维护 Redis 状态：离床超过阈值触发预警；若门磁未开则升级为潜在风险紧急告警，体现「规则 + 状态」而非一次性阈值判断。

### 设备在线守护
设备心跳上报结合定时离线检测，自动生成设备离线告警，保证感知链路可观测。

### 告警闭环处置
支持处理人、处理结果、是否通知家属等字段；通知以系统内通知记录沉淀，便于演示处置闭环与耗时统计。

## 技术亮点

- Redis 状态机驱动的夜间离床与风险升级
- WebSocket 告警与 Dashboard 统计联动刷新
- 三端协同：API、Vue 监控大屏、微信小程序
- MQTT 可插拔接入，便于后续对接真实设备网关

## 项目收获

这个项目让我把「上报 → 判断 → 推送 → 处置」真正跑通，也更清楚物联网后台的核心不是堆传感器名词，而是把状态、告警和人的处理动作设计清楚。`,
    tags: ['Spring Boot', 'Redis', 'WebSocket', 'JPA', '微信小程序', 'Vue 3'],
    category: '物联网',
    createdAt: '2025-12-15',
    updatedAt: '2026-07-18',
    featured: true,
    status: 'published'
  },
  {
    id: 2,
    title: '安隅：基于若依 RuoYi-Vue 的智慧社区后台扩展',
    excerpt: '以 RuoYi 3.9.1（Spring Boot 4 + Vue 2）为基座，扩展投诉、缴费账单、访客邀请、公告等社区业务模块，沉淀多模块 CRUD 与权限体系实践。',
    content: `## 项目背景

物业数字化常需要大量台账类后台：投诉、缴费、访客、公告等。本作品集产品名「安隅」，工程基于开源若依快速搭建可扩展的社区管理后台。

## 技术选型

- 基座：若依 **RuoYi 3.9.1**（多模块 Maven）
- 后端：Spring Boot **4.x**、Spring Security、JWT、Redis、Quartz
- 持久层：MyBatis（框架默认）+ 部分模块引入 MyBatis-Plus；PageHelper 分页；POI 导出
- 前端：Vue **2.6** + Element UI + ECharts（\`ruoyi-ui\`）

> 说明：仓库默认页面标题仍是「若依管理系统」；「安隅」是对外作品集命名。

## 我做了什么（业务扩展）

在若依标准系统模块之外，按业务拆出多个 Maven 子模块 / Controller 包，例如：

- **投诉工单**：列表、详情、增删改、Excel 导出
- **缴费账单**：物业/水/电等账单台账维护（状态、金额字段）
- **访客邀请**：业主邀请访客记录，含邀请码、楼栋单元房间与到访状态
- **公告通知**：公告发布与已读记录
- **预约 / 驿站 / 外卖等**：同类 CRUD 扩展，用于社区服务场景演示

权限、登录、动态菜单、代码生成器等能力主要复用若依框架，二次开发重点在**业务域建模与模块落地**。

## 需要诚实界定的边界

- **不是**完整第三方「在线支付网关」：缴费模块侧重账单与支付记录台账
- **不是**已对接真实门禁的「临时二维码通行」：访客能力以邀请码/台账为主
- 部分前端目录命名（如 \`test\` / \`test01\`）与 \`community\` / \`smartcommunity\` 并存，体现迭代痕迹；作品集应强调可演示的主流程，而非宣称每个接口都已产品化打磨

## 项目收获

把企业级后台的真实工作方式跑通一遍：在成熟脚手架上做多模块扩展、权限菜单配置、分页导出与业务表设计。对后续若依/后台类实习项目，迁移成本会低很多。`,
    tags: ['若依', 'RuoYi', 'Spring Boot 4', 'Vue 2', 'Element UI', 'MyBatis', '社区管理'],
    category: '企业应用',
    createdAt: '2025-11-20',
    updatedAt: '2026-07-18',
    featured: true,
    status: 'published'
  },
  {
    id: 3,
    title: '引路 · 慧杖护行：从 ESP32 盲杖到 AI 语音助手',
    excerpt: 'ESP32 感知上报 + Spring Boot 跌倒/圆形围栏判断 + WebSocket 推送；Vue 管理端与 uni-app 小程序协同，明眼助手接入 DeepSeek 与百度语音。',
    content: `## 项目背景

传统盲杖只能近距离探测障碍，家属难以掌握出行位置与突发风险。作品「慧杖护行」（博客产品名：引路）以智能盲杖为感知端，把**避障、跌倒检测、位置守护与 AI 语音陪伴**接到同一条云端链路里。

## 系统架构

\`\`\`
ESP32 ──HTTPS──► Spring Boot（MyBatis / MySQL）
                    ├─ 跌倒置信度 / 圆形围栏越界
                    └─ WebSocket ──► Vue 管理端 / uni-app 小程序
小程序 / 按键唤醒 ──► DeepSeek 对话 + 百度 STT/TTS（明眼助手）
\`\`\`

### 后端
- Spring Boot 3.3 + MyBatis + MySQL
- WebSocket 推送告警、围栏、AI 唤醒等事件
- 高德逆地理与管理端地图展示；圆形围栏 Haversine 越界判断

### 客户端与硬件
- Vue 3 管理端：设备、监控、围栏、轨迹回放
- uni-app 微信小程序：监护、告警、明眼助手
- ESP32 固件：超声波避障、MPU6050 跌倒状态机、GPS、SOS

## 核心功能

### 感知与上报
盲杖经 HTTPS 上报障碍物距离、三轴加速度、GPS 等数据；支持设备测试模拟，便于联调与演示。

### 跌倒与围栏
后端结合加速度幅值做跌倒置信度判断；电子围栏以**圆心 + 半径**持久化，越界边沿触发告警并推送。

### 位置与轨迹
管理端基于高德地图做监控与轨迹回放；小程序侧可查看位置与告警，完成家属监护闭环。

### 明眼助手
DeepSeek 带设备/位置上下文的对话，百度语音 STT/TTS；盲杖按键可触发 AI 唤醒事件推到小程序。

### 紧急与协同
SOS 上报、家属安抚/目的地文本经 WebSocket 协同；路口辅助由 OpenCV 演示脚本上报识别结果（演示级）。

## 技术亮点

- 真实硬件固件与云端业务闭环，而不只是后台 CRUD
- 圆形围栏越界检测 + WebSocket 实时推送
- AI 语音助手与设备按键唤醒串联
- 管理端 / 小程序 / 硬件三端分工清晰

## 说明

本项目不做完整 turn-by-turn 路径导航，也不依赖 MQTT/Redis；位置能力侧重**监护、围栏与轨迹**，AI 侧重**语音问答与陪伴**。

## 项目收获

把硬件上报、规则判断和家属侧体验串起来之后，更理解「无障碍」不是堆功能名词，而是让风险可被看见、可被响应。`,
    tags: ['Spring Boot', 'ESP32', 'WebSocket', 'DeepSeek', '百度语音', 'uni-app', '高德地图'],
    category: 'AI + IoT',
    createdAt: '2026-02-10',
    updatedAt: '2026-07-18',
    featured: true,
    status: 'published'
  },
  {
    id: 6,
    title: 'Vue 3 Composition API 实战：从 Options API 到思维升级',
    excerpt: '深入理解 Vue 3 Composition API 的设计哲学，通过实际案例对比 Options API 与 Composition API 的差异，掌握 setup、ref、reactive、computed、watch 的最佳实践。',
    content: `## 为什么要用 Composition API

Vue 2 的 Options API（data、methods、computed、watch）在小型组件中非常直观，但当组件逻辑变得复杂时，同一个功能的代码被分散在不同选项中，维护成本急剧上升。

Composition API 的核心优势：

- **逻辑复用**：通过 composable 函数（而非 mixins）实现逻辑复用，避免命名冲突和来源不清晰
- **类型推导**：原生 TypeScript 支持更好，ref 和 reactive 的类型推导自然流畅
- **代码组织**：相关逻辑聚合在一起，而非按选项类型分散

## 核心 API 实战

### ref vs reactive 的选择

\`\`\`javascript
import { ref, reactive } from 'vue'

const count = ref(0)
count.value++

const state = reactive({
  name: '目送',
  skills: ['Vue', 'Spring Boot']
})
state.skills.push('MQTT')
\`\`\`

**实践建议**：

- 基本类型用 \`ref\`，对象类型用 \`reactive\`
- 从 composable 返回值时优先用 \`ref\`，因为解构不会丢失响应性
- 模板中 ref 自动解包，script 中需要 \`.value\`

### 自定义 Composable 函数

\`\`\`javascript
// composables/useFetch.js
import { ref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)

  watchEffect(async () => {
    loading.value = true
    try {
      const res = await fetch(url.value)
      data.value = await res.json()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  })

  return { data, loading, error }
}
\`\`\`

这个模式在博客项目中被大量使用，比如获取文章列表、项目数据等场景。

### watch 与 watchEffect 的区别

\`\`\`javascript
// watch：明确指定依赖，惰性执行
watch(source, (newVal, oldVal) => {
  console.log('数据变化:', oldVal, '->', newVal)
}, { deep: true })

// watchEffect：自动追踪依赖，立即执行
watchEffect(() => {
  console.log('当前搜索:', searchQuery.value)
  fetchResults(searchQuery.value)
})
\`\`\`

**选择原则**：

- 需要旧值或精确控制 → \`watch\`
- 自动追踪、副作用执行 → \`watchEffect\`

## 实际项目中的模式

### 全局状态管理（Pinia）

\`\`\`javascript
export const useBlogStore = defineStore('blog', () => {
  const articles = ref([])
  const loading = ref(false)

  const publishedArticles = computed(() =>
    articles.value.filter(a => a.status === 'published')
  )

  async function fetchArticles() {
    loading.value = true
    const { data } = await api.get('/articles')
    articles.value = data
    loading.value = false
  }

  return { articles, publishedArticles, fetchArticles }
})
\`\`\`

Pinia + Composition API 的组合让状态管理变得清晰而强大。

## 总结

Composition API 不是银弹，但它确实解决了 Options API 在复杂组件中的痛点。关键在于：逻辑聚合、类型安全、灵活复用。`,
    tags: ['Vue 3', 'Composition API', 'JavaScript', '前端'],
    category: '前端',
    createdAt: '2026-03-05',
    updatedAt: '2026-03-05',
    featured: false,
    status: 'published'
  },
  {
    id: 7,
    title: 'MQTT 协议深度解析：物联网消息通信的基石',
    excerpt: '从协议原理到 Spring Boot 集成实战，深入理解 MQTT 的 QoS 机制、遗嘱消息、保留消息等核心概念，构建可靠的 IoT 设备通信架构。',
    content: `## 什么是 MQTT

MQTT（Message Queuing Telemetry Transport）是一种轻量级的发布/订阅模式消息协议，专为低带宽、高延迟、不可靠的网络环境设计。它是物联网通信的事实标准。

**核心特点**：

- 极小的协议开销（最小仅 2 字节）
- 支持三种 QoS 等级
- 发布/订阅模式，解耦生产者和消费者
- 支持遗嘱消息（Last Will）和保留消息（Retained）

## QoS 机制详解

\`\`\`
QoS 0 - 最多一次：发送即忘，可能丢失
QoS 1 - 至少一次：确保到达，可能重复
QoS 2 - 恰好一次：四次握手，最可靠但最慢
\`\`\`

在智慧养老场景中，关键告警消息必须使用 QoS 1 或 QoS 2，而普通状态上报使用 QoS 0 即可。

## Spring Boot 集成实战

### 引入依赖

\`\`\`xml
<dependency>
    <groupId>org.springframework.integration</groupId>
    <artifactId>spring-integration-mqtt</artifactId>
</dependency>
\`\`\`

### MQTT 配置类

\`\`\`java
@Configuration
public class MqttConfig {

    @Value("\${mqtt.broker}")
    private String broker;

    @Value("\${mqtt.client-id}")
    private String clientId;

    @Bean
    public MqttPahoClientFactory mqttClientFactory() {
        DefaultMqttPahoClientFactory factory = new DefaultMqttPahoClientFactory();
        factory.setServerURIs(broker);
        factory.setConnectionTimeout(10);
        factory.setKeepAliveInterval(30);
        factory.setMaxInflight(100);
        return factory;
    }

    @Bean
    public MessageChannel mqttInputChannel() {
        return new DirectChannel();
    }

    @Bean
    public MessageProducer inbound() {
        MqttPahoMessageDrivenChannelAdapter adapter =
            new MqttPahoMessageDrivenChannelAdapter(
                clientId + "-inbound",
                mqttClientFactory(),
                "health/+/data", "alert/+/+"
            );
        adapter.setCompletionTimeout(5000);
        adapter.setQos(1);
        adapter.setOutputChannel(mqttInputChannel());
        return adapter;
    }
}
\`\`\`

### 消息处理器

\`\`\`java
@ServiceActivator(inputChannel = "mqttInputChannel")
public void handleMessage(Message<?> message) {
    String topic = (String) message.getHeaders().get("mqtt_receivedTopic");
    String payload = (String) message.getPayload();

    if (topic.startsWith("alert/")) {
        alertService.processAlert(topic, payload);
    } else {
        healthService.recordData(topic, payload);
    }
}
\`\`\`

## 遗嘱消息的应用

遗嘱消息（Last Will）是 MQTT 的独特机制：设备在连接时预先设置一条消息，当设备异常断线时，Broker 自动将这条消息发送给订阅者。

在养老场景中，这可以用来实现设备掉线告警——当传感器突然离线，系统立即通知家属和社区工作人员。

## 最佳实践

- **Topic 设计**：层级清晰，如 \`{类型}/{设备ID}/{数据类型}\`
- **心跳保活**：合理设置 KeepAlive，一般 60-120 秒
- **重连机制**：指数退避重连，避免风暴
- **消息持久化**：关键消息存入数据库，保留消息用于设备状态查询
- **安全认证**：使用 TLS + 用户名密码或证书认证

## 总结

MQTT 的轻量和可靠使它成为 IoT 通信的首选协议。理解其 QoS 机制和遗嘱消息，是构建健壮物联网系统的基础。`,
    tags: ['MQTT', 'Spring Boot', '物联网', 'Java', 'IoT'],
    category: '物联网',
    createdAt: '2026-04-02',
    updatedAt: '2026-04-02',
    featured: false,
    status: 'published'
  },
  {
    id: 8,
    title: '前端性能优化实战：让你的 Vue 应用飞起来',
    excerpt: '从路由懒加载、组件按需引入、虚拟列表、图片懒加载到构建产物分析，系统梳理 Vue 3 项目的性能优化策略与可量化的优化效果。',
    content: `## 性能优化的意义

在真实项目中，首屏加载时间直接影响用户留存率。Google 的研究表明，页面加载时间每增加 1 秒，转化率下降 7%。

## 路由懒加载

最简单也最有效的优化——将路由组件改为动态 import：

\`\`\`javascript
const routes = [
  {
    path: '/blog',
    component: () => import('../views/BlogList.vue')
  },
  {
    path: '/blog/:id',
    component: () => import('../views/BlogDetail.vue')
  }
]
\`\`\`

配合 Vite 的 code splitting，每个页面成为独立 chunk，首屏只加载当前页面所需的代码。

## 组件按需引入

避免在一个文件中引入所有组件，而是按需加载：

\`\`\`javascript
import { defineAsyncComponent } from 'vue'

const HeavyChart = defineAsyncComponent(() =>
  import('./components/HeavyChart.vue')
)
\`\`\`

对于像 Markdown 渲染器、图表库这类较重的依赖，按需加载可以显著减少初始包体积。

## 虚拟列表

当列表项超过 100 个时，虚拟列表是必须的优化：

\`\`\`javascript
// 核心思路：只渲染可视区域内的元素
function useVirtualList(items, itemHeight, containerHeight) {
  const scrollTop = ref(0)
  const visibleCount = Math.ceil(containerHeight / itemHeight)

  const visibleItems = computed(() => {
    const start = Math.floor(scrollTop.value / itemHeight)
    const end = start + visibleCount + 1
    return items.value.slice(start, end).map((item, i) => ({
      ...item,
      _offset: (start + i) * itemHeight
    }))
  })

  const totalHeight = computed(() => items.value.length * itemHeight)

  return { visibleItems, totalHeight, scrollTop }
}
\`\`\`

## 图片懒加载

使用 IntersectionObserver 实现图片懒加载：

\`\`\`javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      observer.unobserve(img)
    }
  })
}, { rootMargin: '200px' })

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img)
})
\`\`\`

## 构建产物分析

使用 Vite 的 rollup-plugin-visualizer 分析打包体积：

\`\`\`javascript
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true,
      filename: 'stats.html'
    })
  ]
})
\`\`\`

通过分析报告，你可以清楚看到哪些依赖占用了最多体积，从而有针对性地优化。

## 其他优化手段

- **Tree Shaking**：确保使用 ESM 格式的依赖
- **CDN 加速**：将大依赖（如 highlight.js）通过 CDN 引入
- **字体优化**：使用 \`font-display: swap\` 避免字体加载阻塞
- **CSS 精简**：使用 PurgeCSS 移除未使用的 CSS
- **预加载关键资源**：\`<link rel="preload">\`

## 量化效果

在博客项目中应用上述优化后：

- 首屏 JS 体积从 320KB 降至 85KB（gzip 后）
- 首屏加载时间从 2.1s 降至 0.8s
- Lighthouse Performance 评分从 62 提升到 95

## 总结

性能优化不是一次性工作，而是持续的过程。从路由懒加载开始，逐步引入更多优化手段，每一步都能看到可量化的提升。`,
    tags: ['Vue 3', '性能优化', 'Vite', 'JavaScript', '前端'],
    category: '前端',
    createdAt: '2026-04-28',
    updatedAt: '2026-04-28',
    featured: false,
    status: 'published'
  },
  {
    id: 9,
    title: 'Spring Boot 如何接入 MQTT 实现设备数据上报',
    excerpt: '结合智能盲杖和智慧养老项目，梳理 Spring Boot 接入 MQTT 的完整流程：Topic 设计、消息订阅、JSON 解析、数据入库和设备指令下发。',
    content: `## 为什么选择 MQTT

在智能盲杖、独居老人守护这类物联网项目中，设备端通常存在网络不稳定、数据包小、上报频率高等特点。相比 HTTP 轮询，MQTT 更适合设备数据上报，因为它具备轻量、低功耗、发布订阅解耦和消息可靠性控制等优势。

## 通信架构

系统整体链路可以设计为：

- 设备端发布传感器数据到 \`cane/{deviceId}/data\`
- Spring Boot 后端订阅 \`cane/+/data\`
- 后端解析 JSON 数据并保存到数据库
- 后端根据数据判断跌倒、越界、低电量等异常
- 后端通过 \`cane/{deviceId}/command\` 下发蜂鸣、震动、语音播报等指令

## Topic 设计

| Topic | 方向 | 说明 |
| --- | --- | --- |
| \`cane/{deviceId}/data\` | 设备到后端 | 传感器数据上报 |
| \`cane/{deviceId}/command\` | 后端到设备 | 控制指令下发 |
| \`cane/{deviceId}/ack\` | 设备到后端 | 指令执行结果回执 |

这种设计的好处是层级清晰，后端可以通过 \`+\` 通配符订阅所有设备数据，也可以精确向某一台设备下发指令。

## 后端处理流程

Spring Boot 订阅到 MQTT 消息后，核心流程一般是：

1. 获取消息 Topic 和 Payload
2. 根据 Topic 判断消息类型
3. 使用 Jackson 将 JSON 转成实体对象
4. 调用业务 Service 复用原有处理逻辑
5. 记录日志并处理异常消息

\`\`\`java
public void handleMessage(String topic, String payload) {
    if (topic.endsWith("/data")) {
        SensorData data = objectMapper.readValue(payload, SensorData.class);
        sensorDataService.addSensorData(data);
    }
}
\`\`\`

## 数据上报示例

\`\`\`json
{
  "deviceId": "ESP32_001",
  "obstacleDistance": 0.8,
  "accelX": 0.12,
  "accelY": 0.34,
  "accelZ": 1.85,
  "latitude": 30.2741,
  "longitude": 120.1551,
  "temperature": 26.5,
  "humidity": 61.2,
  "dataTime": "2026-05-10 20:00:00"
}
\`\`\`

## 可靠性设计

在真实项目中，需要重点关注：

- 关键告警数据使用 QoS 1，避免消息丢失
- 设备端增加重连机制，网络断开后自动恢复
- 后端对重复消息做幂等处理，避免重复生成告警
- 使用遗嘱消息感知设备异常离线
- 对解析失败的消息记录日志，便于排查硬件端格式问题

## 总结

MQTT 接入的核心不是单纯“收到消息”，而是让设备数据进入后端现有业务闭环。对于智能盲杖和智慧养老系统来说，MQTT 负责设备通信，Spring Boot 负责业务判断，WebSocket 负责实时展示，三者组合才能形成完整的物联网应用链路。`,
    tags: ['Spring Boot', 'MQTT', '物联网', '设备上报', 'Java'],
    category: '物联网',
    createdAt: '2026-05-10',
    updatedAt: '2026-05-10',
    featured: true,
    status: 'published'
  },
  {
    id: 10,
    title: 'WebSocket 实现实时告警推送',
    excerpt: '从告警生成到前端实时刷新，记录 Spring Boot + WebSocket 在智慧养老和智能硬件项目中的实践方案。',
    content: `## 为什么需要 WebSocket

在告警系统中，用户最关心的是“异常发生后能不能马上看到”。如果前端只依赖定时轮询，告警延迟取决于轮询间隔，既浪费资源，也不够实时。

WebSocket 可以在浏览器和后端之间建立长连接，后端一旦生成告警，就可以主动推送给前端管理后台或家属端。

## 典型业务场景

在智慧养老项目中，实时推送主要用于：

- 新告警生成后推送到告警管理页
- Dashboard 统计卡片自动刷新
- 设备离线、跌倒、长时间无活动等异常提醒
- 告警处理后同步更新状态，避免前端出现重复数据

## 后端推送流程

完整链路如下：

1. 设备数据进入后端
2. Service 判断是否异常
3. 生成 Alarm 告警记录
4. 保存数据库
5. 调用 WebSocket 推送方法
6. 前端收到消息后更新页面状态

\`\`\`java
public void broadcastAlarm(Alarm alarm) {
    Map<String, Object> message = new HashMap<>();
    message.put("type", "ALARM");
    message.put("alarm", alarm);
    message.put("timestamp", System.currentTimeMillis());
    sessions.forEach(session -> sendMessage(session, message));
}
\`\`\`

## 消息格式设计

建议所有 WebSocket 消息都带上 \`type\` 字段：

\`\`\`json
{
  "type": "ALARM",
  "alarm": {
    "id": 1001,
    "alarmType": "跌倒报警",
    "status": "UNHANDLED"
  },
  "timestamp": 1715320000000
}
\`\`\`

这样前端可以根据不同类型分发处理：

- \`ALARM\`：新增或更新告警
- \`STATS\`：刷新统计数据
- \`DEVICE_STATUS\`：更新设备在线状态
- \`NOTIFICATION\`：刷新通知中心

## 前端处理建议

前端不要简单地把收到的告警直接 push 到数组里，否则处理状态变化时容易出现重复。更好的做法是：

- 如果列表中已有同 ID 告警，则更新
- 如果没有，则插入到列表顶部
- Dashboard 统计数据使用后端推送的最新值覆盖

## 心跳与断线重连

WebSocket 项目一定要考虑连接稳定性：

- 前端定时发送心跳或监听连接状态
- 断开后延迟重连，避免频繁重试
- 后端关闭无效 Session，避免内存泄漏
- 页面刷新或退出时主动关闭连接

## 总结

WebSocket 的价值在于把“被动刷新”变成“主动推送”。对于智慧养老和智能盲杖项目来说，它让告警、设备状态和统计数据具备实时性，是管理后台体验提升最明显的一环。`,
    tags: ['WebSocket', 'Spring Boot', '实时告警', '智慧养老', 'Vue'],
    category: 'Java 后端',
    createdAt: '2026-05-09',
    updatedAt: '2026-05-09',
    featured: true,
    status: 'published'
  },
  {
    id: 11,
    title: 'Redis 在智慧养老 Dashboard 中的缓存实践',
    excerpt: '结合老人异常状态、设备在线状态和数据看板统计，说明 Redis 在智慧养老后台中的缓存设计和失效策略。',
    content: `## Dashboard 为什么需要缓存

智慧养老 Dashboard 通常会展示在线设备数、今日告警数、待处理告警数、异常老人数量、今日已处理数量、平均处理时长等指标。这些数据如果每次都直接从数据库聚合查询，会带来较高压力。

Redis 的作用是把高频读取、变化可控的数据缓存起来，让大屏响应更快。

## 适合缓存的数据

在智慧养老项目中，常见缓存对象包括：

- 老人当前异常状态
- 设备在线/离线状态
- Dashboard 统计数据
- 最近告警摘要
- 通知中心未读数量

这些数据有一个共同特点：读取频率高，并且可以在关键业务操作后主动更新或失效。

## 缓存 Key 设计

Key 设计要做到语义清晰、方便定位：

\`\`\`
elder:abnormal:{elderId}
device:status:{deviceId}
dashboard:stats
alarm:latest:{deviceId}
notification:unread:count
\`\`\`

业务越复杂，Key 命名越重要。清晰的 Key 可以减少后期排查成本。

## Dashboard 缓存流程

典型流程如下：

1. 前端请求 Dashboard 数据
2. 后端先查询 Redis
3. Redis 命中则直接返回
4. Redis 未命中则查询数据库统计
5. 将统计结果写入 Redis
6. 返回前端

## 缓存失效策略

对于告警系统，不能只依赖固定过期时间。因为告警生成和告警处理都会影响统计结果，所以要在关键操作后主动删除缓存：

- 新告警生成后删除 \`dashboard:stats\`
- 告警处理后删除 \`dashboard:stats\`
- 设备状态变化后删除相关设备统计缓存
- 通知已读后删除未读数量缓存

这种方式可以保证数据不会长时间不一致。

## 注意缓存一致性

缓存不是数据库的替代品。我的实践原则是：

- 数据库保存最终事实
- Redis 保存当前状态和统计快照
- 写操作先落库，再更新或删除缓存
- 对实时性要求高的数据通过 WebSocket 主动推送前端

## 总结

Redis 在智慧养老系统中最适合承担“状态缓存”和“统计加速”的角色。它能显著提升 Dashboard 响应速度，但必须配合合理的 Key 设计和主动失效策略，才能兼顾性能和数据准确性。`,
    tags: ['Redis', 'Dashboard', '缓存', 'Spring Boot', '智慧养老'],
    category: 'Java 后端',
    createdAt: '2026-05-08',
    updatedAt: '2026-05-08',
    featured: true,
    status: 'published'
  },
  {
    id: 12,
    title: '基于三轴加速度的跌倒检测思路',
    excerpt: '从智能盲杖传感器数据出发，介绍如何利用 accelX、accelY、accelZ 计算合加速度和跌倒置信度。',
    content: `## 跌倒检测的基本思路

智能盲杖或穿戴设备通常可以采集三轴加速度：

- \`accelX\`
- \`accelY\`
- \`accelZ\`

当使用者正常行走时，合加速度通常围绕重力加速度附近波动；当发生跌倒、撞击或剧烈晃动时，三轴加速度会出现明显突变。

## 合加速度计算

可以先计算三轴合加速度：

\`\`\`java
double magnitude = Math.sqrt(
    accelX * accelX +
    accelY * accelY +
    accelZ * accelZ
);
\`\`\`

如果数据单位已经归一化到 g，则正常静止状态大约接近 1.0。跌倒时可能出现两个阶段：

- 瞬间失重：合加速度明显低于正常值
- 撞击地面：合加速度明显高于正常值

## 阈值判断

一个简单可用的规则是：

\`\`\`java
boolean fall = magnitude < 0.45 || magnitude > 2.35;
\`\`\`

这不是绝对准确的算法，但对于课程项目、原型系统和演示场景已经足够直观。

## 跌倒置信度

为了让前端展示更友好，可以计算一个置信度：

\`\`\`java
double deviation = Math.abs(magnitude - 1.0);
double confidence = clamp((deviation - 0.35) / 1.35, 0.0, 1.0);
\`\`\`

置信度越高，说明当前运动状态越偏离正常状态。

## 避免误报

实际项目中，仅凭一次加速度突变容易误报。可以加入更多条件：

- 连续多次数据异常才触发
- 结合 GPS 判断是否长时间静止
- 结合用户主动取消告警机制
- 结合设备姿态变化持续时间
- 结合历史行为数据动态调整阈值

## 后端处理流程

在智能盲杖项目中，后端处理流程可以设计为：

1. 接收设备上传的三轴加速度
2. 计算合加速度
3. 计算跌倒置信度
4. 判断是否触发跌倒状态
5. 生成告警记录
6. WebSocket 推送给管理后台和家属端

## 总结

三轴加速度跌倒检测的关键是找到“正常运动”和“异常冲击”之间的差异。简单阈值算法适合项目初版，后续可以结合时间窗口、姿态传感器和机器学习模型继续提高准确率。`,
    tags: ['三轴加速度', '跌倒检测', '智能盲杖', '算法', 'IoT'],
    category: '物联网',
    createdAt: '2026-05-07',
    updatedAt: '2026-05-07',
    featured: false,
    status: 'published'
  },
  {
    id: 13,
    title: '智能盲杖硬件与后端交互流程设计',
    excerpt: '梳理智能盲杖从传感器采集、数据上传、后端异常判断到硬件响应和家属端通知的完整交互链路。',
    content: `## 系统整体链路

智能盲杖项目不是单纯的后台管理系统，而是一个软硬件协同的物联网应用。硬件负责采集现实世界的数据，后端负责分析和处理，前端负责展示和告警。

整体流程可以概括为：

1. 硬件采集障碍物距离、三轴加速度、GPS、温湿度、电量等数据
2. 主控模块将数据封装为 JSON
3. 通过 HTTP 或 MQTT 上传到 Spring Boot 后端
4. 后端保存传感器数据
5. 后端进行跌倒、电子围栏、低电量、静止异常判断
6. 生成告警记录
7. WebSocket 推送到管理后台和小程序端
8. 后端向硬件返回或下发控制指令

## 硬件上报数据

硬件端可以周期性上传：

\`\`\`json
{
  "deviceId": "ESP32_001",
  "obstacleDistance": 0.6,
  "accelX": 0.1,
  "accelY": 0.2,
  "accelZ": 2.5,
  "latitude": 30.2741,
  "longitude": 120.1551,
  "temperature": 26.5,
  "humidity": 60.0
}
\`\`\`

后端通过这些字段判断不同风险。

## 后端异常判断

后端主要判断：

- \`obstacleDistance\` 过小：前方障碍物风险
- 三轴加速度异常：可能发生跌倒
- GPS 超出安全区域：电子围栏越界
- 电量过低：低电量提醒
- 长时间位置无变化：静止异常提醒

这些判断不一定都在硬件端完成。更推荐让硬件负责采集，后端负责规则判断，这样后续修改阈值和策略更方便。

## 响应给硬件

如果使用 HTTP 上传，后端可以在接口响应中返回控制字段：

\`\`\`json
{
  "status": "FALL_ALARM",
  "beep": true,
  "vibrate": true,
  "voiceText": "检测到跌倒，正在通知家属",
  "uploadInterval": 2000
}
\`\`\`

如果使用 MQTT，后端可以主动发布指令到：

\`\`\`
cane/{deviceId}/command
\`\`\`

硬件收到后执行蜂鸣、震动或语音播报，并通过 \`ack\` 主题返回执行结果。

## 为什么要做双向通信

单向上报只能让后端知道设备状态，而双向通信可以让平台控制设备：

- 远程蜂鸣寻找设备
- 异常时提高上传频率
- 触发本地震动提醒
- 下发语音播报内容
- 家属端远程发起关怀提示

## 总结

智能盲杖的核心是“硬件感知 + 后端判断 + 前端通知 + 硬件响应”。只有把这四个环节串起来，系统才不只是一个展示平台，而是真正具备安全辅助能力的智能硬件系统。`,
    tags: ['智能盲杖', '硬件交互', 'Spring Boot', 'MQTT', 'WebSocket'],
    category: '物联网',
    createdAt: '2026-05-06',
    updatedAt: '2026-05-06',
    featured: false,
    status: 'published'
  },
  {
    id: 14,
    title: '青衿 · 智慧校园：Spring Boot 3 + Vue 3 多角色教务后台',
    excerpt: '产品 UI 为「智慧校园」：Spring Boot 3.2 + Security/JWT + MyBatis-Plus + Vue 3，覆盖选课容量、成绩考勤与角色化 Dashboard。',
    content: `## 项目背景

传统校园教务能力常分散在多个系统。本项目（博客产品名「青衿」，界面品牌「智慧校园」）用前后端分离架构，搭一套覆盖管理员、教师、学生的教务学工后台。

## 技术选型

- 后端：Spring Boot **3.2.5**、Spring Security + JWT、MyBatis-Plus、MySQL
- 前端：Vue 3、Vite、Element Plus、Pinia、Axios、ECharts
- 其他：Jakarta Bean Validation、BizException + 全局异常处理

## 核心模块

### 1. 统一认证与角色权限

JWT 携带身份与角色（ADMIN / TEACHER / STUDENT），过滤器写入 SecurityContext，再用 \`@PreAuthorize\` 做方法级控制：

- 管理员：学生、教师、班级、课程等基础数据
- 教师：成绩、考勤维护与通知发布
- 学生：选课、查成绩与个人考勤

### 2. 教务业务闭环

- 学生 / 教师 / 班级信息管理与分页检索
- 课程与选课：容量控制、防重复选课、已满拦截（BizException）
- 成绩与多状态考勤（NORMAL、LATE、LEAVE 等）
- 通知公告：按角色定向（ALL / STUDENT / TEACHER）

### 3. 全局异常与校验

参数校验失败与业务异常统一成清晰返回，避免前端只看到模糊的 500。

### 4. 角色差异化 Dashboard

首页按角色切换指标卡片与图表文案。管理员看全校分布与热门课程；学生看个人成绩分布与考勤趋势；教师侧部分图表目前仍为全局示意，后续可按授课维度细化。

## 项目收获

把 Spring Security + JWT + MyBatis-Plus + Vue 路由守卫这条企业后台主链路完整跑通，为后续后台类项目打下基础。`,
    tags: ['Spring Boot 3', 'Spring Security', 'JWT', 'MyBatis-Plus', 'Vue 3', '智慧校园', 'ECharts'],
    category: '企业应用',
    createdAt: '2026-06-03',
    updatedAt: '2026-07-18',
    featured: true,
    status: 'published'
  },
  {
    id: 15,
    title: '颐康云：讯飞星火 SSE 流式输出与并发食谱生成',
    excerpt: '在颐康云（安康）中，用 Spring Boot 对接讯飞星火，经 SseEmitter 流式返回，并用线程池分片并发生成一周食谱，避免串行超时。',
    content: `## 问题背景

颐康云需要根据父母健康档案生成一周个性化食谱。若对周一到周日串行调用大模型，单次数秒、整周可能超过 20 秒，体验很差。

## 讯飞星火接入方式

星火提供 HTTP 同步与 WebSocket/流式通道。流式结果经 Spring \`SseEmitter\` 推到前端，实现打字机效果。

### WebSocket 握手鉴权

讯飞星火 WebSocket 鉴权通过 HMAC-SHA256 对 URL 签名：

\`\`\`java
String date = DateTimeFormatter.RFC_1123_DATE_TIME
    .format(ZonedDateTime.now(ZoneId.of("GMT")));
String preStr = "host: spark-api.xf-yun.com\\ndate: " + date
    + "\\nGET /v3.5/chat HTTP/1.1";
Mac mac = Mac.getInstance("HmacSHA256");
mac.init(new SecretKeySpec(apiSecret.getBytes(), "HmacSHA256"));
String signature = Base64.getEncoder()
    .encodeToString(mac.doFinal(preStr.getBytes()));
String authorization = Base64.getEncoder().encodeToString(
    ("api_key=\\"" + apiKey + "\\", algorithm=\\"hmac-sha256\\","
    + " headers=\\"host date request-line\\","
    + " signature=\\"" + signature + "\\"").getBytes());
\`\`\`

### SSE 流式返回

后端收到星火消息后，逐 token 写入 SseEmitter：

\`\`\`java
@PostMapping("/chat/stream")
public SseEmitter chatStream(@RequestBody AiChatDTO dto) {
    SseEmitter emitter = new SseEmitter(120_000L);
    aiStreamExecutor.execute(() -> {
        try {
            sparkService.streamChat(dto.getMessage(), chunk -> {
                emitter.send(SseEmitter.event().data(chunk));
            });
            emitter.complete();
        } catch (Exception e) {
            emitter.completeWithError(e);
        }
    });
    return emitter;
}
\`\`\`

对话、健康报告分析等接口均提供 stream 变体。

## 周食谱分片并发

实现上不是「7 次串行」，而是把一周拆成 3 个分片并行（周一~三 / 周四~五 / 周六~日），用 \`CompletableFuture\` + \`aiDietExecutor\` 汇总，失败可回退整周单次生成。

\`\`\`java
List<CompletableFuture<String>> futures = DIET_WEEK_CHUNKS.stream()
    .map(days -> CompletableFuture.supplyAsync(
        () -> sparkService.generateDietForDays(healthInfo, days), dietExecutor))
    .toList();
CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
\`\`\`

长任务还可走异步任务接口：先返回 taskId，前端轮询 PENDING / RUNNING / SUCCESS。

## 语音录入说明

父母端经百度 ASR 转文字后，正则意图目前优先解析**血压**（如 \`120/80\`）并自动落库；血糖等更复杂表达仍以手动记录或普通 AI 对话为主，避免夸大「全意图自动落库」。

## 总结

核心思路：分片并发 > 整周串行，流式 > 同步等待，AI 失败有回退。再配合档案上下文，让颐康云的 AI 能力既可演示又相对稳。`,
    tags: ['讯飞星火', 'SSE', 'Spring Boot', 'CompletableFuture', '颐康云', 'AI'],
    category: 'Java 后端',
    createdAt: '2026-06-10',
    updatedAt: '2026-07-18',
    featured: true,
    status: 'published'
  },
  {
    id: 16,
    title: 'EAR、PERCLOS 与头部姿态：SmartCar 疲劳检测算法解析',
    excerpt: '拆解 SmartCar（醒驾）软件原型：EAR、PERCLOS、solvePnP 头部姿态与自适应基线校准；本地仪表盘为 HTTP 轮询，树莓派外设属后续规划。',
    content: `## 为什么单靠"闭眼检测"不够

最简单的疲劳检测只判断"眼睛是否闭合"，但这会产生大量误报：

- 普通眨眼被误判为疲劳
- 每个人的眼睛大小不同，同一阈值适配性差
- 短暂闭眼和持续困倦闭眼无法区分

可用的演示系统需要 EAR + PERCLOS + 头部姿态的多规则组合（本仓库是优先级状态机，而非单独打分模型）。

## EAR（Eye Aspect Ratio）眼部纵横比

EAR 由 MediaPipe Face Mesh 眼部关键点计算：

\`\`\`python
def compute_ear(landmarks, eye_indices, img_w, img_h):
    pts = [(int(landmarks[i].x * img_w), int(landmarks[i].y * img_h))
           for i in eye_indices]
    v1 = np.linalg.norm(np.array(pts[1]) - np.array(pts[5]))
    v2 = np.linalg.norm(np.array(pts[2]) - np.array(pts[4]))
    h  = np.linalg.norm(np.array(pts[0]) - np.array(pts[3]))
    return (v1 + v2) / (2.0 * h + 1e-6)
\`\`\`

## 个人自适应基线校准

启动约 3 秒采集睁眼 EAR，动态阈值约为 \`baseline * ear_scale\`（默认 scale=0.72），并做合理上下限裁剪。

## PERCLOS

在时间窗口内（默认 30 秒）统计闭眼帧占比。与连续闭眼时长一起触发 Fatigue / High Fatigue。

## 头部姿态

姿态角由 OpenCV \`solvePnP\` 估计（yaw / pitch / roll），再结合持续时间判定 Distracted，而不是「MediaPipe 直接返回角度」。

## 状态机与输出

优先级大致为：No Face → High Fatigue → Fatigue → Distracted → PERCLOS 规则 → Long Drive → Normal。并行输出：

- OpenCV 叠加窗口
- 蜂鸣 / TTS（Windows 优先系统语音）
- CSV 事件日志
- \`web_dashboard.py\`：标准库 HTTP + MJPEG 画面 + JSON 状态轮询（**不是 Flask / WebSocket**）

## 关于树莓派

仓库 README 将树莓派 GPIO / OLED / LED 列为**后续可拓展**；当前交付是桌面软件原型。部署到 ARM 时可降低分辨率（如 \`--max-width 640\`），但不宜把未合入的外设或未留存的 FPS 实测写成已完成能力。

## 总结

EAR 抓瞬时闭眼，PERCLOS 看累计疲劳，头部姿态覆盖分心，自适应基线降低个体差异误报。清醒地界定「软件原型 vs 车载量产」，作品集反而更可信。`,
    tags: ['MediaPipe', 'OpenCV', 'EAR', 'PERCLOS', 'Python', 'SmartCar'],
    category: 'AI + IoT',
    createdAt: '2026-06-12',
    updatedAt: '2026-07-18',
    featured: true,
    status: 'published'
  },
  {
    id: 17,
    title: 'Spring Boot JWT 多角色鉴权的工程化实践',
    excerpt: '结合智慧校园与颐康云，梳理 JWT 签发、拦截器/过滤器解析、SecurityContext、@PreAuthorize，以及子女-父母数据级隔离。',
    content: `## 为什么需要在项目中自己实现鉴权

若依等框架内置了完整权限体系，但在 Spring Boot 3 + JWT 的新项目中，理解并自己实现一遍鉴权链路更有价值。颐康云与智慧校园都采用了 JWT 方案（校园侧叠加 Spring Security \`@PreAuthorize\`）。

## JWT 结构与签发

JWT 由 Header.Payload.Signature 三部分组成，Payload 中写入用户身份信息：

\`\`\`java
public String generateToken(User user) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("userId", user.getId());
    claims.put("username", user.getUsername());
    claims.put("role", user.getUserType()); // 1=子女 2=父母 / ADMIN TEACHER STUDENT
    return Jwts.builder()
        .setClaims(claims)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + expiration))
        .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS256)
        .compact();
}
\`\`\`

Token 不存服务端，无状态设计天然适合水平扩展。

## 拦截器解析与 SecurityContext 注入

颐康云侧，受保护接口经过 JwtInterceptor，解析 Token 并将用户信息写入 ThreadLocal：

\`\`\`java
@Component
public class JwtInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest req,
                             HttpServletResponse res, Object handler) {
        String token = req.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            LoginUser user = jwtUtil.parseToken(token.substring(7));
            UserContext.set(user);   // ThreadLocal
            return true;
        }
        res.setStatus(401);
        return false;
    }

    @Override
    public void afterCompletion(...) {
        UserContext.clear();   // 防止内存泄漏
    }
}
\`\`\`

智慧校园接入 Spring Security 时，将解析结果写入 SecurityContextHolder，后续 \`@PreAuthorize\` 才能生效。

## 方法级权限控制

\`\`\`java
@PreAuthorize("hasRole('ADMIN')")
@DeleteMapping("/{id}")
public Result<Void> delete(@PathVariable Long id) { ... }

@PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
@PostMapping("/grade")
public Result<Void> saveGrade(@RequestBody GradeDTO dto) { ... }
\`\`\`

## 数据级隔离：子女访问父母资源

颐康云中子女只能访问已绑定父母的数据，由 FamilyAccessService 在 Service 入口校验 parentId。

\`\`\`java
public void checkAccess(Long childId, Long parentId) {
    boolean bound = familyMapper.exists(
        new LambdaQueryWrapper<Family>()
            .eq(Family::getChildId, childId)
            .eq(Family::getParentId, parentId)
    );
    if (!bound) throw new BizException(ErrorCode.ACCESS_DENIED,
        "无权访问该父母的数据");
}
\`\`\`

## 总结

JWT 鉴权的核心链路：**签发 → 携带 → 解析 → 注入上下文 → 方法级控制 → 数据级隔离**。角色权限解决「能不能访问这个接口」，数据隔离解决「能不能访问这条数据」。`,
    tags: ['Spring Boot', 'JWT', 'Spring Security', '鉴权', '颐康云', '智慧校园'],
    category: 'Java 后端',
    createdAt: '2026-06-14',
    updatedAt: '2026-07-18',
    featured: false,
    status: 'published'
  },
  {
    id: 18,
    title: 'MyBatis-Plus 在多模块项目中的实战技巧',
    excerpt: '结合若依二次开发与颐康云，梳理 MyBatis-Plus 分页、逻辑删除、条件构造器与自动填充的工程化用法。',
    content: `## 为什么选 MyBatis-Plus

相比原生 MyBatis，MyBatis-Plus 提供了开箱即用的 CRUD 接口、条件构造器和分页插件，在智慧校园、颐康云等业务系统中可以减少大量重复的 SQL 编写工作。但用不好也容易踩坑。

## 分页查询标准姿势

安隅、颐康云等项目中，几乎每个列表接口都需要分页。MyBatis-Plus 配合 Page 对象是最简洁的方式：

\`\`\`java
@Configuration
public class MybatisPlusConfig {
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }
}
\`\`\`

\`\`\`java
public PageResult<HealthRecordVO> listRecords(Long parentId, Integer pageNum, Integer pageSize) {
    Page<HealthRecord> page = new Page<>(pageNum, pageSize);
    LambdaQueryWrapper<HealthRecord> wrapper = new LambdaQueryWrapper<HealthRecord>()
        .eq(HealthRecord::getParentId, parentId)
        .eq(HealthRecord::getDeleted, 0)
        .orderByDesc(HealthRecord::getRecordDate);
    Page<HealthRecord> result = baseMapper.selectPage(page, wrapper);
    return PageResult.of(result.getTotal(), convertToVO(result.getRecords()));
}
\`\`\`

注意 Page 对象的 current 从 1 开始，前端传 0 会导致查不到数据，这是常见的对接坑。

## 逻辑删除

颐康云核心表使用逻辑删除，防止误删数据。只需全局配置 + 字段注解：

\`\`\`yaml
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: deleted
      logic-delete-value: 1
      logic-not-delete-value: 0
\`\`\`

\`\`\`java
@TableLogic
private Integer deleted;
\`\`\`

## 条件构造器与空值陷阱

\`\`\`java
wrapper.eq(StringUtils.hasText(keyword), HealthRecord::getNotes, keyword)
       .ge(startDate != null, HealthRecord::getRecordDate, startDate);
\`\`\`

条件为 false 时不会拼进 SQL，避免 \`column = null\` 这类隐性过滤错误。

## 自动填充

智慧校园与颐康云常见 createTime / updateTime / deleted 字段，用 \`MetaObjectHandler\` 自动填充，减少样板代码。

## 总结

MyBatis-Plus 适合业务 CRUD 密集的项目；复杂报表仍建议手写 SQL 或 XML。分页、逻辑删除、条件构造器三件套用对，日常开发效率会高很多。`,
    tags: ['MyBatis-Plus', 'Spring Boot', '颐康云', 'Java'],
    category: 'Java 后端',
    createdAt: '2026-06-16',
    updatedAt: '2026-07-18',
    featured: false,
    status: 'published'
  }
]
