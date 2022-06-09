<template>
  <transition name="modal" >
    <div class="modal-mask" ref="modal">
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
              <Button @click="$emit('close')"> OK </Button>
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
import Button from "./buttons/button.vue";

@Component({
  components: {
    Button,
  },
})
export default class Modal extends Vue {

  mounted() {

    const zIndex = Math.ceil(new Date().getTime() / 1000).toString();
    console.log(this.$refs.modal);
    (this.$refs.modal as any).style.zIndex = zIndex;
  }
}
</script>


<style lang="scss" scoped>
@import "./modal.scss";
</style>
