---
id: 17
title: "JWT 两套落地：青衿的 @PreAuthorize 与颐康云的数据隔离"
excerpt: "同是 JWT，校园侧进 SecurityContext 做角色接口权限；康养侧用拦截器 + FamilyAccess 卡 parentId。对比讲比只背过滤器模板有用。"
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
| 青衿（智慧校园） | Security + `@PreAuthorize` | 业务上按角色可见模块 |
| 颐康云（安康） | JWT 拦截器 + ThreadLocal | **parentId 绑定校验**（FamilyAccess） |

若依（安隅）则是第三种：框架菜单/按钮 RBAC。三套都做过，面试可以横向对比。

## 签发时把什么放进 Claims

```java
claims.put("userId", user.getId());
claims.put("role", user.getUserType()); // 校园: ADMIN/TEACHER/STUDENT
return Jwts.builder()
    .setClaims(claims)
    .setExpiration(...)
    .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS256)
    .compact();
```

无状态适合水平扩展；代价是吊销要额外设计（黑名单 / 短过期），作品集阶段说清取舍即可。

## 青衿：解析进 SecurityContext

过滤器校验 Token → `UsernamePasswordAuthenticationToken` 放进 `SecurityContextHolder` → 方法上：

```java
@PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
@PostMapping("/grade")
public Result<Void> saveGrade(@RequestBody GradeDTO dto) { ... }
```

前端藏按钮不够，**接口必须拒绝**。

## 颐康云：角色对了还不够

子女角色合法，仍可能越权看别人父母的档案。Service 入口：

```java
public void checkAccess(Long childId, Long parentId) {
    if (!familyMapper.exists(/* childId + parentId */))
        throw new BizException(ErrorCode.ACCESS_DENIED, "无权访问该父母的数据");
}
```

拦截器用完必须 `UserContext.clear()`，否则线程池复用会串用户——这是真踩过的坑。

## 一句话收束

- 角色权限：**能不能打这个接口**  
- 数据隔离：**能不能动这条数据**  

作品集里把两条都写清楚，比只贴一段 JWT 工具类强。
