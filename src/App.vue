<template>
  <div class="app">
    <div v-if="isLoading" class="route-loading-bar"></div>
    <ClickMeteor />
    <ReadProgress v-if="isBlogDetail" />
    <ParticleBg v-if="!isAdminRoute" />
    <Navbar v-if="!isAdminRoute" />
    <main :class="{ 'admin-main': isAdminRoute }">
      <router-view v-slot="{ Component, route: viewRoute }">
        <transition name="page-slide" mode="out-in" @before-enter="onBeforeEnter" @after-enter="onAfterEnter">
          <component :is="Component" :key="viewRoute.path" />
        </transition>
      </router-view>
    </main>
    <Footer v-if="!isAdminRoute" />
    <BackToTop v-if="!isAdminRoute" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ParticleBg from './components/ParticleBg.vue'
import ClickMeteor from './components/ClickMeteor.vue'
import BackToTop from './components/BackToTop.vue'
import ReadProgress from './components/ReadProgress.vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
const isBlogDetail = computed(() => route.name === 'BlogDetail')
const isLoading = ref(false)

let loadingTimer = null

function onBeforeEnter() {
  loadingTimer = setTimeout(() => { isLoading.value = true }, 150)
}

function onAfterEnter() {
  clearTimeout(loadingTimer)
  isLoading.value = false
}
</script>

<style>
.route-loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  z-index: 100001;
  background: var(--gradient-1);
  animation: loading-progress 0.8s ease-out forwards;
  box-shadow: 0 0 10px var(--accent-glow-strong);
}

@keyframes loading-progress {
  0% { width: 0; }
  30% { width: 40%; }
  60% { width: 70%; }
  100% { width: 100%; }
}

.page-slide-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-slide-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.page-slide-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding-top: var(--nav-height);
}

main.admin-main {
  padding-top: 0;
}
</style>
