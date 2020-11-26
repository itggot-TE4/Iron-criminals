<template>
  <div>
    <v-container>
      <p>{{ question }}</p>
      <v-text-field
        flat
        solo
        placeholder="Answer here"
        v-model="answer"
      ></v-text-field>
    </v-container>
  </div>
</template>

<script lang="ts">
export default {
  name: "JournalBox",
  props: ["question", "answer"]
};
</script>
