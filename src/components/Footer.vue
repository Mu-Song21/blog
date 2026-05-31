<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="logo-mark">目送</span>
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
          <a href="/rss.xml" target="_blank" rel="noopener noreferrer" class="footer-link">RSS 订阅</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span class="copyright">© {{ new Date().getFullYear() }} 目送. All rights reserved.</span>
        <span class="built-with">Vue 3 + Vite</span>
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
  padding: 56px 0 40px;
}

.footer-brand {
  max-width: 320px;
}

.footer-logo {
  margin-bottom: 16px;
}

.logo-mark {
  font-family: var(--font-display);
  font-size: 28px;
  color: var(--text-primary);
  letter-spacing: 2px;
}

.muse-quote {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.7;
  font-family: var(--font-display);
  font-style: italic;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-nav-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 4px;
  font-family: var(--font-mono);
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
  padding: 24px 0;
  border-top: 1px solid var(--border);
}

.copyright {
  font-size: 13px;
  color: var(--text-muted);
}

.built-with {
  font-size: 11px;
  color: var(--text-muted);
  opacity: 0.5;
  font-family: var(--font-mono);
  letter-spacing: 1px;
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
