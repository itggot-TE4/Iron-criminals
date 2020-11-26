<template>
  <v-container class="mt-2">
    <v-card class="mx-auto" max-width="350" max-height="120">
      <v-card-text class="d-flex align-center flex-column pa-0">
        <h3 class="ma-0 mt-1 font-weight-black">{{ week }}</h3>
        <h3 class="ma-0 font-weight-black">{{ student.name }}</h3>
      </v-card-text>
      <v-container class="d-flex justify-center">
        <v-icon size="35">mdi-chevron-left</v-icon>
        <p class="ma-0 mt-1">{{ Object.keys(this.$route.query)[0] }}</p>
        <v-icon size="35">mdi-chevron-right</v-icon>
      </v-container>
    </v-card>

    <v-card class="mx-auto mt-10 flex-column" max-width="1500">
      <v-container>
        <p>Vad har du gjort under dagen?</p>
        <v-text-field
          flat
          solo
          placeholder="Answer here"
          v-model="question1"
        ></v-text-field>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <p>Vad har du lärt dig?</p>
        <v-text-field
          flat
          solo
          placeholder="Answer here"
          v-model="question2"
        ></v-text-field>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <p>Vad förstod du inte / Vilka frågor har du inte fått svar på?</p>
        <v-text-field
          flat
          solo
          placeholder="Answer here"
          v-model="question3"
        ></v-text-field>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <p>Vad vill du lära dig mer om?</p>
        <v-text-field
          flat
          solo
          placeholder="Answer here"
          v-model="question4"
        ></v-text-field>
      </v-container>
      <v-divider></v-divider>
      <p class="ml-2">Comments</p>
      <Timeline :comments="journal.comments" />
      <CommentInput :logID="journal.id" />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Timeline from "@/components/Timeline.vue";
import CommentInput from "@/components/CommentInput.vue";
import store from "../store/index";

export default {
  name: "Journal",
  components: { Timeline, CommentInput },
  data() {
    return {
      question1: "",
      question2: "",
      question3: "",
      question4: ""
    };
  },
  computed: {
    week: function() {
      return this.$route.params.week;
    },
    journals: function() {
      return store.getters["users/journals"](
        parseInt(this.$route.params.id),
        this.$route.params.week
      );
    },
    journal: function() {
      try {
        return this.journals[Object.keys(this.$route.query)[0]];
      } catch {
        return this.journals.monday;
      }
    },
    student: function() {
      try {
        return store.getters["users/user"](this.journal.student);
      } catch {
        return { name: "Unknown", id: this.journal.student };
      }
    }
  }
};
</script>
