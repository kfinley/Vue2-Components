<template>
  <span>
    <slot name="prefix"></slot>
    {{ currentNumber }}
    <slot name="postfix"></slot>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class AnimatedNumber extends Vue {

  @Prop({ default: 0})
  number!: number;

  currentNumber = 0;
  interval!: number;

  mounted() {
    this.currentNumber = this.number ? this.number : 0;
  }

  @Watch("number")
  numberAnimator(n: number, o: number) {
    clearInterval(this.interval);

    if (this.number == this.currentNumber)
      return;

    const t = this;
    this.interval = window.setInterval(function(){
      if (t.currentNumber != t.number) {
        var i = (t.number - t.currentNumber) / 8; // Adjust to control speed. Lower = faster
        i = i >= 0 ? Math.ceil(i) : Math.floor(i);
        t.currentNumber = t.currentNumber + i;
      }
    }.bind(t), 20);
  }
}
</script>
