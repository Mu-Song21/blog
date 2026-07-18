---
id: 17
title: "Spring Boot JWT 多角色鉴权的工程化实践"
excerpt: "结合智慧校园与颐康云，梳理 JWT 签发、拦截器/过滤器解析、SecurityContext、@PreAuthorize，以及子女-父母数据级隔离。"
category: "Java 后端"
tags: ["Spring Boot","JWT","Spring Security","鉴权","颐康云","智慧校园"]
createdAt: 2026-06-14
updatedAt: 2026-07-18
featured: false
status: published
---

## 为什么需要在项目中自己实现鉴权

若依等框架内置了完整权限体系，但在 Spring Boot 3 + JWT 的新项目中，理解并自己实现一遍鉴权链路更有价值。颐康云与智慧校园都采用了 JWT 方案（校园侧叠加 Spring Security `@PreAuthorize`）。

## JWT 结构与签发

JWT 由 Header.Payload.Signature 三部分组成，Payload 中写入用户身份信息：

```java
public String generateToken(User user) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("userId", user.getId());
    claims.put("username", user.getUsername());
    claims.put("role", user.getUserType()); // 1=子女 2=父母 / ADMIN TEACHER STUDENT
    return Jwts.builder()
        .setClaims(claims)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + expiration))
        .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS256)
        .compact();
}
```

Token 不存服务端，无状态设计天然适合水平扩展。

## 拦截器解析与 SecurityContext 注入

颐康云侧，受保护接口经过 JwtInterceptor，解析 Token 并将用户信息写入 ThreadLocal：

```java
@Component
public class JwtInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest req,
                             HttpServletResponse res, Object handler) {
        String token = req.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            LoginUser user = jwtUtil.parseToken(token.substring(7));
            UserContext.set(user);   // ThreadLocal
            return true;
        }
        res.setStatus(401);
        return false;
    }

    @Override
    public void afterCompletion(...) {
        UserContext.clear();   // 防止内存泄漏
    }
}
```

智慧校园接入 Spring Security 时，将解析结果写入 SecurityContextHolder，后续 `@PreAuthorize` 才能生效。

## 方法级权限控制

```java
@PreAuthorize("hasRole('ADMIN')")
@DeleteMapping("/{id}")
public Result<Void> delete(@PathVariable Long id) { ... }

@PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
@PostMapping("/grade")
public Result<Void> saveGrade(@RequestBody GradeDTO dto) { ... }
```

## 数据级隔离：子女访问父母资源

颐康云中子女只能访问已绑定父母的数据，由 FamilyAccessService 在 Service 入口校验 parentId。

```java
public void checkAccess(Long childId, Long parentId) {
    boolean bound = familyMapper.exists(
        new LambdaQueryWrapper<Family>()
            .eq(Family::getChildId, childId)
            .eq(Family::getParentId, parentId)
    );
    if (!bound) throw new BizException(ErrorCode.ACCESS_DENIED,
        "无权访问该父母的数据");
}
```

## 总结

JWT 鉴权的核心链路：**签发 → 携带 → 解析 → 注入上下文 → 方法级控制 → 数据级隔离**。角色权限解决「能不能访问这个接口」，数据隔离解决「能不能访问这条数据」。
