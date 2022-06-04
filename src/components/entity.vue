<template>
  <div>
    <slot> </slot>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";

@Component({})
export default class Entity extends Vue {
  @Prop() entity!: { id: string };
  @Prop() type!: string;
  element!: Element;

  mounted() {
    const element = this.$el;
    element.classList.add("entity-wrapper");
    element.id = this.entity.id;
    element.setAttribute("data-type", this.type);
  }
}
</script>
<style scoped>
</style>
