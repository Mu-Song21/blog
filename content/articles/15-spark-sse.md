---
id: 15
title: "颐康云：星火 SSE 与一周食谱为什么要分片并发"
excerpt: "串行生成 21 餐会超时；拆成 3 个分片 CompletableFuture 并行，对话用 SseEmitter 流式吐字。失败回退与异步任务轮询一并记下。"
category: "Java 后端"
tags: ["讯飞星火","SSE","Spring Boot","CompletableFuture","颐康云","AI"]
createdAt: 2026-07-02
updatedAt: 2026-07-18
featured: true
status: published
---

## 问题从体验来

子女点「生成一周食谱」时，如果按天串行调大模型：单次 3～5 秒 × 7 ≈ 半分钟，页面假死。颐康云必须把 **AI 时延**当成后端问题，而不是前端转圈问题。

## 流式：先让「有字出来」

对话 / 报告分析走星火流式通道，后端用 `SseEmitter` 往浏览器推 token：

```java
@PostMapping("/chat/stream")
public SseEmitter chatStream(@RequestBody AiChatDTO dto) {
    SseEmitter emitter = new SseEmitter(120_000L);
    aiStreamExecutor.execute(() -> {
        try {
            sparkService.streamChat(dto.getMessage(), chunk ->
                emitter.send(SseEmitter.event().data(chunk)));
            emitter.complete();
        } catch (Exception e) {
            emitter.completeWithError(e);
        }
    });
    return emitter;
}
```

专用线程池跑流式生产，避免堵住 Tomcat 工作线程。鉴权签名、重试可恢复错误，都写在 `SparkServiceImpl`——调不通时要有明确业务异常，而不是 500 裸堆栈。

## 并发：不是 7 路乱打

星火有并发与 QPS 限制。颐康云把一周拆成 **3 个分片**（一～三 / 四～五 / 六～日），`CompletableFuture` + `aiDietExecutor`（小池子）并行：

```java
List<CompletableFuture<String>> futures = DIET_WEEK_CHUNKS.stream()
    .map(days -> CompletableFuture.supplyAsync(
        () -> sparkService.generateDietForDays(healthInfo, days), dietExecutor))
    .toList();
CompletableFuture.allOf(...).join();
```

某分片失败可以回退「整周单次生成」，总比前端一直转圈强。更长任务则进 `t_ai_task`：先返回 taskId，前端轮询 PENDING/RUNNING/SUCCESS。

## Prompt 必须吃档案

食谱不是「随便来点健康餐」。生成前拼健康档案 + 近 30 天血压血糖摘要，慢性病（如糖尿病）进约束。否则 AI 输出好看但不可用，演示一问就穿帮。

## 语音别吹过头

百度 ASR 之后，正则意图目前稳定落库的是**血压**（如 `120/80`）。血糖等仍多走手动或普通对话——作品集写「语音录入血压」即可，别写「全意图自动病历」。

## 收获

接大模型 = **超时治理 + 流式体验 + 失败回退 + 业务上下文**。少一个，都只是 Demo。

平台全貌（双端、档案、鉴权）见 [安康 · 颐康云总览](/blog/19)。
