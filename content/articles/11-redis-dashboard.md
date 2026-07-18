---
id: 11
title: "守望里的 Redis：状态机优先，统计缓存其次"
excerpt: "夜间离床 night-bed-state、老人异常标记、Dashboard 30 秒缓存——写清 key、TTL 与防抖字段，纠正「Redis 时序库」的常见吹法。"
category: "Java 后端"
tags: ["Redis","Dashboard","缓存","Spring Boot","守望"]
createdAt: 2026-05-12
updatedAt: 2026-07-18
featured: true
status: published
---

## 先纠正一个常见吹法

很多作品集写「Redis 时间序列存储传感器数据」。守望**没有**这么做。传感器 / 告警事实在 MySQL；Redis 做三件事：

| Key / 用途 | 作用 |
|------------|------|
| `night-bed-state:{elderId}` | 夜间离床状态机（TTL 12h） |
| `elder:abnormal:{elderId}` | 告警后的异常标记，供大屏卡片 |
| `dashboard:stats` | 统计短缓存（约 30s TTL） |

另有一份未接线的 `RedisStatusService`（`elder:status:` 等），写文章不要引用成主路径。

## 状态机为什么适合放 Redis

夜间离床需要跨多次上报记住：什么时候开始离床、预警发过没有、风险告警发过没有。这些是**短期会话状态**，放 Redis 读写快、带 TTL 自然过期；MySQL 继续存「发生过哪些告警」这一事实。

防抖靠状态里的布尔位（`bedLeaveAlarmSent` / `potentialRiskAlarmSent`），避免每分钟刷一条同质告警。

## Dashboard 缓存怎么失效

统计接口读 `dashboard:stats`；有新告警时 `invalidateStatsCache()` 删掉 key，下次查询重建。TTL 约 30 秒，是顺手加速，不是架构亮点——亮点仍是夜间状态机。

## 和 MySQL 的分工一句话

- MySQL：**事实**（告警记录、处置结果）  
- Redis：**过程状态**（离床观测、异常标记、短统计）  

把两者写反，面试一问就穿帮。总览见 [守望实践](/blog/1)。
