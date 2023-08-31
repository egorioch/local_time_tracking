<!--
  Компонент, позволяющий выбрать дату из datalist
  данные, которые используются в качестве листа - массив дат(['2023-10-12', ...])
-->
<template>
  <div class="common-template">
    <div class="common-template__date">
      <div class="datalist-container">
        <input :style="input_style" placeholder="" :type="inputType" list="date-list" v-model="choosedValue">
        <datalist id="date-list">
          <option :value="item" v-for="(item, index) in date" :key="index">
          </option>
        </datalist>
        <button class="datalist-container__choose-date-button" @click="choosedValueMethod()">Поиск</button>

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
    date: { type: Array },
    inputType: { type: String},
    input_style: { type: Object },
    warningMessageTemplate: { type: String, default: "Error!" }
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
        this.warningMessage = this.warningMessageTemplate;
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
        this.warningMessage = this.warningMessageTemplate;
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

  &__date {
    display: flex;
    // font-family: 'Courier New', Courier, monospace;
    margin: 5px;
    flex-direction: column;


    .datalist-container {
      display: flex;
      flex-direction: row;
      margin-bottom: 5px;
      border:1px solid grey;
      padding: 1px;
      border-radius: 5px;

      &__choose-date-button {
        font-size: 20px;
        // font-family: 'Courier New', Courier, monospace;
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


input {
  /* And hide the input's outline, so the form looks like the outline */
  border:none;
}

/* remove the input focus blue box, it will be in the wrong place. */
input:focus {
  outline: none;
}

/* Add the focus effect to the form so it contains the button */
form:focus-within { 
  outline: 1px solid blue 
}

button {
  /* Just a little styling to make it pretty */
  border:1px solid #47b784;
  background: #47b785;
  color:white;
}
</style>