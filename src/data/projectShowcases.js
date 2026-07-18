/** 项目页四块深描：业务背景 / 架构分层 / 核心难点 / 关键代码 */
export const PROJECT_SHOWCASES = {
  shouwang: {
    background: {
      audience: '独居老人家属、社区养老运营演示',
      problem: '异常发生后往往「没人看见、没人收尾」，堆传感器并不能解决问题。',
      goal: '打通上报 → 判断 → 落库 → 推送 → 处置的可演示闭环，大屏实时、小程序可处理。'
    },
    architecture: [
      { layer: '客户端', items: ['Vue 3 监控大屏', '微信小程序（HTTP）'] },
      { layer: '接入层', items: ['行为/心跳 API', 'HTTP Mock', 'MQTT（可选）'] },
      { layer: '业务层', items: ['AlarmService', 'NightBedStateService', '处置闭环'] },
      { layer: '实时与缓存', items: ['WebSocket /ws/alarm', 'Redis 状态机 / 短缓存'] },
      { layer: '数据层', items: ['MySQL 告警事实', '老人/设备档案'] }
    ],
    challenges: [
      {
        title: '夜间离床误报',
        problem: '「离床就报警」刷屏，家属无法信任。',
        solution: 'Redis 存观测状态，10 分钟预警 / 30 分钟且门磁未开升级，布尔位防抖只发一次。'
      },
      {
        title: '演示环境无 Broker',
        problem: 'MQTT 强依赖会导致答辩第一分钟挂掉。',
        solution: 'mqtt.enabled 默认 false；主路径 HTTP mock，打开开关后复用同一套 AlarmService。'
      },
      {
        title: '大屏实时与稳定性',
        problem: '纯轮询滞后，纯 WS 断线空白。',
        solution: 'ALARM/STATS 推送 + 约 10s HTTP 轮询兜底；小程序保持 HTTP 降低复杂度。'
      }
    ],
    snippet: {
      title: '夜间离床状态升级（节选）',
      lang: 'java',
      code: `if (absentMinutes >= BED_LEAVE_MINUTES && !state.isBedLeaveAlarmSent()) {
    alarmService.processAlarmMessage(buildAlarm(..., AlarmType.BED_LEAVE, ...));
    state.setBedLeaveAlarmSent(true);
}
if (absentMinutes >= POTENTIAL_RISK_MINUTES
        && !Boolean.TRUE.equals(dto.getDoorOpened())
        && !state.isPotentialRiskAlarmSent()) {
    alarmService.processAlarmMessage(buildAlarm(..., AlarmType.POTENTIAL_RISK, ...));
    state.setPotentialRiskAlarmSent(true);
}
redisTemplate.opsForValue().set(key, state, 12, TimeUnit.HOURS);`
    }
  },

  anyu: {
    background: {
      audience: '物业运营、社区管理演示与实习向作品',
      problem: '社区台账分散，从零造后台成本高、权限与脚手架重复劳动多。',
      goal: '在若依多模块上扩展缴费、投诉、访客、公告等可演示 CRUD 闭环。'
    },
    architecture: [
      { layer: '管理端', items: ['Vue 2', 'Element UI', 'ECharts'] },
      { layer: '网关与权限', items: ['Spring Security', 'JWT', '菜单/按钮 RBAC'] },
      { layer: '业务模块', items: ['cost', 'complaint', 'visitor', 'notice', 'home…'] },
      { layer: '基础设施', items: ['RuoYi 3.9.1', 'MyBatis / PageHelper', 'Redis', 'Quartz'] }
    ],
    challenges: [
      {
        title: '扩展边界说清',
        problem: '易被吹成「自研社区中台 / 在线支付门禁」。',
        solution: '明确：账单台账非支付网关；邀请码字段非门禁系统；权限是框架能力。'
      },
      {
        title: '生成器代码不可盲信',
        problem: '代码生成后字段、权限、导出常需手改。',
        solution: '按规范挂模块、配菜单，联调时校验校验注解与导出字段。'
      }
    ],
    snippet: {
      title: '典型列表：分页 + 导出（示意）',
      lang: 'java',
      code: `@PreAuthorize("@ss.hasPermi('community:complaint:list')")
@GetMapping("/list")
public TableDataInfo list(Complaint complaint) {
    startPage(); // PageHelper
    List<Complaint> list = complaintService.selectComplaintList(complaint);
    return getDataTable(list);
}`
    }
  },

  yinlu: {
    background: {
      audience: '视障出行用户与家属监护人',
      problem: '风险发生时家属看不见、无法及时响应；纯导航名词无法落地演示。',
      goal: 'ESP32 感知 + 云端跌倒/围栏 + 多端推送 + 语音助手，形成监护闭环。'
    },
    architecture: [
      { layer: '感知端', items: ['ESP32', '超声波 / MPU6050 / GPS / SOS'] },
      { layer: '接入', items: ['HTTPS POST /api/sensor-data', 'ai-wake'] },
      { layer: '云端', items: ['跌倒评估', '圆形围栏 Haversine', '告警入库'] },
      { layer: '协同', items: ['WebSocket 推送', 'Vue 管理端', 'uni-app 小程序'] },
      { layer: 'AI', items: ['DeepSeek 流式对话', '百度 STT/TTS'] }
    ],
    challenges: [
      {
        title: '跌倒误报',
        problem: '单帧加速度毛刺过多。',
        solution: '固件状态机确认 + 云端合加速度置信度；告警用上升沿写入。'
      },
      {
        title: '围栏刷屏',
        problem: '一直在界外会连续告警。',
        solution: '记录 lastStatus，仅内→外边沿触发。'
      },
      {
        title: '协议选型',
        problem: '默认上 MQTT 增加 Broker 运维。',
        solution: '设备直连用 HTTPS；事件到手机走 WebSocket。'
      }
    ],
    snippet: {
      title: '圆形围栏边沿触发（节选）',
      lang: 'java',
      code: `boolean outside = distanceMeters > fence.getRadiusMeters();
boolean triggered = outside
    && !"OUTSIDE".equalsIgnoreCase(fence.getLastStatus());
if (triggered) {
    // 写告警 + WebSocket 推送
}`
    }
  },

  ankang: {
    background: {
      audience: '子女（管理者）与父母（轻量使用者）',
      problem: '健康数据集中在子女侧难协同；AI 若脱离档案则不可用。',
      goal: '双端同一套 API：档案驱动建议，JWT + parentId 隔离，SSE/并发控时延。'
    },
    architecture: [
      { layer: '双端', items: ['子女 Vue 3 Web', '父母 uni-app'] },
      { layer: '鉴权', items: ['JWT', 'FamilyAccess(parentId)'] },
      { layer: '业务域', items: ['档案/血压血糖', '用药', '报告', '病例'] },
      { layer: 'AI / 语音', items: ['讯飞星火 SSE', '周食谱分片并发', '百度 ASR/TTS'] },
      { layer: '数据', items: ['MySQL', 'Redis/OSS 预留未主用'] }
    ],
    challenges: [
      {
        title: '越权看别人父母数据',
        problem: '仅有角色不够。',
        solution: 'Service 入口 FamilyAccess 校验绑定关系；SSE 前进权限断言。'
      },
      {
        title: '周食谱超时',
        problem: '串行调模型页面假死。',
        solution: '3 分片 CompletableFuture 并行 + 失败回退；对话走流式。'
      },
      {
        title: '语音能力边界',
        problem: '易吹成全病历语音 EHR。',
        solution: '稳定自动落库的是血压；其余手动/对话。'
      }
    ],
    snippet: {
      title: '家庭数据隔离（节选）',
      lang: 'java',
      code: `familyMapper.selectCount(
    new LambdaQueryWrapper<Family>()
        .eq(Family::getChildId, loginUser.getUserId())
        .eq(Family::getParentId, parentId));
// 无绑定关系则 BizException：无权访问`
    }
  },

  xingjia: {
    background: {
      audience: '行车安全演示、视觉算法课程/竞赛展示',
      problem: '单靠闭眼检测误报高，个体差异大；量产硬件叙事易夸大。',
      goal: '桌面原型跑通 EAR/PERCLOS/姿态状态机，并给出本地可看的指标面板。'
    },
    architecture: [
      { layer: '采集', items: ['摄像头 / 视频文件'] },
      { layer: '算法', items: ['MediaPipe Face Mesh', 'EAR/MAR', 'PERCLOS', 'solvePnP'] },
      { layer: '决策', items: ['六态优先级状态机', '个人 EAR 基线'] },
      { layer: '输出', items: ['OpenCV 叠加', '蜂鸣/TTS', 'CSV', 'http.server 仪表盘'] }
    ],
    challenges: [
      {
        title: '个体眼裂差异',
        problem: '固定 EAR 阈值伤人。',
        solution: '启动约 3 秒采基线，阈值 ≈ baseline × scale。'
      },
      {
        title: '交付边界',
        problem: '易写成车载量产 / Flask 实时系统。',
        solution: '明确：桌面原型；仪表盘为标准库 HTTP + MJPEG 轮询；Pi 外设未合入。'
      }
    ],
    snippet: {
      title: 'EAR 计算（节选）',
      lang: 'python',
      code: `def compute_ear(landmarks, eye_indices, img_w, img_h):
    pts = [(int(landmarks[i].x * img_w), int(landmarks[i].y * img_h))
           for i in eye_indices]
    v1 = np.linalg.norm(np.array(pts[1]) - np.array(pts[5]))
    v2 = np.linalg.norm(np.array(pts[2]) - np.array(pts[4]))
    h  = np.linalg.norm(np.array(pts[0]) - np.array(pts[3]))
    return (v1 + v2) / (2.0 * h + 1e-6)`
    }
  },

  qingjin: {
    background: {
      audience: '管理员 / 教师 / 学生三类校园角色',
      problem: '教务能力分散，权限若只藏前端按钮会越权。',
      goal: '自建 Security+JWT 教务后台：选课、成绩、考勤与角色化看板。'
    },
    architecture: [
      { layer: '前端', items: ['Vue 3', 'Element Plus', 'ECharts Dashboard'] },
      { layer: '安全', items: ['JWT 过滤器', '@PreAuthorize 方法级权限'] },
      { layer: '业务', items: ['选课容量/防重', '成绩', '考勤', '通知'] },
      { layer: '数据', items: ['MySQL', 'MyBatis-Plus'] }
    ],
    challenges: [
      {
        title: '接口级权限',
        problem: '前端藏菜单不等于安全。',
        solution: '角色写入 SecurityContext，写接口加 @PreAuthorize。'
      },
      {
        title: '选课并发业务规则',
        problem: '超额、重复选课。',
        solution: '容量校验 + 已选检测，BizException 统一返回。'
      },
      {
        title: '看板诚实度',
        problem: '教师图表示意易被当成完成品。',
        solution: '文案标明部分教师统计仍为全局示意。'
      }
    ],
    snippet: {
      title: '方法级权限（节选）',
      lang: 'java',
      code: `@PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
@PostMapping("/grade")
public Result<Void> saveGrade(@RequestBody GradeDTO dto) {
    gradeService.save(dto);
    return Result.ok();
}`
    }
  },

  mojing: {
    background: {
      audience: '数字文化竞赛评委、观展访客、运营演示账号',
      problem: '书画展「只能远看」；答辩要求现场可跑，不能只靠概念片。',
      goal: '浏览器内观展—创作—学习—运营闭环；无 Key / 断后端仍可讲完主流程。'
    },
    architecture: [
      { layer: '体验层', items: ['Vue 3 展馆 UI', '工坊 / 课堂 / 空间 / 后台'] },
      { layer: '渲染层', items: ['Three.js scene.ts 主馆', 'three-jl 灵兽独立 WebGL'] },
      { layer: '实时', items: ['WebSocket /ws/scene 任务进度'] },
      { layer: '业务与 AI', items: ['展品/用户 API', '异步生图', '本地水墨兜底'] },
      { layer: '数据与部署', items: ['MySQL/H2', 'Docker Compose 可选'] }
    ],
    challenges: [
      {
        title: '双 WebGL 抢上下文',
        problem: '粒子灵兽与主馆后处理互相拖垮。',
        solution: '灵兽独立 canvas；切区 preload / 离开释放。'
      },
      {
        title: '行走白屏',
        problem: '行走 + 全屏 inkPost 组合 bug。',
        solution: '行走档强制关闭 inkPost，保留 dualLayer 与 FPS 降档。'
      },
      {
        title: '工坊等待过长',
        problem: '同步等云端生图像假死。',
        solution: 'Canvas 本地先预览；后端异步 + WS/轮询；无 Key 回落 Java 水墨。'
      }
    ],
    snippet: {
      title: '工坊生成回落本地水墨（节选）',
      lang: 'java',
      code: `if (aiProperties.openaiImageReady()) {
    try {
        byte[] aiImage = openAiImageClient.generateInkWash(originBytes, styleType);
        push("AI_DONE", taskId, 100, resultUrl, null);
        return;
    } catch (Exception aiError) {
        note = "AI生图失败，已回落本地水墨";
    }
}
resultUrl = fileStorage.saveGenerated(
    InkWashImageProcessor.stylize(originBytes, styleType), "png");
push("AI_DONE", taskId, 100, resultUrl, null);`
    }
  }
}

export function getProjectShowcase(slug) {
  return PROJECT_SHOWCASES[slug] || null
}
