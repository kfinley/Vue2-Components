<template>
  <transition name="modal">
    <div class="modal-mask" ref="modal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div>
            <i class="material-icons clickable" @click="close">close</i>
          </div>
          <div class="modal-header">
            <slot name="header" />
          </div>
          <div class="modal-body">
            <slot name="body" />
          </div>
          <div class="modal-footer">
            <slot name="footer" @close="close">
              <Button @click="close"> OK </Button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
//ht https://vuejs.org/v2/examples/modal.html
import { Component, Vue, Prop } from "vue-property-decorator";
import Button from "./buttons/button.vue";
import { removeStyleProperty, setAppHeight, setStyleProperty } from "../utils";

@Component({
  components: {
    Button,
  },
})
export default class Modal extends Vue {
  @Prop({ default: "60%" })
  width!: string;

  @Prop({ required: false })
  height!: string;

  mounted() {
    setAppHeight();

    setStyleProperty("--modal-width", this.width);
    if (this.height) {
      setStyleProperty("--modal-height", this.height);
      setStyleProperty("--modal-body-height", this.height);
    } else {
      removeStyleProperty("--modal-height");
    }

    const zIndex = Math.ceil(new Date().getTime() / 1000).toString();
    (this.$refs.modal as any).style.zIndex = zIndex;

    window.document.getElementsByTagName("main")[0].style.cssText =
      "overflow-y: hidden;height: 100vh;";

  }

  close() {
    window.document.getElementsByTagName("main")[0].removeAttribute("style");
    this.$emit("close");
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/modal.scss";
</style>
