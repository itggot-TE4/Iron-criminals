<template>
  <div>
    <p class="pa-4 pb-0 mb-0">Add new {{type}}</p> 
    <v-container>
      <v-row>
          <v-text-field v-model="email" :rules="[rules.required, rules.email]" label="E-mail" class="px-5"></v-text-field>
 
          <v-text-field label="Name" class="px-5"></v-text-field>

          <v-select v-if="type === 'student'" :items="teachers" label="Teacher" class="px-5"></v-select>

          <v-text-field label="Password" class="px-5"></v-text-field>

      </v-row>
      <div class="d-flex justify-end">
          <v-btn
              class="ma-2"
              color="success"
          >
              Create
          </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({

  props: [
    'type'
  ],

  data() {
    return {
      rules: {
        required: (value:any) => !!value || 'Required',
        email: (value:any) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail'
        }
      },

      teachers: ['Daniel Berg', 'Linus Styrén', 'Johan Kivi', 'Freddan']
    }
  }
});

</script>