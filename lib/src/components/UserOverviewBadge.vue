<template>
  <v-badge :content="badgeContent">
    <v-icon :color="item.status == 'read' ? 'blue' : 'grey'">mdi-check</v-icon>
  </v-badge>
</template>

<script lang="ts">
export default {
  name: "UserOverViewBadge",
  props: ["item", "badgeContent"]
};
</script>
