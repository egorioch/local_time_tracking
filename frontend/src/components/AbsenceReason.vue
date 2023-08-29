<template>
  <div id="app">
    <button type="button" class="btn" @click="showModal">
      Причина отсутствия
    </button>

    <transition name="fade">


      <Modal v-show="isModalVisible" @close="closeModal" @footerButtonClick="sendReason">
        <template #header>
          <div>
            Причина отсутствия
          </div>

        </template>

        <template #body>
          <div class="reasons-options-layer">
            <select v-model="selectedReason">
              <option v-for="option in arrayOfReasons" :value="option">

                {{ option }}
              </option>
            </select>
          </div>
          <div class="reason-textarea-layer">
            <div class="reason-textarea-text">
              <textarea v-model="reasonData" placeholder="описание" />
            </div>
          </div>
          <div class="validation">
            <div v-if="v$.selectedReason.$error">Выберите причину!</div>
            <div v-if="v$.reasonData.$error">Добавьте описание!</div>
          </div>
        </template>

      </Modal>
    </transition>
  </div>
</template>
  
<script>
import Modal from '@/components/Modal.vue';
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import {
  sendEmployeeReasonToServer,
  getAbsenceReasons
} from '@/scripts/server'

export default {
  components: {
    Modal,
  },
  data() {
    return {
      v$: useVuelidate(),
      isModalVisible: false,
      reasonData: '',
      selectedReason: '',
      arrayOfReasons: null,
      optionReasonNotSelected: false,
    };
  },

  validations() {
    return {
      reasonData: { required },
      selectedReason: { required }
    }
  },

  mounted() {
    (async () => {
      this.arrayOfReasons = await getAbsenceReasons();
    })();
  },

  methods: {
    showModal() {
      this.reasonData = '';
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async sendReason() {
      //to server code

      this.arrayOfReasons = await getAbsenceReasons();
      console.log("selectedReason: " + this.selectedReason)

      this.v$.$validate() // checks all inputs
      // const reasonObject = {в
      //   "reason": this.reason,
      //   "reasonData": this.reasonData
      //   
      // }
      // sendEmployeeReasonToServer(reasonObject);

      if (!this.v$.selectedReason.$error && !this.v$.reasonData.$error) {
        this.isModalVisible = false;
      }

    },

  }
};
</script>

<style lang="scss" scoped>
$font: 'Open Sans', sans-serif;

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter-active {
  transition: all .3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.reasons-options-layer {
  margin-bottom: 10px;
}

select {
  border: 2px solid #4AAE9B;
  font-size: 13px;
}

.reason-textarea-layer {
  margin: 5px;
  width: 100%;
  height: 100%;
}

textarea {
  resize: none;
  width: 100%;
  height: 200px;
  /* overflow: hidden; */
  box-sizing: border-box;
  font-size: 16px;

}

textarea::placeholder {
  font-size: 16px;
  padding-left: 10px;
  font-style: italic;
}

textarea::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
}

textarea::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #494848;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-border-radius: 7px;
  -moz-border-radius: 5px;
  /* -ms-border-radius: 10px; */
  -o-border-radius: 10px;
}

.boxsizingBorder {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.validation {
  color: red;
  font-size: 18px;
}

button {
  background-color: #a1f8d1;
  border-radius: 5px;
  border-color: #57cf99;
  font-family: $font;
  font-size: 20px;
}
</style>
