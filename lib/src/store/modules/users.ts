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
interface User {
  id: number;
  name: string;
  type: string;
  email: string;
  password: string;
  assignedTeacher: number;
}

interface Journal {
  comment: Comment;
  id: number;
  student: number;
  date: Date;
}
interface Comment {
  id: number;
  body: string;
  author: number;
  timestamp: Date;
}

export default {
  namespaced: true,
  state: {
    users: [
      {
        id: 1,
        name: "Daniel Berg",
        type: "teacher",
        email: "example@example.example",
        password: "securepassword101"
      },
      {
        id: 2,
        name: "Daniel Danielson",
        type: "student",
        email: "example@example.example",
        password: "securepassword101",
        assignedTeacher: 1
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
    teachers: (state: any) => {
      return state.users.filter((x: User) => x.type == "teacher");
    },
    students: (state: any) => {
      return state.users.filter((x: User) => x.type == "student");
    },
    studentsBelogingTo: (state: any) => (teacherID: number) => {
      return state.users.filter((x: User) => {
        x.assignedTeacher === teacherID;
      });
    }
  }
};
