---
id: 14
title: "青衿 · 智慧校园：Spring Boot 3 + Vue 3 多角色教务后台"
excerpt: "产品 UI 为「智慧校园」：Spring Boot 3.2 + Security/JWT + MyBatis-Plus + Vue 3，覆盖选课容量、成绩考勤与角色化 Dashboard。"
category: "企业应用"
tags: ["Spring Boot 3","Spring Security","JWT","MyBatis-Plus","Vue 3","智慧校园","ECharts"]
createdAt: 2026-06-20
updatedAt: 2026-06-28
featured: true
status: published
---

## 项目背景

传统校园教务能力常分散在多个系统。本项目（博客产品名「青衿」，界面品牌「智慧校园」）用前后端分离架构，搭一套覆盖管理员、教师、学生的教务学工后台。

## 技术选型

- 后端：Spring Boot **3.2.5**、Spring Security + JWT、MyBatis-Plus、MySQL
- 前端：Vue 3、Vite、Element Plus、Pinia、Axios、ECharts
- 其他：Jakarta Bean Validation、BizException + 全局异常处理

## 核心模块

### 1. 统一认证与角色权限

JWT 携带身份与角色（ADMIN / TEACHER / STUDENT），过滤器写入 SecurityContext，再用 `@PreAuthorize` 做方法级控制：

- 管理员：学生、教师、班级、课程等基础数据
- 教师：成绩、考勤维护与通知发布
- 学生：选课、查成绩与个人考勤

### 2. 教务业务闭环

- 学生 / 教师 / 班级信息管理与分页检索
- 课程与选课：容量控制、防重复选课、已满拦截（BizException）
- 成绩与多状态考勤（NORMAL、LATE、LEAVE 等）
- 通知公告：按角色定向（ALL / STUDENT / TEACHER）

### 3. 全局异常与校验

参数校验失败与业务异常统一成清晰返回，避免前端只看到模糊的 500。

### 4. 角色差异化 Dashboard

首页按角色切换指标卡片与图表文案。管理员看全校分布与热门课程；学生看个人成绩分布与考勤趋势；教师侧部分图表目前仍为全局示意，后续可按授课维度细化。

## 项目收获

把 Spring Security + JWT + MyBatis-Plus + Vue 路由守卫这条企业后台主链路完整跑通，为后续后台类项目打下基础。
