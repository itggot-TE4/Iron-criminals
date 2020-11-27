import store from "@/store";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/journal/:week/students/:id",
    name: "Journal",
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/auth"] != null) {
        next();
      } else next({ name: "Login" });
    },
    component: () => import("../views/StudentJournal.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/admin",
    name: "Admin",
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/isAdmin"]) {
        next();
      } else next({ name: "Login" });
    },
    component: () => import("../views/Admin.vue")
  },
  {
    path: "/teacher/:yearWeek",
    name: "Teacher",
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/isAdmin"]) {
        next();
      } else next({ name: "Login" });
    },
    component: () => import("../views/Teacher.vue")
  },
  {
    path: "/journals",
    name: "Journal Overview",
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/auth"] != null) {
        next();
      } else next({ name: "Login" });
    },
    component: () => import("../views/JournalOverview.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
