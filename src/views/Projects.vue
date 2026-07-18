<template>
  <div class="projects-page">
    <section class="projects-hero">
      <div class="container">
        <div class="section-label reveal">PROJECTS</div>
        <h1 class="projects-hero-title reveal reveal-delay-1">项目作品集</h1>
        <p class="projects-hero-desc reveal reveal-delay-2">
          每个项目都有独立案例页：业务背景、架构分层、难点方案、关键代码与配套文章。点击进入完整说明。
        </p>
      </div>
    </section>

    <section class="section container">
      <div class="project-list">
        <article
          v-for="(project, index) in projects"
          :id="project.slug"
          :key="project.slug"
          class="project-item reveal"
          :class="'reveal-delay-' + (index % 3 + 1)"
        >
          <div class="project-left">
            <div class="project-index">{{ String(index + 1).padStart(2, '0') }}</div>
            <div class="project-icon" :style="{ background: project.gradient }">
              <span>{{ project.icon }}</span>
            </div>
          </div>
          <div class="project-body">
            <div class="project-header">
              <h3 class="project-name">
                <span class="project-brand">{{ project.name }}</span>
                <span class="project-sep">—</span>
                <span class="project-subtitle">{{ project.subtitle }}</span>
              </h3>
              <span class="project-category">{{ project.track || project.category }}</span>
            </div>
            <p class="project-desc">{{ project.description }}</p>
            <div class="project-tech">
              <span class="tag" v-for="t in project.tech.slice(0, 8)" :key="t">{{ t }}</span>
              <span v-if="project.tech.length > 8" class="tag muted">+{{ project.tech.length - 8 }}</span>
            </div>
            <div class="project-highlights">
              <div class="highlight" v-for="h in project.highlights" :key="h.label">
                <span class="highlight-value">{{ h.value }}</span>
                <span class="highlight-label">{{ h.label }}</span>
              </div>
            </div>
            <div class="project-actions">
              <router-link :to="`/projects/${project.slug}`" class="btn btn-primary">
                查看完整案例
              </router-link>
              <router-link
                v-if="project.articleId"
                :to="`/blog/${project.articleId}`"
                class="btn btn-secondary"
              >
                项目复盘
              </router-link>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useScrollReveal } from '../composables/useScrollReveal'
import { PROJECTS } from '../data/projects'

useScrollReveal()
const route = useRoute()
const router = useRouter()
const projects = PROJECTS

onMounted(async () => {
  await nextTick()
  // 兼容旧锚点：/projects#mojing → /projects/mojing
  const hash = route.hash?.replace(/^#/, '')
  if (hash && PROJECTS.some((p) => p.slug === hash)) {
    router.replace(`/projects/${hash}`)
  }
})
</script>

<style scoped>
.projects-hero {
  padding: 100px 0 48px;
  position: relative;
}

.projects-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 50% 80% at 50% 0%, rgba(245, 158, 11, 0.06) 0%, transparent 70%);
  pointer-events: none;
}

.projects-hero .container {
  position: relative;
}

.projects-hero-title {
  font-size: 52px;
  font-weight: 400;
  font-family: var(--font-display);
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.projects-hero-desc {
  font-size: 17px;
  color: var(--text-muted);
  max-width: 640px;
  line-height: 1.7;
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.project-item {
  display: flex;
  gap: 32px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 36px 40px;
  transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);
  scroll-margin-top: 96px;
}

.project-item:hover {
  border-color: var(--border-light);
  box-shadow: var(--shadow);
  transform: translateY(-3px);
}

.project-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.project-index {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  font-family: var(--font-mono);
  letter-spacing: 2px;
}

.project-icon {
  width: 64px;
  height: 64px;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.project-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.project-name {
  font-size: 24px;
  font-weight: 400;
  font-family: var(--font-display);
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px;
}

.project-sep {
  color: var(--text-muted);
  font-size: 0.85em;
}

.project-subtitle {
  font-size: 0.85em;
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-weight: 500;
}

.project-category {
  font-size: 11px;
  color: var(--accent);
  font-weight: 500;
  letter-spacing: 2px;
  font-family: var(--font-mono);
  text-transform: uppercase;
}

.project-desc {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag.muted {
  opacity: 0.7;
}

.project-highlights {
  display: flex;
  gap: 28px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
  flex-wrap: wrap;
}

.highlight {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.highlight-value {
  font-size: 18px;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--accent-light);
}

.highlight-label {
  font-size: 11px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  letter-spacing: 1px;
}

.project-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 4px;
}

@media (max-width: 768px) {
  .projects-hero-title {
    font-size: 36px;
  }

  .project-item {
    flex-direction: column;
    gap: 20px;
    padding: 28px;
  }

  .project-left {
    flex-direction: row;
  }
}
</style>
