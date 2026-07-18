<template>
  <router-link :to="`/projects#${project.slug}`" class="project-card card" @click="ripple">
    <div class="card-top">
      <div class="card-icon" :style="{ background: project.gradient }">
        <span>{{ project.icon }}</span>
      </div>
      <span v-if="project.track" class="card-track">{{ project.track }}</span>
    </div>
    <h3 class="card-title">{{ project.name }}</h3>
    <p class="card-desc">{{ project.description }}</p>
    <div class="card-tech">
      <span class="tag" v-for="t in project.tech" :key="t">{{ t }}</span>
    </div>
    <div class="card-stats">
      <div class="stat" v-for="s in project.stats" :key="s.label">
        <span class="stat-value">{{ s.value }}</span>
        <span class="stat-label">{{ s.label }}</span>
      </div>
      <span class="card-more">详情 →</span>
    </div>
  </router-link>
</template>

<script setup>
import { useRipple } from '../composables/useRipple'

defineProps({
  project: { type: Object, required: true }
})

const { createRipple } = useRipple()
function ripple(e) {
  createRipple(e)
}
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-decoration: none;
  color: inherit;
  height: 100%;
  transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);
}

.project-card:hover {
  border-color: var(--border-light);
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.card-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.card-track {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--accent);
  letter-spacing: 0.5px;
  text-align: right;
  line-height: 1.4;
  max-width: 9em;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
}

.card-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}

.card-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.card-stats {
  display: flex;
  align-items: flex-end;
  gap: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
  margin-top: auto;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--accent-light);
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
}

.card-more {
  margin-left: auto;
  font-size: 12px;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.project-card:hover .card-more {
  color: var(--accent);
}
</style>
