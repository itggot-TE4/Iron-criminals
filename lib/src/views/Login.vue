<template>
  <v-container class="mt-10">
    <v-card class="mx-auto" max-width="550" max-height="600">
      <div class="text-h2 pl-2 pt-2">Sign in</div>

      <v-container>
        <v-row class="ml-2 mt-5">
          <v-icon>mdi-account-circle</v-icon>
          <v-col cols="12" sm="6" md="10 mt-1">
            <v-text-field v-model="email" dense label="Email"> </v-text-field>
          </v-col>
        </v-row>
        <v-row class="ml-2">
          <v-icon>mdi-lock</v-icon>
          <v-col cols="12" sm="6" md="10 mt-1">
            <v-text-field
              v-model="password"
              dense
              :type="type"
              label="Password"
            ></v-text-field>
          </v-col>
          <v-icon @click="showPassword" v-if="type == 'password'"
            >mdi-eye-off</v-icon
          >
          <v-icon @click="showPassword" v-else>mdi-eye</v-icon>
        </v-row>
      </v-container>

      <v-divider></v-divider>
      <div class="d-flex justify-end">
        <v-btn class="ma-2" color="success" @click="onClick">
          Sign in
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import store from "../store/index";

export default {
  data() {
    return {
      type: "password",
      email: "",
      password: ""
    };
  },
  methods: {
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    onClick() {
      let userID = 1;
      if (parseInt(this.email).toString() == this.email) {
        userID = parseInt(this.email);
      }
      store.dispatch("auth/signIn", userID);
      this.$router.push("journals");
    }
  }
};
</script>
