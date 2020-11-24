<template>
  <v-app-bar app>
    <router-link to="/">
      <v-toolbar-title>Log-O-Matic</v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>

    <v-btn elevation="0">
      <router-link to="admin">
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
      <router-link to="Login">
        <v-icon left>
          mdi-lock-open
        </v-icon>
        SIGN IN
      </router-link>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
  }
</style>