---
id: 13
title: "引路 · 慧杖护行：硬件与后端交互流程"
excerpt: "以仓库实现为准：ESP32 HTTPS 上报传感器数据，Spring Boot 做跌倒/圆形围栏判断，WebSocket 推送到管理端与小程序。"
category: "物联网"
tags: ["智能盲杖","ESP32","HTTPS","Spring Boot","WebSocket"]
createdAt: 2026-05-06
updatedAt: 2026-07-18
featured: false
status: published
---

## 系统整体链路

引路（慧杖护行）是软硬件协同项目：硬件采集，后端判断，多端监护。

实际主链路：

1. ESP32 采集障碍物距离、三轴加速度、GPS 等  
2. 封装 JSON，经 **HTTPS POST** 到 Spring Boot（`/api/sensor-data` 等）  
3. 后端 MyBatis 落库  
4. 跌倒置信度、圆形电子围栏越界等规则判断  
5. 生成告警  
6. WebSocket `/ws/alarm` 推送到 Vue 管理端与 uni-app 小程序  
7. SOS / AI 唤醒等事件同样可走 HTTP + WS  

> 本仓库**未使用 MQTT/Redis**；MQTT 能力见守望项目的可插拔接入，勿混谈。

## 硬件上报示例

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

温湿度、电量等字段可能存在，但固件侧未必始终有有效传感器值，展示时勿夸大「全传感器完备」。

## 后端异常判断

- 三轴加速度：跌倒置信度  
- GPS + 圆心半径：圆形围栏越界（边沿触发）  
- SOS 按键：紧急求助事件  

规则放在后端，便于改阈值；固件侧重采集与本地避障反馈（蜂鸣/震动）。

## 多端协同

- 管理端：高德地图监控、轨迹回放、围栏配置  
- 小程序：告警、位置监护、明眼助手（DeepSeek + 百度语音）  
- 按键 AI 唤醒：HTTP 触发后经 WebSocket 通知前端跳转助手  

家属安抚 / 目的地文本等也可经 WS 下发到用户侧，属于应用层协同，不是 MQTT 指令主题。

## 总结

引路的闭环是 **HTTPS 感知上报 + 后端规则 + WebSocket 监护 + AI 语音助手**。把协议边界写清楚，比堆「MQTT / 导航 / 全传感器」更有说服力。
