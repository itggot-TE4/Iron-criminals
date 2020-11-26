<template>
  <div>
    <p class="pa-4 pb-0 mb-0">Add new {{ type }}</p>
    <v-container>
      <v-row>
        <v-text-field
          v-model="email"
          :rules="[rules.required, rules.email]"
          label="E-mail"
          class="px-5"
        ></v-text-field>

        <v-text-field v-model="name" label="Name" class="px-5"></v-text-field>

        <v-select
          v-if="type === 'student'"
          :items="teachers"
          label="Teacher"
          class="px-5"
          v-model="teacher"
        ></v-select>

        <v-text-field label="Password" class="px-5"></v-text-field>
      </v-row>
      <div class="d-flex justify-end">
        <v-btn class="ma-2" color="success" @click="createUser">
          Create
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store/index";

export default Vue.extend({
  props: ["type"],

  data() {
    return {
      email: "",
      name: "",
      teacher: "",
      pwd: "",

      rules: {
        required: (value: any) => !!value || "Required",
        email: (value: any) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
          return pattern.test(value) || "Invalid e-mail";
        }
      }
    };
  },
  computed: {
    teachers: function() {
      return store.getters["users/teachers"].map((x: any) => x.name);
    }
  },
  methods: {
    createUser: function() {
      console.log(this.teacher);
      const teacher = store.getters["users/teachers"].find(
        (x: any) => x.name == this.teacher
      );
      if(this.type === "student") {
        store.dispatch("users/newUser", {
          name: this.name,
          type: this.type,
          email: this.email,
          password: this.pwd,
          assignedTeacher: teacher.id
        });
      } else {
        store.dispatch("users/newUser", {
          name: this.name,
          type: this.type,
          email: this.email,
          password: this.pwd
        });
      }
    }
  }
});
</script>
