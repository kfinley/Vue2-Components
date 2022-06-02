<template>
  <div class="toggle-switch">
    <label>
      <input type="checkbox" :id="id" v-model="checkedValue" @change="toggle" />
      <span class="toggle"></span>
    </label>
  </div>
</template>

<script lang="ts">
/*

  TODO:

  - Add prop for showing red or white when off. Currently shows red
  
*/
import { Component, Vue, Prop, Emit, Watch} from "vue-property-decorator";

@Component({})
export default class Toggle extends Vue {
  @Prop({ required: true })
  checked!: boolean;

  @Prop({ required: true })
  id!: string;

  checkedValue = false;

  mounted() {
    this.checkedValue = this.checked;
  }

  @Watch('checked')
  updatedChecked() {
    this.checkedValue = this.checked;
  }

  @Emit('value-changed')
   toggle() {
     return {
       key: this.id,
       value: this.checked
     };
  }
}
</script>


<style lang="scss">
.toggle-switch {
  label {
    display: inline-block;
    height: 14px;
    position: relative;
    width: 34px;
  }

  label input {
    height: 0;
    opacity: 0;
    width: 0;
  }

  .toggle {
    background-color: $color--light-red;
    border-radius: 34px;
    bottom: 0;
    box-shadow: 0 0 1px $color--light-blue;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: ease 500ms;
    -webkit-transition: 500ms;
  }

  .toggle:before {
    background-color: $color--red;
    border-radius: 50%;
    bottom: -3px;
    box-shadow: 0 2px 3px $color--dark-red;
    content: "";
    height: 20px;
    left: -4px;
    position: absolute;
    transition: ease 500ms;
    -webkit-transition: 500ms;
    width: 20px;
  }

  input:checked + .toggle {
    background-color: $color--light-green;
  }

  input:checked + .toggle:before {
    box-shadow: 0 2px 3px $color--dark-green;
    background-color: $color--green;
    -webkit-transform: translateX(24px);
    -ms-transform: translateX(24px);
    transform: translateX(24px);
  }
}
</style>
