<template>
  <span>
    <label
      class="bubble-button"
      :for="id"
      :class="checkedValue ? 'bubble-button__checked' : ''"
      @click="toggle"
    >
      <div>
        <div class="title">{{ title }}</div>
        <span class="text">{{ text }}</span>
      </div>
      <bubble-button
        :value="value"
        :id="id"
        :checked="checkedValue"
        @value-changed="toggle"
      />
    </label>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import BubbleButton from "./bubble-button.vue";

@Component({
  components: {
    BubbleButton,
  },
})
export default class BubbleButtonBanner extends Vue {

  @Prop({ required: true })
  id!: string;

  @Prop()
  value!: string;

  @Prop({ required: true })
  checked!: boolean;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  text!: String;

  checkedValue = false;

  mounted() {
    this.checkedValue = this.checked;
  }

  @Watch("checked")
  updateChecked() {
    this.checkedValue = this.checked;
  }

  toggle() {
    this.checkedValue = !this.checkedValue;
  }
}
</script>

<style lang="scss" scoped>
label.bubble-button {
  align-items: center;
  background: $color--grey95;
  border: 1px solid transparent;
  border-radius: 5px;
  display: flex;
  font-family: "Nunito Sans";
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 9px 20px;
  transition: ease 400ms;

  .title {
    font-size: 18px;
  }

  .text {
    color: #666;
    font-size: 14px;
  }

  &.bubble-button__checked {
    border: 1px solid $color--bold-green;
    background: $color--transparent-green;
  }
}
</style>
