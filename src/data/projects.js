/** 项目作品集数据（首页与 /projects 共用） */
export const PROJECTS = [
  {
    slug: 'shouwang',
    name: '守望',
    subtitle: '独居老人非接触式居家主动守护系统',
    track: 'IoT · 实时系统',
    articleId: 1,
    relatedArticleIds: [9, 10, 11],
    category: '物联网 · 智慧养老',
    description: '面向独居场景的告警中枢：设备上报、实时推送与家属轻端处置打通。',
    detail:
      'Spring Boot 3 作为告警中枢，对接 Vue 3 监控大屏与微信小程序。告警经 MySQL 落库、Redis 维护异常状态后，由 WebSocket 推送到大屏；内置夜间离床状态机（离床超时预警，门磁未开则升级风险），并支持设备心跳、离线检测与告警闭环处置。MQTT 接入已预留，默认演示走 HTTP 模拟上报。',
    icon: '🛡️',
    gradient: 'linear-gradient(135deg, #f59e0b33, #f9731633)',
    tech: ['Spring Boot 3', 'JPA', 'MySQL', 'Redis', 'WebSocket', 'MQTT', 'Vue 3', '微信小程序'],
    features: [
      '告警全链路：上报落库 → Redis 异常状态 → WebSocket 推送大屏',
      '夜间离床状态机：超时预警，门磁未开升级潜在风险',
      '设备心跳上报与定时离线检测，自动生成离线告警',
      '告警闭环处置：处理人、结果、是否通知家属与耗时统计',
      'Vue 3 监控大屏 + 微信小程序家属端协同'
    ],
    highlights: [
      { value: '状态机', label: '夜间离床' },
      { value: '闭环', label: '告警处置' },
      { value: '三端', label: 'API · 大屏 · 小程序' }
    ],
    stats: [
      { value: '状态机', label: '夜间离床' },
      { value: '闭环', label: '告警处置' }
    ]
  },
  {
    slug: 'anyu',
    name: '安隅',
    subtitle: '若依二次开发 · 智慧社区后台',
    track: 'Java 后端 · 企业后台',
    articleId: 2,
    relatedArticleIds: [18],
    category: '企业应用 · 智慧社区',
    description: '基于 RuoYi-Vue 扩展的物业社区管理后台，覆盖缴费、投诉、访客、公告等业务模块。',
    detail:
      '以若依 RuoYi 3.9.1 为基座（Spring Boot 4.x + Spring Security + JWT + Redis + Quartz），前端 Vue 2 + Element UI + ECharts。在多模块工程中扩展投诉、缴费账单、住户/房屋、预约、访客邀请、公告、驿站/外卖等社区业务；典型能力是列表分页、CRUD 与 Excel 导出。访客表含邀请码字段，缴费侧重账单台账维护，而非第三方支付网关或真实门禁二维码通行。界面默认标题仍为「若依管理系统」，「安隅」为作品集产品名。',
    icon: '🏘️',
    gradient: 'linear-gradient(135deg, #06b6d433, #0891b233)',
    tech: ['RuoYi 3.9.1', 'Spring Boot 4', 'Spring Security', 'JWT', 'Redis', 'MyBatis', 'MyBatis-Plus', 'PageHelper', 'Quartz', 'Vue 2', 'Element UI', 'ECharts'],
    features: [
      '若依多模块拆分：cost / complaint / home / appointments / visitor / notice 等',
      'Spring Security + JWT + 菜单/按钮级 RBAC（框架能力）',
      '业务 CRUD + PageHelper 分页 + POI Excel 导出',
      '访客邀请、缴费账单、投诉工单、公告已读等社区台账',
      'Vue 2 管理端与 ECharts 图表页扩展'
    ],
    highlights: [
      { value: '多模块', label: '业务扩展' },
      { value: 'RBAC', label: '权限体系' },
      { value: 'CRUD', label: '台账闭环' }
    ],
    stats: [
      { value: '多模块', label: '业务扩展' },
      { value: 'RBAC', label: '权限体系' }
    ]
  },
  {
    slug: 'yinlu',
    name: '引路',
    subtitle: '慧杖护行 · 智能盲杖出行守护',
    track: 'IoT · AI',
    articleId: 3,
    relatedArticleIds: [12, 13],
    category: 'AI + IoT · 无障碍',
    description: 'ESP32 盲杖感知 + 云端跌倒/围栏判断 + 家属监护与 AI 语音助手。',
    detail:
      '以 ESP32 智能盲杖为感知端，经 HTTPS 上报障碍物距离、三轴加速度与 GPS；Spring Boot 3 + MyBatis 完成跌倒置信度与圆形电子围栏越界判断，WebSocket 推送至 Vue 管理端与 uni-app 小程序。用户侧「明眼助手」对接 DeepSeek 对话与百度语音 STT/TTS；另含 OpenCV 路口辅助演示与 SOS / 家属安抚协同。',
    icon: '🦯',
    gradient: 'linear-gradient(135deg, #f59e0b22, #d9770622)',
    tech: [
      'Spring Boot 3',
      'MyBatis',
      'MySQL',
      'WebSocket',
      'Vue 3',
      'uni-app',
      '高德地图',
      'DeepSeek',
      '百度语音',
      'ESP32'
    ],
    features: [
      'ESP32：超声波避障、MPU6050 跌倒检测、GPS 轨迹与 SOS',
      '传感器入库、跌倒/越界告警生成，WebSocket 实时推送',
      '圆形电子围栏配置与越界边沿告警',
      '管理端高德地图监控与轨迹回放；小程序位置监护',
      '明眼助手：DeepSeek 上下文问答 + 百度语音；设备按键 AI 唤醒'
    ],
    highlights: [
      { value: 'IoT', label: '硬件接入' },
      { value: 'LBS', label: '位置守护' },
      { value: 'AI', label: '语音助手' }
    ],
    stats: [
      { value: 'IoT', label: '硬件接入' },
      { value: 'AI', label: '语音助手' }
    ]
  },
  {
    slug: 'ankang',
    name: '安康',
    subtitle: '颐康云 · 家庭康养管理平台',
    track: 'Java 后端 · AI',
    articleId: 19,
    relatedArticleIds: [15, 17],
    category: '企业应用 · 家庭健康',
    description: '产品「颐康云」：子女 Web + 父母小程序，档案驱动的 AI 康养双端。',
    detail:
      '对外产品名颐康云（工程名 health-manager）。子女端 Vue 3 管理健康档案、血压/血糖记录、病例、食谱与报告；父母端 uni-app 小程序完成用药打卡与语音交互。后端 Spring Boot 3.3 + MyBatis-Plus + JWT，业务数据按 parentId / 家庭绑定隔离。文本 AI 走讯飞星火（含 SSE 流式与异步任务），语音 ASR/TTS 走百度；食谱按周分片线程池并行生成。Redis / OSS 仅配置预留，当前业务未依赖。',
    icon: '🏥',
    gradient: 'linear-gradient(135deg, #10b98133, #06b6d433)',
    tech: ['Spring Boot 3.3', 'MyBatis-Plus', 'JWT', 'Vue 3', 'Element Plus', 'uni-app', 'ECharts', '讯飞星火', '百度语音'],
    features: [
      '子女 Web + 父母小程序双端，FamilyAccess 校验 parentId 数据隔离',
      '健康档案驱动食谱、报告与 AI 助手上下文',
      '讯飞星火：周食谱分片并行生成 + 异步任务轮询；SSE 流式对话/报告',
      '百度 ASR + 正则意图解析：语音记录血压并落库（血糖等仍以手动/对话为主）',
      '病例附件本地上传、用药打卡、养生建议与月度分析报告'
    ],
    highlights: [
      { value: '双端', label: '子女 + 父母' },
      { value: 'SSE', label: '流式 AI' },
      { value: '并发', label: '周食谱生成' }
    ],
    stats: [
      { value: '双端', label: '子女 + 父母' },
      { value: 'SSE', label: '流式 AI' }
    ]
  },
  {
    slug: 'xingjia',
    name: '醒驾',
    subtitle: 'SmartCar · 疲劳与分心监测软件原型',
    track: 'AI · 视觉算法',
    articleId: 16,
    category: 'AI · 行车安全',
    description: 'MediaPipe Face Mesh + OpenCV 的桌面端疲劳/分心检测演示，含本地 Web 仪表盘。',
    detail:
      '仓库产品名 SmartCar。基于摄像头或视频文件实时计算 EAR/MAR、PERCLOS 滑动窗口，并用 solvePnP 估计头部姿态；启动约 3 秒做个人 EAR 基线校准，经持续时间规则输出 Normal / Fatigue / High Fatigue / Distracted / No Face / Long Drive。支持 OpenCV 画面叠加、蜂鸣与 TTS、CSV 事件日志，以及 Python 标准库 HTTP 服务的本地仪表盘（MJPEG + JSON 轮询）。树莓派 GPIO/OLED/LED 为后续扩展，当前为纯软件原型，非车载量产硬件。',
    icon: '🚗',
    gradient: 'linear-gradient(135deg, #3b82f633, #f59e0b33)',
    tech: ['Python', 'MediaPipe', 'OpenCV', 'NumPy', 'pyttsx3', 'http.server'],
    features: [
      'Face Mesh 关键点：EAR 闭眼、MAR 哈欠、PERCLOS 滑动窗口',
      '头部姿态分心检测（侧脸 / 低头，solvePnP）',
      '启动期个人 EAR 基线校准，降低固定阈值误报',
      '六态状态机 + 蜂鸣 / TTS 提醒与 CSV 事件日志',
      '本地 Web 仪表盘：实时画面与 EAR / MAR / PERCLOS 指标'
    ],
    highlights: [
      { value: '6态', label: '状态机' },
      { value: '自适应', label: 'EAR 校准' },
      { value: '本地Web', label: '实时仪表盘' }
    ],
    stats: [
      { value: '6态', label: '状态机' },
      { value: '自适应', label: 'EAR 校准' }
    ]
  },
  {
    slug: 'qingjin',
    name: '青衿',
    subtitle: '智慧校园 · 教务学工管理平台',
    track: 'Java 后端 · 企业后台',
    articleId: 14,
    relatedArticleIds: [17, 18],
    category: '企业应用 · 校园教务',
    description: 'UI 品牌「智慧校园」：Spring Boot 3.2 + Vue 3 的多角色教务后台。',
    detail:
      '前后端分离：后端 Spring Boot 3.2.5 + Spring Security + JWT + MyBatis-Plus；前端 Vue 3 + Element Plus + ECharts，侧栏品牌为「智慧校园」。覆盖学生/教师/班级/课程/选课/成绩/考勤/通知与 Dashboard。方法级 @PreAuthorize 区分 ADMIN / TEACHER / STUDENT；选课含容量与防重复；BizException + 校验统一错误返回。首页按角色切换指标与图表文案（部分教师统计仍为全局示意，后续可按授课维度细化）。',
    icon: '🏫',
    gradient: 'linear-gradient(135deg, #6366f133, #0ea5e933)',
    tech: ['Spring Boot 3.2', 'Spring Security', 'JWT', 'MyBatis-Plus', 'MySQL', 'Vue 3', 'Element Plus', 'ECharts'],
    features: [
      'JWT 多角色登录 + @PreAuthorize 方法级权限',
      '学生、教师、班级、课程、选课、成绩、考勤、通知公告',
      '选课容量控制与防重复；BizException 业务错误统一封装',
      'Jakarta Validation 参数校验与全局异常处理',
      'ECharts Dashboard：角色差异化首页与统计图表'
    ],
    highlights: [
      { value: '3', label: '用户角色' },
      { value: 'RBAC', label: '方法级权限' },
      { value: 'ECharts', label: '数据看板' }
    ],
    stats: [
      { value: '3', label: '角色权限' },
      { value: 'ECharts', label: '数据看板' }
    ]
  },
  {
    slug: 'mojing',
    name: '墨境',
    subtitle: '墨境流芳 · 国风 Web3D 数字展馆',
    track: '数字文化 · Web3D',
    articleId: 20,
    relatedArticleIds: [21, 22],
    category: '数字文化 · 沉浸互动',
    description: '浏览器内的国风数字展馆：三展区漫游、水墨工坊创作，并贯通课堂学习与运营后台。',
    detail:
      'Vue 3 + TypeScript 构建展馆前端；约 3200 行的 scene.ts 作为 Three.js 主馆运行时（相机、后处理、行走画质自适应），灵兽区使用独立 three-jl WebGL 栈。后端 Spring Boot 3.2 + MyBatis-Plus 提供展品/用户空间、异步工坊任务与 /ws/scene 进度推送。可演示展区为山水、书法、灵兽三区。工坊采用本地 Canvas 预览 + 可选云端生图 + Java 水墨兜底，并支持程序化 GLB/STL 导出；智能赏析目前以策展文案演示为主。另含国风课堂、个人空间与基于 visit_log 的运营看板，开发环境可用 VITE_DEMO_FALLBACK 保证断后端仍可演示。',
    icon: '🖌️',
    gradient: 'linear-gradient(135deg, #1c191733, #b4530933)',
    tech: [
      'Vue 3',
      'TypeScript',
      'Vite',
      'Three.js',
      'three-jl',
      'Spring Boot 3',
      'MyBatis-Plus',
      'MySQL',
      'WebSocket',
      'ECharts',
      'Docker Compose'
    ],
    features: [
      '三展区 Web3D 漫游：山水行走、书法沉浸、灵兽粒子叙事',
      '展品检索、收藏、语音导览与访问统计',
      '水墨工坊：本地预览、异步生成、进度推送与卷轴三维预览',
      '程序化导出 GLB / STL（简化卷轴几何）',
      '国风课堂与个人空间：课纲进度、等级经验与作品库',
      '运营后台：展品维护与真实访问看板；后端不可达时前端可 fallback 演示'
    ],
    highlights: [
      { value: '3区', label: '可演示展区' },
      { value: '双栈', label: 'Three.js + JL' },
      { value: '兜底', label: '本地水墨可演示' }
    ],
    stats: [
      { value: '3区', label: '可演示展区' },
      { value: '双栈', label: 'WebGL 隔离' }
    ]
  }
]

/** 首页卡片用精简字段 */
export function toHomeProject(project) {
  return {
    slug: project.slug,
    name: `${project.name} — ${project.subtitle}`,
    track: project.track,
    articleId: project.articleId,
    description: project.description,
    icon: project.icon,
    gradient: project.gradient,
    tech: project.tech.slice(0, 6),
    stats: project.stats
  }
}

/** 文章页：根据 articleId 反查关联项目（主文 + 专题文） */
export function getProjectsForArticle(articleId) {
  const id = Number(articleId)
  if (!Number.isFinite(id)) return []
  return PROJECTS.filter(
    (p) => p.articleId === id || (p.relatedArticleIds || []).includes(id)
  )
}

/** 项目页：主复盘 + 专题文 id 列表 */
export function getProjectArticleIds(project) {
  if (!project) return []
  const ids = []
  if (project.articleId != null) ids.push(project.articleId)
  for (const id of project.relatedArticleIds || []) {
    if (!ids.includes(id)) ids.push(id)
  }
  return ids
}
