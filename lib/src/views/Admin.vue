<template>
  <v-container>

    <UserOverview type="teacher" :headers="teacherHeaders" class="mb-5"/>
    <UserOverview type="student" :headers="studentHeaders"/>

  </v-container>
</template>

<script>

import UserOverview from "@/components/UserOverview.vue";


export default {
  components: { UserOverview },

  data() {
    return {
      teacherHeaders: [
        {
          text: 'Email',
          value: 'email',
          align:'start'
        },
        { text: 'Name', value: 'name'},
        { value: 'pwd', sortable: false}
      ],

      studentHeaders: [
        {
          text: 'Email',
          value: 'email',
          align:'start'
        },
        { text: 'Name', value: 'name'},
        { text: 'Teacher', value: 'teacher'},
        { value: 'pwd', sortable: false}
      ]
    }
  }
}
</script>