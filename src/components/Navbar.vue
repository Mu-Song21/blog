<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-inner container">
      <router-link to="/" class="logo">
        <span class="logo-icon">▸</span>
        <span class="logo-text">目送</span>
      </router-link>
      <div class="nav-links" :class="{ open: menuOpen }">
        <router-link to="/" @click="onNavClick" class="nav-link-item">首页</router-link>
        <router-link to="/projects" @click="onNavClick" class="nav-link-item">项目</router-link>
        <router-link to="/blog" @click="onNavClick" class="nav-link-item">文章</router-link>
        <router-link to="/about" @click="onNavClick" class="nav-link-item">关于</router-link>
      </div>
      <button class="menu-toggle" @click="menuOpen = !menuOpen" aria-label="菜单">
        <span :class="{ active: menuOpen }"></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRipple } from '../composables/useRipple'
const menuOpen = ref(false)
const isScrolled = ref(false)
const { createRipple } = useRipple()

function onScroll() {
  isScrolled.value = window.scrollY > 20
}

function onNavClick(e) {
  menuOpen.value = false
  createRipple(e)
}

onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }) })
onUnmounted(() => { window.removeEventListener('scroll', onScroll) })
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  z-index: 1000;
  border-bottom: 1px solid transparent;
  transition: all var(--transition);
}

.navbar.scrolled {
  background: rgba(22, 22, 31, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom-color: var(--border);
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.2);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
}

.logo:hover {
  color: var(--text-primary);
}

.logo-icon {
  color: var(--accent);
  font-size: 16px;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-links a {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  position: relative;
  padding: 4px 0;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-1);
  border-radius: 1px;
  transition: width var(--transition);
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--text-primary);
}

.nav-links a.router-link-active::after {
  width: 100%;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  width: 28px;
  height: 20px;
  cursor: pointer;
  position: relative;
}

.menu-toggle span,
.menu-toggle span::before,
.menu-toggle span::after {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  border-radius: 1px;
  transition: all var(--transition);
}

.menu-toggle span::before,
.menu-toggle span::after {
  content: '';
  position: absolute;
}

.menu-toggle span::before {
  top: 0;
}

.menu-toggle span::after {
  bottom: 0;
}

.menu-toggle span.active {
  background: transparent;
}

.menu-toggle span.active::before {
  top: 50%;
  transform: rotate(45deg);
}

.menu-toggle span.active::after {
  bottom: 50%;
  transform: rotate(-45deg);
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav-links {
    position: fixed;
    top: var(--nav-height);
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(22, 22, 31, 0.95);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    padding: 24px;
    gap: 20px;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all var(--transition);
  }

  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-links a {
    font-size: 16px;
  }
}
</style>
