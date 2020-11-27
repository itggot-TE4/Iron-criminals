<template>
  <v-container class="mt-2">
    <v-card class="mx-auto" max-width="350" max-height="120">
      <v-card-text class="d-flex align-center flex-column pa-0">
        <h3 class="ma-0 mt-1 font-weight-black">{{ day }} {{ week }}</h3>

        <v-radio-group v-model="oneAtATime" row class="pb-0 mb-0">
          <v-radio label="One at a time" :value="true"> </v-radio>
          <v-radio label="All at once" :value="false"> </v-radio>
        </v-radio-group>
      </v-card-text>
      <v-container class="d-flex justify-center pa-0" v-if="oneAtATime">
        <v-icon size="35" @click="changeUser('down')">mdi-chevron-left</v-icon>
        <p class="ma-0 mt-1">{{ currentStudent.name }}</p>
        <v-icon size="35" @click="changeUser('up')">mdi-chevron-right</v-icon>
      </v-container>
    </v-card>

    <v-card
      class="mx-auto mt-10 flex-column"
      max-width="1500"
      v-if="oneAtATime"
    >
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
      <CommentInput :journal="journal" :week="week" />
    </v-card>
    <v-card class="mx-auto mt-10 flex-column" max-width="1500" v-else>
      <!-- TODO: A view of all entries -->
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Timeline from "@/components/Timeline.vue";
import CommentInput from "@/components/CommentInput.vue";
import JournalBox from "../components/JournalBox.vue";
import store from "../store/index";

export default {
  name: "Journal",
  components: { Timeline, CommentInput, JournalBox },
  data() {
    return {
      oneAtATime: true,
      question1: "",
      question2: "",
      question3: "",
      question4: "",
      currentIndex: 0
    };
  },
  mounted: function() {
    this.question1 = this.journal.body.question1;
    this.question2 = this.journal.body.question2;
    this.question3 = this.journal.body.question3;
    this.question4 = this.journal.body.question4;
  },
  watch: {
    currentStudent: function() {
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
      return this.$route.params.yearWeek;
    },
    day: function() {
      return this.$route.query.day;
    },
    students: function() {
      if (this.$route.query.filtered == "true") {
        return store.getters["users/studentsBelongingTo"](
          store.getters["auth/auth"].id
        );
      } else {
        return store.getters["users/studentsNotBelongingTo"](
          store.getters["auth/auth"].id
        );
      }
    },
    nextStudent: function() {
      return this.students[this.currentIndex + 1];
    },
    currentStudent: function() {
      return this.students[this.currentIndex];
    },
    prevStudent: function() {
      return this.students[this.currentIndex - 1];
    },
    journals: function() {
      return store.getters["users/journals"](
        this.students[this.currentIndex].id,
        this.week
      );
    },
    journal: function() {
      try {
        return this.journals[this.$route.query.day];
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
        week: this.week
      });
    },
    changeUser: function(direction) {
      switch (direction) {
        case "up":
          this.currentIndex += 1;
          break;
        default:
          this.currentIndex -= 1;
          break;
      }
      if (this.currentIndex >= this.students.length) {
        this.currentIndex = this.students.length - 1;
      } else if (this.currentIndex < 0) {
        this.currentIndex = 0;
      }
    }
  }
};
</script>
