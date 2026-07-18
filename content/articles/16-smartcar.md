---
id: 16
title: "EAR、PERCLOS 与头部姿态：SmartCar 疲劳检测算法解析"
excerpt: "拆解 SmartCar（醒驾）软件原型：EAR、PERCLOS、solvePnP 头部姿态与自适应基线校准；本地仪表盘为 HTTP 轮询，树莓派外设属后续规划。"
category: "AI + IoT"
tags: ["MediaPipe","OpenCV","EAR","PERCLOS","Python","SmartCar"]
createdAt: 2026-07-10
updatedAt: 2026-07-14
featured: true
status: published
---

## 为什么单靠"闭眼检测"不够

最简单的疲劳检测只判断"眼睛是否闭合"，但这会产生大量误报：

- 普通眨眼被误判为疲劳
- 每个人的眼睛大小不同，同一阈值适配性差
- 短暂闭眼和持续困倦闭眼无法区分

可用的演示系统需要 EAR + PERCLOS + 头部姿态的多规则组合（本仓库是优先级状态机，而非单独打分模型）。

## EAR（Eye Aspect Ratio）眼部纵横比

EAR 由 MediaPipe Face Mesh 眼部关键点计算：

```python
def compute_ear(landmarks, eye_indices, img_w, img_h):
    pts = [(int(landmarks[i].x * img_w), int(landmarks[i].y * img_h))
           for i in eye_indices]
    v1 = np.linalg.norm(np.array(pts[1]) - np.array(pts[5]))
    v2 = np.linalg.norm(np.array(pts[2]) - np.array(pts[4]))
    h  = np.linalg.norm(np.array(pts[0]) - np.array(pts[3]))
    return (v1 + v2) / (2.0 * h + 1e-6)
```

## 个人自适应基线校准

启动约 3 秒采集睁眼 EAR，动态阈值约为 `baseline * ear_scale`（默认 scale=0.72），并做合理上下限裁剪。

## PERCLOS

在时间窗口内（默认 30 秒）统计闭眼帧占比。与连续闭眼时长一起触发 Fatigue / High Fatigue。

## 头部姿态

姿态角由 OpenCV `solvePnP` 估计（yaw / pitch / roll），再结合持续时间判定 Distracted，而不是「MediaPipe 直接返回角度」。

## 状态机与输出

优先级大致为：No Face → High Fatigue → Fatigue → Distracted → PERCLOS 规则 → Long Drive → Normal。并行输出：

- OpenCV 叠加窗口
- 蜂鸣 / TTS（Windows 优先系统语音）
- CSV 事件日志
- `web_dashboard.py`：标准库 HTTP + MJPEG 画面 + JSON 状态轮询（**不是 Flask / WebSocket**）

## 关于树莓派

仓库 README 将树莓派 GPIO / OLED / LED 列为**后续可拓展**；当前交付是桌面软件原型。部署到 ARM 时可降低分辨率（如 `--max-width 640`），但不宜把未合入的外设或未留存的 FPS 实测写成已完成能力。

## 总结

EAR 抓瞬时闭眼，PERCLOS 看累计疲劳，头部姿态覆盖分心，自适应基线降低个体差异误报。清醒地界定「软件原型 vs 车载量产」，作品集反而更可信。
