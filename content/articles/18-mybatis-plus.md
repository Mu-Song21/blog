---
id: 18
title: "MyBatis-Plus 在多模块项目中的实战技巧"
excerpt: "结合若依二次开发与颐康云，梳理 MyBatis-Plus 分页、逻辑删除、条件构造器与自动填充的工程化用法。"
category: "Java 后端"
tags: ["MyBatis-Plus","Spring Boot","颐康云","Java"]
createdAt: 2026-07-18
updatedAt: 2026-07-18
featured: false
status: published
---

## 为什么选 MyBatis-Plus

相比原生 MyBatis，MyBatis-Plus 提供了开箱即用的 CRUD 接口、条件构造器和分页插件，在智慧校园、颐康云等业务系统中可以减少大量重复的 SQL 编写工作。但用不好也容易踩坑。

## 分页查询标准姿势

安隅、颐康云等项目中，几乎每个列表接口都需要分页。MyBatis-Plus 配合 Page 对象是最简洁的方式：

```java
@Configuration
public class MybatisPlusConfig {
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }
}
```

```java
public PageResult<HealthRecordVO> listRecords(Long parentId, Integer pageNum, Integer pageSize) {
    Page<HealthRecord> page = new Page<>(pageNum, pageSize);
    LambdaQueryWrapper<HealthRecord> wrapper = new LambdaQueryWrapper<HealthRecord>()
        .eq(HealthRecord::getParentId, parentId)
        .eq(HealthRecord::getDeleted, 0)
        .orderByDesc(HealthRecord::getRecordDate);
    Page<HealthRecord> result = baseMapper.selectPage(page, wrapper);
    return PageResult.of(result.getTotal(), convertToVO(result.getRecords()));
}
```

注意 Page 对象的 current 从 1 开始，前端传 0 会导致查不到数据，这是常见的对接坑。

## 逻辑删除

颐康云核心表使用逻辑删除，防止误删数据。只需全局配置 + 字段注解：

```yaml
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: deleted
      logic-delete-value: 1
      logic-not-delete-value: 0
```

```java
@TableLogic
private Integer deleted;
```

## 条件构造器与空值陷阱

```java
wrapper.eq(StringUtils.hasText(keyword), HealthRecord::getNotes, keyword)
       .ge(startDate != null, HealthRecord::getRecordDate, startDate);
```

条件为 false 时不会拼进 SQL，避免 `column = null` 这类隐性过滤错误。

## 自动填充

智慧校园与颐康云常见 createTime / updateTime / deleted 字段，用 `MetaObjectHandler` 自动填充，减少样板代码。

## 总结

MyBatis-Plus 适合业务 CRUD 密集的项目；复杂报表仍建议手写 SQL 或 XML。分页、逻辑删除、条件构造器三件套用对，日常开发效率会高很多。
