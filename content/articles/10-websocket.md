---
id: 10
title: "守望里的 WebSocket：告警一生成，大屏就刷新"
excerpt: "端点 /ws/alarm，消息类型 ALARM / STATS；落库后广播，连上先推一帧统计。对照大屏订阅与小程序 HTTP，以及轮询兜底、固定重连等实现细节。"
category: "Java 后端"
tags: ["WebSocket","Spring Boot","实时告警","守望","Vue"]
createdAt: 2026-05-26
updatedAt: 2026-07-18
featured: true
status: published
---

## 业务上为什么必须推

大屏若只靠轮询，演示时经常出现「告警已入库，卡片还是旧的」。告警是事件，适合推送；列表类查询仍可 HTTP。

守望约定：

- 端点：`/ws/alarm`（`WebSocketConfig` + `AlarmWebSocketHandler`）  
- 包络：`type` + `data` + `timestamp`  
- 生产类型：**`ALARM`**、**`STATS`**  
- 心跳：客户端 `PING` → 服务端原文 `PONG`  

连上后立即推一帧 `STATS`，避免空白仪表盘。

## 谁在听，谁不听

Vue 大屏：

```javascript
wsClient.connect('ws://localhost:8181/ws/alarm')
wsClient.on('ALARM', (data) => alarmStore.addAlarm(data))
wsClient.on('STATS', (data) => alarmStore.updateStats(data))
```

同时仍有约 **10 秒** HTTP 轮询——WS 断线时页面不至于全瞎。

微信小程序：**没有** WebSocket 代码，一律 `wx.request`。家属端交互低频，硬上长连接收益有限。

## 和业务怎么接

告警写入后走 `broadcastAlarmAndStats()`：先失效 `dashboard:stats` 缓存，再广播 ALARM 与最新 STATS。MQTT / mock / 夜间离床最终都汇入同一套 `AlarmService`，因此**推送入口只有一处**，不会每种上报各写一套 WS。

## 实现上的诚实细节

- 仓库里另有未使用的 `WebSocketPushService`（EMERGENCY 等类型）——以 `WebSocketService.broadcast` 为准。  
- 前端重连间隔固定约 3 秒，不是指数退避。  
- Vite 配了 `/ws` 代理，但大屏曾硬编码完整 `ws://localhost:8181/...`，部署时要注意环境。

## 小结

守望的实时性 = **事件推送 + 短轮询兜底**。小程序保持 HTTP，是复杂度与收益权衡后的结果，不是「不会做 WS」。
