<template>
  <v-container class="mt-2">
    <v-card class="mx-auto" max-width="350" max-height="120">
      <v-card-text class="d-flex align-center flex-column pa-0">
        <h3 class="ma-0 mt-1 font-weight-black">Monday Week 8</h3>

        <v-radio-group v-model="row" row class="pb-0 mb-0">
          <v-radio label="One at a time" value="radio-1"> </v-radio>
          <v-radio label="All at once" value="radio-2"> </v-radio>
        </v-radio-group>
      </v-card-text>
      <v-container class="d-flex justify-center pa-0">
        <v-icon size="35">mdi-chevron-left</v-icon>
        <p class="ma-0 mt-1">namn namnsson</p>
        <v-icon size="35">mdi-chevron-right</v-icon>
      </v-container>
    </v-card>

    <v-card class="mx-auto mt-10 flex-column" max-width="1500">
      <v-container>
        <p>Vad har du gjort under dagen?</p>
        <v-text-field flat solo placeholder="Answer here"></v-text-field>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <p>Vad har du lärt dig?</p>
        <v-text-field flat solo placeholder="Answer here"></v-text-field>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <p>Vad förstod du inte / Vilka frågor har du inte fått svar på?</p>
        <v-text-field flat solo placeholder="Answer here"></v-text-field>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <p>Vad vill du lära dig mer om?</p>
        <v-text-field flat solo placeholder="Answer here"></v-text-field>
      </v-container>
      <v-divider></v-divider>
      <p class="ml-2">Comments</p>
      <Timeline :comments="[{ body: 'hej', author: 'läraren' }]" />
      <CommentInput />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Timeline from "@/components/Timeline.vue";
import CommentInput from "@/components/CommentInput.vue";
export default {
  name: "Journal",
  components: { Timeline, CommentInput }
};
</script>
