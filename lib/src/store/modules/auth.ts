import Vue from "vue";
import Vuex from "vuex";
import store from "@/store/index";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    auth: null
  },
  mutations: {
    setAuth(state: any, args: User | null) {
      state.auth = args;
    }
  },
  actions: {
    signIn(state: any, id: number) {
      try {
        state.commit("setAuth", store.getters["users/user"](id));
      } catch {
        state.commit("setAuth", null);
      }
    },
    signOut(state: any) {
      state.commit("setAuth", null);
    }
  },
  getters: {
    auth(state: any) {
      return state.auth;
    }
  }
};
