---
id: 13
title: "引路：ESP32 与后端到底怎么握手"
excerpt: "固件 HTTPS 报数、后端落库与规则判断、WebSocket 通知多端。补充 SOS / AI 唤醒，并说明为何不用 MQTT。"
category: "物联网"
tags: ["智能盲杖","ESP32","HTTPS","Spring Boot","WebSocket"]
createdAt: 2026-03-18
updatedAt: 2026-07-18
featured: false
status: published
---

## 分工

| 层 | 职责 |
|----|------|
| ESP32 | 采数、本地避障反馈、SOS、按键唤醒上报 |
| Spring Boot | 存数、跌倒/围栏、告警、WS 广播 |
| 管理端 / 小程序 | 看见与处置、语音助手 |

硬件不负责「全家桶业务」，后端不负责「替你避障」。

## 上报长什么样

周期 POST JSON，核心字段大致是：

```json
{
  "deviceId": "ESP32_001",
  "obstacleDistance": 0.6,
  "accelX": 0.1,
  "accelY": 0.2,
  "accelZ": 2.5,
  "latitude": 30.2741,
  "longitude": 120.1551
}
```

后端写入 `sensor_data`，再跑规则。联调期大量依赖**设备模拟接口**——没带板子也能推围栏和跌倒演示。

## 为什么是 HTTPS 不是 MQTT

当时设备直连云、链路求简单，HTTPS + REST 足够。MQTT 要 Broker 运维，守望那种「可开关」更合适做可选增强，而不是引路的硬依赖。

双向能力怎么补？

- HTTP 响应里可带控制字段（蜂鸣/震动提示类）
- 应用层事件（安抚、目的地、AI 唤醒）走 **WebSocket 到手机端**，不一定非要下发到杆子上的 MQTT command

## SOS 与 AI 唤醒

- SOS：独立接口上报，生成紧急事件并推送
- AI 唤醒：按键 → 后端 → WS → 小程序打开明眼助手

这比「远程刷固件下发语音」现实——用户交互面在手机上。

## 小结

引路硬件交互的关键词是：**HTTPS 报数、规则在云、事件用 WS**。把这三句讲顺，比贴一张「四层物联网架构」空图有用。
