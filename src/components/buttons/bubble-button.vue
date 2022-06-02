<template>
  <span>
    <input
      type="radio"
      :value="value"
      :id="id"
      :checked="checkedValue"
    />
    <div class="button-container">
      <div class="button__outer" @click="toggle">
        <div class="button__inner"></div>
      </div>
    </div>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";

@Component({})
export default class BubbleButton extends Vue {

  @Prop({ required: true })
  id!: string;

  @Prop()
  value!: string;

  @Prop({ required: true })
  checked!: boolean;

  checkedValue = false;

  mounted() {
    this.checkedValue = this.checked;
  }

  @Watch("checked")
  updateChecked() {
    this.checkedValue = this.checked;
  }

  @Emit("value-changed")
  toggle() {
    this.checkedValue = !this.checkedValue;
    return this.checkedValue;
  }
}
</script>


<style lang="scss" scoped>
input[type="radio"] {
  display: none;
}

input[type="radio"]:checked + .button-container .button__outer {
  border: 2px solid $color--deep-blue;
}

input[type="radio"]:checked + .button-container .button__inner {
  transform: scale(1);
}

.button-container {
  margin-left: 30px;
  .button {
    &__outer {
      align-items: center;
      border: 2px solid $color--cool-black;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      height: 31px;
      position: relative;
      transition: ease 400ms;
      width: 30px;
      cursor: pointer;
      padding-top: 0.5px;
    }

    &__inner {
      background: $color--green;
      border-radius: 50%;
      height: 78%;
      transform: scale(0);
      transition: ease 400ms;
      width: 78%;
    }
  }
}
</style>
