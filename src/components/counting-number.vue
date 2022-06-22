<template>
  <span>
    <slot name="pre"></slot>
    {{ current }}
    <slot name="post"></slot>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class CountingNumber extends Vue {
  @Prop({ default: 0 })
  number!: number;

  current = 0;
  interval!: number;

  mounted() {
    this.current = this.number ? this.number : 0;
  }

  @Watch("number")
  numberAnimator() {
    clearInterval(this.interval);

    if (this.number == this.current) return;

    const t = this;
    this.interval = window.setInterval(
      function () {
        if (t.current != t.number) {
          var i = (t.number - t.current) / 8; // Adjust to control speed. Lower = faster
          i = i >= 0 ? Math.ceil(i) : Math.floor(i);
          t.current = t.current + i;
        }
      }.bind(t),
      20
    );
  }
}
</script>
