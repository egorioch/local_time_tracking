<template>
  <navbar-component />
  <div id="app">
    <span v-if="isLoggedIn"><a @click="logout()">Logout</a></span>
  </div>
  <p class="h2-like">Отслеживание времени</p>

  <router-view />
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';

export default {
  name: "App",
  components: {
    NavbarComponent
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;700&display=swap');

html * {
  font-family: 'Poppins', sans-serif;
}

button {
  padding: 4px 20px;
  background-color: #47b784;
  color: #fafafa;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all .2s ease;
}

body {
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>