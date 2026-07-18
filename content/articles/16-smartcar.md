---
id: 16
title: "醒驾 · SmartCar：桌面疲劳监测原型到底做了什么"
excerpt: "EAR + PERCLOS + solvePnP 头部姿态的优先级状态机；本地仪表盘是 http.server + MJPEG，不是 Flask/WebSocket。树莓派外设属后续规划。"
category: "AI + IoT"
tags: ["MediaPipe","OpenCV","EAR","PERCLOS","Python","醒驾","SmartCar"]
createdAt: 2026-07-10
updatedAt: 2026-07-18
featured: true
status: published
---

## 产品名与仓库名

仓库叫 **SmartCar**，作品集品牌叫 **醒驾**。交付形态是 **Windows 桌面软件原型**：摄像头 → 视觉规则 → 叠加画面 / 蜂鸣 TTS / CSV 日志 / 简易 Web 仪表盘。不是已上车的量产 ADAS。

## 为什么单靠「闭眼」不够

- 普通眨眼会被误判  
- 个体眼裂差异大，固定阈值伤人  
- 短闭眼 ≠ 持续困倦  

所以用 **EAR + PERCLOS + 头部姿态** 组合，再用优先级状态机出最终状态（不是单独打一个黑盒分数）。

## EAR 与自适应基线

MediaPipe Face Mesh 取眼部关键点算 EAR；启动约 3 秒采睁眼基线，动态阈值约 `baseline * ear_scale`（默认 0.72），并做上下限裁剪——这是演示里最影响「准不准」的开关之一。

```python
def compute_ear(landmarks, eye_indices, img_w, img_h):
    pts = [(int(landmarks[i].x * img_w), int(landmarks[i].y * img_h))
           for i in eye_indices]
    v1 = np.linalg.norm(np.array(pts[1]) - np.array(pts[5]))
    v2 = np.linalg.norm(np.array(pts[2]) - np.array(pts[4]))
    h  = np.linalg.norm(np.array(pts[0]) - np.array(pts[3]))
    return (v1 + v2) / (2.0 * h + 1e-6)
```

## PERCLOS 与姿态

- PERCLOS：默认 30 秒窗口内闭眼帧占比，配合连续闭眼时长触发 Fatigue / High Fatigue  
- 姿态：OpenCV `solvePnP` 估 yaw/pitch/roll，按持续时间判 Distracted（不是 MediaPipe 直接吐角度）

## 状态机优先级（示意）

`No Face → High Fatigue → Fatigue → Distracted → PERCLOS 规则 → Long Drive → Normal`

并行输出：OpenCV 窗口、蜂鸣/TTS、CSV、`web_dashboard.py`。

## 仪表盘：别写成 Flask

本地面板是标准库 **`http.server` + MJPEG 画面 + JSON 状态轮询**。仓库**没有**把 Flask、WebSocket、树莓派 GPIO/OLED 作为已交付能力。README 里的 Pi 外设是**后续可拓展**；部署到 ARM 时可降分辨率（如 `--max-width 640`），但别拿未合入代码写进简历。

## 收获

视觉规则能 demo，边界要诚实：**软件原型 ≠ 车载量产**。面试官更在意你是否分得清 EAR/PERCLOS/姿态各自解决什么误报，以及推送链路选了轮询而不是硬上 WebSocket 的理由。
