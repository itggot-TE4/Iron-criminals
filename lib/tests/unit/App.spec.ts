import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import vuetify from "vuetify";
import App from "@/App.vue";
import Header from "@/components/Header.vue";
import VueRouter from "vue-router";

describe("Home.vue", () => {
  it("renders the header", () => {
    Vue.use(vuetify);
    Vue.use(VueRouter);

    const wrapper = shallowMount(App)

    expect(wrapper.findComponent(Header).exists()).toBe(true)
  });
});
