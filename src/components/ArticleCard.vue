<template>
  <router-link :to="`/blog/${article.id}`" class="article-card card">
    <div class="card-top">
      <span class="category">{{ article.category }}</span>
      <div class="card-meta">
        <span class="read-time">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          {{ readTime }}
        </span>
        <span class="date">{{ article.createdAt }}</span>
      </div>
    </div>
    <h3 class="card-title">{{ article.title }}</h3>
    <p class="card-excerpt">{{ article.excerpt }}</p>
    <div class="card-tags">
      <span class="tag" v-for="tag in article.tags.slice(0, 3)" :key="tag">{{ tag }}</span>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  article: { type: Object, required: true }
})

const readTime = computed(() => {
  const content = props.article.content || ''
  const words = content.replace(/[#*`\-\[\]()>|]/g, '').length
  const mins = Math.max(1, Math.ceil(words / 400))
  return `${mins} 分钟`
})
</script>

<style scoped>
.article-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.read-time {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-muted);
}

.date {
  font-size: 12px;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
}

.card-excerpt {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
  padding-top: 8px;
}
</style>
