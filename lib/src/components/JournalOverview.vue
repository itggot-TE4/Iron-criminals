<template>
  <v-data-table
    :headers="headers"
    :items="rows"
    hide-default-footer
    class="elevation-1"
  >
    <template v-slot:top>
      <h1>Journals</h1>
    </template>

    <template v-slot:[`item.monday.status`]="{ item }">
      <router-link
        :to="`/journal/${yearWeek}/students/${item.thursday.student}?monday`"
      >
        <JournalOverViewBadge :item="item.monday" badgeContent="99" />
      </router-link>
    </template>
    <template v-slot:[`item.tuesday.status`]="{ item }">
      <router-link
        :to="`/journal/${yearWeek}/students/${item.thursday.student}?tuesday`"
      >
        <JournalOverViewBadge :item="item.tuesday" badgeContent="99" />
      </router-link>
    </template>
    <template v-slot:[`item.wednesday.status`]="{ item }">
      <router-link
        :to="`/journal/${yearWeek}/students/${item.thursday.student}?wednesday`"
      >
        <JournalOverViewBadge :item="item.wednesday" badgeContent="99" />
      </router-link>
    </template>
    <template v-slot:[`item.thursday.status`]="{ item }">
      <router-link
        :to="`/journal/${yearWeek}/students/${item.thursday.student}?thursday`"
      >
        <JournalOverViewBadge :item="item.thursday" badgeContent="99" />
      </router-link>
    </template>
    <template v-slot:[`item.friday.status`]="{ item }">
      <router-link
        :to="`/journal/${yearWeek}/students/${item.thursday.student}?friday`"
      >
        <JournalOverViewBadge :item="item.friday" badgeContent="2" />
      </router-link>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import store from "../store/index";
import JournalOverViewBadge from "@/components/JournalOverviewBadge.vue";

export default {
  components: {
    JournalOverViewBadge
  },
  props: {
    yearWeek: { default: "2020-48" }
  },
  data() {
    return {
      headers: [
        { text: "User", value: "monday.name", sortable: true },
        { text: "Monday", value: "monday.status" },
        { text: "Tuesday", value: "tuesday.status" },
        { text: "Wednesday", value: "wednesday.status" },
        { text: "Thursday", value: "thursday.status" },
        { text: "Friday", value: "friday.status" }
      ]
    };
  },
  computed: {
    rows: function() {
      const out: any = [];
      const users = store.getters["users/students"];
      users.forEach((element: any) => {
        const temp = store.getters["users/journals"](element.id, this.yearWeek);
        Object.keys(temp).forEach((element: string) => {
          temp[element].status = "read";
          try {
            temp[element].name = users.find(
              (x: any) => x.id == temp[element].student
            ).name;
          } catch {
            temp[element].name = "Unknown";
          }
        });
        out.push(temp);
      });
      return out;
    }
  },
  methods: {}
};
</script>
