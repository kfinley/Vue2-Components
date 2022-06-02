<template>
  <span>
    <input
      :id="id"
      type="checkbox"
      v-model="checkedValue"
      style="display: inline-block; width: auto"
      class="toggle toggle-flat"
    />
    <label :for="id" data-on="Yes" data-off="No"></label>
  </span>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import Toggle from "./toggle.vue";

@Component({})
export default class FlatToggle extends Toggle {

}
</script>

<style lang="scss" scoped>
//TODO: Cleanup this css...

input.toggle {
  position: absolute;
  visibility: hidden;
}

input.toggle + label {
  display: block;
  position: relative;
  cursor: pointer;
  outline: none;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

input.toggle-flat,
input.toggle-flat + label:after {
  display: block;
  position: absolute;
  content: "";
}

input.toggle-flat + label {
  width: 100px;
  height: 30px;
  background-color: $color--light-red; //#bf2a23;
  -webkit-transition: background 0.5s;
  -moz-transition: background 0.5s;
  -o-transition: background 0.5s;
  transition: background 0.5s;
}

input.toggle-flat + label:before {
  top: 2px;
  left: 2px;
  bottom: 2px;
  right: 2px;
  -webkit-transition: background 0.5s;
  -moz-transition: background 0.5s;
  -o-transition: background 0.5s;
  transition: background 0.5s;
}

input.toggle-flat + label:after {
  top: 4px;
  left: 4px;
  bottom: 4px;
  width: 45px;
  background-color: $color--white; //#fff;
  -webkit-transition: margin 0.5s, background 0.5s;
  -moz-transition: margin 0.5s, background 0.5s;
  -o-transition: margin 0.5s, background 0.5s;
  transition: margin 0.5s, background 0.5s;
}

input.toggle-flat:checked + label {
  background-color: $color--medium-light-green; // #00c176;
}

input.toggle-flat:checked + label:after {
  margin-left: 47px;
  background-color: $color--white; //#fff;
}

select,
input.toggle-flat + label {
  //TODO: variable this dude...
  box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.05),
    0 10px 14px 1px rgba(0, 0, 0, 0.05), 0 4px 18px 3px rgba(0, 0, 0, 0.05);
}
</style>
