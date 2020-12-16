<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            <br>
            <router-link style="color: green" to="/dayone">Day One</router-link> |
            <router-link style="color: green" to="/daytwo">Day Two</router-link> |
            <router-link style="color: green" to="/daythree">Day Three</router-link> |
            <router-link style="color: green" to="/dayfour">Day Four</router-link> |
            <router-link style="color: green" to="/dayfive">Day Five</router-link> |
            <router-link style="color: green" to="/daysix">Day Six</router-link> |
            <router-link to="/dayseven" style="color: red">Day seven (TODO)</router-link> |
            <router-link style="color: green" to="/dayeight">Day Eight</router-link> |
            <br>
            <router-link style="color: green" to="/daynine">Day Nine</router-link> |
            <router-link style="color: red" to="/dayten">Day Ten (to finish)</router-link> |
            <router-link style="color: green" to="/dayeleven">Day Eleven</router-link> |
            <router-link style="color: green" to="/daytwelve">Day Twelve</router-link> |
            <router-link style="color: red" to="/daythirteen">Day Thirteen (to finish)</router-link> |
            <router-link style="color: green" to="/dayfourteen">Day Fourteen</router-link> |
            <router-link style="color: green" to="/dayfifteen">Day Fifteen</router-link> |
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

    hr {
        width: 500px
    }
</style>
