import Vue from "vue";
import Vuex from "vuex";
import store from "@/store/index";

Vue.use(Vuex);

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
}

export default {
  namespaced: true,
  state: {
    journals: {
      "2020-48": [
        {
          id: 1,
          student: 5,
          date: new Date("2020-11-23"),
          body: {
            question1: "Some answer",
            question2: "Some other answer",
            question3: "A third one",
            question4: "A fourth one"
          },
          comments: [
            { author: 1, body: "Some content", id: 1, timestamp: new Date() }
          ]
        },
        {
          id: 2,
          student: 5,
          date: new Date("2020-11-24"),
          body: {
            question1: "",
            question2: "",
            question3: "",
            question4: ""
          },
          comments: [
            { author: 1, body: "Some content", id: 1, timestamp: new Date() }
          ]
        },
        {
          id: 3,
          student: 5,
          date: new Date("2020-11-25"),
          body: {
            question1: "Some answer",
            question2: "Some other answer",
            question3: "A third one",
            question4: "A fourth one"
          },
          comments: [
            { author: 1, body: "Some content", id: 1, timestamp: new Date() }
          ]
        },
        {
          id: 4,
          student: 5,
          date: new Date("2020-11-26"),
          body: {
            question1: "Some answer",
            question2: "Some other answer",
            question3: "A third one",
            question4: "A fourth one"
          },
          comments: [
            { author: 1, body: "Some content", id: 1, timestamp: new Date() }
          ]
        },
        {
          id: 5,
          student: 5,
          date: new Date("2020-11-27"),
          body: {
            question1: "Some Form of an answer",
            question2: "Some other answer",
            question3: "A third one",
            question4: "A fourth one or maybe a fifth"
          },
          comments: [
            {
              author: 1,
              body: "Some form om a comment or something else ",
              id: 1,
              timestamp: new Date()
            },
            {
              author: 1,
              body: "Some other form om a comment or something else ",
              id: 2,
              timestamp: new Date()
            }
          ]
        },
        {
          id: 6,
          student: 6,
          date: new Date("2020-11-23"),
          body: {
            question1: "Some answer",
            question2: "Some other answer",
            question3: "A third one",
            question4: "A fourth one"
          },
          comments: [
            { author: 1, body: "Some content", id: 1, timestamp: new Date() }
          ]
        },
        {
          id: 7,
          student: 6,
          date: new Date("2020-11-24"),
          body: {
            question1: "Some answer",
            question2: "Some other answer",
            question3: "A third one",
            question4: "A fourth one"
          },
          comments: [
            { author: 1, body: "Some content", id: 1, timestamp: new Date() }
          ]
        },
        {
          id: 8,
          student: 6,
          date: new Date("2020-11-25"),
          body: {
            question1: "Some answer",
            question2: "Some other answer",
            question3: "A third one",
            question4: "A fourth one"
          },
          comments: [
            { author: 1, body: "Some content", id: 1, timestamp: new Date() }
          ]
        },
        {
          id: 9,
          student: 6,
          date: new Date("2020-11-26"),
          body: {
            question1: "Some answer",
            question2: "Some other answer",
            question3: "A third one",
            question4: "A fourth one"
          },
          comments: [
            { author: 1, body: "Some content", id: 1, timestamp: new Date() }
          ]
        },
        {
          id: 10,
          student: 6,
          date: new Date("2020-11-27"),
          body: {
            question1: "Some answer",
            question2: "Some other answer",
            question3: "A third one",
            question4: "A fourth one"
          },
          comments: [
            { author: 1, body: "Some content", id: 1, timestamp: new Date() }
          ]
        }
      ]
    }
  },
  mutations: {
    addComment(_state: any, args: AddComment) {
      store.getters['journals/journal'](args.logID, args.yearWeek).comments.push(args.comment);
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
    },
    updateJournal(state: any, args: UpdateJournal) {
      state.journals[args.week].find((x: Journal) => x.id === args.id).body[
        `question${args.questionID.toString()}`
      ] = args.data;
    }
  },
  actions: {
    removeComment(_state: any, args: RemoveComment) {
      store.dispatch("removeComment", args);
    },
    createComment(state: any, args: CreateComment) {
      const comments = store.getters['journals/journal'](args.logID, args.yearWeek).comments as Comment[];
      const comment = {
        id: comments[comments.length - 1].id + 1,
        body: args.body,
        author: args.author,
        timestamp: new Date()
      } as Comment;
      state.commit("addComment", {comment: comment, yearWeek: args.yearWeek, logID: args.logID });
    },
    updateJournal(state: any, args: UpdateJournal) {
      state.commit("updateJournal", args);
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
          body: {
            question1: "",
            question2: "",
            question3: "",
            question4: ""
          } as Body,
          comments: []
        };
        store.commit("addJournal", entry);
      }
    }
  },
  getters: {
    journals: (state: any) => (yearWeek: string) => {
      return state.journals[yearWeek].map((x: Journal) => {
        return dateify(x);
      });
    },
    journal: (state: any) => (logID: number, yearWeek: string) => {
      return store.getters['journals/journals'](yearWeek).find((x: Journal) => x.id === logID);
    }
  }
};
