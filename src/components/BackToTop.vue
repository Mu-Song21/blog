<template>
  <Transition name="fade-up">
    <button v-show="visible" class="back-to-top" @click="scrollToTop" aria-label="回到顶部">
      <svg class="progress-ring" :width="size" :height="size">
        <circle
          class="progress-bg"
          :cx="size / 2"
          :cy="size / 2"
          :r="radius"
          fill="none"
          :stroke-width="strokeWidth"
        />
        <circle
          class="progress-bar"
          :cx="size / 2"
          :cy="size / 2"
          :r="radius"
          fill="none"
          :stroke-width="strokeWidth"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
        />
      </svg>
      <svg class="arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const size = 48
const strokeWidth = 3
const radius = (size - strokeWidth) / 2
const circumference = 2 * Math.PI * radius

const visible = ref(false)
const scrollPercent = ref(0)

const dashOffset = computed(() => circumference - (scrollPercent.value * circumference))

function onScroll() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  visible.value = scrollTop > 300
  scrollPercent.value = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }) })
onUnmounted(() => { window.removeEventListener('scroll', onScroll) })
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 1px solid var(--border);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transition: all var(--transition);
  backdrop-filter: blur(8px);
}

.back-to-top:hover {
  border-color: var(--accent);
  box-shadow: 0 0 20px var(--accent-glow);
  transform: translateY(-2px);
}

.progress-ring {
  position: absolute;
  transform: rotate(-90deg);
}

.progress-bg {
  stroke: var(--border);
}

.progress-bar {
  stroke: var(--accent);
  stroke-linecap: round;
  transition: stroke-dashoffset 0.1s linear;
}

.arrow-icon {
  position: relative;
  color: var(--text-secondary);
  transition: color var(--transition);
}

.back-to-top:hover .arrow-icon {
  color: var(--accent-light);
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(16px);
}

@media (max-width: 768px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 42px;
    height: 42px;
  }
}
</style>
