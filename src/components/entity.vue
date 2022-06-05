<template>
  <div>
    <slot> </slot>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class Entity extends Vue {
  @Prop() entity!: { id: string };
  @Prop() type!: string; //TODO: move this to type
  element!: Element;

  setProperties() {
    const element = this.$el;
    element.classList.add("entity-wrapper");
    element.id = this.entity.id;
    element.setAttribute("data-type", this.type);
  }

  mounted() {
    this.setProperties();
  }

  @Watch("entity")
  entityChanged() {
    this.setProperties();
  }
}
</script>
<style scoped>
</style>
