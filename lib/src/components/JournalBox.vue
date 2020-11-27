<template>
  <div>
    <v-container>
      <p>{{ question }}</p>
      <v-text-field
        flat
        solo
        placeholder="Answer here"
        v-model="actualAnswer"
        @blur="$emit('input', actualAnswer, journalID, questionID)"
        :disabled="disabled == null ? false : true"
      ></v-text-field>
    </v-container>
  </div>
</template>

<script lang="ts">
export default {
  name: "JournalBox",
  props: ["question", "answer", "journalID", "questionID", "disabled"],
  data() {
    return {
      actualAnswer: this.answer
    };
  },
  watch: {
    answer: function() {
      this.actualAnswer = this.answer;
    }
  }
};
</script>
