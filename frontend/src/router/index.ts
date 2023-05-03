import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateProject from '@/components/CreateProject.vue'
import SeeClient from '@/components/SeeClient.vue'
import LoginCompoVue from '@/components/LoginCompo.vue'
import Proyectos from '@/components/SeeProyecto.vue'
import ResumeProyectoVue from '@/components/ResumeProyecto.vue'


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
  },
  {
    path: '/Login',
    name: 'LoginComponent',
    component: LoginCompoVue 
  },
  {
    path: '/Proyectos/:id',
    name: 'ProjectDetails',
    component: Proyectos 
  },
  {
    path: '/resume',
    name: 'resume',
    component: ResumeProyectoVue 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
