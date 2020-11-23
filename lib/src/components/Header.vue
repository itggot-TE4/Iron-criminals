<template>
  <v-app-bar app>
    <v-toolbar-title>Log-O-Matic</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn elevation="0">
      <v-icon left>
        mdi-cog
      </v-icon>
      ADMIN
    </v-btn>

    <v-btn elevation="0">
      <v-icon left>
        mdi-format-list-bulleted
      </v-icon>
      LOGS
    </v-btn>

    <v-btn elevation="0">
      <v-icon left>
        mdi-lock-open
      </v-icon>
      SIGN IN
    </v-btn>

  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>
