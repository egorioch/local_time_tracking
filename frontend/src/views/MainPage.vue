<template>
  <div class="common-layout">
    <div class="left-buttons">
      <a href="/hist">График</a>
    </div>
    <div class="rigth-buttons">
      <absence-reason />
    </div>

  </div>
</template>

<script>
import AbsenceReason from '@/components/AbsenceReason.vue';
export default {
  components: {
    AbsenceReason
  }
}
</script>

<style lang="scss" scoped>
$font: 'Open Sans', sans-serif;

.common-layout {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 20px;
}

button {
  background-color: #a1f8d1;
  border-radius: 5px;
  border-color: #57cf99;
  font-family: $font;
  font-size: 20px;
}

.left-buttons .right-buttons {
  font-size: 20px;
}

.right-buttons {
  display: block;
  float: right;
}

a {
  background-color: #a1f8d1;
  border-radius: 5px;
  border: solid 2px;
  border-color: #57cf99;
  font-family: $font;
  font-size: 20px;
  text-decoration: none;
  color: black;
  padding: 3px;
}
</style>