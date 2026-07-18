---
id: 19
title: "安康 · 颐康云：子女 Web + 父母小程序的家庭康养实践"
excerpt: "双端协同、JWT + FamilyAccess 数据隔离、档案驱动的星火 SSE 与周食谱并发、百度语音录血压。对照真实 API 与 Redis/OSS 预留边界，写清工程闭环。"
category: "企业应用"
tags: ["颐康云","安康","Spring Boot","JWT","Vue 3","uni-app","讯飞星火","百度语音"]
createdAt: 2026-06-28
updatedAt: 2026-07-18
featured: true
status: published
---

## 一句话目标

让子女在 Web 上管得住档案与建议，让父母在小程序里用得动打卡与语音——中间是同一套 Spring Boot 业务与家庭数据边界。作品集叫**安康**，产品 / 工程叫**颐康云**（`health-manager`）。

## 架构

```
子女端 Vue 3 + Element Plus
        │ HTTP / SSE（fetch + ReadableStream，需 Bearer）
        ▼
Spring Boot（/api）+ MyBatis-Plus + JWT + MySQL health_manager
        │ FamilyAccess 按 parentId 校验
        ▲
父母端 uni-app（用药打卡、语音「小暖」、轻量查看）
```

典型 API：`/api/family/bind`、`/api/health`、`/api/medication`、`/api/report`；流式 AI：`POST /api/ai/chat/stream`、报告/病历分析流式接口；语音：`/api/voice`。

Redis、OSS 在配置里出现过，**当前业务主路径未依赖**——别写成已上缓存集群 / 对象存储流水线。

## 鉴权：角色对了，数据还要对

JWT 解决「你是谁」。子女访问父母档案前还要过 FamilyAccess：

```java
familyMapper.selectCount(
  new LambdaQueryWrapper<Family>()
    .eq(Family::getChildId, loginUser.getUserId())
    .eq(Family::getParentId, parentId));
```

病历类 SSE 入口会先 `assertCanAccessMedicalRecord`，再 `runStream`。前端不用原生 EventSource，而用 fetch 流，因为要带 Authorization。对比青衿的 `@PreAuthorize`：那边偏角色接口权限，这边偏**行级数据隔离**。详见 [JWT 两套落地](/blog/17)。

## 档案驱动 AI

食谱、报告、助手上下文拼接健康档案与近况指标；慢性病约束进 Prompt。体验上的两个工程点：

1. **SSE 流式**：先吐字，避免整段等待  
2. **周食谱分片并发**：3 分片 + 小线程池，失败可回退；长任务可走任务表轮询  

专项：[星火 SSE 与周食谱](/blog/15)。

## 语音边界

百度 ASR 后，正则意图稳定自动落库的是**血压**（如 `120/80`）。血糖等仍多靠手动或普通对话——写「语音录血压」即可。

## 能力边界

| 不宜声称 | 事实 |
|----------|------|
| Redis / OSS 已深度使用 | 配置预留为主 |
| 全意图语音病历 | 血压自动落库较稳 |
| HIS / 医保 / 真人问诊 | 未做 |
| 生产级 Docker/CI 完备 | 文档与工程仍偏演示 |

## 收获

康养项目容易被 AI 名词带偏。盯住三件事：**双端分工、数据边界、档案进模型**。AI 是加速器，不是产品本身。
