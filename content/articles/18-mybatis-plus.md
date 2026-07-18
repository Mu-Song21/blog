---
id: 18
title: "MyBatis-Plus：分页、逻辑删除与条件构造器在康养/校园里的用法"
excerpt: "颐康云与青衿的列表几乎都是 Page + LambdaQueryWrapper；记下 current 从 1 开始、空条件别拼 null、复杂报表仍手写 SQL。"
category: "Java 后端"
tags: ["MyBatis-Plus","Spring Boot","颐康云","青衿","Java"]
createdAt: 2026-07-18
updatedAt: 2026-07-18
featured: false
status: published
---

## 用它解决什么

康养档案、校园选课/成绩列表都是典型 CRUD 密集。MyBatis-Plus 的价值是少写重复 XML，不是替代所有 SQL。安隅侧若依还混用 PageHelper——同一作品集里两种分页都见过，别混讲。

## 分页标准姿势

```java
@Bean
public MybatisPlusInterceptor mybatisPlusInterceptor() {
    MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
    interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
    return interceptor;
}
```

```java
Page<HealthRecord> page = new Page<>(pageNum, pageSize);
LambdaQueryWrapper<HealthRecord> w = new LambdaQueryWrapper<HealthRecord>()
    .eq(HealthRecord::getParentId, parentId)
    .orderByDesc(HealthRecord::getRecordDate);
Page<HealthRecord> result = baseMapper.selectPage(page, w);
```

**坑**：`current` 从 1 开始；前端传 0 会查空。对接时前后端先对页码约定。

## 逻辑删除

颐康云核心表常用 `@TableLogic`，全局配置 `deleted` 0/1。演示「删除」实际是 UPDATE，误点不至于物理清空——对健康数据尤其合适。

## 条件构造器：空值陷阱

```java
wrapper.eq(StringUtils.hasText(keyword), HealthRecord::getNotes, keyword)
       .ge(startDate != null, HealthRecord::getRecordDate, startDate);
```

条件为 false 就不拼 SQL，避免 `notes = null` 把结果滤没。

## 什么时候别硬用 MP

复杂 Dashboard 联表、统计图（青衿部分图表、安隅导出定制）——手写 SQL / XML 更清晰。自动填充 `createTime`/`updateTime` 用 `MetaObjectHandler` 即可，别在每个 Service 里 set 一遍。

## 小结

日常列表：**分页插件 + Lambda 条件 + 逻辑删除**。作品集诚实写「CRUD 效率工具」，比吹「自研 ORM」可信。
