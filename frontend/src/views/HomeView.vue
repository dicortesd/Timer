<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" style="width: 200px;">
    <TaskUser msg="Test de site"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeComponent from '@/components/HomeComponent.vue';
import CreateProject from '@/components/CreateProject.vue';
import SeeClient from '@/components/SeeClient.vue';
import SeeProyecto from '@/components/SeeProyecto.vue';
import ResumeProyecto from '@/components/ResumeProyecto.vue';
import LoginComponent from '@/components/LoginCompo.vue';
import TaskUser from '@/components/TaskUser.vue';
import seeprofile from '@/components/seeprofile.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    TaskUser,
  },
});
</script>
