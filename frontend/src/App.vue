<template>
  <div>
    <div class="top-banner">
      <div class="app-title">Empresa Test</div>
      <a href="#"><font-awesome-icon :icon="['fas', 'bell']"/></a>
      <a v-if="isAdmin" href="#" @click="showPopup = !showPopup"><font-awesome-icon :icon="['fas', 'user']"/></a>
      <a v-else href="/Login"><font-awesome-icon :icon="['fas', 'user']"/></a>
    </div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/register">Register</router-link>
    </nav>
    <router-view/>
    <div class="app-container">
      <div class="banner">
        <a href="#"><font-awesome-icon :icon="['fas', 'search']"/></a>
        <router-link to="/" class="btn btn-link">
          <font-awesome-icon :icon="['fas', 'home']"/>
        </router-link>
        <a href="#"><font-awesome-icon :icon="['fas', 'chart-pie']"/></a>
        <a href="#"><font-awesome-icon :icon="['fas', 'envelope']"/></a>
        <a href="#" @click="showPopup = !showPopup"><font-awesome-icon :icon="['fas', 'user']"/></a>
      </div>
    </div>

    <!-- Ajout de la pop-up -->
    <div class="popup" v-if="showPopup">
      <div class="popup-content">
        <p>Êtes-vous sûr de vouloir vous déconnecter?</p>
        <button class="btn btn-primary" @click="logout">Déconnexion</button>
      </div>
    </div>
  </div>
</template>



<script>

import Cookies from 'js-cookie';

export default {

  data() {
    return {
      showPopup: false
    }
  },
  setup(){
    const userCookie = Cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie) : null;

    let isAdmin = false;

    console.log("=======")
    console.log(user);


    if (user && user.rol === 'admin') {
      isAdmin = true;
    }
    console.log(isAdmin);
    return { isAdmin };
  },
  methods: {
    
    logout() {
   
      Cookies.remove('user');
      this.showPopup = false;
      window.location.reload()
      // Code pour se déconnecter ici
    }
  }
  
}
</script>





<style>

/* Ajout de styles pour la pop-up */
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
}
.top-banner {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #f7f7f7;
  height: 40px;
  padding-right: 30px;
}
.app-title {
  font-weight: bold;
  font-size: 24px;
  color: #2c3e50;
  margin-right: 920px;
}

.top-banner a {
  margin-left: 40px;
  color: #444;
  font-size: 24px;
  text-decoration: none;
}

.top-banner a:hover {
  color: #007bff;
}

.banner {
  position: fixed;
  top: 40px; /* ajuster la valeur en fonction de la hauteur de la bannière */
  bottom: 0;
  left: 0;
  width: 70px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.banner a {
  margin-bottom: 40px;
  color: #444;
  font-size: 24px;
  text-decoration: none;
}

.banner a:hover {
  color: #007bff;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
