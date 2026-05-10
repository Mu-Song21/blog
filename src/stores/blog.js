import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const DATA_VERSION = 4
const DEFAULT_ARTICLES = [
  {
    id: 1,
    title: '独居老人居家守护终端：从零到一的物联网实践',
    excerpt: '基于 Spring Boot + MQTT + Redis 构建的实时健康监测与异常报警系统，融合传感器数据采集、WebSocket 实时推送与微信小程序端交互，探索智慧养老的技术实现路径。',
    content: `## 项目背景

独居老人的安全问题一直是社会关注的焦点。当老人在家中发生跌倒、突发疾病等意外时，往往因为无法及时获得救助而造成严重后果。本项目旨在通过物联网技术，构建一套非侵入式的居家守护方案。

## 技术架构

系统采用**传感器端 → MQTT Broker → 后端服务 → 小程序端**的四层架构：

- **传感器层**：通过温度、湿度、烟雾、红外人体感应等传感器采集环境数据
- **通信层**：使用 MQTT 协议进行轻量级消息传输，支持 QoS 1 确保消息可靠到达
- **服务层**：Spring Boot 处理业务逻辑，Redis 缓存实时数据，WebSocket 推送告警
- **前端层**：微信小程序为家属提供实时监控与告警接收

## 核心功能

### 实时健康监测
传感器数据通过 MQTT 发布到指定 Topic，后端订阅并解析后存入 Redis，前端通过 WebSocket 实时获取最新数据。

### 异常告警机制
基于规则引擎判断传感器数据是否异常，支持多级告警（提示、警告、紧急），紧急告警自动通知家属。

### 设备管理
支持设备的注册、绑定、在线状态监控，设备离线自动告警。

## 技术亮点

- MQTT 消息的可靠传输与重试机制
- Redis 时间序列数据的高效存储与查询
- WebSocket 长连接的心跳保活与断线重连
- 微信小程序的订阅消息推送

## 项目收获

这个项目让我对物联网系统的全链路有了深入理解，从硬件通信到云端服务，再到移动端展示，每一个环节都有独特的技术挑战。`,
    tags: ['Spring Boot', 'MQTT', 'Redis', 'WebSocket', '微信小程序'],
    category: '物联网',
    createdAt: '2025-12-15',
    updatedAt: '2025-12-15',
    featured: true,
    status: 'published'
  },
  {
    id: 2,
    title: '安隅智能社区：基于若依框架的社区管理平台',
    excerpt: '以若依框架为基座，Spring Boot + Vue 2 构建的智慧社区综合管理平台，涵盖住户管理、报修投诉、物业缴费、公告通知等核心模块，助力社区数字化转型。',
    content: `## 项目背景

传统社区管理依赖纸质记录和人工沟通，效率低下、信息不透明。本项目旨在为物业公司提供一站式数字化管理工具，提升社区服务质量和管理效率。

## 技术选型

选择若依（RuoYi）框架作为基础，主要考虑到：
- 成熟的权限管理体系（RBAC）
- 完善的代码生成器，加速开发
- 活跃的社区和丰富的组件生态

### 后端
- Spring Boot 2.x
- MyBatis-Plus 持久层
- Redis 缓存与会话管理
- MySQL 数据存储

### 前端
- Vue 2 + Element UI
- ECharts 数据可视化
- 富文本编辑器

## 核心模块

### 住户管理
支持楼栋-单元-房屋的三级结构管理，住户信息的增删改查与导入导出。

### 报修投诉
业主在线提交报修/投诉工单，物业人员接单处理，支持图片上传和进度跟踪。

### 物业缴费
生成缴费账单，在线支付，自动生成缴费统计报表。

### 公告通知
支持富文本公告编辑，按楼栋/全体推送，已读未读统计。

### 访客预约
业主在线为访客预约门禁权限，支持临时二维码通行。

## 数据看板

基于 ECharts 构建可视化大屏，实时展示：
- 报修工单处理率
- 缴费完成率
- 投诉分类统计
- 住户满意度趋势

## 项目收获

这个项目让我深入理解了企业级后台系统的架构设计，尤其是在权限管理、多角色协作和报表统计方面积累了丰富经验。`,
    tags: ['若依', 'Spring Boot', 'Vue 2', 'Element UI', 'MyBatis-Plus'],
    category: '企业应用',
    createdAt: '2025-11-20',
    updatedAt: '2025-11-20',
    featured: true,
    status: 'published'
  },
  {
    id: 3,
    title: '智能盲杖：AI 赋能的视障辅助导航系统',
    excerpt: '融合 Spring Boot、AI 对话、高德地图与百度语音技术，结合 Vue 3 + uni-app 跨端开发，为视障人士打造集 GPS 定位、电子围栏、轨迹回放与智能语音交互于一体的辅助出行系统。',
    content: `## 项目背景

全球约有 2.53 亿视力障碍者，出行安全是他们面临的最大挑战之一。传统盲杖只能探测近距离障碍物，无法提供路线导航和远程监护。本项目尝试用技术为视障群体构建更安全的出行体验。

## 系统架构

### 后端服务
- Spring Boot 3.x 作为核心框架
- 高德地图 API 实现路径规划与地理围栏
- 百度语音 API 提供语音合成与识别
- AI 大模型 API 实现智能对话

### 前端应用
- Vue 3 + TypeScript + uni-app 跨端方案
- 同时支持 H5 和微信小程序
- 无障碍适配（大字体、高对比度、语音引导）

## 核心功能

### 实时 GPS 定位
家属可通过管理端实时查看使用者位置，支持历史轨迹回放，精确到街道级别。

### 电子围栏
家属为使用者设定安全活动范围，离开预设区域自动触发告警通知。

### AI 智能语音助手
集成大语言模型 API，使用者可通过语音与系统交互：
- "帮我导航到最近的地铁站"
- "前面有什么障碍物"
- "通知家人我的位置"

### 路径导航
基于高德地图 API 提供无障碍路径规划，通过语音播报引导方向和距离。

### 紧急求助
一键 SOS 功能，自动向紧急联系人发送位置信息和求助消息。

## 技术亮点

- uni-app 一套代码适配多端，降低开发维护成本
- 地理围栏的实时碰撞检测算法
- AI 对话的上下文管理与意图识别优化
- 语音播报的自然度与响应速度优化

## 项目收获

这个项目让我深刻体会到技术向善的力量。在开发过程中，我们多次与视障用户交流，真正理解了他们的需求和痛点，也让我对产品设计有了全新的认识。`,
    tags: ['Spring Boot', 'AI', '高德地图', '百度语音', 'Vue 3', 'uni-app'],
    category: 'AI + IoT',
    createdAt: '2026-02-10',
    updatedAt: '2026-02-10',
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
  }
]

