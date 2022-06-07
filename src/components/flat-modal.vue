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
              <button
                class="modal-default-button clickable"
                @click="$emit('close')"
              >
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
import Component from "vue-class-component";
import Modal from "./modal.vue";

@Component
export default class FlatModal extends Modal {}
</script>

<style lang="scss" scoped>
@import "./modal.scss";

// Override default modal css to make the window more flat
.modal-container {
  border-radius: 2px;
}

.modal-mask {
  transition: opacity 0.3s ease;
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
</style>
