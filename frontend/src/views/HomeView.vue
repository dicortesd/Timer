<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" style="width: 200px;">
    <template v-if="!user">
      <LoginComponent />
    </template>
    <template v-else>
      <HomeComponent msg="Test de site"/>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeComponent from '@/components/HomeComponent.vue';
import LoginComponent from '@/components/LoginCompo.vue';
import Cookies from 'js-cookie';

export default defineComponent({
  name: 'HomeView',
  components: {
    HomeComponent,
    LoginComponent,
  },
  data() {
    return {
      user: Cookies.get('user'),
    };
  },
});
</script>
