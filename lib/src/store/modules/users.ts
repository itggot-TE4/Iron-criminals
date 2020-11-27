import Vue from "vue";
import Vuex from "vuex";
import store from "@/store/index";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    users: [
      {
        id: 1,
        name: "Daniel Berg",
        type: "teacher",
        email: "daniel.berg@ga.ntig.se",
        password: "securepassword101"
      },
      {
        id: 2,
        name: "Linus Styrén",
        type: "teacher",
        email: "linus.styren@ga.ntig.se",
        password: "securepassword101"
      },
      {
        id: 3,
        name: "Johan Kivi",
        type: "teacher",
        email: "johan.kivi@ga.ntig.se",
        password: "securepassword101"
      },
      {
        id: 4,
        name: "Fredrik Kronhamn",
        type: "teacher",
        email: "fredrik.kronhamn@ga.ntig.se",
        password: "securepassword101"
      },
      {
        id: 5,
        name: "Elev Elevsson",
        type: "student",
        email: "elev.elevsson@elev.ga.ntig.se",
        password: "securepassword101",
        assignedTeacher: 1
      },
      {
        id: 6,
        name: "Bert Karlsson",
        type: "student",
        email: "bert.karlsson@eelev.ga.ntig.se",
        password: "securepassword101",
        assignedTeacher: 4
      }
    ]
  },
  mutations: {
    addUser(state: any, args: User) {
      state.users.push(args);
    }
  },
  actions: {
    newUser(state: any, args: User) {
      args.id = state.state.users[state.state.users.length - 1].id + 1;
      store.commit("users/addUser", args);
      store.dispatch("journals/createDefaultJournals", args.id);
    }
  },
  getters: {
    journals: (_state: any) => (userID: number, yearWeek: string) => {
      const data: Journal[] = store.getters["journals/journals"](
        yearWeek
      ).filter((x: Journal) => x.student === userID);
      const days = {
        monday: data.filter((x: Journal) => x.date.getDay() === 1)[0],
        tuesday: data.filter((x: Journal) => x.date.getDay() === 2)[0],
        wednesday: data.filter((x: Journal) => x.date.getDay() === 3)[0],
        thursday: data.filter((x: Journal) => x.date.getDay() === 4)[0],
        friday: data.filter((x: Journal) => x.date.getDay() === 5)[0]
      };
      return days;
    },
    users: (state: any) => {
      return state.users;
    },
    user: (state: any) => (userID: number) => {
      return state.users.find((user: User) => user.id === userID);
    },
    teachers: (state: any) => {
      return state.users.filter((x: User) => x.type == "teacher");
    },
    students: (state: any) => {
      return state.users.filter((x: User) => x.type == "student");
    },
    studentsBelongingTo: (state: any) => (teacherID: number) => {
      return state.users.filter(
        (x: User) => x.type == "student" && x.assignedTeacher === teacherID
      );
    },
    studentsNotBelongingTo: (state: any) => (teacherID: number) => {
      return state.users.filter(
        (x: User) => x.type == "student" && x.assignedTeacher !== teacherID
      );
    }
  }
};
