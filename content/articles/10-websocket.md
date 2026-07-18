---
id: 10
title: "WebSocket 实现实时告警推送"
excerpt: "从告警生成到前端实时刷新，记录 Spring Boot + WebSocket 在智慧养老和智能硬件项目中的实践方案。"
category: "Java 后端"
tags: ["WebSocket","Spring Boot","实时告警","智慧养老","Vue"]
createdAt: 2026-05-26
updatedAt: 2026-05-26
featured: true
status: published
---

## 为什么需要 WebSocket

在告警系统中，用户最关心的是“异常发生后能不能马上看到”。如果前端只依赖定时轮询，告警延迟取决于轮询间隔，既浪费资源，也不够实时。

WebSocket 可以在浏览器和后端之间建立长连接，后端一旦生成告警，就可以主动推送给前端管理后台或家属端。

## 典型业务场景

在智慧养老项目中，实时推送主要用于：

- 新告警生成后推送到告警管理页
- Dashboard 统计卡片自动刷新
- 设备离线、跌倒、长时间无活动等异常提醒
- 告警处理后同步更新状态，避免前端出现重复数据

## 后端推送流程

完整链路如下：

1. 设备数据进入后端
2. Service 判断是否异常
3. 生成 Alarm 告警记录
4. 保存数据库
5. 调用 WebSocket 推送方法
6. 前端收到消息后更新页面状态

```java
public void broadcastAlarm(Alarm alarm) {
    Map<String, Object> message = new HashMap<>();
    message.put("type", "ALARM");
    message.put("alarm", alarm);
    message.put("timestamp", System.currentTimeMillis());
    sessions.forEach(session -> sendMessage(session, message));
}
```

## 消息格式设计

建议所有 WebSocket 消息都带上 `type` 字段：

```json
{
  "type": "ALARM",
  "alarm": {
    "id": 1001,
    "alarmType": "跌倒报警",
    "status": "UNHANDLED"
  },
  "timestamp": 1715320000000
}
```

这样前端可以根据不同类型分发处理：

- `ALARM`：新增或更新告警
- `STATS`：刷新统计数据
- `DEVICE_STATUS`：更新设备在线状态
- `NOTIFICATION`：刷新通知中心

## 前端处理建议

前端不要简单地把收到的告警直接 push 到数组里，否则处理状态变化时容易出现重复。更好的做法是：

- 如果列表中已有同 ID 告警，则更新
- 如果没有，则插入到列表顶部
- Dashboard 统计数据使用后端推送的最新值覆盖

## 心跳与断线重连

WebSocket 项目一定要考虑连接稳定性：

- 前端定时发送心跳或监听连接状态
- 断开后延迟重连，避免频繁重试
- 后端关闭无效 Session，避免内存泄漏
- 页面刷新或退出时主动关闭连接

## 总结

WebSocket 的价值在于把“被动刷新”变成“主动推送”。对于智慧养老和智能盲杖项目来说，它让告警、设备状态和统计数据具备实时性，是管理后台体验提升最明显的一环。
