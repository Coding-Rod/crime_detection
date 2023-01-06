export default [
  {
    component: 'CNavTitle',
    name: 'About',
  },
  {
    component: 'CNavItem',
    name: 'Home',
    to: '/',
    icon: 'cil-home'
  },
  {
    component: 'CNavItem',
    name: 'About',
    to: '/about',
    icon: 'cil-laptop'
  },
  // NOTE: CNavTitle separator
  {
    component: 'CNavTitle',
    name: 'System',
  },
  {
    component: 'CNavItem',
    name: 'Active Nodes',
    to: '/system/nodes',
    icon: 'cil-memory'
  },
  {
    component: 'CNavItem',
    name: 'Recorded Videos',
    to: '/system/videos',
    icon: 'cil-media-play'
  },

  // FIXME: Erase this when the feature is implemented
  {
    component: 'CNavTitle',
    name: 'Extras',
  },
  {
    component: 'CNavGroup',
    name: 'Pages',
    to: '/pages',
    icon: 'cil-star',
    items: [
      {
        component: 'CNavItem',
        name: 'Login',
        to: '/pages/login',
      },
      {
        component: 'CNavItem',
        name: 'Register',
        to: '/pages/register',
      },
      {
        component: 'CNavItem',
        name: 'Error 404',
        to: '/pages/404',
      },
      {
        component: 'CNavItem',
        name: 'Error 500',
        to: '/pages/500',
      },
    ],
  },
]
