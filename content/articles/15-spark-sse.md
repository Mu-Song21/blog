---
id: 15
title: "颐康云：讯飞星火 SSE 流式输出与并发食谱生成"
excerpt: "在颐康云（安康）中，用 Spring Boot 对接讯飞星火，经 SseEmitter 流式返回，并用线程池分片并发生成一周食谱，避免串行超时。"
category: "Java 后端"
tags: ["讯飞星火","SSE","Spring Boot","CompletableFuture","颐康云","AI"]
createdAt: 2026-06-10
updatedAt: 2026-07-18
featured: true
status: published
---

## 问题背景

颐康云需要根据父母健康档案生成一周个性化食谱。若对周一到周日串行调用大模型，单次数秒、整周可能超过 20 秒，体验很差。

## 讯飞星火接入方式

星火提供 HTTP 同步与 WebSocket/流式通道。流式结果经 Spring `SseEmitter` 推到前端，实现打字机效果。

### WebSocket 握手鉴权

讯飞星火 WebSocket 鉴权通过 HMAC-SHA256 对 URL 签名：

```java
String date = DateTimeFormatter.RFC_1123_DATE_TIME
    .format(ZonedDateTime.now(ZoneId.of("GMT")));
String preStr = "host: spark-api.xf-yun.com\ndate: " + date
    + "\nGET /v3.5/chat HTTP/1.1";
Mac mac = Mac.getInstance("HmacSHA256");
mac.init(new SecretKeySpec(apiSecret.getBytes(), "HmacSHA256"));
String signature = Base64.getEncoder()
    .encodeToString(mac.doFinal(preStr.getBytes()));
String authorization = Base64.getEncoder().encodeToString(
    ("api_key=\"" + apiKey + "\", algorithm=\"hmac-sha256\","
    + " headers=\"host date request-line\","
    + " signature=\"" + signature + "\"").getBytes());
```

### SSE 流式返回

后端收到星火消息后，逐 token 写入 SseEmitter：

```java
@PostMapping("/chat/stream")
public SseEmitter chatStream(@RequestBody AiChatDTO dto) {
    SseEmitter emitter = new SseEmitter(120_000L);
    aiStreamExecutor.execute(() -> {
        try {
            sparkService.streamChat(dto.getMessage(), chunk -> {
                emitter.send(SseEmitter.event().data(chunk));
            });
            emitter.complete();
        } catch (Exception e) {
            emitter.completeWithError(e);
        }
    });
    return emitter;
}
```

对话、健康报告分析等接口均提供 stream 变体。

## 周食谱分片并发

实现上不是「7 次串行」，而是把一周拆成 3 个分片并行（周一~三 / 周四~五 / 周六~日），用 `CompletableFuture` + `aiDietExecutor` 汇总，失败可回退整周单次生成。

```java
List<CompletableFuture<String>> futures = DIET_WEEK_CHUNKS.stream()
    .map(days -> CompletableFuture.supplyAsync(
        () -> sparkService.generateDietForDays(healthInfo, days), dietExecutor))
    .toList();
CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
```

长任务还可走异步任务接口：先返回 taskId，前端轮询 PENDING / RUNNING / SUCCESS。

## 语音录入说明

父母端经百度 ASR 转文字后，正则意图目前优先解析**血压**（如 `120/80`）并自动落库；血糖等更复杂表达仍以手动记录或普通 AI 对话为主，避免夸大「全意图自动落库」。

## 总结

核心思路：分片并发 > 整周串行，流式 > 同步等待，AI 失败有回退。再配合档案上下文，让颐康云的 AI 能力既可演示又相对稳。
