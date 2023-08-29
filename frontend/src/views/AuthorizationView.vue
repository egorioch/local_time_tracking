<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>

      <div class="username-container">
        <label>User name</label>
        <input required v-model="username" type="text" placeholder="Login" />
      </div>

      <div class="password-container">
        <label>Password</label>
        <input required v-model="password" type="password" placeholder="Password" />
      </div>

      <hr />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      let username = this.username;
      let password = this.password;
      this.$store.dispatch('login', { username, password })
        .then(() => this.$router.push('/'))
        .catch(err => console.error("Error with log in: " + err))
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px;
}
</style>