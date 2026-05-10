<template>
  <canvas ref="canvasRef" class="click-meteor-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  let meteors = []
  let animId = null

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  class Meteor {
    constructor(x, y) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 18 + 12
      this.x = x
      this.y = y
      this.vx = Math.cos(angle) * speed
      this.vy = Math.sin(angle) * speed
      this.life = 1
      this.decay = Math.random() * 0.008 + 0.006
      this.headSize = Math.random() * 2.5 + 2
      this.tailLen = Math.floor(Math.random() * 40) + 50
      this.hue = Math.random() * 60 + 220
      this.trail = []
    }

    update() {
      this.trail.unshift({ x: this.x, y: this.y })
      if (this.trail.length > this.tailLen) this.trail.pop()

      this.x += this.vx * this.life
      this.y += this.vy * this.life
      this.vx *= 0.995
      this.vy *= 0.995
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
        const alpha = ratio * this.life * 0.9
        const width = this.headSize * ratio * this.life

        const grad = ctx.createLinearGradient(t.x, t.y, next.x, next.y)
        grad.addColorStop(0, `hsla(${this.hue}, 80%, 80%, ${alpha})`)
        grad.addColorStop(1, `hsla(${this.hue}, 90%, 65%, ${alpha * 0.6})`)

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
      outerGlow.addColorStop(0, `hsla(${this.hue}, 100%, 95%, ${this.life * 0.6})`)
      outerGlow.addColorStop(0.3, `hsla(${this.hue}, 90%, 80%, ${this.life * 0.3})`)
      outerGlow.addColorStop(1, `hsla(${this.hue}, 80%, 60%, 0)`)
      ctx.beginPath()
      ctx.arc(head.x, head.y, glowSize * 3, 0, Math.PI * 2)
      ctx.fillStyle = outerGlow
      ctx.fill()

      const midGlow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, glowSize)
      midGlow.addColorStop(0, `hsla(${this.hue}, 100%, 100%, ${this.life * 0.9})`)
      midGlow.addColorStop(0.5, `hsla(${this.hue}, 100%, 90%, ${this.life * 0.4})`)
      midGlow.addColorStop(1, `hsla(${this.hue}, 90%, 70%, 0)`)
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
    const count = Math.floor(Math.random() * 5) + 6
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
