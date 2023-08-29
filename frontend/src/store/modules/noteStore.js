import { createStore } from "vuex";

const store = createStore({
  state: {
    notes: [{ text: "empty" }]
  },
  mutations: {
    ADD_NOTE(state, note) {
      state.notes.push(note)
    }
  },
  actions: {
    addNote({ commit }, note) {
      commit('ADD_NOTE', note)
    }
  },
  getters: {
    notes(state) { 
      return state.notes; 
    }
  }
})


export default store;