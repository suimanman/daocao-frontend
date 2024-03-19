import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //重定向
    {
      path:'',
      redirect:"/login"
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    
  ]
})

export default router
