<!-- 
  Компонент, содержащий в себе datalist + название
  Каждый компонент представляет собой кнопку
-->

<template>
  <div class="common-template">
    <button class="form-button">
      <div class="container">
        <div class="container__label"> {{ label }}</div>
        <datalist-component :date="date" :input-type="inputType" :input_style="input_style"
          :warning-message-template="warningMessageTemplate" @choosedvaluedate="choosedValueDate" />
      </div>
    </button>
  </div>
</template>

<script>
import DatalistComponent from '@/components/DatalistComponent.vue';

export default {
  components: {
    DatalistComponent
  },
  props: {
    label: {
      type: String,
      default: "header"
    },
    //данные, которые пойдут в datalist
    date: { type: Array },
    inputType: { type: String },
    input_style: { type: Object },
    warningMessageTemplate: { type: String, default: "Error!" }
  },
  methods: {
    choosedValueDate(choosedValue) {
      this.$emit("choosedvaluedate", choosedValue)
    }

  }
}
</script>

<style scoped>
.common-template {
  margin-top: 100px;
  width: 10%;
  display: flex;
  flex-direction: column;
}
button {
  padding: 10px;
}

</style>