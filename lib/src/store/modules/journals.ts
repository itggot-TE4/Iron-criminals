import Vue from "vue";
import Vuex from "vuex";
import store from "@/store/index"

Vue.use(Vuex);

interface Journal {
  comment: Comment,
  id: number,
  student: number
  date: Date
}
interface Comment {
  id: number,
  body: string,
  author: number,
  timestamp: Date
}
interface AddComment {
  logID: number,
  comment: string
}
interface RemoveComment {
  logID: number,
  commentID: number
}
interface CreateComment {
  logID: number,
  body: string,
  author: number,
}

export default {
  namespaced: true,
  state: {
    journals: [{ id: 1, student: 1, date: new Date(), comments: [{author: 1, body: "Some content", id: 1, timestamp: new Date}] }]
  },
  mutations: {
    addComment (_state: any, args: AddComment) {
      store.getters.journal(args.logID).comments.push(args.comment)
    },
    removeComment (_state: any, args: RemoveComment) {
      store.getters.journal(args.logID).comments = store.getters.journal(args.logID).comments.filter((x: Comment) => x.id !== args.commentID)
    }
  },
  actions: {
    removeComment(_state: any, args: RemoveComment ) {
      store.dispatch('removeComment', args)
    },
    createComment(state: any, args: CreateComment ) {
      const comments = store.getters.journal(args.logID).comments as Comment[];
      const comment: Comment = {
        id: (comments[comments.length -1].id + 1),
        body: args.body,
        author: args.author,
        timestamp: new Date
      }
      state.dispatch('addComment', comment );
    }
  },
  getters: {
    journals: (state: any) => {
      return state.journals
    },
    journal: (state: any) => (logID: number) => {
      return state.journals.find((x: Journal) => x.id === logID);
    }
  },
};
