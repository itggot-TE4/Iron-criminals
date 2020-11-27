<template>
  <v-data-table
    :headers="headers"
    :items="rows"
    hide-default-footer
    class="elevation-1"
  >
    <template v-slot:top>
      <h1 class="pa-4">{{ title }}</h1>
    </template>

    <template v-slot:[`item.monday.status`]="{ item }">
      <router-link
        :to="`/journal/${yearWeek}/students/${item.thursday.student}?monday`"
      >
        <JournalOverViewBadge
          :item="item.monday"
          :badgeContent="item.monday.comments.length"
        />
      </router-link>
    </template>
    <template v-slot:[`item.tuesday.status`]="{ item }">
      <router-link
        :to="`/journal/${yearWeek}/students/${item.thursday.student}?tuesday`"
      >
        <JournalOverViewBadge
          :item="item.tuesday"
          :badgeContent="item.tuesday.comments.length"
        />
      </router-link>
    </template>
    <template v-slot:[`item.wednesday.status`]="{ item }">
      <router-link
        :to="`/journal/${yearWeek}/students/${item.thursday.student}?wednesday`"
      >
        <JournalOverViewBadge
          :item="item.wednesday"
          :badgeContent="item.wednesday.comments.length"
        />
      </router-link>
    </template>
    <template v-slot:[`item.thursday.status`]="{ item }">
      <router-link
        :to="`/journal/${yearWeek}/students/${item.thursday.student}?thursday`"
      >
        <JournalOverViewBadge
          :item="item.thursday"
          :badgeContent="item.thursday.comments.length"
        />
      </router-link>
    </template>
    <template v-slot:[`item.friday.status`]="{ item }">
      <router-link
        :to="`/journal/${yearWeek}/students/${item.thursday.student}?friday`"
      >
        <JournalOverViewBadge
          :item="item.friday"
          :badgeContent="item.friday.comments.length"
        />
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
    yearWeek: { default: "2020-48" },
    filtered: { default: false },
    title: {}
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
      let users: any[];
      if (this.filtered) {
        users = store.getters["users/studentsBelongingTo"](
          store.getters["auth/auth"].id
        );
      } else {
        users = store.getters["users/studentsNotBelongingTo"](
          store.getters["auth/auth"].id
        );
      }
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
