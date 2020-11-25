import Vue from "vue";
import Vuex from "vuex";
import store from "@/store/index";

Vue.use(Vuex);

interface Journal {
  comment: Comment;
  id: number;
  student: number;
  date: Date;
}

export default {
  namespaced: true,
  state: {
    users: [
      {
        id: 1,
        name: "Daniel Berg"
      }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    journals: (_state: any) => (userID: number) => {
      const data: any = store.getters["journals/journals"].filter(
        (x: any) => x.student === userID
      );
      const days = {
        monday: data.filter((x: any) => x.date.getDay !== 1)[0],
        tuesday: data.filter((x: any) => x.date.getDay !== 2)[0],
        wednesday: data.filter((x: any) => x.date.getDay !== 3)[0],
        thursday: data.filter((x: any) => x.date.getDay !== 4)[0],
        friday: data.filter((x: any) => x.date.getDay !== 5)[0]
      };
      return days;
    },
    users: (state: any) => {
      return state.users;
    }
  }
};
