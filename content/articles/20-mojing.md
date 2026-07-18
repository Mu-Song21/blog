---
id: 20
title: "墨境：国风 Web3D 数字展馆的工程实践"
excerpt: "从启动链路、三展区场景内核、水墨工坊异步管道到演示兜底：记录 Vue 3 + Three.js + Spring Boot 如何做成可答辩的观展—创作—运营闭环，以及能力边界。"
category: "数字文化"
tags: ["墨境流芳","Vue 3","Three.js","Spring Boot","Web3D","水墨工坊","WebSocket"]
createdAt: 2026-07-18
updatedAt: 2026-07-18
featured: true
status: published
---

## 一开始想清楚的问题

线下书画展有两个常见断层：观众很难「走进」作品空间，观展结束后也缺少创作与学习的延伸。竞赛与答辩又加了一条硬约束——系统必须**现场可运行**，不能只停在概念片或静态页。

因此「墨境」（产品全称墨境流芳，仓库 `mojing-liufang`）的目标不是堆页面，而是一条完整链路：

**观展 → 创作 → 学习 → 归档 → 运营**

技术选型据此收敛：前端 Vue 3 + TypeScript + Three.js 负责沉浸体验；后端 Spring Boot 3.2 + MyBatis-Plus 负责展品、用户与异步任务；WebSocket 负责工坊进度。Redis / MQTT / 云端生图都是可选增强，默认不能绑死演示。

## 仓库怎么拆

| 目录 | 职责 |
|------|------|
| `frontend/` | SPA、展馆 UI、`scene.ts` 场景内核、工坊 / 课堂 / 空间 |
| `frontend/src/scene/` | 行走控制、展品拾取、灵兽 JL 宿主等子模块 |
| `frontend/src/composables/` | `useGallery` / `useWorkshop` / `useWebSocket` / `useUser` |
| `backend/` | REST、异步 AI 任务、WebSocket、文件存储、GLB/STL 导出 |
| `backend/.../db/` | `schema.sql` + `data.sql` 种子（3 展区、约 10 展品、4 课 12 课时） |

当前可演示展区 ID 为 **1 山水 / 2 书法 / 5 灵兽**；旧 3、4 区已在种子数据中下线。作品集应写「三区可演示」，而不是「六区完整交付」。

## 观展主链路（真实启动顺序）

```
AppShell 挂载
  → 预拉千里江山贴图
  → connect WebSocket（/ws/scene）
  → ensureSession（游客或登录，token 进 localStorage）
  → initGallery
       GET /api/area/config
       GET /api/exhibit/list?areaId=
  → HeroSection 创建 createInkwashScene(container)
  → 切区 / 行走 / 导览 → scene.ts 状态机
  → 选展品 → 可选 POST /api/ai/appraise
```

`GalleryView` 本身偏薄，三维逻辑集中在 `HeroSection` + 约 **3200 行**的 `scene.ts`。可以把 `scene.ts` 理解成「展馆运行时内核」：相机、后处理、展区主题、沉浸/行走分叉、FPS 自适应都在这里。

切区时核心是换主题与默认机位，并按需预热灵兽栈：

```typescript
function applyAreaTheme(areaId?: number | null) {
  currentAreaId = areaId || 1;
  if (currentAreaId === CREATURE_AREA_ID) creatureJl.preload();
  defaultCameraPos.set(
    0,
    currentAreaId === 1 ? 2.1 : 1.85,
    currentAreaId === 1 ? 9.5 : 7.6
  );
  if (currentAreaId === 2) applyCalligraphySheets(lastSyncedExhibits);
  else if (lastSyncedExhibits.length > 0) syncAreaInstallations(lastSyncedExhibits);
}
```

灵兽区不塞进主 Three.js 场景，而是独立 `three-jl` canvas——避免后处理与粒子系统互相拖垮。细节见 [双 WebGL 栈](/blog/21)。

