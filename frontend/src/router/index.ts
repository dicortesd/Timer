import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateProject from '@/components/CreateProject.vue'
import SeeClient from '@/components/SeeClient.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',

    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  {
    path: '/CreateProject',
    name: 'CreateProject',
    component: CreateProject
  },
  {
    path: '/SeeClient',
    name: 'SeeClient',
    component: SeeClient 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
