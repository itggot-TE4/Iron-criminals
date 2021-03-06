<template>
  <div>
    <v-card
      class="mx-auto mt-10 flex-column"
      max-width="1500"
      v-for="journal in allJournalsForDay()"
      :key="journal.id"
    >
      <JournalBox
        question="Vad har du gjort idag?"
        :answer="journal.body.question1"
        @input="onInput"
        disabled
        :journalID="journal.id"
        :questionID="1"
      />
      <v-divider />
      <JournalBox
        question="Vad har du lärt dig?"
        :answer="journal.body.question2"
        @input="onInput"
        disabled
        :journalID="journal.id"
        :questionID="2"
      />
      <v-divider />
      <JournalBox
        question="Vad förstod du inte / Vilka frågor har du inte fått svar på?"
        :answer="journal.body.question3"
        @input="onInput"
        disabled
        :journalID="journal.id"
        :questionID="3"
      />
      <v-divider />
      <JournalBox
        question="Vad vill du lära dig mer om?"
        :answer="journal.body.question4"
        @input="onInput"
        disabled
        :journalID="journal.id"
        :questionID="4"
      />
    </v-card>
  </div>
</template>

<script lang="ts">
import JournalBox from "../components/JournalBox.vue";
import store from "../store/index";

export default {
  name: "JournalCard",
  components: { JournalBox },
  data() {
    return {
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
    journalsByUserAndDay: function(userID: number) {
      return store.getters["users/journals"](userID, this.week);
    },
    allJournalsForDay: function() {
      const arr: any[] = [];
      const students = this.students;
      students.forEach(student => {
        arr.push(this.journalsByUserAndDay(student.id)[this.day]);
      });
      return arr;
    }
  }
};
</script>
