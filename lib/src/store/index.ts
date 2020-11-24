import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import journals from "./modules/journals";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    journals: journals
  },
  plugins: [createPersistedState()]
});
