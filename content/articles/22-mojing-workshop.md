---
id: 22
title: "墨境水墨工坊：本地预览、异步生成与 WebSocket 双通道"
excerpt: "从 useWorkshop 双稿策略到 AiServiceImpl 云端回落本地，再到 /ws/scene 广播与轮询兜底：把工坊写成可演示的异步管道，并分清赏析与文创导出的真实能力。"
category: "数字文化"
tags: ["墨境","水墨工坊","WebSocket","Spring Boot","Canvas","异步任务","AI"]
createdAt: 2026-07-15
updatedAt: 2026-07-18
featured: false
status: published
---

## 体验约束：不能让上传变成「假死」

水墨工坊的目标用户会在答辩或演示现场点「生成」。如果同步等待云端生图几十秒，页面像卡死，再好看的卷轴预览也来不及讲。

因此前端 `useWorkshop` 把反馈拆成两层：

1. **本地稿**：`renderLocalInkWash(file, style)` 立刻出可交互预览  
2. **云端/后端稿**：上传后拿 `taskId`，用 WebSocket + 轮询收最终结果  

本地稿失败也不阻塞提交；云端失败时仍可保留本地预览继续讲解。这是「双稿」策略，不是重复实现两套产品。

## 端到端流水线

```
选择图片 / 风格
  → Canvas 本地水墨预览（秒级）
  → POST /api/ai/generate（multipart）
       返回 taskId, status=0
  → 后端写入 ai_generate_record
       → 线程池执行（MQTT 可选桥接）
  → runGenerate：
       有 OpenAI 兼容 Key → 试云端生图
       失败或无 Key → InkWashImageProcessor 本地水墨
  → WS 广播 AI_PROGRESS / AI_DONE
  → 前端过滤 taskId；同时每 2s 轮询 /api/ai/result/{taskId}
  → 可选 POST /api/ai/derivative → GLB + STL
```

任务状态码约定：`0` 待处理 / `1` 处理中 / `2` 成功 / `3` 失败。异步线程池大致为 core=4、max=8、queue=50，避免把 Tomcat 工作线程直接拿去跑图像。

## 后端：生成接口只负责「接单」

```java
public Map<String, Object> generate(MultipartFile file, String styleType, UserAuth user) {
  String taskId = "G" + /* 时间戳 + UUID */;
  // 存原图、写 PENDING 记录
  mqttAiBridge.publishSubmit(taskId, styleType, originUrl);
  // MQTT 未启用时，桥接层会直接丢进 aiTaskExecutor
  return Map.of("taskId", taskId, "status", STATUS_PENDING, "originUrl", originUrl);
}
```

真正耗时的工作在 `runGenerate`：先推一段进度，再尝试云端；任何异常都回落 Java 本地水墨，并带上可读 note。对外保证的是「最终有图」，而不是「必须是某家模型」。

## 前端：WebSocket + 轮询，为什么要两套

后端 `ProgressWebSocketHandler` 在 Phase 1 选择**向所有连接广播**，前端用 `taskId` 过滤。这样实现简单，但多用户同场演示时必须写清：消息不是按订阅隔离的。

```typescript
socket = new WebSocket(`${wsHost()}/ws/scene`);

if (payload.type === 'AI_PROGRESS' && typeof payload.percent === 'number') {
  if (!generating.value || progressValue.value >= 100) return; // 忽略迟到进度
  progressValue.value = Math.min(Math.max(payload.percent, progressValue.value), 96);
}
```

仅靠 WS 不够稳——断线、代理、页面后台都可能导致丢消息。于是轮询作为第二条腿：每 2 秒查一次结果，最多约 40 次（约 80 秒超时）。进度条取「本地推进」与「服务端 percent」的较大值，并在完成后丢掉迟到的 `AI_PROGRESS`，避免 UI 出现「文案已完成、条还在 28%」。

## 文创导出：程序化 mesh，不是扫描建模

`POST /api/ai/derivative` 根据生成记录拼卷轴几何，经网格优化后写出 GLB，并可用加厚策略导出面向打印的 ASCII STL。前端在演示 fallback 模式下甚至可以用样例 GLB / 简易 STL，保证「导出按钮」可点。

适合写进简历的表述是：**可下载的程序化文创文件**。不适合写的是：文物级三维重建或商城 SKU 流水线。

## 智能赏析：代码与文档的缺口

仓库里有较完整的 `sparkAppraise()`（含额度失败回落），但 `appraise()` 入口当前走 `mockAppraise()`，返回 `provider: "static"`。展馆里的打字动效主要服务策展文案演示。

写作品集时应主动说清：

- 工坊：本地算法 + 可选云端生图，链路真实  
- 赏析：静态文案演示，星火未接主路径  

把「写了但没接线」当成复盘素材，比假装全 AI 更有说服力。

## 演示 fallback 与工坊的关系

`VITE_DEMO_FALLBACK=true` 时，上传失败会返回 `mock-` 前缀 taskId。前端识别后**不会伪装成 AI 已成功**，避免演示撒谎。收藏同步在 demo 模式下失败返回 `null` 而非空数组，以免冲掉本地收藏——这类细节才是「答辩不断链」的工程内容。

## 小结

工坊的核心不是模型品牌，而是一条可讲解的异步管道：

**本地预览保体验 → 任务化保吞吐 → WS+轮询保可达 → 本地水墨保兜底**

完整项目上下文见 [墨境工程实践](/blog/20)，场景内核见 [双 WebGL 栈](/blog/21)。
