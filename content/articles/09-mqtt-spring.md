---
id: 9
title: "守望的 MQTT：可插拔接入，而不是强依赖"
excerpt: "守望默认用 HTTP mock 跑通告警闭环；MQTT 订阅写好但默认关闭。说清 Topic、入库复用与选型边界，避免和引路的 HTTPS 混谈。"
category: "物联网"
tags: ["Spring Boot","MQTT","物联网","设备上报","守望"]
createdAt: 2026-06-08
updatedAt: 2026-07-18
featured: true
status: published
---

## 为什么做成「可开关」

答辩环境常常没有稳定 Broker。如果启动就必须连 MQTT，演示第一分钟就挂。守望的策略是：

- `mqtt.enabled=false` 时整段接入不加载（`@ConditionalOnProperty`）
- 告警主路径：HTTP mock、行为接口、设备心跳离线检测
- 打开开关后，MQTT 消息**走进同一套 `AlarmService`**，不另起炉灶

这叫可插拔，不叫「假接入」。

## 和引路项目别混

| 项目 | 实际上报 |
|------|----------|
| 守望 | HTTP 为主，MQTT 可选 |
| 引路（慧杖） | ESP32 **HTTPS POST**，仓库无 MQTT |

面试被问「你们物联网是不是都用 MQTT」时，按项目答，比背协议强。

## 接入后要复用业务，不要只 printf

订阅到 payload 后，正确姿势是反序列化 → 调用已有 ingest：

```java
AlarmEvent event = objectMapper.readValue(payload, AlarmEvent.class);
alarmService.processAlarmMessage(event); // 落库 + Redis + WS
```

MQTT 只是**入口**，不是业务本身。QoS、遗嘱、重连都重要，但作品集阶段先保证「进来的消息能变成大屏上的告警」。

## Topic 示例（守望向）

```
elder/sensor/+/alarm
```

用 `+` 吃多设备，解析出 `deviceId` / `elderId` 再路由。指令下发可以以后再做——单向上报已经够演示闭环。

## 选型表

| 场景 | 更合适 |
|------|--------|
| 多设备、要 Broker、要遗嘱离线 | MQTT |
| 设备能直连、协议求简单（引路） | HTTPS |
| 课堂/作品集演示 | HTTP mock + 可选 MQTT |

## 收获

协议选型服务业务闭环。守望证明：你可以认真写 MQTT 代码，同时诚实地说「默认没开」——这比假装「全链路 MQTT 已上生产」可信得多。
