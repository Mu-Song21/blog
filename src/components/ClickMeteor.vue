<template>
  <canvas ref="canvasRef" class="click-meteor-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  let meteors = []
  let animId = null
  const MAX_METEORS = 60

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  class Meteor {
    constructor(x, y) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 16 + 10
      this.x = x
      this.y = y
      this.vx = Math.cos(angle) * speed
      this.vy = Math.sin(angle) * speed
      this.life = 1
      this.decay = Math.random() * 0.01 + 0.006
      this.headSize = Math.random() * 2 + 1.5
      this.tailLen = Math.floor(Math.random() * 30) + 40
      // Warm amber to orange hues
      this.hue = Math.random() * 30 + 30
      this.trail = []
    }

    update() {
      this.trail.unshift({ x: this.x, y: this.y })
      if (this.trail.length > this.tailLen) this.trail.pop()
      this.x += this.vx * this.life
      this.y += this.vy * this.life
      this.vx *= 0.993
      this.vy *= 0.993
      this.life -= this.decay
    }

    draw(ctx) {
      if (this.life <= 0 || this.trail.length < 2) return
      const len = this.trail.length
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'

      for (let i = 0; i < len - 1; i++) {
        const t = this.trail[i]
        const next = this.trail[i + 1]
        const ratio = 1 - i / len
        const alpha = ratio * this.life * 0.8
        const width = this.headSize * ratio * this.life

        const grad = ctx.createLinearGradient(t.x, t.y, next.x, next.y)
        grad.addColorStop(0, `hsla(${this.hue}, 90%, 70%, ${alpha})`)
        grad.addColorStop(1, `hsla(${this.hue}, 85%, 55%, ${alpha * 0.5})`)

        ctx.beginPath()
        ctx.moveTo(t.x, t.y)
        ctx.lineTo(next.x, next.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = Math.max(0.3, width)
        ctx.lineCap = 'round'
        ctx.stroke()
      }

      const head = this.trail[0]
      const glowSize = this.headSize * 3 * this.life

      const outerGlow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, glowSize * 3)
      outerGlow.addColorStop(0, `hsla(${this.hue}, 100%, 90%, ${this.life * 0.5})`)
      outerGlow.addColorStop(0.3, `hsla(${this.hue}, 90%, 70%, ${this.life * 0.2})`)
      outerGlow.addColorStop(1, `hsla(${this.hue}, 80%, 50%, 0)`)
      ctx.beginPath()
      ctx.arc(head.x, head.y, glowSize * 3, 0, Math.PI * 2)
      ctx.fillStyle = outerGlow
      ctx.fill()

      const midGlow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, glowSize)
      midGlow.addColorStop(0, `hsla(${this.hue}, 100%, 100%, ${this.life * 0.8})`)
      midGlow.addColorStop(0.5, `hsla(${this.hue}, 100%, 85%, ${this.life * 0.3})`)
      midGlow.addColorStop(1, `hsla(${this.hue}, 90%, 60%, 0)`)
      ctx.beginPath()
      ctx.arc(head.x, head.y, glowSize, 0, Math.PI * 2)
      ctx.fillStyle = midGlow
      ctx.fill()

      ctx.beginPath()
      ctx.arc(head.x, head.y, this.headSize * this.life * 0.5, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(0, 0%, 100%, ${this.life})`
      ctx.fill()

      ctx.restore()
    }
  }

  function spawnMeteors(x, y) {
    const remaining = MAX_METEORS - meteors.length
    const count = Math.min(Math.floor(Math.random() * 3) + 4, remaining)
    for (let i = 0; i < count; i++) {
      meteors.push(new Meteor(x, y))
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    meteors = meteors.filter(m => m.life > 0.01)
    meteors.forEach(m => {
      m.update()
      if (m.life > 0) m.draw(ctx)
    })
    if (meteors.length > 0) {
      animId = requestAnimationFrame(animate)
    } else {
      animId = null
    }
  }

  function onClick(e) {
    spawnMeteors(e.clientX, e.clientY)
    if (!animId) {
      animId = requestAnimationFrame(animate)
    }
  }

  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('click', onClick)

  onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
    window.removeEventListener('click', onClick)
  })
})
</script>

<style scoped>
.click-meteor-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 99999;
}
</style>
