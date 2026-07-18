---
id: 3
title: "引路 · 慧杖护行：从 ESP32 盲杖到 AI 语音助手"
excerpt: "HTTPS 上报、跌倒/圆形围栏、WebSocket 监护、明眼助手（DeepSeek + 百度语音）。写清做了什么、没做什么——尤其不做 turn-by-turn 导航。"
category: "AI + IoT"
tags: ["Spring Boot","ESP32","WebSocket","DeepSeek","百度语音","uni-app"]
createdAt: 2026-02-10
updatedAt: 2026-07-18
featured: true
status: published
---

## 产品目标一句话

让视障出行的**风险能被家属看见、能被响应**，并给使用者一个可语音问的「明眼助手」。正式名慧杖护行，作品集叫引路。

## 真实主链路（按仓库）

```
ESP32 ──HTTPS──► Spring Boot 3 + MyBatis + MySQL
                    ├─ 跌倒置信度 / 圆形围栏 Haversine
                    └─ WebSocket /ws/alarm
                         ├─ Vue 管理端（地图、轨迹、围栏）
                         └─ uni-app 小程序（监护、告警、助手）
```

固件侧：超声波避障、MPU6050 跌倒状态机、GPS、SOS。云端不负责替盲杖做超声波，那是本地反馈。

## AI 怎么接才不算「调戏一下 Chat」

明眼助手不是单独玩具页：

- DeepSeek：带设备/位置上下文的对话，支持流式
- 百度：STT / TTS
- 盲杖按键 → `POST /api/device/ai-wake` → WS `AI_WAKE` → 小程序跳助手

家属侧还能发安抚、目的地文本，经 WS 到用户端——这是协同，不是地图导航引擎。

## 明确没做的事（比夸大重要）

- **没有** MQTT / Redis（文档里提过的别写进能力清单）
- **没有** 高德 turn-by-turn 无障碍导航
- 电子围栏服务端是**圆形**（圆心+半径）；UI 若画过矩形，以持久化为准
- 路口 OpenCV 是演示脚本，不是全天候视觉驾驶辅助
- 温湿度/电量字段可能占位，别吹「全传感器完备」

## 跌倒与围栏：为什么放云端

固件做第一层边缘检测；后端再用加速度幅值算置信度、用 Haversine 判越界。阈值改起来不用刷固件，联调也方便（设备模拟接口很重要）。

## 收获

无障碍项目最怕功能名词堆砌。引路让我习惯先画闭环：**感知 → 判断 → 推送 → 人的动作（监护/SOS/语音）**，再决定要不要加导航、MQTT、矩形围栏。少即是多，可信即是多。
