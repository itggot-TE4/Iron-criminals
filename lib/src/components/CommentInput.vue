<template>
  <div>
    <v-col cols="12">
      <v-textarea filled color="teal">
          <template v-slot:label>
          <div>
              Comment
          </div>
          </template>
      </v-textarea>
    </v-col>
    <div class="d-flex justify-end">
      <v-btn
        class="ma-2"
        :loading="loading2"
        :disabled="loading2"
        color="success"
        @click="loader = 'loading2'"
      >
        Send Comment
        <template v-slot:loader>
          <span>Loading...</span>
        </template>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["logID"]
});

</script>
