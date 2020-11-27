import {shallowMount} from "@vue/test-utils";
import Login from "@/views/Login.vue";

import Vue from "vue";
import vuetify from "vuetify";


it("Check if sign in is in the login page", () => {
  Vue.use(vuetify);
  const wrapper = shallowMount(Login)
  const msg = "Sign in"

  expect(wrapper.text()).toMatch(msg)
})
