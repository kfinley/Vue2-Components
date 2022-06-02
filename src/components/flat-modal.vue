<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div>
            <i class="material-icons clickable" @click="$emit('close')"
              >close</i
            >
          </div>
          <div class="modal-header">
            <slot name="header" />
          </div>
          <div class="modal-body">
            <slot name="body" />
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
//ht https://vuejs.org/v2/examples/modal.html
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class FlatModal extends Vue {
  name = "Modal";
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  // height: var(--app-height); //TODO: Fix this....
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 70%;
  // max-width: 300px;
  margin: 0px auto;
  padding: 15px 20px 0px 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  border-bottom: 0px;
}

.modal-container > div > i {
  float: right; // Float the close icon to the right
}

.modal-body {
  border-bottom: 0px;
}

.modal-footer {
  border-top: 0px;
}
.modal-default-button {
  text-align: center;
  text-decoration: none;
  font-size: 125%;
  font-family: sans-serif;
  white-space: nowrap;
  -webkit-font-smoothing: antialiased;
  color: #fff;
  background: #5366f9;
  display: inline-block;
  padding: 20px 65px;
  margin: 15px 0px;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
  border-width: 0px;
  box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.13),
    0 10px 14px 1px rgba(0, 0, 0, 0.13), 0 4px 18px 3px rgba(0, 0, 0, 0.13);
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
