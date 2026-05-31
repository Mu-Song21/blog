import { ref, watch, onMounted } from 'vue'

const theme = ref(localStorage.getItem('blog_theme') || 'dark')

export function useTheme() {
  function setTheme(value) {
    theme.value = value
    localStorage.setItem('blog_theme', value)
    document.documentElement.setAttribute('data-theme', value)
  }

  function toggle() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  onMounted(() => {
    document.documentElement.setAttribute('data-theme', theme.value)
  })

  watch(theme, (val) => {
    document.documentElement.setAttribute('data-theme', val)
  })

  return { theme, toggle, setTheme }
}
