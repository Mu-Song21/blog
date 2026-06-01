<template>
  <nav class="toc" :class="{ collapsed: isCollapsed }" v-if="toc.length > 0">
    <button class="toc-toggle" @click="isCollapsed = !isCollapsed">
      <span class="toc-label">目录</span>
      <svg :class="{ rotated: !isCollapsed }" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <Transition name="toc-expand">
      <ul class="toc-list" v-show="!isCollapsed">
        <li
          v-for="item in toc"
          :key="item.id"
          :class="[
            `toc-level-${item.level}`,
            { active: activeId === item.id }
          ]"
        >
          <a :href="`#${item.id}`" @click.prevent="scrollTo(item.id)">{{ item.text }}</a>
        </li>
      </ul>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  toc: { type: Array, default: () => [] }
})

const activeId = ref('')
const isCollapsed = ref(false)

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    const offset = 80
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

function updateActive() {
  const headings = props.toc
    .map(item => document.getElementById(item.id))
    .filter(Boolean)

  let current = ''
  for (const el of headings) {
    const rect = el.getBoundingClientRect()
    if (rect.top <= 100) {
      current = el.id
    }
  }
  activeId.value = current || (headings.length > 0 ? headings[0].id : '')
}

onMounted(() => {
  window.addEventListener('scroll', updateActive, { passive: true })
  updateActive()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActive)
})
</script>

<style scoped>
.toc {
  position: sticky;
  top: 80px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  width: 220px;
  padding: 16px 0;
  scrollbar-width: none;
}

.toc::-webkit-scrollbar {
  display: none;
}

.toc-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 11px;
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0 0 12px;
  width: 100%;
  text-align: left;
  transition: color var(--transition);
}

.toc-toggle:hover {
  color: var(--accent);
}

.toc-toggle svg {
  transition: transform 0.3s ease;
}

.toc-toggle svg.rotated {
  transform: rotate(180deg);
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border-left: 1px solid var(--border);
}

.toc-list li {
  position: relative;
}

.toc-list li a {
  display: block;
  padding: 6px 16px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-muted);
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 2px solid transparent;
  margin-left: -1px;
}

.toc-list li a:hover {
  color: var(--text-secondary);
}

.toc-level-3 a {
  padding-left: 28px;
  font-size: 12px;
}

.toc-list li.active a {
  color: var(--accent);
  border-left-color: var(--accent);
}

/* 移动端折叠 */
@media (max-width: 1200px) {
  .toc {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: auto;
    max-width: 260px;
    max-height: 50vh;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 12px 16px;
    box-shadow: var(--shadow-lg);
    z-index: 100;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .toc.collapsed .toc-list {
    display: none;
  }
}

/* 过渡动画 */
.toc-expand-enter-active,
.toc-expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.toc-expand-enter-from,
.toc-expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.toc-expand-enter-to,
.toc-expand-leave-from {
  opacity: 1;
  max-height: 500px;
}

/* 超小屏幕（手机）上完全隐藏目录，避免挡住评论与正文 */
@media (max-width: 768px) {
  .toc {
    display: none;
  }
}
</style>
