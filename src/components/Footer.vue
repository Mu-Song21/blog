<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="logo-icon">▸</span>
            <span class="logo-text">目送</span>
          </div>
          <p class="muse-quote">目送你远去，也目送自己成长</p>
        </div>
        <div class="footer-nav">
          <h4 class="footer-nav-title">导航</h4>
          <router-link to="/" class="footer-link">首页</router-link>
          <router-link to="/projects" class="footer-link">项目</router-link>
          <router-link to="/blog" class="footer-link">文章</router-link>
          <router-link to="/about" class="footer-link">关于</router-link>
        </div>
        <div class="footer-nav">
          <h4 class="footer-nav-title">社交</h4>
          <a href="https://github.com/Mu-Song21" target="_blank" rel="noopener noreferrer" class="footer-link">GitHub</a>
          <a href="mailto:2814969359@qq.com" class="footer-link">邮箱</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span class="copyright">© {{ new Date().getFullYear() }} 目送. All rights reserved.</span>
        <span class="built-with">使用 Vue 3 + Vite 构建</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding: 0;
  margin-top: auto;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  gap: 48px;
  padding: 48px 0 32px;
}

.footer-brand {
  max-width: 320px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.logo-icon {
  color: var(--accent);
  font-size: 16px;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
}

.muse-quote {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-nav-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.footer-link {
  font-size: 14px;
  color: var(--text-muted);
  transition: color var(--transition);
}

.footer-link:hover {
  color: var(--accent-light);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-top: 1px solid var(--border);
}

.copyright {
  font-size: 13px;
  color: var(--text-muted);
}

.built-with {
  font-size: 12px;
  color: var(--text-muted);
  opacity: 0.6;
}

@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
    gap: 32px;
    text-align: center;
    align-items: center;
  }

  .footer-brand {
    max-width: 100%;
    text-align: center;
  }

  .footer-logo {
    justify-content: center;
  }

  .footer-nav {
    align-items: center;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}
</style>
