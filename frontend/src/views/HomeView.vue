<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" style="width: 200px;">
    <SeeProyecto msg="Test de site"/>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import HomeComponent from '@/components/HomeComponent.vue';
import CreateProject from '@/components/CreateProject.vue'
import SeeClient from '@/components/SeeClient.vue'
import LoginComponent from '@/components/LoginCompo.vue'; // @ is an alias to /src
import SeeProyecto from '@/components/SeeProyecto.vue';


export default defineComponent({
  name: 'HomeView',
  components: {
    SeeProyecto,
  },
});
</script>
