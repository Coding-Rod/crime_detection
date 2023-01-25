export default [
  {
    component: 'CNavTitle',
    name: 'Information',
  },
  {
    component: 'CNavItem',
    name: 'Information',
    to: '/',
    icon: 'cil-info'
  },
  {
    component: 'CNavItem',
    name: 'About',
    to: '/about',
    icon: 'cil-laptop'
  },
  
  {
    component: 'CNavItem',
    name: 'How To use this app',
    to: '/howto',
    icon: 'cil-puzzle'
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
  {
    component: 'CNavTitle',
    name: 'Contacts',
  },
  {
    component: 'CNavItem',
    name: 'Emergency Contacts',
    to: '/contacts',
    icon: 'cil-people'
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
