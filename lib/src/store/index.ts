import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    comments: [
      { author: "Daniel Berg", body: "Some content" },
      { author: "Daniel Berg", body: "This is the response to some content" }
    ]
  },
  mutations: {},
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
});
