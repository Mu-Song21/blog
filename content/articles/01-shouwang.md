---
id: 1
title: "守望：独居老人非接触式居家主动守护系统实践"
excerpt: "不是堆传感器名词，而是把告警落库、Redis 夜间离床状态机、WebSocket 大屏推送和处置闭环真正串起来——守望项目的工程复盘。"
category: "物联网"
tags: ["Spring Boot","Redis","WebSocket","JPA","微信小程序","Vue 3"]
createdAt: 2025-12-15
updatedAt: 2026-07-18
featured: true
status: published
---

## 一开始想清楚的问题

独居场景里，家属真正怕的不是「少看一个温湿度」，而是：**异常发生后有没有人看见、有没有人处理完**。所以守望的目标不是做一个传感器展览馆，而是一条可演示的闭环：

**上报 → 判断 → 落库 → 推送 → 处置**

仓库拆成三端：Spring Boot API、Vue 3 监控大屏、微信小程序家属端。没有真实毫米波固件时，用 HTTP mock / 心跳模拟把链路跑通。

## 架构怎么落

```
HTTP mock / 心跳 /（可选）MQTT
        ↓
   AlarmService
   ├─ MySQL 告警事实
   ├─ Redis 异常状态 / 夜间离床状态 / Dashboard 缓存
   └─ WebSocket → 大屏（ALARM + STATS）
        ↓
   小程序 HTTP 查告警、一键处理
```

取舍很明确：

- **演示主路径用 HTTP**，MQTT 代码写了但默认关掉——避免「没 Broker 就跑不起来」
- **大屏走 WebSocket**，小程序仍用 HTTP——家属端交互低频，不必硬上长连接
- **通知是库内 SYSTEM 记录**，不是短信/订阅消息——先把处置流程做完，再谈通道

## 真正有辨识度的点：夜间离床状态机

一次性阈值判断（「离床就报警」）误报太多。守望用 Redis 存夜间状态，按时间升级：

- 夜间且无在床：开始累计离床时长
- ≥ 10 分钟：离床预警（只发一次，靠 `bedLeaveAlarmSent` 防抖）
- ≥ 30 分钟且门磁未开：升级潜在风险紧急告警

关键逻辑类似：

```java
if (absentMinutes >= 10 && !state.isBedLeaveAlarmSent()) {
    alarmService.processAlarmMessage(...BED_LEAVE...);
    state.setBedLeaveAlarmSent(true);
}
if (absentMinutes >= 30 && !doorOpened && !state.isPotentialRiskAlarmSent()) {
    alarmService.processAlarmMessage(...POTENTIAL_RISK...);
    state.setPotentialRiskAlarmSent(true);
}
redisTemplate.opsForValue().set(key, state, 12, TimeUnit.HOURS);
```

这比「规则引擎」四个字实在：状态在 Redis，升级条件可读，告警不重复刷屏。

## 告警闭环为什么重要

只生成告警不够。运营大屏上需要：

- 谁处理的、结果是什么、要不要记通知
- 今日处置数、平均耗时——给演示和 Dashboard 用

家属小程序可以拉未处理列表并处理。**「通知家属」在本项目里是写通知表**，不是真推微信，写作品集时别夸大。

## 踩过的坑

1. **Redis 用途别写成时序库**——这里是状态与短时统计缓存，不是存传感器曲线  
2. **MQTT 有代码 ≠ 已量产接入**——默认关，面试时要主动说清  
3. **设备类型是数据标签**（毫米波/门磁等），没有固件仓库——诚实比堆硬件名词更安全  

## 收获

物联网后台的核心竞争力，往往不是协议名词，而是：**状态怎么存、告警怎么升级、人怎么收尾**。守望把这三段跑通后，再做引路、颐康云时，设计实时链路会快很多。
