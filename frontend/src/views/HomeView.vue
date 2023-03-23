<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <CreateProject msg="Test de site"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import CreateProject from '@/components/CreateProject.vue'


export default defineComponent({
  name: 'HomeView',
  components: {
    CreateProject,
  },
});
</script>
