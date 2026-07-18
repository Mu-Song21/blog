---
id: 13
title: "引路：ESP32 与后端如何用 HTTPS 握手"
excerpt: "固件周期 POST 传感器 JSON；后端入库、跌倒/围栏评估、WebSocket 通知。补充 SOS / AI 唤醒，说明为何不用 MQTT，以及模拟接口对联调的意义。"
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

## 上报长什么样

周期 `POST /api/sensor-data`，核心字段大致包括 `deviceId`、障碍距离、三轴加速度、经纬度。后端写入传感器表后 `evaluate()`：跌倒上升沿或围栏 `triggered` 时写告警并推送。

联调期大量依赖**设备模拟接口**——没带板子也能推围栏和跌倒演示。

## 为什么是 HTTPS 不是 MQTT

设备直连云、协议求简单时，HTTPS + REST 足够。MQTT 要 Broker 运维；守望那种「可开关」更适合做可选增强，而不是引路的硬依赖。

双向能力怎么补：

- HTTP 响应可带控制字段（蜂鸣/震动类提示）  
- 应用层事件（安抚、目的地、AI 唤醒）走 **WebSocket 到手机端**  

## SOS 与 AI 唤醒

- SOS：独立上报，生成紧急事件并推送  
- AI 唤醒：按键 → 后端 → WS → 小程序打开明眼助手  

用户交互面在手机上，比「远程刷固件下发语音」更现实。

## 小结

关键词三句：**HTTPS 报数、规则在云、事件用 WS**。总览见 [引路实践](/blog/3)。
