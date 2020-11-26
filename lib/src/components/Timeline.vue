<template>
  <v-timeline>
    <v-timeline-item v-for="comment in comments" :key="comment" large>
      <template v-slot:icon>
        <v-avatar>
          <v-icon>mdi-account</v-icon>
        </v-avatar>
      </template>
      <template v-slot:opposite>
        <span>{{ name }}</span>
      </template>
      <v-card class="elevation-2">
        <v-card-text>{{ comment.body }}</v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script lang="ts">
import store from "../store/index";
export default {
  props: ["comments"],
  computed: {
    name: function() {
      try {
        return store.getters["users/user"](this.comments.authors).name;
      } catch {
        return "Unknown";
      }
    }
  }
};
</script>
