---
id: 8
title: "前端性能优化实战：让你的 Vue 应用飞起来"
excerpt: "从路由懒加载、组件按需引入、虚拟列表、图片懒加载到构建产物分析，系统梳理 Vue 3 项目的性能优化策略与可量化的优化效果。"
category: "前端"
tags: ["Vue 3","性能优化","Vite","JavaScript","前端"]
createdAt: 2026-04-28
updatedAt: 2026-04-28
featured: false
status: published
---

## 性能优化的意义

在真实项目中，首屏加载时间直接影响用户留存率。Google 的研究表明，页面加载时间每增加 1 秒，转化率下降 7%。

## 路由懒加载

最简单也最有效的优化——将路由组件改为动态 import：

```javascript
const routes = [
  {
    path: '/blog',
    component: () => import('../views/BlogList.vue')
  },
  {
    path: '/blog/:id',
    component: () => import('../views/BlogDetail.vue')
  }
]
```

配合 Vite 的 code splitting，每个页面成为独立 chunk，首屏只加载当前页面所需的代码。

## 组件按需引入

避免在一个文件中引入所有组件，而是按需加载：

```javascript
import { defineAsyncComponent } from 'vue'

const HeavyChart = defineAsyncComponent(() =>
  import('./components/HeavyChart.vue')
)
```

对于像 Markdown 渲染器、图表库这类较重的依赖，按需加载可以显著减少初始包体积。

## 虚拟列表

当列表项超过 100 个时，虚拟列表是必须的优化：

```javascript
// 核心思路：只渲染可视区域内的元素
function useVirtualList(items, itemHeight, containerHeight) {
  const scrollTop = ref(0)
  const visibleCount = Math.ceil(containerHeight / itemHeight)

  const visibleItems = computed(() => {
    const start = Math.floor(scrollTop.value / itemHeight)
    const end = start + visibleCount + 1
    return items.value.slice(start, end).map((item, i) => ({
      ...item,
      _offset: (start + i) * itemHeight
    }))
  })

  const totalHeight = computed(() => items.value.length * itemHeight)

  return { visibleItems, totalHeight, scrollTop }
}
```

## 图片懒加载

使用 IntersectionObserver 实现图片懒加载：

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      observer.unobserve(img)
    }
  })
}, { rootMargin: '200px' })

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img)
})
```

## 构建产物分析

使用 Vite 的 rollup-plugin-visualizer 分析打包体积：

```javascript
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true,
      filename: 'stats.html'
    })
  ]
})
```

通过分析报告，你可以清楚看到哪些依赖占用了最多体积，从而有针对性地优化。

## 其他优化手段

- **Tree Shaking**：确保使用 ESM 格式的依赖
- **CDN 加速**：将大依赖（如 highlight.js）通过 CDN 引入
- **字体优化**：使用 `font-display: swap` 避免字体加载阻塞
- **CSS 精简**：使用 PurgeCSS 移除未使用的 CSS
- **预加载关键资源**：`<link rel="preload">`

## 量化效果

在博客项目中应用上述优化后：

- 首屏 JS 体积从 320KB 降至 85KB（gzip 后）
- 首屏加载时间从 2.1s 降至 0.8s
- Lighthouse Performance 评分从 62 提升到 95

## 总结

性能优化不是一次性工作，而是持续的过程。从路由懒加载开始，逐步引入更多优化手段，每一步都能看到可量化的提升。
