---
id: 22
title: "墨境水墨工坊：异步任务、WebSocket 进度与本地兜底"
excerpt: "上传预览 → 后端异步生成 → WS 推进度 → 卷轴 3D。有 Key 走兼容生图，无 Key 用 Java 本地水墨；赏析不要写成讯飞已上线。"
category: "数字文化"
tags: ["墨境","水墨工坊","WebSocket","Spring Boot","Canvas","AI"]
createdAt: 2026-07-15
updatedAt: 2026-07-18
featured: false
status: published
---

## 工坊要解决的体验问题

用户上传一张图，如果同步干等云端几十秒，页面像卡死。墨境工坊拆成：

1. 前端 Canvas **本地水墨预览**（立刻有反馈）  
2. `POST /api/ai/generate` 建异步任务  
3. WebSocket `/ws/scene` 推进度（按 taskId 过滤）  
4. 拉结果 → 卷轴 3D 预览；可选导出 GLB / STL  

## 生图链路：可选云端 + 必有兜底

```
有 OpenAI 兼容 Key → 云端生图
        ↓ 失败 / 无 Key
Java InkWashImageProcessor → 本地水墨算法出图
```

答辩现场最怕的是「没网 / 没 Key」。本地兜底保证闭环不断——这和守望用 HTTP mock 代替 Broker 是同一类工程判断。

## 文创导出别夸大

`/api/ai/derivative` 从生成记录**程序化**导出简化卷轴 mesh（GLB）和打印向 STL。能下载、能演示，但不是扫描建模或商城 SKU。

## 赏析：诚实边界

智能赏析在 UI 上有打字动效，主路径多为**预写策展文案**；讯飞相关方法在仓库里存在，**未接到演示主流程**。专题文和简历都写「策展文案演示 + 工坊可本地出图」，不要写「星火全链路赏析已上线」。

## 小结

工坊的价值不在模型名词，而在 **异步 + 进度可见 + 无 Key 可演示**。全貌见 [墨境总览](/blog/20)，渲染栈见 [双栈隔离](/blog/21)。
