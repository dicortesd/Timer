<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" style="width: 200px;">
    <CreateProject msg="Test de site"/>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import CreateProject from '@/components/CreateProject.vue'
import SeeClient from '@/components/SeeClient.vue'
import LoginComponent from '@/components/LoginCompo.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    CreateProject,
  },
});
</script>
