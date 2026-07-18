---
id: 22
title: "墨境水墨工坊：异步生成、进度推送与本地兜底"
excerpt: "工坊链路为本地预览、后端异步任务、WebSocket 进度与卷轴三维预览。云端生图可选，Java 本地水墨保证无 Key 仍可演示；赏析能力需按真实实现表述。"
category: "数字文化"
tags: ["墨境","水墨工坊","WebSocket","Spring Boot","Canvas","AI"]
createdAt: 2026-07-15
updatedAt: 2026-07-18
featured: false
status: published
---

## 体验约束

若上传后同步等待云端数十秒，页面会长时间无反馈。工坊因此拆成可感知的阶段：

1. 前端 Canvas 完成本地水墨预览  
2. `POST /api/ai/generate` 创建异步任务  
3. WebSocket `/ws/scene` 按 `taskId` 推送进度  
4. 拉取结果并进入卷轴三维预览；可选导出 GLB / STL  

## 生图策略

```
已配置兼容生图 Key → 调用云端图像 API
        ↓ 失败或未配置
Java InkWashImageProcessor → 本地水墨算法出图
```

演示环境经常缺少稳定外网或 API Key。本地兜底保证主流程可讲完，这与守望项目中用 HTTP mock 代替 Broker 的判断一致：先保证闭环，再谈增强能力。

## 文创导出

`/api/ai/derivative` 根据生成记录**程序化**导出简化卷轴 mesh（GLB）与面向打印的 STL。可用于下载与演示，但不是扫描建模，也不构成商城交易闭环。

## 关于「智能赏析」

界面上的打字效果主要服务策展文案演示；讯飞相关实现存在于仓库，但**未接入当前主路径**。对外表述建议为「策展文案演示 + 工坊可本地出图」，避免写成「星火赏析全链路已上线」。

完整项目说明见 [墨境工程实践](/blog/20)，渲染栈见 [双 WebGL 栈设计](/blog/21)。
