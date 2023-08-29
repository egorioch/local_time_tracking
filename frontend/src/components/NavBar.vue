<template>
  <div class="common-navbar-layout">
    <ul class="bar-elements">
      <li> <a href="/main"> Главная </a> </li>
      <li> <a href="/hist"> График </a> </li>
      <li> <a href="/card"> Modal </a> </li>
      <li class="right-elements"> <a href="#"> О нас </a> </li>
    </ul>

  </div>
</template>

<style lang="scss" scoped>
$font: 'Open Sans', sans-serif;

.common-navbar-layout {
  position: relative;
  top: -8px;
  width: 100%;
  align-items: center;
}

ul {
  background-color: #333;
  border-radius: px;
  overflow: hidden;
  list-style-type: none;
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-family: $font;
  border-radius: 0 0 10px 10px;
}

li {
  float: left;
}

a {
  display: block;
  color: white;
  text-align: center;
  padding: 12px 16px;
  text-decoration: none;
  outline: none;

  /* First we need to help some browsers along for this to work.
     Just because a vendor prefix is there, doesn't mean it will
     work in a browser made by that vendor either, it's just for
     future-proofing purposes I guess. */
  -o-transition:.5s;
  -ms-transition:.5s;
  -moz-transition:.5s;
  -webkit-transition:.5s;
  /* ...and now for the proper property */
  transition:.5s;
  
}


.right-elements {
  float: right;
  margin: 0 7px 0 0;
}

li a:hover {
  background-color: #111;
}
</style>