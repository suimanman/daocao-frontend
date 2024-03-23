import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
//引入layout组件
import Layout from '@/Layout/index.vue';
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
    {
      path:'/',
      name: 'index',
      component: Layout,
      children:[
        {
          path: '/index',
          component: ()=> import('@/views/index.vue')
        }
      ]
    }
  ]
})

export default router
