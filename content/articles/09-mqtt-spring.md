---
id: 9
title: "Spring Boot 如何接入 MQTT 实现设备数据上报"
excerpt: "以守望（独居守护）中的可插拔 MQTT 接入为背景，梳理 Topic 设计、消息订阅、JSON 解析与进入告警业务闭环的流程；并说明引路盲杖实际走 HTTPS 上报。"
category: "物联网"
tags: ["Spring Boot","MQTT","物联网","设备上报","守望"]
createdAt: 2026-05-10
updatedAt: 2026-07-18
featured: true
status: published
---

## 为什么选择 MQTT

在独居守护这类物联网场景里，设备端常有网络不稳、包小、上报频的特点。相比纯轮询，MQTT 适合作为**可插拔的设备接入层**：轻量、发布订阅解耦、可设 QoS。

> 作品集边界：守望仓库已实现 MQTT 订阅代码，默认配置可关闭，演示主路径仍是 HTTP 模拟告警；引路（慧杖护行）固件实际走 **HTTPS POST**，不要混写成「盲杖已用 MQTT」。

## 通信架构（守望向）

可设计为：

- 设备 / 网关发布到 `elder/sensor/{deviceId}/alarm`
- Spring Boot 在 `mqtt.enabled=true` 时订阅并解析
- 复用已有 `AlarmService`：落库 → Redis 异常状态 → WebSocket 推送
- HTTP mock / 心跳离线检测与 MQTT 入口汇合到同一业务闭环

## Topic 设计示例

| Topic | 方向 | 说明 |
| --- | --- | --- |
| `elder/sensor/+/alarm` | 设备到后端 | 告警 / 传感器事件 |
| `elder/device/{id}/command` | 后端到设备 | 可选指令下发（扩展） |

层级清晰时，后端可用 `+` 订阅多设备，再按 deviceId 路由到业务 Service。

## 后端处理流程

1. 获取 Topic 与 Payload  
2. JSON 反序列化为 DTO  
3. 调用与 HTTP 入口相同的告警 / 行为 Service（避免两套逻辑）  
4. 异常消息记日志，关键事件考虑幂等  

```java
public void handleMessage(String topic, String payload) {
    AlarmEvent event = objectMapper.readValue(payload, AlarmEvent.class);
    alarmService.ingest(event); // 与 HTTP mock 共用
}
```

## 与 HTTPS 上报如何选型

| 方案 | 更合适的场景 |
| --- | --- |
| HTTPS POST | 设备已能直连云、协议简单（如引路 ESP32） |
| MQTT | 多设备、需 Broker、要遗嘱离线与 QoS |

同一后端可以**同时预留两种接入**，业务层只认「事件入站」。

## 可靠性要点

- 关键告警可用 QoS 1；后端对重复消息做幂等  
- 设备重连与遗嘱消息感知异常离线  
- 解析失败落日志，便于排查固件字段  

## 总结

MQTT 的价值不是「必须上」，而是让设备数据**干净地进入现有业务闭环**。守望：MQTT 可开关 + WebSocket 展示；引路：HTTPS 上报 + WebSocket 监护——按项目诚实选型即可。
