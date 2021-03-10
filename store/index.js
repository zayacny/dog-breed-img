import axios from 'axios'
// state
export const state = () => ({
  breeds: [],
  images: []
})
// getters
export const getters = {

}
// actions
export const actions = {
  async getBreeds ({ commit }) {
    const { data } = await axios.get('https://dog.ceo/api/breeds/list/all')
    commit('setBreeds', data.message)
    return data.message
  },

  async getRandomImg ({ commit }) {
    const { data } = await axios.get('https://dog.ceo/api/breeds/image/random/30')
    commit('setImges', data.message)
    return data.message
  },

  async getBreedImg ({ commit }, chosedBreed) {
    const URL = chosedBreed.sub.on ? `https://dog.ceo/api/breed/${chosedBreed.breed}/${chosedBreed.sub.breed}/images` : `https://dog.ceo/api/breed/${chosedBreed.breed}/images`
    const { data } = await axios.get(`${URL}`)
    commit('setImges', data.message)
    return data.message
  }
}
// mutations
export const mutations = {
  setBreeds (state, data) {
    state.breeds = { ...data }
  },
  setImges (state, data) {
    state.images = { ...data }
  }
}
