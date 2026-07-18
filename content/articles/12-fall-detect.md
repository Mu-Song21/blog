---
id: 12
title: "引路：合加速度跌倒置信度怎么算、为何还要防抖"
excerpt: "慧杖护行后端用三轴合加速度偏离重力估置信度；固件侧另有 MPU6050 状态机。写清阈值只是初版、连续帧与取消机制如何降误报。"
category: "物联网"
tags: ["三轴加速度","跌倒检测","引路","慧杖护行","ESP32"]
createdAt: 2026-04-15
updatedAt: 2026-07-18
featured: false
status: published
---

## 双层判断，不是只靠云端一刀切

引路里跌倒相关有两层：

1. **固件（MPU6050）**：本地状态机先筛一波剧烈冲击  
2. **云端**：收到 `accelX/Y/Z` 后算合加速度与置信度，决定是否生成告警并 WebSocket 推送

作品集讲算法时，别假装「只有一个完美模型」——边缘减延迟，云端方便改阈值、做联调。

## 合加速度

```java
double magnitude = Math.sqrt(
    accelX * accelX + accelY * accelY + accelZ * accelZ);
```

单位已按 g 归一化时，静止约 1.0。常见异常形态：

- 瞬间失重：`magnitude` 明显偏低  
- 撞击地面：明显偏高  

初版规则可以很直白：

```java
boolean suspect = magnitude < 0.45 || magnitude > 2.35;
```

够演示，不够量产——这点必须说清楚。

## 置信度给前端用

```java
double deviation = Math.abs(magnitude - 1.0);
double confidence = clamp((deviation - 0.35) / 1.35, 0.0, 1.0);
```

大屏/小程序可以按置信度着色，而不是只有布尔「跌倒/未跌倒」。家属更容易理解「比较可疑」和「高度可疑」。

## 误报怎么压

单帧突变误报极高，工程上至少要：

- 连续 N 次异常才落告警  
- 用户端取消 / 误报标记（闭环回写）  
- 与 GPS 静止、SOS 主动上报区分场景  

机器学习可以是下一阶段；课程项目先把**可演示 + 可解释**做扎实。

## 进告警链路

1. HTTPS 收到传感器包  
2. 算 magnitude / confidence  
3. 命中规则 → 写告警  
4. WebSocket → 管理端 + 小程序  

算法价值不在公式炫技，而在能不能推进「有人看见并处置」。
