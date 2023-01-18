import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/',
    children: [
      {
        path: '/',
        name: 'Information',
        component: () =>
          import('@/views/Home.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
      },
      
      {
        path: '/howto',
        name: 'HowTo',
        component: () => import('@/views/HowTo.vue'),
      },

    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
      },
    ],
  },
  {
    path: '/system',
    name: 'System',
    redirect: '/system/nodes',
    component: DefaultLayout,
    children: [
      {
        path: 'nodes',
        name: 'ActiveNodes',
        component: () => import('@/views/system/ActiveNodes'),
      },
      {
        path: 'videos',
        name: 'RecordedVideos',
        component: () => import('@/views/system/RecordedVideos'),
      },
    ]
  },
  {
    path: '/settings',
    name: 'Settings',
    component: DefaultLayout,
    redirect: '/settings/userSettings',
    children: [
      {
        path: 'userSettings',
        name: 'UserSettings',
        component: () => import('@/views/Settings'),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
