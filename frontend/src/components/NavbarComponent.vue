<template>
  <header class="navbar-header">
    <a href="/"><img src="../assets/Group.png" class="title-accent" /></a>
    <nav class="navbar-header__nav">
      <ul>
        <li class="">
          <a class="navbar-header__a" href="/hist">График</a>
        </li>
        <li>
          <a class="navbar-header__a" href="/modal">Заявление</a>
        </li>
      </ul>
      <button class="btn">Контакты</button>
    </nav>
  </header>
</template>

<script>

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
  padding: 0;
  margin: 0;

}

button {

}

.navbar-header {
  position: fixed;
  z-index: 999;
  height: 8%;
  padding: 0px 25px;
  width: calc(100% - 50px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  flex-wrap: wrap;
}

.navbar-header>nav {
  display: flex;
  align-items: center;
}

.navbar-header>nav>ul {
  display: flex;
  list-style: none;
}

.navbar-header>nav>ul>li {
  margin-right: 35px;
}

.navbar-header__a {
  color: #0d0d0d;
  text-decoration: none;
  transition: all .3s ease;
}

.navbar-header__a:hover {
  color: #0f6b49;
}

.btn {
  padding: 5px 25px;
  background-color: #0d0d0dbd;
  color: #fafafa;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all .2s ease;
}

.btn:hover {
  background-color: #0f6b49;
}



</style>