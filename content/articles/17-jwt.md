---
id: 17
title: "JWT 两套落地：青衿的 @PreAuthorize 与颐康云的数据隔离"
excerpt: "同是 JWT：校园侧进 SecurityContext 做角色接口权限；康养侧用拦截器 + FamilyAccess 卡 parentId。对比讲比只背过滤器模板有用，并补上 ThreadLocal 清理等坑。"
category: "Java 后端"
tags: ["Spring Boot","JWT","Spring Security","鉴权","颐康云","青衿"]
createdAt: 2026-07-16
updatedAt: 2026-07-18
featured: false
status: published
---

## 一个问题，两种答案

「登录之后怎么保证别人调不了不该调的接口 / 数据？」

| 项目 | 角色怎么控 | 数据怎么控 |
|------|------------|------------|
| 青衿 | Security + `@PreAuthorize` | 按角色可见模块 |
| 颐康云 | JWT 拦截器 + ThreadLocal | **parentId 绑定校验** |
| 安隅 | 若依菜单/按钮 RBAC | 框架数据权限能力 |

## 签发时放进 Claims

`userId`、`role`（或 userType）等。无状态适合水平扩展；吊销要额外设计（黑名单 / 短过期），作品集说清取舍即可。

## 青衿：解析进 SecurityContext

过滤器校验 Token → Authentication 放进 `SecurityContextHolder` → 方法上 `hasRole` / `hasAnyRole`。前端藏按钮不够，**接口必须拒绝**。

## 颐康云：角色对了还不够

```java
public void checkAccess(Long childId, Long parentId) {
    if (!familyMapper.exists(/* childId + parentId */))
        throw new BizException(..., "无权访问该父母的数据");
}
```

拦截器用完必须 `UserContext.clear()`，否则线程池复用会串用户。SSE 接口同样要在进流式前做病历权限校验。

## 一句话收束

- 角色权限：能不能打这个接口  
- 数据隔离：能不能动这条数据  

两边都写过，比只贴一段 JwtUtil 强。