export const useBlogStore = defineStore('blog', () => {
  const storedVersion = Number(localStorage.getItem('blog_data_version') || '0')

  let initialArticles = DEFAULT_ARTICLES
  if (storedVersion === DATA_VERSION) {
    const stored = localStorage.getItem('blog_articles')
    if (stored) {
      try {
        initialArticles = JSON.parse(stored)
      } catch (e) {
        initialArticles = DEFAULT_ARTICLES
      }
    }
  } else {
    localStorage.setItem('blog_data_version', DATA_VERSION)
  }

  const articles = ref(initialArticles)
  const adminToken = ref(localStorage.getItem('blog_admin_token') || '')

  const publishedArticles = computed(() =>
    articles.value.filter(a => a.status === 'published').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  )

  const featuredArticles = computed(() =>
    publishedArticles.value.filter(a => a.featured)
  )

  function save() {
    localStorage.setItem('blog_articles', JSON.stringify(articles.value))
    localStorage.setItem('blog_data_version', DATA_VERSION)
  }

  function addArticle(article) {
    const maxId = articles.value.reduce((max, a) => Math.max(max, a.id), 0)
    articles.value.push({ ...article, id: maxId + 1 })
    save()
  }

  function updateArticle(id, data) {
    const idx = articles.value.findIndex(a => a.id === id)
    if (idx !== -1) {
      articles.value[idx] = { ...articles.value[idx], ...data }
      save()
    }
  }

  function deleteArticle(id) {
    articles.value = articles.value.filter(a => a.id !== id)
    save()
  }

  function getArticle(id) {
    return articles.value.find(a => a.id === Number(id))
  }

  function login(password) {
    if (password === 'musong2026') {
      const token = 'admin_' + Date.now()
      adminToken.value = token
      localStorage.setItem('blog_admin_token', token)
      return true
    }
    return false
  }

  function logout() {
    adminToken.value = ''
    localStorage.removeItem('blog_admin_token')
  }

  function isLoggedIn() {
    return !!adminToken.value
  }

  return {
    articles, publishedArticles, featuredArticles, adminToken,
    addArticle, updateArticle, deleteArticle, getArticle,
    login, logout, isLoggedIn
  }
})
