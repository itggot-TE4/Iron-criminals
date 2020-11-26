<template>
  <v-container>
    <JournalOverview :filtered="true" title="Your Students" class="mb-5" />
    <JournalOverview title="All Other Students" />
  </v-container>
</template>

<script>
import JournalOverview from "@/components/JournalOverview.vue";

export default {
  components: { JournalOverview }
};
</script>
