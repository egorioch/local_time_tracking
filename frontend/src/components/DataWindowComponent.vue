<!--
  Компонент, позволяющий выбрать дату из datalist
  данные, которые используются в качестве листа - массив дат(['2023-10-12', ...])
-->
<template>
  <div class="common-template">

    <div class="common-date-template">
      <div class="input-template">
        <input class="input-date" placeholder="" type="date" list="date-list" v-model="choosedValue">
        <datalist id="date-list">
          <option :value="item" v-for="(item, index) in date" :key="index">
          </option>
        </datalist>
        <button class="choose-date-button" @click="choosedValueMethod()">Поиск</button>

      </div>
      <div class="warning-message" v-if="warningMessage">
        {{ warningMessage }}
      </div>
    </div>

  </div>
</template>

<script>
const WARN_MES = "Нельзя выбрать эту дату!"

export default {
  props: {
    date: { type: Array }
  },
  data() {
    return {
      // date: ['2023-08-23', '2023-08-24', '2023-08-25', '2023-08-26'],
      choosedValue: '',
      warningMessage: ''
    }
  },
  watch: {

    choosedValue(newVal, oldVal) {
      console.log("newVal: " + newVal)

      if (!this.date.includes(newVal)) {
        this.warningMessage = WARN_MES;
      } else {
        this.warningMessage = '';
      }
    },
    date(newVal) {
      console.log('массив с новыми данными: ' + newVal);
    }
  },
  methods: {

    // Проверяем, соблюдены ли условия, если да - отправляем в родительский компонент
    choosedValueMethod() {
      if (this.warningMessage !== '' || this.choosedValue === '') {
        this.warningMessage = WARN_MES;
      } else {
        this.$emit("choosedvaluedate", this.choosedValue)
        this.warningMessage = '';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.common-template {
  display: flex;
  flex-direction: column;
  padding: 5px;
  justify-content: center;
  align-items: center;

  .common-date-template {
    display: flex;
    font-family: 'Courier New', Courier, monospace;
    margin: 5px;
    flex-direction: column;


    .input-template {
      display: flex;
      flex-direction: row;
      margin-bottom: 5px;


      .input-date {
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10vw 0 10vw;
      }


      .choose-date-button {
        font-size: 20px;
        font-family: 'Courier New', Courier, monospace;
        margin-left: 5px;
      }
    }


    .warning-message {
      color: red;
      font-size: 20px;
      font-family: 'Courier New', Courier, monospace;
    }
  }
}
</style>