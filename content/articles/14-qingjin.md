---
id: 14
title: "青衿 · 智慧校园：多角色教务后台是怎么落地的"
excerpt: "Spring Boot 3.2 + Security/JWT + MyBatis-Plus + Vue 3。写清三角色权限、选课容量与防重复、BizException，以及 Dashboard「差异化」里哪些是真的、哪些还是全局示意。"
category: "企业应用"
tags: ["Spring Boot 3","Spring Security","JWT","MyBatis-Plus","Vue 3","智慧校园","ECharts"]
createdAt: 2026-06-20
updatedAt: 2026-07-18
featured: true
status: published
---

## 要解决什么

教务能力分散时，学生查成绩、教师录考勤、管理员改基础数据各走各的。青衿（界面品牌「智慧校园」）用一套前后端分离后台，把三角色收进同一权限模型。

## 技术栈（按仓库）

- 后端：Spring Boot **3.2.5**、Security、JWT、MyBatis-Plus、Validation
- 前端：Vue 3、Element Plus、ECharts、Pinia

不是「又一个若依」——权限与模块是自己接的 Security 注解体系。

## 权限：接口级必须硬

Token 解析进 `SecurityContext` 后，用 `@PreAuthorize` 卡死写接口，例如班级/学生仅 ADMIN，成绩考勤 ADMIN/TEACHER。前端藏按钮不够，**接口要拒绝**。

选课业务层再加一道：

- 课程不存在 / 已满 → `BizException`
- 已选过 → 拒绝重复

全局异常把 BizException 收成统一 JSON，前端直接 toast `message`，少出现「神秘 500」。

## Dashboard：诚实写差异化

管理员看全校分布、热门课；学生看个人成绩分布与考勤趋势——这些是接好的。  
教师侧部分图表文案里仍标注「全局示意」，**还没按授课维度完全切开**。作品集里主动说这点，比假装「完美多租户统计」好。

## 和颐康云鉴权的对比

| | 青衿 | 颐康云 |
|--|------|--------|
| 模型 | 角色 RBAC | 角色 + **parentId 数据隔离** |
| 框架 | Spring Security 注解 | JWT 拦截器 + FamilyAccess |

两个项目一起讲，能说明你既会「角色能不能打这个接口」，也会「这条父母数据是不是你的」。

## 收获

企业后台的基本功是：**模型、权限、校验、异常、列表导出/图表**。青衿把这条链路跑通后，看若依扩展（安隅）会轻松很多——知道框架帮你省了哪一段。
