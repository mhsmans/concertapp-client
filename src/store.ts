import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    concerts: [],
    concertListActive: true
  },
  getters: {
    concerts(state) {
      return state.concerts;
    },
    concertListActive(state) {
      return state.concertListActive;
    }
  },
  mutations: {
    storeConcerts(state, concerts) {
      state.concerts = concerts;
    },
    setConcertListActive(state) {
      if (!state.concertListActive) {
        state.concertListActive = true;
      }
    },
    setArtistListActive(state) {
      if (state.concertListActive) {
        state.concertListActive = false;
      }
    }
  },
  actions: {
    storeConcerts(context, concerts) {
      context.commit("storeConcerts", concerts);
    }
  }
});
