<template>
  <div class="buttons-layout">
    <div v-for="currentButton in buttonsNames">
      <button @click="chooseButton(currentButton)" class="button-container">{{ currentButton }}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    buttonsNames: Array
  },
  data() {
    return {

    }
  },
  methods: {
    chooseButton(buttonName) {
      this.$emit('receivedButtonName', buttonName)
    }
  }
}
</script>

<style lang="scss" scoped>
$font: 'Open Sans', sans-serif;

button {
  background-color: #ffefdf;
  border-radius: 5px;
  border-color: #ffa148;
  font-family: $font;
  font-size: 20px;
  margin-left: 10px;
}

.buttons-layout {
  display: flex;
  justify-content: center;
  padding: 10px;
}

.button-container {
  margin: 0 10px 0 10px;
}

</style>