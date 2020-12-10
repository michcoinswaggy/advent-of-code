<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <br>
      <router-link to="/dayone">Day One</router-link> |
      <router-link to="/daytwo">Day Two</router-link> |
      <router-link to="/daythree">Day Three</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
