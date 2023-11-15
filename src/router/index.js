import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'receivers-list',
      component: () => import('../views/ReceiversList.vue')
    },
    {
      path: '/add-new-receiver',
      name: 'add-new-receiver',
      component: () => import('../views/AddNewReceiverForm.vue')
    }
  ]
})

export default router
