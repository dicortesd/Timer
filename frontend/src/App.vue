<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/register">Register</router-link>

  </nav>
  <router-view/>
  <div class="app-container">
    <div class="banner">
      <router-link to="/" class="btn btn-link">
        <font-awesome-icon :icon="['fas', 'home']"/>
      </router-link>
      <router-link to="/profile" class="btn btn-link">
        <font-awesome-icon :icon="['fas', 'user']"/>
      </router-link>
      <a href="#"><font-awesome-icon :icon="['fas ', 'search']"/></a>
      <a href="#"><font-awesome-icon :icon="['fas', 'envelope']"/></a>
    </div>
  </div>
</template>


<style>
.banner {
  position: fixed;
  top: 0;
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
  margin-bottom: 20px;
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
