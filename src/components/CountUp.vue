<template>
  <span class="count-up" ref="el">{{ displayVal }}</span>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  end: { type: Number, required: true },
  duration: { type: Number, default: 1500 },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' }
})

const displayVal = ref(props.prefix + '0' + props.suffix)
const el = ref(null)
let observer = null

function animate() {
  const start = performance.now()
  function step(now) {
    const progress = Math.min((now - start) / props.duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = Math.round(eased * props.end)
    displayVal.value = props.prefix + current + props.suffix
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animate()
      observer.disconnect()
    }
  }, { threshold: 0.3 })
  if (el.value) observer.observe(el.value)
})

onUnmounted(() => { if (observer) observer.disconnect() })
</script>
