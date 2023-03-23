<template>
  <div>
    <slot> </slot>
    <div v-if="!!this.$scopedSlots.expand">
      <slot name="expand"></slot>
      <div v-for="(prop, index) in Object.keys(entity)" :key="index">
        <div>{{ toSentence(prop) }}: {{ entity[prop] }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import BaseControl from "./base-control";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class Entity extends BaseControl {
  //TODO: refactor...
  @Prop() entity!: { id: string };
  @Prop() type!: string;

  //?
  element!: Element;

  setProperties() {
    const element = this.$el;
    element.classList.add("entity-wrapper");
   if (this.entity !== undefined) {
      element.id = this.entity.id;
      element.setAttribute("data-type", this.type);
    }
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
