<template>
  <v-card>
    <h2 class="pa-4 text-capitalize">{{ type }}s</h2>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:[`item.teacher`]="{ item }" v-if="type === 'student'">
        <v-select
          v-bind:select="item.teacher"
          :items="teachers"
          v-bind:value="item.teacher"
        ></v-select>
      </template>

      <template v-slot:[`item.pwd`]="{ item }">
        <v-row class="ma-0">
          <v-text-field
            type="text"
            v-model.number="item.pwd"
            label="Password"
          ></v-text-field>
          <v-btn color="primary"> Reset </v-btn>
        </v-row>
      </template>
    </v-data-table>

    <NewUserForm :type="type" />
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import NewUserForm from "@/components/NewUserForm.vue";
import store from "../store/index";

export default {
  components: { NewUserForm },

  props: ["type", "headers"],

  // data() {
  //   return {
  //     items: [
  //       {
  //         email: "hehehe",
  //         name: "hohoho",
  //         teacher: "Daniel Berg"
  //       }
  //     ]
  //   };
  // },
  computed: {
    teachers: function() {
      return store.getters["users/teachers"].map((x: any) => x.name);
    },
    items: function() {
      return store.getters[`users/${this.type}s`];
    }
  }
};
</script>

<style lang="scss">
.v-data-table__wrapper table {
  table-layout: fixed;
}
</style>
