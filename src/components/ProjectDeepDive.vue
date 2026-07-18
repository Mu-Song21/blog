<template>
  <div v-if="showcase" class="deep-dive">
    <div class="dive-nav">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="dive-tab"
        :class="{ active: active === tab.id }"
        @click="active = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <section v-show="active === 'background'" class="dive-panel">
      <h4 class="dive-title">业务背景</h4>
      <dl class="bg-grid">
        <div>
          <dt>面向谁</dt>
          <dd>{{ showcase.background.audience }}</dd>
        </div>
        <div>
          <dt>痛点</dt>
          <dd>{{ showcase.background.problem }}</dd>
        </div>
        <div>
          <dt>目标</dt>
          <dd>{{ showcase.background.goal }}</dd>
        </div>
      </dl>
    </section>

    <section v-show="active === 'architecture'" class="dive-panel">
      <h4 class="dive-title">系统架构</h4>
      <div class="arch-stack">
        <div
          v-for="(row, i) in showcase.architecture"
          :key="row.layer"
          class="arch-row"
          :style="{ '--i': i }"
        >
          <span class="arch-layer">{{ row.layer }}</span>
          <div class="arch-items">
            <span v-for="item in row.items" :key="item" class="arch-chip">{{ item }}</span>
          </div>
        </div>
      </div>
    </section>

    <section v-show="active === 'challenges'" class="dive-panel">
      <h4 class="dive-title">核心难点与方案</h4>
      <div class="challenge-list">
        <article v-for="c in showcase.challenges" :key="c.title" class="challenge-card">
          <h5>{{ c.title }}</h5>
          <p class="challenge-problem"><span>问题</span>{{ c.problem }}</p>
          <p class="challenge-solution"><span>方案</span>{{ c.solution }}</p>
        </article>
      </div>
    </section>

    <section v-show="active === 'code'" class="dive-panel">
      <h4 class="dive-title">{{ showcase.snippet.title }}</h4>
      <div class="code-block">
        <pre><code :key="`${showcase.snippet.title}-${active}`" :class="`language-${showcase.snippet.lang}`" ref="codeEl">{{ showcase.snippet.code }}</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import hljs from '../utils/hljs'
import 'highlight.js/styles/atom-one-dark.css'

const props = defineProps({
  showcase: { type: Object, default: null }
})

const tabs = [
  { id: 'background', label: '业务背景' },
  { id: 'architecture', label: '系统架构' },
  { id: 'challenges', label: '难点方案' },
  { id: 'code', label: '关键代码' }
]

const active = ref('background')
const codeEl = ref(null)

function highlight() {
  nextTick(() => {
    if (codeEl.value) hljs.highlightElement(codeEl.value)
  })
}

watch(active, (id) => {
  if (id === 'code') highlight()
})

watch(
  () => props.showcase,
  () => {
    active.value = 'background'
  }
)

onMounted(() => {
  if (active.value === 'code') highlight()
})
</script>

<style scoped>
.deep-dive {
  margin-top: 8px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.dive-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}

.dive-tab {
  appearance: none;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  font-size: 12px;
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color var(--transition), color var(--transition), background var(--transition);
}

.dive-tab:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.dive-tab.active {
  border-color: var(--accent);
  color: var(--accent-light);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}

.dive-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 14px;
  letter-spacing: 0.02em;
}

.bg-grid {
  display: grid;
  gap: 14px;
}

.bg-grid dt {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--accent);
  letter-spacing: 0.08em;
  margin-bottom: 4px;
}

.bg-grid dd {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-secondary);
}

.arch-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.arch-row {
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 12px;
  align-items: start;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: color-mix(in srgb, var(--bg-card) 80%, transparent);
}

.arch-layer {
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--accent-light);
  padding-top: 2px;
}

.arch-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.arch-chip {
  font-size: 12px;
  color: var(--text-secondary);
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg);
}

.challenge-list {
  display: grid;
  gap: 12px;
}

.challenge-card {
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
}

.challenge-card h5 {
  margin: 0 0 10px;
  font-size: 14px;
  color: var(--text-primary);
}

.challenge-problem,
.challenge-solution {
  margin: 0 0 8px;
  font-size: 13px;
  line-height: 1.7;
  color: var(--text-secondary);
}

.challenge-problem:last-child,
.challenge-solution:last-child {
  margin-bottom: 0;
}

.challenge-problem span,
.challenge-solution span {
  display: inline-block;
  min-width: 36px;
  margin-right: 8px;
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--accent);
}

.code-block {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.code-block pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  font-size: 12.5px;
  line-height: 1.65;
  background: #282c34;
}

.code-block code {
  font-family: var(--font-mono);
}

@media (max-width: 768px) {
  .arch-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>
