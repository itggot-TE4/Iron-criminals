<template>
  <v-app>
    <Header />
    <v-main class="grey lighten-2">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "./components/Header.vue";

export default Vue.extend({
  name: "App",

  components: {
    Header
  }
});
</script>
