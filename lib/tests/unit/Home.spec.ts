import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

describe("Home.vue", () => {
  it("renders the correct welcome text", () => {
    const msg = "Welcome to Log-O-Matic";

    const wrapper = shallowMount(Home);

    expect(wrapper.text()).toMatch(msg);
  });
});
