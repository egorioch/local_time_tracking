<template>
  <div v-for="element in paginatedArray">
    {{element}}
  </div>
  <div class="pagination-layer">
    <div class="buttons">
      <button class="back-button" v-if="currentPage > 0" @click="backButton()">Назад</button>
      <div class="current-page-value">{{ currentPage }}</div>
      <button class="forward-button" @click="forwardButton()">Вперёд</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rawArray: Array,
    paginatedValue: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      start: 0,
      end: 0,
      currentPage: 0,
      paginatedArray: []
    }
  },
  computed: {

  },
  methods: {
    backButton() {
      this.currentPage--;
    },
    forwardButton() {
      this.currentPage++;
    }
  },
  watch: {
    currentPage() {
      this.currentPage > 0 ? this.start = this.currentPage * this.paginatedValue : this.start = 0;
      this.currentPage * 6 > this.paginatedValue ? this.end = this.rawArray.length : this.start = 0;

      console.log("this.rawArray: " + this.rawArray)
      this.paginatedArray = this.rawArray.slice(this.start, this.end);
    }
  }
  

}
</script>

<style lang="scss" scoped>
$font: 'Open Sans', sans-serif;

.buttons {
  display: flex;
  align-items: flex-end;
  align-content: flex-end;
  margin: 2px;
  padding: auto;
}


</style>