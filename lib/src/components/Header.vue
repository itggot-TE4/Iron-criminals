<template>
  <v-app-bar app>
    <router-link to="/">
      <v-toolbar-title>Log-O-Matic</v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>

    <v-btn elevation="0">
      <router-link to="admin" v-if="isAdmin()">
        <v-icon left>
          mdi-cog
        </v-icon>
        ADMIN
      </router-link>
    </v-btn>

    <v-btn elevation="0">
      <router-link to="journals">
        <v-icon left>
          mdi-format-list-bulleted
        </v-icon>
        LOGS
      </router-link>
    </v-btn>

    <v-btn elevation="0">
      <router-link to="Login" v-if="!isSignedIn()">
        <v-icon left>
          mdi-lock-open
        </v-icon>
        SIGN IN
      </router-link>

      <div class="div" @click="signOut()" v-else>
        <v-icon left>
          mdi-lock
        </v-icon>
        SIGN OUT
      </div>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../store/index";

export default Vue.extend({
  methods: {
    signOut: function() {
      store.dispatch("auth/signOut");
      this.$router.push("/");
    },
    isSignedIn: function() {
      return store.getters["auth/auth"] != null;
    },
    isAdmin: function() {
      if (this.isSignedIn()) {
        return store.getters["auth/auth"].type == "teacher";
      } else {
        return false;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black !important;
}
</style>
