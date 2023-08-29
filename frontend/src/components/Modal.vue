<template>
  <transition name="fade">
    <div class="modal-backdrop">
      <div class="modal">

        <header class="modal-header">
          <slot name="header">
            <div class="header-label-class">
              <p class="header-label"> This is the default title! </p>
            </div>
          </slot>
          <button type="button" class="btn-close" @click="close">
            x
          </button>
        </header>

        <section class="modal-body">
          <slot name="body">
            This is the default body!
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
          </slot>
          <button type="button" class="btn-green-footer-button" @click="footerButton">
            Send
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  methods: {
    close() {
      this.$emit('close');
    },
    footerButton() {
      this.$emit('footerButtonClick')
    }
  },
};
</script>

<style lang="scss" scoped>
$font: 'Open Sans', sans-serif;

.modal-backdrop {
  font-family: $font;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 30%;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4AAE9B;
  justify-content: space-between;
  font-size: 22px;
  font-weight: bold;
}

.header-label {
  position: absolute;
  display: flex;
  align-items: center;
  text-align: center;
  margin: auto 0;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  display: flex;
  text-align: center;
  justify-content: center;
  padding: 10px 10px;
  /* width: 250px;
  height: 100px;  */
  align-items: center;
  flex-direction: column;
}


.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 25px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}

.btn-green-footer-button {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
  font-size: 20px;
  cursor: pointer;
}
</style>