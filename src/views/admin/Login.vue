<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-brand">
        <span class="logo-icon">▸</span>
        <span class="logo-text">目送</span>
        <span class="brand-divider">·</span>
        <span class="brand-sub">后台管理</span>
      </div>
      <form class="login-form card" @submit.prevent="handleLogin">
        <h2 class="form-title">登录</h2>
        <div class="form-group">
          <label>管理密码</label>
          <input
            type="password"
            v-model="password"
            placeholder="请输入管理密码"
            autocomplete="current-password"
          />
        </div>
        <p class="error-msg" v-if="error">{{ error }}</p>
        <button type="submit" class="btn btn-primary login-btn" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
        <router-link to="/" class="back-home">← 返回首页</router-link>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../../stores/blog'

const router = useRouter()
const store = useBlogStore()
const password = ref('')
const error = ref('')
const loading = ref(false)

function handleLogin() {
  error.value = ''
  loading.value = true
  setTimeout(() => {
    if (store.login(password.value)) {
      router.push('/admin')
    } else {
      error.value = '密码错误'
    }
    loading.value = false
  }, 500)
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  padding: 24px;
}

.login-container {
  width: 100%;
  max-width: 380px;
}

.login-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 32px;
  font-size: 18px;
  color: var(--text-secondary);
}

.logo-icon {
  color: var(--accent);
  font-size: 14px;
}

.logo-text {
  font-weight: 700;
  color: var(--text-primary);
}

.brand-divider {
  color: var(--border-light);
}

.brand-sub {
  font-size: 14px;
  color: var(--text-muted);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-title {
  font-size: 22px;
  font-weight: 600;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
}

.form-group input {
  padding: 12px 16px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 14px;
  color: var(--text-primary);
  font-family: var(--font-sans);
  outline: none;
  transition: border-color var(--transition);
}

.form-group input:focus {
  border-color: var(--accent);
}

.form-group input::placeholder {
  color: var(--text-muted);
}

.error-msg {
  font-size: 13px;
  color: var(--danger);
  text-align: center;
}

.login-btn {
  width: 100%;
  justify-content: center;
  padding: 12px;
}

.back-home {
  text-align: center;
  font-size: 13px;
  color: var(--text-muted);
}

.back-home:hover {
  color: var(--accent-light);
}
</style>
