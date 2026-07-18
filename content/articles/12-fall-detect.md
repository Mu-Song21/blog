---
id: 12
title: "引路：合加速度跌倒置信度与固件状态机"
excerpt: "固件 MPU6050 状态机做边缘确认，云端用三轴合加速度估置信度并写告警。写清阈值只是初版、边沿触发与防抖如何降误报。"
category: "物联网"
tags: ["三轴加速度","跌倒检测","引路","慧杖护行","ESP32"]
createdAt: 2026-04-15
updatedAt: 2026-07-18
featured: false
status: published
---

## 双层判断

1. **固件**：冲击 → 确认（合加速度回到近重力区间）再置 `isFall`  
2. **云端**：收到 `accelX/Y/Z` 后算 magnitude 与置信度，决定是否生成告警并 WebSocket 推送  

边缘减延迟，云端方便改阈值、做联调。

## 云端合加速度

```java
double magnitude = Math.sqrt(
    accelX * accelX + accelY * accelY + accelZ * accelZ);
boolean suspect = magnitude < 0.45 || magnitude > 2.35;
```

单位按 g 归一化时，静止约 1.0。置信度可用偏离 1.0 的程度映射到 0～1，供前端着色，而不是只有布尔「跌倒/未跌倒」。

## 误报怎么压

- 固件状态机避免单帧毛刺  
- 云端结合上升沿写告警，避免连续包重复落库  
- 用户取消 / 误报标记形成闭环  

机器学习可以是下一阶段；课程项目先把**可演示 + 可解释**做扎实。进主链路见 [引路实践](/blog/3)。
