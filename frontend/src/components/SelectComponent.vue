<template>
  <div class="select-layout"  >
    <select>
      <option v-for="currentOption in options"
      @click="chooseOption(currentOption)">
        {{ currentOption }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    options: Array
  },
  data() {
    return {

    }
  },
  methods: {
    chooseOption(option) {
      this.$emit('receivedOptionValue', option)
    }
  }
}
</script>

<style lang="scss" scoped>
$font: 'Open Sans', sans-serif;
</style>