<template>
  <div class="share-bar">
    <span class="share-label">分享</span>
    <div class="share-actions">
      <button class="share-btn" @click="copyLink" :class="{ copied }">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        <span>{{ copied ? '已复制' : '复制链接' }}</span>
      </button>
      <button class="share-btn" @click="shareWeibo">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.86 1.797-.577.631.277.821.986.438 1.568zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.244.239.09.321.346.194.577zm.455-2.6c-1.2-.313-2.556.129-3.072.984-.525.869-.101 1.837 1.102 2.135 1.244.311 2.638-.134 3.144-1.006.497-.863.042-1.802-1.174-2.113zM17.57 12.5c.209.011.382.053.536.124.153.072.254.177.306.315.051.139.026.301-.072.487l-.003.006c-.321.614-.841 1.067-1.557 1.354-.717.288-1.469.404-2.259.347-.789-.057-1.491-.266-2.103-.629-.613-.362-1.094-.85-1.445-1.465a2.468 2.468 0 0 1-.279-.841c-.03-.173-.012-.333.052-.481.065-.149.17-.267.316-.354.146-.087.308-.138.486-.152.177-.014.341.011.494.078.152.065.272.172.357.321.131.225.3.487.505.785.204.298.426.548.666.75.239.202.472.338.699.407.226.07.435.063.627-.018.191-.082.34-.205.445-.372.106-.166.154-.368.143-.606l.002.005z"/>
        </svg>
        <span>微博</span>
      </button>
      <div class="share-wechat-wrap" @mouseenter="showQr = true" @mouseleave="showQr = false">
        <button class="share-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.952-7.062-6.122zm-2.18 2.768c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z"/>
          </svg>
          <span>微信</span>
        </button>
        <Transition name="qr-popup">
          <div class="qr-popup" v-show="showQr">
            <div class="qr-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="0.3">
                <rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/>
                <rect x="5" y="5" width="2" height="2" fill="currentColor"/><rect x="17" y="5" width="2" height="2" fill="currentColor"/><rect x="5" y="17" width="2" height="2" fill="currentColor"/>
                <rect x="14" y="14" width="3" height="3" rx="0.5"/><rect x="19" y="14" width="3" height="3" rx="0.5"/><rect x="14" y="19" width="3" height="3" rx="0.5"/><rect x="19" y="19" width="3" height="3" rx="0.5"/>
              </svg>
              <span>分享到微信</span>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  url: { type: String, default: '' }
})

const copied = ref(false)
const showQr = ref(false)

function copyLink() {
  navigator.clipboard.writeText(props.url || window.location.href).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  })
}

function shareWeibo() {
  const text = encodeURIComponent(props.title)
  const url = encodeURIComponent(props.url || window.location.href)
  window.open(`https://service.weibo.com/share/share.php?title=${text}&url=${url}`, '_blank', 'width=600,height=500')
}
</script>

<style scoped>
.share-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
  border-top: 1px solid var(--border);
  margin-top: 32px;
}

.share-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: var(--font-mono);
  white-space: nowrap;
}

.share-actions {
  display: flex;
  gap: 8px;
}

.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  font-size: 12px;
  font-family: var(--font-sans);
  color: var(--text-muted);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.share-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--accent-glow);
}

.share-btn.copied {
  color: var(--success);
  border-color: var(--success);
}

.share-wechat-wrap {
  position: relative;
}

.qr-popup {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 20px;
  box-shadow: var(--shadow-lg);
  z-index: 100;
  white-space: nowrap;
}

.qr-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 12px;
}

/* 弹出动画 */
.qr-popup-enter-active,
.qr-popup-leave-active {
  transition: all 0.2s ease;
}

.qr-popup-enter-from,
.qr-popup-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-4px);
}

@media (max-width: 768px) {
  .share-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
