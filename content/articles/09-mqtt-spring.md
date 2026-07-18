---
id: 9
title: "守望的 MQTT：可插拔接入，而不是强依赖"
excerpt: "mqtt.enabled 默认 false；打开后订阅 elder/sensor/+/alarm，解析进同一套 AlarmService。对照引路的 HTTPS 上报，说清 Topic、条件装配与选型边界。"
category: "物联网"
tags: ["Spring Boot","MQTT","物联网","设备上报","守望"]
createdAt: 2026-06-08
updatedAt: 2026-07-18
featured: true
status: published
---

## 为什么做成可开关

答辩环境常常没有稳定 Broker。守望用 Eclipse Paho，配置：

```yaml
mqtt:
  enabled: false   # 默认关
  # broker: tcp://localhost:1883
```

`MqttConfig` 带 `@ConditionalOnProperty(prefix="mqtt", name="enabled", havingValue="true", matchIfMissing=false)`。Broker 连不上时打 warn、bean 可为 null，**应用照样启动**——演示主路径仍是 HTTP mock 与行为接口。

## 接入后必须复用业务

订阅 Topic 示例：`elder/sensor/+/alarm`。收到 payload 后：

```java
AlarmMessageDTO dto = objectMapper.readValue(payload, AlarmMessageDTO.class);
alarmService.processAlarmMessage(dto); // 落库 + Redis + WS
```

MQTT 只是入口，不是第二套告警系统。指令下发、遗嘱、QoS 精细治理可以后补；作品集阶段先保证「进来的消息能变成大屏告警」。

## 和引路别混谈

| 项目 | 实际上报 |
|------|----------|
| 守望 | HTTP 为主，MQTT 可选 |
| 引路（慧杖） | ESP32 **HTTPS POST**，仓库无 MQTT 主路径 |

面试被问「是不是物联网都用 MQTT」时，按项目答。

## 小结

可插拔 = 认真写了接入代码，同时诚实说默认没开。这比假装「全链路 MQTT 已上生产」可信。总览见 [守望实践](/blog/1)。
