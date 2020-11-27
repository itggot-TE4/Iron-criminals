<template>
  <v-badge :content="badgeContent">
    <v-icon
      :color="item.status == 'read' ? 'blue' : 'grey'"
      v-if="
        item.body.question1 !== '' ||
          item.body.question2 !== '' ||
          item.body.question3 !== '' ||
          item.body.question4 !== ''
      "
      >mdi-check</v-icon
    >
    <v-icon color="orange" v-else>mdi-alert-octagon</v-icon>
  </v-badge>
</template>

<script lang="ts">
export default {
  name: "UserOverViewBadge",
  props: ["item", "badgeContent"]
};
</script>
