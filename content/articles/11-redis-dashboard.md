---
id: 11
title: "守望里的 Redis：状态机优先，统计缓存其次"
excerpt: "守望项目里 Redis 真正值钱的是夜间离床状态与老人异常标记；Dashboard 30 秒缓存只是顺手加速。别把它吹成时序数据库。"
category: "Java 后端"
tags: ["Redis","Dashboard","缓存","Spring Boot","守望"]
createdAt: 2026-05-12
updatedAt: 2026-07-18
featured: true
status: published
---

## 先纠正一个常见吹法

很多作品集写「Redis 时间序列存储传感器数据」。守望**没有**这么做。传感器/告警事实在 MySQL；Redis 做三件事：

1. **夜间离床状态机**（`night-bed-state:{elderId}`）
2. **老人异常标记**（告警产生后快速给大屏卡片用）
3. **Dashboard 统计短缓存**（约 30 秒 TTL）

分清主次，面试官会觉得你懂边界。

## 状态机为什么适合放 Redis

离床判断依赖「从什么时候开始不在床」「这条预警发过没有」。这些是**会话态**，不是报表态：

- 写频繁、读频繁
- 跨请求共享
- 可以设 12 小时过期，天亮自然丢弃

落 MySQL 行锁/频繁 update 反而重。Redis `opsForValue` 存序列化状态对象就够。

## Dashboard 缓存怎么做才不假

大屏数字如果永远吃缓存，处置完告警数字不动——演示翻车。守望做法是：

- 读：先 Redis，未命中再聚合 MySQL，回填短 TTL
- 写：告警生成/处理后**删掉或覆盖** `dashboard:stats`，必要时直接 WS 推新统计

原则：**DB 是真相，Redis 是快照；写路径负责让快照失效。**

## Key 约定（可读比炫技重要）

```
night-bed-state:{elderId}
elder:abnormal:{elderId}
dashboard:stats
```

后期排查「为什么这个老人还红着」时，直接 `GET` 对应 key，比翻日志快。

## 踩坑

- 状态对象反序列化类型不对时要兜底 `new State()`，别 NPE 把整条告警链路打挂  
- 不要把「所有传感器历史」塞 Redis——体积和过期策略都会炸  
- 小程序不读这些 key，只读 API；缓存策略是为后台热路径服务的  

## 一句话

在守望里，Redis 的高光是**状态机**，不是缓存中间件名词。统计缓存是锦上添花；没有状态机，这个项目就只剩 CRUD。
