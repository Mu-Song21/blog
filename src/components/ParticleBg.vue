<template>
  <canvas ref="canvasRef" class="particle-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animId = null

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  let w, h, particles = [], mouse = { x: -999, y: -999 }
  let paused = false
  let time = 0

  function resize() {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
  }

  function createParticles() {
    particles = []
    const cellSize = w < 768 ? 80 : 50
    const cols = Math.ceil(w / cellSize)
    const rows = Math.ceil(h / cellSize)

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const jitterX = (Math.random() - 0.5) * cellSize * 0.8
        const jitterY = (Math.random() - 0.5) * cellSize * 0.8
        const layer = Math.random() // 0=far, 1=near
        particles.push({
          x: col * cellSize + cellSize / 2 + jitterX,
          y: row * cellSize + cellSize / 2 + jitterY,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          baseR: layer < 0.3 ? 0.6 : layer < 0.7 ? 1.0 : 1.6,
          alpha: layer < 0.3 ? 0.12 : layer < 0.7 ? 0.25 : 0.4,
          hue: 30 + Math.random() * 20, // amber to warm orange
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.008 + Math.random() * 0.012,
          layer: layer
        })
      }
    }
  }

  function draw() {
    if (paused) { animId = requestAnimationFrame(draw); return }
    ctx.clearRect(0, 0, w, h)
    time++

    const connectionDist = w < 768 ? 150 : 200
    const mouseDist = 180
    const mouseAttractDist = 120

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]

      // Breathing pulse
      const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.5 + 0.5
      const currentAlpha = p.alpha * (0.6 + pulse * 0.4)
      const currentR = p.baseR * (0.8 + pulse * 0.3)

      // Mouse attraction - gentle pull toward cursor
      const dmx = mouse.x - p.x
      const dmy = mouse.y - p.y
      const dmSq = dmx * dmx + dmy * dmy
      if (dmSq < mouseAttractDist * mouseAttractDist && dmSq > 1) {
        const dm = Math.sqrt(dmSq)
        const force = (1 - dm / mouseAttractDist) * 0.02
        p.vx += (dmx / dm) * force
        p.vy += (dmy / dm) * force
      }

      // Damping
      p.vx *= 0.998
      p.vy *= 0.998

      // Base drift
      p.x += p.vx
      p.y += p.vy

      // Wrap around
      if (p.x < -10) p.x = w + 10
      if (p.x > w + 10) p.x = -10
      if (p.y < -10) p.y = h + 10
      if (p.y > h + 10) p.y = -10

      // Draw particle
      ctx.beginPath()
      ctx.arc(p.x, p.y, currentR, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${currentAlpha})`
      ctx.fill()

      // Glow for near-layer particles
      if (p.layer > 0.7) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, currentR * 3, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${currentAlpha * 0.15})`
        ctx.fill()
      }

      // Connection lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        // Only connect similar layers for depth feel
        if (Math.abs(p.layer - p2.layer) > 0.4) continue
        const dx = p.x - p2.x
        const dy = p.y - p2.y
        const distSq = dx * dx + dy * dy
        if (distSq < connectionDist * connectionDist) {
          const dist = Math.sqrt(distSq)
          const lineAlpha = 0.05 * (1 - dist / connectionDist) * (p.layer + p2.layer) / 2
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = `hsla(${(p.hue + p2.hue) / 2}, 80%, 55%, ${lineAlpha})`
          ctx.lineWidth = 0.4
          ctx.stroke()
        }
      }

      // Mouse connection
      if (dmSq < mouseDist * mouseDist) {
        const dm = Math.sqrt(dmSq)
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(mouse.x, mouse.y)
        const mouseAlpha = 0.18 * (1 - dm / mouseDist) * p.layer
        ctx.strokeStyle = `hsla(40, 100%, 65%, ${mouseAlpha})`
        ctx.lineWidth = 0.6
        ctx.stroke()
      }
    }

    animId = requestAnimationFrame(draw)
  }

  function onMouseMove(e) {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }

  function onMouseLeave() {
    mouse.x = -999
    mouse.y = -999
  }

  function onVisibilityChange() {
    paused = document.hidden
  }

  resize()
  createParticles()
  draw()
  window.addEventListener('resize', () => { resize(); createParticles() })
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseleave', onMouseLeave)
  document.addEventListener('visibilitychange', onVisibilityChange)

  onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseleave', onMouseLeave)
    document.removeEventListener('visibilitychange', onVisibilityChange)
  })
})
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
