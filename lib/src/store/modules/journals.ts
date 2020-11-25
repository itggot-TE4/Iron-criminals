import Vue from "vue";
import Vuex from "vuex";
import store from "@/store/index";

Vue.use(Vuex);

interface Journal {
  comments: Comment[];
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
interface AddComment {
  logID: number;
  comment: string;
}
interface RemoveComment {
  logID: number;
  commentID: number;
}
interface CreateComment {
  logID: number;
  body: string;
  author: number;
}

function dateify(object: Journal) {
  if (typeof object.date == "string") {
    object.date = new Date(object.date);
  }
  return object;
}

function getPreviousMonday(): Date {
  const date = new Date();
  const day = date.getDay();
  const prevMonday = new Date();
  if (date.getDay() == 0) {
    prevMonday.setDate(date.getDate() - 7);
  } else {
    prevMonday.setDate(date.getDate() - (day - 1));
  }

  return prevMonday;
}

/* For a given date, get the ISO week number
 *
 * Based on information at:
 *
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */
function getWeekNumber(date: Date) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d as any) - (yearStart as any)) / 86400000 + 1) / 7);
};

export default {
  namespaced: true,
  state: {
    journals: {
      "2020-48": [
        {
          id: 1,
          student: 1,
          date: new Date("2020-11-23"),
          comments: [
            { author: 1, body: "Some content", id: 1, timestamp: new Date() }
          ]
        },
        {
          id: 2,
          student: 1,
          date: new Date("2020-11-24"),
          comments: [
            { author: 1, body: "Some content", id: 1, timestamp: new Date() }
          ]
        },
        {
          id: 3,
          student: 1,
          date: new Date("2020-11-25"),
          comments: [
            { author: 1, body: "Some content", id: 1, timestamp: new Date() }
          ]
        },
        {
          id: 4,
          student: 1,
          date: new Date("2020-11-26"),
          comments: [
            { author: 1, body: "Some content", id: 1, timestamp: new Date() }
          ]
        },
        {
          id: 5,
          student: 1,
          date: new Date("2020-11-27"),
          comments: [
            { author: 1, body: "Some content", id: 1, timestamp: new Date() }
          ]
        }
      ]
    }
  },
  mutations: {
    addComment(_state: any, args: AddComment) {
      store.getters.journal(args.logID).comments.push(args.comment);
    },
    removeComment(_state: any, args: RemoveComment) {
      store.getters.journal(args.logID).comments = store.getters
        .journal(args.logID)
        .comments.filter((x: Comment) => x.id !== args.commentID);
    },
    addJournal(state: any, args: Journal) {
      state.journals[
        `${new Date().getFullYear()}-${getWeekNumber(args.date)}`
      ].push(args);
    }
  },
  actions: {
    removeComment(_state: any, args: RemoveComment) {
      store.dispatch("removeComment", args);
    },
    createComment(state: any, args: CreateComment) {
      const comments = store.getters.journal(args.logID).comments as Comment[];
      const comment: Comment = {
        id: comments[comments.length - 1].id + 1,
        body: args.body,
        author: args.author,
        timestamp: new Date()
      };
      state.dispatch("addComment", comment);
    },
    createDefaultJournals(store: any, studentId: number) {
      const monday = getPreviousMonday();
      for (let i = 0; i < 5; i++) {
        const date = new Date();
        date.setDate(monday.getDate() + i);
        let id;
        try {
          id =
            store.state.journals[
              `${new Date().getFullYear()}-${getWeekNumber(new Date())}`
            ][
              store.state.journals[
                `${new Date().getFullYear()}-${getWeekNumber(new Date())}`
              ].length - 1
            ].id + 1;
        } catch {
          id = 1;
        }
        const entry: Journal = {
          id: id,
          student: studentId,
          date: date,
          comments: [
            { author: 1, body: "Some content", id: 1, timestamp: new Date() }
          ]
        };
        store.commit("addJournal", entry);
      }
    }
  },
  getters: {
    journals: (state: any) => (yearWeek: number) => {
      return state.journals[yearWeek].map((x: Journal) => {
        return dateify(x);
      });
    },
    journal: (state: any) => (logID: number) => {
      return state.journals.find((x: Journal) => x.id === logID);
    }
  }
};
