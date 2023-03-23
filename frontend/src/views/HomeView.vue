<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <LoginComponent msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginComponent from '@/components/LoginCompo.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    LoginComponent,
  },
});
</script>
