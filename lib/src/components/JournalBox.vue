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
      ></v-text-field>
    </v-container>
  </div>
</template>

<script lang="ts">
export default {
  name: "JournalBox",
  props: ["question", "answer", "journalID", "questionID"],
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
