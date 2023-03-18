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
          import('@/views/docs/Home.vue'),
      },      
      {
        path: '/howto',
        name: 'HowTo',
        component: () => import('@/views/docs/HowTo.vue'),
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
    path: '/contacts',
    name: 'contacts',
    component: DefaultLayout,
    redirect: '/contacts/userContacts',
    children: [
      {
        path: 'userContacts',
        name: 'UserContacts',
        component: () => import('@/views/user/Contacts'),
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
        component: () => import('@/views/user/Settings'),
      },
    ]
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: DefaultLayout,
    redirect: '/notifications/userNotifications',
    children: [
      {
        path: 'userNotifications',
        name: 'UserNotifications',
        component: () => import('@/views/user/Notifications'),
      }
    ] 
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/pages/Page404'),
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
