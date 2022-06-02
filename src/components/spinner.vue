<template>
  <div :style="applyColorOverride"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class Spinner extends Vue {

  @Prop({ default: "#008A00", required: false })
  color!: string;

  get applyColorOverride() {
    return {
      borderLeftColor: this.color,
      borderRightColor: this.color,
      borderBottomColor: this.color,
    };
  }
}
</script>

<style lang="scss" scoped>
div {
  width: 50px;
  height: 50px;
  border: 4px solid;
  border-top: 4px solid transparent;
  border-radius: 50%;
  transition-property: transform;
  animation-name: rotate;
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

#html-para {
  position: absolute;
  top: 100px;
  width: 40%;
  padding: 5%;
  text-align: center;
}
</style>
