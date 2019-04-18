import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    concerts: [],
    artists: [],
    concertListActive: true,
    authModalActive: false,
    loginModalActive: true
  },
  getters: {
    concerts(state) {
      return state.concerts;
    },
    artists(state) {
      return state.artists;
    },
    concertListActive(state) {
      return state.concertListActive;
    },
    authModal(state) {
      return state.authModalActive;
    },
    loginModalActive(state) {
      return state.loginModalActive;
    }
  },
  mutations: {
    storeConcerts(state, concerts) {
      state.concerts = concerts;
    },
    storeArtists(state, artists) {
      state.artists = artists;
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
    },
    toggleAuthModal(state) {
      if (state.authModalActive) {
        state.authModalActive = false;
      } else {
        state.authModalActive = true;
      }
    },
    toggleLoginModal(state) {
      if (state.loginModalActive) {
        state.loginModalActive = false;
      } else {
        state.loginModalActive = true;
      }
    },
    storeUserData(state, data) {
      window.sessionStorage.setItem("concert-app-token", data.token);
    }
  },
  actions: {
    storeConcerts(context, concerts) {
      context.commit("storeConcerts", concerts);
    },
    storeArtists(context, artists) {
      context.commit("storeArtists", artists);
    }
  }
});
