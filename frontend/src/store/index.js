import { createStore } from 'vuex'

export default createStore({
  state: {
    name: '',
    sidebarVisible: '',
    sidebarUnfoldable: false,
    nodes: [],
    videos: [],
    API_URL: 'http://192.168.0.14:3000/api/v1',
    SOCKET_URL: 'ws://192.168.0.14:3000',
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
