import { createStore } from 'vuex'
import { faker } from '@faker-js/faker'

const generateNodes = () => {
  const nodes = []
  for (let i = 0; i < 10; i++) {
    nodes.push({
      id: faker.datatype.number(),
      name: "Node " + i,
      location: faker.address.city(),
      status: 'online',
      video: faker.image.imageUrl(),
      recording: false,
    })
  }
  return nodes
}

const generateVideos = () => {
  const videos = []
  for (let i = 0; i < 30; i++) {
    videos.push({
      id: faker.datatype.number(),
      name: "Video " + i,
      location: faker.address.city(),
      video: faker.image.imageUrl(),
      date: faker.date.past(),
      weapons: faker.datatype.number(),
    })
  }
  return videos
}

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    nodes: [],
    videos: [],
    API_URL: 'http://192.168.0.13:3000/api/v1',
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    SET_NODES(state) {
      state.nodes = generateNodes()
    },
    SET_VIDEOS(state) {
      state.videos = generateVideos()
    }
  },
  actions: {
    getNodes({ commit }) {
      commit('SET_NODES')
    },
    getVideos({ commit }) {
      commit('SET_VIDEOS')
    }
  },
  modules: {},
})
