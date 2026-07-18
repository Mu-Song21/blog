---
id: 11
title: "Redis 在智慧养老 Dashboard 中的缓存实践"
excerpt: "结合老人异常状态、设备在线状态和数据看板统计，说明 Redis 在智慧养老后台中的缓存设计和失效策略。"
category: "Java 后端"
tags: ["Redis","Dashboard","缓存","Spring Boot","智慧养老"]
createdAt: 2026-05-08
updatedAt: 2026-05-08
featured: true
status: published
---

## Dashboard 为什么需要缓存

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

```
elder:abnormal:{elderId}
device:status:{deviceId}
dashboard:stats
alarm:latest:{deviceId}
notification:unread:count
```

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

- 新告警生成后删除 `dashboard:stats`
- 告警处理后删除 `dashboard:stats`
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

Redis 在智慧养老系统中最适合承担“状态缓存”和“统计加速”的角色。它能显著提升 Dashboard 响应速度，但必须配合合理的 Key 设计和主动失效策略，才能兼顾性能和数据准确性。