## 工坊主链路：本地先反馈，云端是增强层

用户上传后如果同步干等云端，体验会直接断。工坊拆成：

1. 浏览器 `renderLocalInkWash` —— 立刻可预览  
2. `POST /api/ai/generate` —— 返回 `taskId`，状态待处理  
3. 后端线程池（MQTT 可选）跑 `runGenerate`  
4. WebSocket 推 `AI_PROGRESS` / `AI_DONE`，前端同时 **2s 轮询** `GET /api/ai/result/{taskId}`（最多约 40 次）  
5. 可选 `POST /api/ai/derivative` 导出程序化 GLB / STL  

后端生成逻辑的关键取舍是「有 Key 试云端，失败必回落本地」：

```java
private void runGenerate(String taskId, String styleType, String originUrl) {
  push("AI_PROGRESS", taskId, 12, null, null);
  if (aiProperties.openaiImageReady()) {
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
  push("AI_DONE", taskId, 100, resultUrl, null);
}
```

一句话：**工坊最快的反馈不是 WebSocket，而是浏览器里先跑完的本地水墨；云端是增强层，不是阻塞层。** 专题展开见 [水墨工坊异步链路](/blog/22)。

## 鉴权与演示模式

观展侧 token 走请求头 `X-User-Token`，路由守卫检查本地会话；运营后台走 `Authorization: Bearer`，拦截器只罩 `/api/admin/**`。观展业务接口在 Controller 内按需解析用户，而不是整站套完整 Spring Security——适合演示，不适合公网裸奔。

开发环境常开 `VITE_DEMO_FALLBACK=true`：展区/展品接口失败时回落硬编码数据，工坊上传失败也会给 mock taskId，避免答辩现场因后端未起而整站空白。正式表述应以 `false` 为产品默认，fallback 是工程韧性，不是「假装 AI 已成功」。

## 性能策略（概览）

两套画质体系并存：

- **用户档位**（流畅 / 标准 / 高清）：控制 pixelRatio、Bloom、水墨后处理、纹理上限，写入 `localStorage`  
- **行走自适应档**：按 FPS 降像素比与特效；行走模式会关掉会白屏的全屏 inkPost，保留双层渲染  

Hero 离屏时可暂停渲染；展区 chunk 与灵兽资源按进入时机预热。这些决定让「好看」和「笔记本上能跑」可以同时成立。

## 能力边界

| 不宜声称 | 实际情况 |
|----------|----------|
| 讯飞星火已驱动智能赏析 | `appraise()` 主路径为静态策展文案；`sparkAppraise()` 已实现但未接线 |
| 六展区全部上线 | 可演示为三区 |
| AR / 小程序 / 文创商城支付 | 本期未做 |
| Redis / MQTT 生产刚需 | 可选，默认可关 |
| GLB 为文物扫描建模 | 程序化简化卷轴 mesh，可下载可演示 |

## 踩过的坑（写进复盘才有用）

1. **行走 + 全屏 inkPost = 白屏**：行走档位必须关 inkPost，这是组合 bug 修复，不是理论优化。  
2. **外链缩略图 CORS 炸 WebGL**：种子与前端统一走本地 `/assets/exhibit/*`。  
3. **WebSocket 广播 + 多任务**：后端 Phase 1 全员广播，前端用 `taskId` 过滤，并忽略完成后的迟到进度，避免进度条回弹。  
4. **README 与代码不一致**：赏析文档写过星火 HTTP，实现仍以 static 为主——对外以代码为准。

## 收获

Web3D 全栈项目真正难的是三件事：**场景内核如何不散架、异步创作如何不断链、演示如何在无网无 Key 时仍能讲完**。墨境把这三件事做成可运行系统后，再谈粒子效果或模型名词才有意义。

深入阅读：[双 WebGL 栈与行走画质](/blog/21) · [水墨工坊异步管道](/blog/22)
