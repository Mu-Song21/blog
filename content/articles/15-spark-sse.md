---
id: 15
title: "颐康云：星火 SSE 与一周食谱为什么要分片并发"
excerpt: "串行生成会拖垮体验；对话用 SseEmitter / fetch 流式吐字，周食谱拆 3 分片 CompletableFuture 并行。失败回退、异步任务轮询与档案进 Prompt 一并记下。"
category: "Java 后端"
tags: ["讯飞星火","SSE","Spring Boot","CompletableFuture","颐康云","AI"]
createdAt: 2026-07-02
updatedAt: 2026-07-18
featured: true
status: published
---

## 问题从体验来

子女点「生成一周食谱」时，若按天串行调大模型：单次数秒 × 7 ≈ 半分钟，页面假死。颐康云必须把 **AI 时延**当成后端问题。

## 流式：先让有字出来

对话 / 报告走星火流式。后端可用 `SseEmitter`；子女端因要带 Bearer，用 **fetch + ReadableStream** 解析 `data: {"delta":...}` / `done` / `error`，而不是裸 EventSource。

流式生产放专用线程池，避免堵住 Tomcat 工作线程。鉴权失败、模型错误要有明确业务异常，而不是 500 裸堆栈。病历分析前先过 FamilyAccess。

## 并发：不是 7 路乱打

一周拆成 **3 个分片**（一～三 / 四～五 / 六～日），`CompletableFuture` + 小线程池并行。某分片失败可回退「整周单次生成」。更长任务进任务表：先返回 taskId，前端轮询 PENDING/RUNNING/SUCCESS。

## Prompt 必须吃档案

生成前拼健康档案 + 近 30 天血压血糖摘要，慢性病进约束。否则输出好看但不可用。

## 语音别吹过头

百度 ASR 后，稳定自动落库的是血压。血糖等仍多走手动或对话。

## 收获

接大模型 = **超时治理 + 流式体验 + 失败回退 + 业务上下文**。平台全貌见 [安康 · 颐康云](/blog/19)。
