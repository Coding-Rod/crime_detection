export default [
  {
    component: 'CNavTitle',
    name: 'Home',
  },
  {
    component: 'CNavItem',
    name: 'Information',
    to: '/',
    icon: 'cil-info'
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
  // {
  //   component: 'CNavItem',
  //   name: 'Recorded Videos',
  //   to: '/system/videos',
  //   icon: 'cil-media-play'
  // },
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
]
