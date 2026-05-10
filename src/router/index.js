import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/projects', name: 'Projects', component: () => import('../views/Projects.vue') },
  { path: '/blog', name: 'Blog', component: () => import('../views/BlogList.vue') },
  { path: '/blog/:id', name: 'BlogDetail', component: () => import('../views/BlogDetail.vue') },
  { path: '/about', name: 'About', component: () => import('../views/About.vue') },
  { path: '/admin/login', name: 'AdminLogin', component: () => import('../views/admin/Login.vue') },
  { path: '/admin', name: 'Admin', component: () => import('../views/admin/Dashboard.vue'), meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('blog_admin_token')
    if (token) {
      next()
    } else {
      next({ name: 'AdminLogin' })
    }
  } else {
    next()
  }
})

export default router
