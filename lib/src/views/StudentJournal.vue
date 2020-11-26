<template>
  <v-container class="mt-2">
    <v-card class="mx-auto" max-width="350" max-height="120">
      <v-card-text class="d-flex align-center flex-column pa-0">
        <h3 class="ma-0 mt-1 font-weight-black">{{ week }}</h3>
        <h3 class="ma-0 font-weight-black">{{ student.name }}</h3>
      </v-card-text>
      <v-container class="d-flex justify-center">
        <router-link
          :to="`/journal/${week}/students/${this.$route.params.id}?${prevDay}`"
        >
          <v-icon size="35">mdi-chevron-left</v-icon>
        </router-link>
        <p class="ma-0 mt-1">{{ Object.keys(this.$route.query)[0] }}</p>
        <router-link
          :to="`/journal/${week}/students/${this.$route.params.id}?${nextDay}`"
        >
          <v-icon size="35">mdi-chevron-right</v-icon>
        </router-link>
      </v-container>
    </v-card>

    <v-card class="mx-auto mt-10 flex-column" max-width="1500">
      <JournalBox
        question="Vad har du gjort idag?"
        :answer="question1"
        @input="onInput"
        :journalID="journal.id"
        :questionID="1"
      />
      <v-divider />
      <JournalBox
        question="Vad har du lärt dig?"
        :answer="question2"
        @input="onInput"
        :journalID="journal.id"
        :questionID="2"
      />
      <v-divider />
      <JournalBox
        question="Vad förstod du inte / Vilka frågor har du inte fått svar på?"
        :answer="question3"
        :journalID="journal.id"
        @input="onInput"
        :questionID="3"
      />
      <v-divider />
      <JournalBox
        question="Vad vill du lära dig mer om?"
        :answer="question4"
        @input="onInput"
        :journalID="journal.id"
        :questionID="4"
      />
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
import JournalBox from "../components/JournalBox.vue";

export default {
  name: "Journal",
  components: { Timeline, CommentInput, JournalBox },
  data() {
    return {
      question1: "",
      question2: "",
      question3: "",
      question4: ""
    };
  },
  mounted: function() {
    this.question1 = this.journal.body.question1;
    this.question2 = this.journal.body.question2;
    this.question3 = this.journal.body.question3;
    this.question4 = this.journal.body.question4;
  },
  watch: {
    nextDay: function() {
      this.$nextTick(function() {
        this.question1 = this.journal.body.question1;
        this.question2 = this.journal.body.question2;
        this.question3 = this.journal.body.question3;
        this.question4 = this.journal.body.question4;
      });
    }
  },
  computed: {
    week: function() {
      return this.$route.params.week;
    },
    nextDay: function() {
      switch (Object.keys(this.$route.query)[0]) {
        case "monday": {
          return "tuesday";
        }
        case "tuesday": {
          return "wednesday";
        }
        case "wednesday": {
          return "thursday";
        }
        case "thursday": {
          return "friday";
        }
        case "friday": {
          return null;
        }
        default: {
          return null;
        }
      }
    },
    prevDay: function() {
      switch (Object.keys(this.$route.query)[0]) {
        case "monday": {
          return null;
        }
        case "tuesday": {
          return "monday";
        }
        case "wednesday": {
          return "tuesday";
        }
        case "thursday": {
          return "wednesday";
        }
        case "friday": {
          return "thursday";
        }
        default: {
          return null;
        }
      }
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
  },
  methods: {
    onInput: function(data: string, journalID: number, questionID: number) {
      store.dispatch("journals/updateJournal", {
        data: data,
        id: journalID,
        questionID: questionID,
        week: this.$route.params.week
      });
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
