<template>
  <div class="project-card card">
    <div class="card-icon" :style="{ background: project.gradient }">
      <span>{{ project.icon }}</span>
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
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: { type: Object, required: true }
})
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
}

.card-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.card-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.card-stats {
  display: flex;
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
</style>
