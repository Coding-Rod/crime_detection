import { createStore } from 'vuex'

export default createStore({
  state: {
    name: '',
    sidebarVisible: '',
    sidebarUnfoldable: false,
    nodes: [],
    videos: [],
    API_URL: 'http://localhost:3000/api/v1',
    SOCKET_URL: 'ws://localhost:3000',
    // API_URL: 'https://monkfish-app-pb6xv.ondigitalocean.app/api/v1',
    // SOCKET_URL: 'wss://monkfish-app-pb6xv.ondigitalocean.app/',
  },
  mutations: {
    setName(state, payload) {
      state.name = payload.value
    },
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    }
  },
  modules: {},
})
