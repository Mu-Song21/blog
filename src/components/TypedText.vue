<template>
  <span class="typed-wrapper">
    <span class="typed-text">{{ displayText }}</span>
    <span class="typed-cursor" :class="{ blink: isPaused }">|</span>
  </span>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  strings: { type: Array, required: true },
  typeSpeed: { type: Number, default: 80 },
  deleteSpeed: { type: Number, default: 40 },
  pauseTime: { type: Number, default: 2000 }
})

const displayText = ref('')
const isPaused = ref(false)
let strIdx = 0, charIdx = 0, deleting = false, timer = null

function tick() {
  const current = props.strings[strIdx]
  if (!deleting) {
    displayText.value = current.substring(0, charIdx + 1)
    charIdx++
    if (charIdx === current.length) {
      isPaused.value = true
      timer = setTimeout(() => {
        isPaused.value = false
        deleting = true
        tick()
      }, props.pauseTime)
      return
    }
    timer = setTimeout(tick, props.typeSpeed + Math.random() * 40)
  } else {
    displayText.value = current.substring(0, charIdx - 1)
    charIdx--
    if (charIdx === 0) {
      deleting = false
      strIdx = (strIdx + 1) % props.strings.length
      timer = setTimeout(tick, 400)
      return
    }
    timer = setTimeout(tick, props.deleteSpeed)
  }
}

onMounted(() => { timer = setTimeout(tick, 500) })
onUnmounted(() => clearTimeout(timer))
</script>

<style scoped>
.typed-wrapper {
  display: inline;
}

.typed-text {
  color: var(--accent-light);
}

.typed-cursor {
  color: var(--accent);
  font-weight: 300;
  animation: none;
}

.typed-cursor.blink {
  animation: cursor-blink 0.8s infinite;
}

@keyframes cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
