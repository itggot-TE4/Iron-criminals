import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import journals from "./modules/journals";
import users from "./modules/users";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users: users,
    journals: journals
  },
  plugins: [createPersistedState()]
});
