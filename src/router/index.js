import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/HomePage.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about/AboutPage.vue'),
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/views/projects/ProjectsPage.vue'),
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: () => import('@/views/projects/ProjectDetailPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// 재배포로 이전 청크가 사라져 dynamic import가 실패하면,
// 새 버전으로 한 번만 자동 새로고침해 복구한다 (무한 새로고침 방지 플래그 포함)
router.onError((error, to) => {
  const msg = error?.message || ''
  const isChunkError =
    msg.includes('Failed to fetch dynamically imported module') ||
    msg.includes('error loading dynamically imported module') ||
    msg.includes('Importing a module script failed')
  if (isChunkError && !sessionStorage.getItem('chunk-reload')) {
    sessionStorage.setItem('chunk-reload', '1')
    window.location.assign(to?.fullPath || '/')
  }
})
router.afterEach(() => sessionStorage.removeItem('chunk-reload'))

export default router
