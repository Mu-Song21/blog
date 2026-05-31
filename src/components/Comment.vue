<template>
  <div class="comment-section">
    <div class="comment-header">
      <span class="comment-label">评论</span>
      <span class="comment-divider"></span>
    </div>
    <div class="comment-body">
      <Giscus
        :repo="repo"
        :repoId="repoId"
        :category="category"
        :categoryId="categoryId"
        :mapping="mapping"
        :strict="strict"
        :reactionsEnabled="reactionsEnabled"
        :emitMetadata="emitMetadata"
        inputPosition="top"
        :theme="theme"
        lang="zh-CN"
      />
    </div>
  </div>
</template>

<script setup>
import Giscus from '@giscus/vue'

// ====== 配置区：部署时替换为你的实际值 ======
// 获取方式：访问 https://giscus.app ，填入仓库信息后生成
const repo = 'Mu-Song21/blog'           // GitHub 仓库（格式：用户名/仓库名）
const repoId = 'R_kgDOSZZS3Q'           // 从 giscus.app 获取
const category = 'Announcements'        // Discussions 分类名
const categoryId = 'DIC_kwDOSZZS3c4C-M_C' // 从 giscus.app 获取
// ============================================

const mapping = 'pathname'              // 用页面路径匹配 discussion
const strict = false                     // 不严格匹配
const reactionsEnabled = true            // 显示表情反应
const emitMetadata = false               // 不发送元数据
const theme = 'dark'                     // 暗色主题，匹配博客风格
</script>

<style scoped>
.comment-section {
  margin-top: 64px;
  max-width: 760px;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.comment-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 3px;
  font-family: var(--font-mono);
  white-space: nowrap;
}

.comment-divider {
  flex: 1;
  height: 1px;
  background: var(--border);
}

.comment-body {
  border-radius: var(--radius);
  overflow: hidden;
}

/* 覆盖 Giscus iframe 内部样式（通过全局样式注入） */
:deep(.giscus) {
  width: 100%;
}
</style>

<style>
/* Giscus iframe 暗色主题适配 */
.giscus, .giscus-frame {
  width: 100% !important;
}
</style>
