<template>
  <div class="projects-page">
    <section class="projects-hero">
      <div class="container">
        <div class="section-label reveal">PROJECTS</div>
        <h1 class="projects-hero-title reveal reveal-delay-1">项目展示</h1>
        <p class="projects-hero-desc reveal reveal-delay-2">守望、安隅、引路、安康、醒驾、青衿——围绕 Java 后端、物联网、家庭健康与 AI 落地，记录从需求到上线的完整实践。</p>
      </div>
    </section>

    <section class="section container">
      <div class="project-list">
        <div class="project-item reveal" v-for="(project, index) in projects" :key="project.name" :class="'reveal-delay-' + (index % 3 + 1)">
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
              <span class="project-category">{{ project.category }}</span>
            </div>
            <p class="project-desc">{{ project.description }}</p>
            <p class="project-detail">{{ project.detail }}</p>
            <div class="project-tech">
              <span class="tag" v-for="t in project.tech" :key="t">{{ t }}</span>
            </div>
            <div class="project-features">
              <div class="feature" v-for="f in project.features" :key="f">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span>{{ f }}</span>
              </div>
            </div>
            <div class="project-highlights">
              <div class="highlight" v-for="h in project.highlights" :key="h.label">
                <span class="highlight-value">{{ h.value }}</span>
                <span class="highlight-label">{{ h.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useScrollReveal } from '../composables/useScrollReveal'
import { PROJECTS } from '../data/projects'

useScrollReveal()

const projects = PROJECTS
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
  max-width: 600px;
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.project-item {
  display: flex;
  gap: 32px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 40px;
  transition: all var(--transition);
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

.project-brand {
  color: var(--text);
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
  font-weight: 500;
}

.project-detail {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.8;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.project-features {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
  margin-top: 8px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-secondary);
}

.project-highlights {
  display: flex;
  gap: 32px;
  padding-top: 20px;
  margin-top: 8px;
  border-top: 1px solid var(--border);
}

.highlight {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.highlight-value {
  font-size: 20px;
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

  .project-features {
    grid-template-columns: 1fr;
  }

  .project-highlights {
    flex-wrap: wrap;
  }
}
</style>
