import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/dayone',
    name: 'DayOne',
    component: () => import(/* webpackChunkName: "about" */ '../views/DayOne.vue')
  },
  {
    path: '/daytwo',
    name: 'DayTwo',
    component: () => import(/* webpackChunkName: "about" */ '../views/DayTwo.vue')
  },
  {
    path: '/daythree',
    name: 'DayThree',
    component: () => import(/* webpackChunkName: "about" */ '../views/DayThree.vue')
  },
  {
    path: '/dayfour',
    name: 'DayFour',
    component: () => import(/* webpackChunkName: "about" */ '../views/DayFour.vue')
  },
  {
    path: '/dayfive',
    name: 'DayFive',
    component: () => import(/* webpackChunkName: "about" */ '../views/DayFive.vue')
  },
  {
    path: '/daysix',
    name: 'DaySix',
    component: () => import(/* webpackChunkName: "about" */ '../views/DaySix.vue')
  },
  {
    path: '/dayseven',
    name: 'DaySeven',
    component: () => import(/* webpackChunkName: "about" */ '../views/DaySeven.vue')
  },
  {
    path: '/dayeight',
    name: 'DayEight',
    component: () => import(/* webpackChunkName: "about" */ '../views/DayEight.vue')
  },
  {
    path: '/daynine',
    name: 'DayNine',
    component: () => import(/* webpackChunkName: "about" */ '../views/DayNine.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
