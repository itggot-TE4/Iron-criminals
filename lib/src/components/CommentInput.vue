<template>
  <div>
    <v-col cols="12">
      <v-textarea filled color="teal" v-model="comment">
        <template v-slot:label>
          <div>
            Comment
          </div>
        </template>
      </v-textarea>
    </v-col>
    <div class="d-flex justify-end">
      <v-btn class="ma-2" color="success" @click="onClick">
        Send Comment
        <template v-slot:loader>
          <span>Loading...</span>
        </template>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../store/index";

export default Vue.extend({
  props: ["journal", "week"],
  data() {
    return {
      comment: ""
    };
  },
  methods: {
    onClick: function() {
      store.dispatch("journals/createComment", {
        logID: this.journal.id,
        yearWeek: this.week,
        body: this.comment,
        author: store.getters["auth/auth"].id
      });
    }
  }
});
</script>
