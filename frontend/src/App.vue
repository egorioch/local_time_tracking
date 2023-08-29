<template>
  <nav-bar></nav-bar>
  <div id="app">
    <span v-if="isLoggedIn"><a @click="logout()">Logout</a></span>
  </div>

  <router-view />
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: "App",
  components: {
    NavBar
  },
  computed: {
    isLoggedIn() {
      console.log("this.$store.getters.isLoggedIn: " + this.$store.getters.isLoggedIn);
      console.log("this.$store.getters.authStatus: " + this.$store.getters.authStatus);
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => { 
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style scoped>
  body {
    overflow-x: hidden;
    overflow-y: hidden;
  }

</style>