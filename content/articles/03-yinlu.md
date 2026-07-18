---
id: 3
title: "引路 · 慧杖护行：从 ESP32 盲杖到云端监护与语音助手"
excerpt: "HTTPS 上报、固件跌倒状态机、圆形围栏边沿触发、WebSocket 告警与明眼助手（DeepSeek + 百度语音）。写清主链路、未做导航/MQTT，以及管理端登录等诚实边界。"
category: "AI + IoT"
tags: ["Spring Boot","ESP32","WebSocket","DeepSeek","百度语音","uni-app"]
createdAt: 2026-02-10
updatedAt: 2026-07-18
featured: true
status: published
---

## 产品目标

让视障出行的**风险能被看见、能被响应**，并给使用者一个可语音问的助手。正式名慧杖护行，作品集叫引路。

## 真实主链路

```
ESP32（超声波 / MPU6050 / GPS / SOS）
  --HTTPS--> Spring Boot（约 :8081）+ MyBatis + MySQL smart_cane
               ├─ SensorDataService：入库 → evaluate（跌倒/围栏）
               ├─ 上升沿写告警
               └─ WebSocket 推管理端 / 小程序
                        ├─ Vue 管理端（地图、轨迹、围栏）
                        └─ uni-app（监护、告警、明眼助手）
```

硬件免 JWT 的典型接口：`POST /api/sensor-data`、`POST /api/device/ai-wake`。围栏：`/api/fences`；AI 流式：`POST /api/ai/chat/stream`（SSE）。

## 双层跌倒判断

固件侧状态机（示意）：冲击后合加速度回到近 1g 区间再确认跌倒，减少单次毛刺。

```cpp
case IMPACT:
  if (mag > 0.8 && mag < 1.2) {
    cane.fallState = CONFIRMED;
    cane.isFall = true;
  }
```

云端再算合加速度置信度，阈值可改而不用刷固件。联调依赖设备模拟接口——没带板子也能推演示。细节见 [跌倒置信度](/blog/12)、[硬件握手](/blog/13)。

## 圆形围栏：边沿触发

服务端用 Haversine 算距离，与半径比较；只有状态从内到外变化才告警，避免在界外连续刷：

```java
boolean outside = distanceMeters > fence.getRadiusMeters();
boolean triggered = outside && !"OUTSIDE".equalsIgnoreCase(fence.getLastStatus());
```

文档若提过矩形围栏，以圆形持久化为准。

## 明眼助手怎么接才不算玩具页

- DeepSeek：带设备/位置上下文的对话，支持流式  
- 百度：STT / TTS  
- 盲杖按键 → `ai-wake` → WS `AI_WAKE` → 小程序打开助手  

家属安抚、目的地文本也可经 WS 到用户端——这是协同，不是 turn-by-turn 导航引擎。

## 明确没做的事

| 不宜声称 | 事实 |
|----------|------|
| MQTT / Redis 主路径 | 仓库以 HTTPS + MySQL + WS 为主 |
| 高德无障碍逐路导航 | 未做 |
| 管理端完整鉴权 | 登录曾为前端 mock |
| 微信正式发布 | 缺 AppID / 域名白名单等上线项 |
| 路口 OpenCV 全天候辅助 | 演示脚本级 |

## 收获

无障碍项目最怕功能名词堆砌。先画闭环：**感知 → 判断 → 推送 → 人的动作**，再决定要不要导航、MQTT、矩形围栏。
