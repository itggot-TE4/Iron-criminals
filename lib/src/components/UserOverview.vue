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
      <UserOverViewBadge :item="item" badgeContent="99" />
    </template>
    <template v-slot:[`item.tuesday.status`]="{ item }">
      <UserOverViewBadge :item="item" badgeContent="99" />
    </template>
    <template v-slot:[`item.wednesday.status`]="{ item }">
      <UserOverViewBadge :item="item" badgeContent="99" />
    </template>
    <template v-slot:[`item.thursday.status`]="{ item }">
      <UserOverViewBadge :item="item" badgeContent="99" />
    </template>
    <template v-slot:[`item.friday.status`]="{ item }">
      <UserOverViewBadge :item="item" badgeContent="2" />
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../store/index";
import UserOverViewBadge from "@/components/UserOverviewBadge.vue";

export default {
  components: {
    UserOverViewBadge
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
      const users = store.getters["users/users"];
      users.forEach(element => {
        const temp = store.getters["users/journals"](element.id);
        Object.keys(temp).forEach((element: any) => {
          temp[element].status = "read";
          temp[element].name = users.find(
            x => x.id == temp[element].student
          ).name;
        });
        out.push(temp);
      });
      return out;
    }
  },
  methods: {}
};
</script>
