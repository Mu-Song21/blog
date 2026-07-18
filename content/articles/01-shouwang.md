---
id: 1
title: "守望：独居老人非接触式居家主动守护系统实践"
excerpt: "告警落库、Redis 夜间离床状态机、WebSocket 大屏推送与处置闭环如何串起来：对照真实入口（行为接口 / mock / 可选 MQTT），写清三端分工与不宜夸大的边界。"
category: "物联网"
tags: ["Spring Boot","Redis","WebSocket","JPA","微信小程序","Vue 3"]
createdAt: 2025-12-15
updatedAt: 2026-07-18
featured: true
status: published
---

## 一开始想清楚的问题

独居场景里，家属真正怕的不是「少看一个温湿度」，而是：**异常发生后有没有人看见、有没有人处理完**。所以守望的目标不是传感器展览馆，而是一条可演示闭环：

**上报 → 判断 → 落库 → 推送 → 处置**

仓库拆成三端：Spring Boot API（默认端口 8181）、Vue 3 监控大屏、微信小程序家属端。没有真实毫米波固件时，用 HTTP mock / 行为接口 / 心跳把链路跑通。

## 系统怎么串

```
行为上报 / HTTP mock /（可选）MQTT
        ↓
   AlarmService.processAlarmMessage（异步线程池）
   ├─ MySQL：告警事实 + 老人异常标记
   ├─ Redis：elder:abnormal:{id}、夜间离床状态、dashboard:stats（约 30s）
   └─ WebSocket /ws/alarm → 大屏（ALARM + STATS）
        ↓
   小程序 HTTP：未处理列表、一键处置
```

取舍：

- **演示主路径用 HTTP**；MQTT 有代码但默认 `mqtt.enabled=false`  
- **大屏走 WebSocket**（另有 10s 轮询兜底）；小程序只用 `wx.request`  
- **通知家属**：处置时写库内 SYSTEM 通知，不是短信 / 订阅消息推送  

## 夜间离床状态机（辨识度最高的一段）

入口：`POST /api/behavior/night-bed-state` → `NightBedStateService`。Redis key：`night-bed-state:{elderId}`，TTL 12 小时。夜间窗口约 22:00–06:00。

状态字段包括：`absentStartTime`、`bedLeaveAlarmSent`、`potentialRiskAlarmSent` 等。升级规则：

- 离床累计 ≥ 10 分钟且未发过：`BED_LEAVE` 预警（只发一次）  
- ≥ 30 分钟且门磁未开且未发过：`POTENTIAL_RISK` 紧急告警  

```java
long absentMinutes = Duration.between(
    LocalDateTime.parse(state.getAbsentStartTime()), now).toMinutes();

if (absentMinutes >= BED_LEAVE_MINUTES && !state.isBedLeaveAlarmSent()) {
    alarmService.processAlarmMessage(buildAlarm(..., AlarmType.BED_LEAVE, ...));
    state.setBedLeaveAlarmSent(true);
}
if (absentMinutes >= POTENTIAL_RISK_MINUTES
        && !Boolean.TRUE.equals(dto.getDoorOpened())
        && !state.isPotentialRiskAlarmSent()) {
    alarmService.processAlarmMessage(buildAlarm(..., AlarmType.POTENTIAL_RISK, ...));
    state.setPotentialRiskAlarmSent(true);
}
redisTemplate.opsForValue().set(key, state, 12, TimeUnit.HOURS);
```

这比空写「规则引擎」实在：状态在 Redis，升级条件可读，靠布尔位防抖，避免刷屏。

## 告警落库之后发生什么

`processAlarmMessage`（`@Async`）同步路径大致是：

1. `saveAlarm` → MySQL  
2. `updateElderAbnormalStatus` → Redis + 老人表异常标记  
3. `invalidateStatsCache` → 删 Dashboard 缓存  
4. `broadcast(ALARM)` + `broadcast(STATS)` → 大屏  

处置接口 `handleAlarm` 才写处理人、结果、是否通知家属与耗时。**告警刚产生时不会自动推微信**——作品集别写成「紧急自动通知家属」。

## 能力边界

| 不宜声称 | 实际情况 |
|----------|----------|
| 硬件守护终端已交付 | 无固件仓库；设备类型是数据标签 |
| Redis 时序存传感器 | Redis 做状态机 / 异常标记 / 短缓存 |
| MQTT 已全面接入 | 默认可关；Broker 挂了应用仍可启动 |
| 小程序实时长连接 | 仅 HTTP |

## 踩过的坑

1. 小程序 `api.js` 曾写死 `8080`，后端实际 `8181`——联调先对端口。  
2. 仓库里有未接线的 `WebSocketPushService` / `RedisStatusService`，写文章要以实际注入路径为准。  
3. 前端 WS 重连是固定约 3s，不是指数退避；大屏轮询与 WS 并存，WS 是增强不是唯一真相源。

## 收获

物联网后台的竞争力往往不在协议名词，而在：**状态怎么存、告警怎么升级、人怎么收尾**。

专题：[WebSocket 推送](/blog/10) · [Redis 状态机](/blog/11) · [可插拔 MQTT](/blog/9)
