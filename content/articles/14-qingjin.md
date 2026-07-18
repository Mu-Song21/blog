---
id: 14
title: "青衿 · 智慧校园：多角色教务后台工程实践"
excerpt: "Spring Boot 3.2.5 + Security/JWT + MyBatis-Plus + Vue 3。写清三角色 @PreAuthorize、选课容量与防重复、BizException，以及 Dashboard 里哪些图表是真差异化、哪些仍是全局示意。"
category: "企业应用"
tags: ["Spring Boot 3","Spring Security","JWT","MyBatis-Plus","Vue 3","智慧校园","ECharts"]
createdAt: 2026-06-20
updatedAt: 2026-07-18
featured: true
status: published
---

## 要解决什么

教务能力分散时，学生查成绩、教师录考勤、管理员改基础数据各走各的。青衿（界面品牌「智慧校园」）用前后端分离，把三角色收进同一权限模型。

## 技术栈（按仓库）

- 后端：Spring Boot **3.2.5**、Security、JWT、MyBatis-Plus、Validation  
- 前端：Vue 3、Element Plus、ECharts、Pinia  

不是「又一个若依」——权限与模块是自己接的 Security 注解体系。

## 权限：接口级必须硬

Token 解析进 `SecurityContext` 后：

```java
@PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
@PostMapping("/grade")
public Result<Void> saveGrade(@RequestBody GradeDTO dto) { ... }
```

班级/学生写接口偏 ADMIN；成绩考勤 ADMIN/TEACHER。前端藏按钮不够。

选课业务层再加：课程不存在 / 已满 → `BizException`；已选过 → 拒绝重复。全局异常把 BizException 收成统一 JSON，前端直接 toast `message`。

## Dashboard：诚实写差异化

管理员看全校分布、热门课；学生看个人成绩与考勤趋势——这些是接好的。教师侧部分图表文案仍标「全局示意」，**尚未按授课维度完全切开**。作品集主动说这点，比假装完美多租户统计好。

## 和颐康云鉴权对比

| | 青衿 | 颐康云 |
|--|------|--------|
| 模型 | 角色 RBAC | 角色 + parentId 数据隔离 |
| 框架 | Security 注解 | JWT 拦截器 + FamilyAccess |

两个一起讲，能说明「能不能打接口」和「能不能动这条数据」都做过。鉴权专题见 [JWT 两套落地](/blog/17)。

## 收获

企业后台基本功：**模型、权限、校验、异常、列表与图表**。跑通后再看若依扩展（安隅），会清楚框架帮你省了哪一段。
