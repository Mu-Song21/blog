---
id: 10
title: "守望里的 WebSocket：告警一生成，大屏就刷新"
excerpt: "以守望项目为例：告警落库后广播 ALARM/STATS，前端按 type 分发；小程序继续走 HTTP。记录心跳重连和消息去重的实际做法。"
category: "Java 后端"
tags: ["WebSocket","Spring Boot","实时告警","守望","Vue"]
createdAt: 2026-05-26
updatedAt: 2026-07-18
featured: true
status: published
---

## 业务上为什么必须推

守望大屏如果 5 秒轮询一次统计，演示时「离床告警已经生成了，卡片还是旧的」——体感很差。告警是**事件**，适合推送；轮询更适合低频列表。

所以守望约定：

- **Vue 大屏**：连 `/ws/alarm`，收推送
- **小程序**：继续 `wx.request`，不做长连接（实现成本与收益不匹配）

## 推送挂在业务尾部，而不是单独玩 Demo

`AlarmService` 在告警入库、更新 Redis 异常标记之后，再广播两类消息：

```java
webSocketService.broadcast(WebSocketMessage.of("ALARM", alarmView));
webSocketService.broadcast(WebSocketMessage.of("STATS", dashboardService.getDashboardStats()));
```

连接建立时也会先推一帧 `STATS`，避免大屏白屏等下一次告警。

## 消息契约：先定 type

```json
{ "type": "ALARM", "data": { "id": 1001, "alarmType": "BED_LEAVE", "level": "WARNING" } }
{ "type": "STATS",  "data": { "unhandledToday": 3, "onlineDevices": 12 } }
```

前端按 `type` 分发：告警列表 upsert（同 id 更新，没有则插顶），统计区整表覆盖。**不要无数组盲目 push**，否则处理后状态会重复。

## 心跳与重连（大屏侧）

演示环境 Wi-Fi 不稳时，最常见故障是「推送静默失败」：

- 前端定时 PING，服务端 PONG
- 断开后指数退避重连，避免打爆后端
- `afterConnectionClosed` / 传输错误里从 `CopyOnWriteArraySet` 摘掉 session，防泄漏

这些不写进简历也行，但答辩被问「断线怎么办」时要答得出来。

## 和引路项目的对比

引路（慧杖护行）同样用 `/ws/alarm`，但事件更杂：围栏、AI 唤醒、路口辅助等。模式一样——**业务产生事件 → 统一 WS 出口 → 多端订阅**。协议选型（HTTP/MQTT）可以变，推送层尽量稳。

## 取舍

| 做法 | 为什么 |
|------|--------|
| 大屏 WS + 小程序 HTTP | 家属端交互少，省复杂度 |
| 告警与统计一起推 | 一次事件两边 UI 一致 |
| 不接第三方推送通道 | 作品集阶段先保证「看见」和「处理」 |

WebSocket 的价值很朴素：把「刷新一下才知道出事了」变成「出事的那一秒屏幕就变了」。
