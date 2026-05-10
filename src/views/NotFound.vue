<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <div class="glitch-text" data-text="404">404</div>
      <h1 class="not-found-title">页面走丢了</h1>
      <p class="not-found-desc">你要找的页面不存在，可能已被移除或地址输入错误。</p>
      <div class="not-found-actions">
        <router-link to="/" class="btn btn-primary btn-glow" @click="ripple">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          返回首页
        </router-link>
        <router-link to="/blog" class="btn btn-secondary" @click="ripple">浏览文章</router-link>
      </div>
    </div>
    <div class="not-found-bg">
      <div class="orbit orbit-1"></div>
      <div class="orbit orbit-2"></div>
      <div class="orbit orbit-3"></div>
    </div>
  </div>
</template>

<script setup>
import { useRipple } from '../composables/useRipple'
const { createRipple } = useRipple()
function ripple(e) { createRipple(e) }
</script>

<style scoped>
.not-found-page {
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 24px;
}

.not-found-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

.glitch-text {
  font-size: 140px;
  font-weight: 800;
  font-family: var(--font-mono);
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 24px;
  position: relative;
  animation: glitch 3s infinite;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glitch-text::before {
  animation: glitch-top 2s infinite;
  clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
}

.glitch-text::after {
  animation: glitch-bottom 2.5s infinite;
  clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
}

@keyframes glitch-top {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-3px, 2px); }
  40% { transform: translate(3px, -2px); }
  60% { transform: translate(-2px, 1px); }
  80% { transform: translate(2px, -1px); }
}

@keyframes glitch-bottom {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(3px, -2px); }
  40% { transform: translate(-3px, 2px); }
  60% { transform: translate(2px, -1px); }
  80% { transform: translate(-2px, 1px); }
}

@keyframes glitch {
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.8; }
  94% { opacity: 1; }
  95% { opacity: 0.6; }
  96% { opacity: 1; }
}

.not-found-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 12px;
}

.not-found-desc {
  font-size: 16px;
  color: var(--text-muted);
  margin-bottom: 36px;
  max-width: 400px;
}

.not-found-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn-glow {
  box-shadow: 0 0 20px var(--accent-glow), 0 4px 15px rgba(99, 102, 241, 0.2);
}

.not-found-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.orbit {
  position: absolute;
  border-radius: 50%;
  border: 1px solid var(--border);
  opacity: 0.15;
}

.orbit-1 {
  width: 400px;
  height: 400px;
  animation: orbit-spin 20s linear infinite;
}

.orbit-2 {
  width: 600px;
  height: 600px;
  animation: orbit-spin 30s linear infinite reverse;
}

.orbit-3 {
  width: 800px;
  height: 800px;
  animation: orbit-spin 40s linear infinite;
  border-style: dashed;
}

@keyframes orbit-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .glitch-text {
    font-size: 80px;
  }

  .not-found-title {
    font-size: 22px;
  }

  .not-found-actions {
    flex-direction: column;
    align-items: center;
  }

  .orbit-2, .orbit-3 {
    display: none;
  }
}
</style>
