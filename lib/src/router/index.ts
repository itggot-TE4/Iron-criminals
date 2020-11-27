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
    path: "/journal/:week/students/:id",
    name: "Journal",
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
    component: () => import("../views/Admin.vue")
  },
  {
    path: "/teacher/:yearWeek",
    name: "Teacher",
    component: () => import("../views/Teacher.vue")
  },
  {
    path: "/journals",
    name: "Journal Overview",
    component: () => import("../views/JournalOverview.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
