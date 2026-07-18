---
id: 6
title: "Vue 3 Composition API 实战：从 Options API 到思维升级"
excerpt: "深入理解 Vue 3 Composition API 的设计哲学，通过实际案例对比 Options API 与 Composition API 的差异，掌握 setup、ref、reactive、computed、watch 的最佳实践。"
category: "前端"
tags: ["Vue 3","Composition API","JavaScript","前端"]
createdAt: 2026-03-05
updatedAt: 2026-03-05
featured: false
status: published
---

## 为什么要用 Composition API

Vue 2 的 Options API（data、methods、computed、watch）在小型组件中非常直观，但当组件逻辑变得复杂时，同一个功能的代码被分散在不同选项中，维护成本急剧上升。

Composition API 的核心优势：

- **逻辑复用**：通过 composable 函数（而非 mixins）实现逻辑复用，避免命名冲突和来源不清晰
- **类型推导**：原生 TypeScript 支持更好，ref 和 reactive 的类型推导自然流畅
- **代码组织**：相关逻辑聚合在一起，而非按选项类型分散

## 核心 API 实战

### ref vs reactive 的选择

```javascript
import { ref, reactive } from 'vue'

const count = ref(0)
count.value++

const state = reactive({
  name: '目送',
  skills: ['Vue', 'Spring Boot']
})
state.skills.push('MQTT')
```

**实践建议**：

- 基本类型用 `ref`，对象类型用 `reactive`
- 从 composable 返回值时优先用 `ref`，因为解构不会丢失响应性
- 模板中 ref 自动解包，script 中需要 `.value`

### 自定义 Composable 函数

```javascript
// composables/useFetch.js
import { ref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)

  watchEffect(async () => {
    loading.value = true
    try {
      const res = await fetch(url.value)
      data.value = await res.json()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  })

  return { data, loading, error }
}
```

这个模式在博客项目中被大量使用，比如获取文章列表、项目数据等场景。

### watch 与 watchEffect 的区别

```javascript
// watch：明确指定依赖，惰性执行
watch(source, (newVal, oldVal) => {
  console.log('数据变化:', oldVal, '->', newVal)
}, { deep: true })

// watchEffect：自动追踪依赖，立即执行
watchEffect(() => {
  console.log('当前搜索:', searchQuery.value)
  fetchResults(searchQuery.value)
})
```

**选择原则**：

- 需要旧值或精确控制 → `watch`
- 自动追踪、副作用执行 → `watchEffect`

## 实际项目中的模式

### 全局状态管理（Pinia）

```javascript
export const useBlogStore = defineStore('blog', () => {
  const articles = ref([])
  const loading = ref(false)

  const publishedArticles = computed(() =>
    articles.value.filter(a => a.status === 'published')
  )

  async function fetchArticles() {
    loading.value = true
    const { data } = await api.get('/articles')
    articles.value = data
    loading.value = false
  }

  return { articles, publishedArticles, fetchArticles }
})
```

Pinia + Composition API 的组合让状态管理变得清晰而强大。

## 总结

Composition API 不是银弹，但它确实解决了 Options API 在复杂组件中的痛点。关键在于：逻辑聚合、类型安全、灵活复用。
