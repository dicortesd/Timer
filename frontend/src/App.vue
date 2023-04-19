<template>
  <div>
    <div class="top-banner">
      <div class="app-title">Empresa Test</div>
      <a href="#"><font-awesome-icon :icon="['fas', 'bell']"/></a>
      <a href="#"><font-awesome-icon :icon="['fas', 'user']"/></a>
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
        <router-link to="/profile" class="btn btn-link">
          <font-awesome-icon :icon="['fas', 'user']"/>
        </router-link>
      </div>
    </div>
  </div>
</template>


<style>
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
