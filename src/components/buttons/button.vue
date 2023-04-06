<template>
  <a
    class="btn clickable"
    :class="joinClasses"
    href="javascript:void(0);"
    @click.prevent="click"
  >
    <slot></slot>
  </a>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class Button extends Vue {
  @Prop({ required: false })
  classes!: Array<string>;

  @Prop({ required: false })
  link!: string;

  @Prop({ required: false, default: false })
  disabled: boolean;

  get joinClasses() {
    if (this.disabled) {
      this.classes?.push("btn--disabled");
      return this.classes?.join(" ");
    } else {
      return this.classes?.filter((c) => c !== "btn--disabled").join(" ");
    }
  }
  click() {
    if (!this.disabled) {
      this.$emit("click");
      if (this.link) {
        window.location.href = this.link;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/*
TODO: fix all the buttons so they don't retain pushed state on mobile. Look at grey-hover-fill as wip example.
*/
.btn--disabled {
  pointer-events: none;
  color: $color--disabled !important;

  &:hover {
    background-color: $color--primary;
    border-color: $color--primary;
    color: $color--disabled;
    text-shadow: none;
    &:after {
      background: $color--active;
      height: 450%;
    }
  }
}
.btn {
  transition: all 400ms ease;
  background-color: transparent;
  border-radius: $s * 0.5;
  border: 1px solid $color--active-text;
  background-clip: border-box;
  color: $color--active-text;
  display: inline-block;
  font-family: $font-family;
  font-size: 20px;
  font-weight: 700;
  overflow: hidden;
  outline: none;
  margin: 0 5px;
  // padding: 16px 22px; //TODO: prop this....
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  outline: none;
  box-shadow: none;

  &:link,
  &:visited {
    color: $color--active-text !important;
    background: transparent !important;
  }

  &:hover {
    background-color: $color--active-hover;
    color: $color--white;
  }

  // Calling active out separately with important so it shows when button is held down
  // if we combine these with above we get the background color state after clicked
  &:active {
    background-color: $color--active-hover !important;
    color: $color--white !important;
  }

  // Hover Fill
  &--hover-fill,
  &--hover-fill:link,
  &--hover-fill:visited {
    background-color: transparent;
    border-color: $color--active;
    color: $color--active;
  }
  &--hover-fill:hover {
    background-color: $color--active;
    color: $color--active-text;
  }

  // White
  &--white,
  &--white:link,
  &--white:visited {
    background-color: $color--white;
    border-color: $color--white;
    color: $color--active;
  }
  &--white:hover {
    background-color: rgba(255, 255, 255, 0.4);
    color: #000;
  }

  // Hover Display
  &--hover-display,
  &--hover-display:link,
  &--hover-display:visited {
    background-color: transparent;
    border-color: $color--white;
    color: $color--white;
  }
  &--hover-display:hover {
    background-color: rgba(255, 255, 255, 0.4);
    border-color: rgba(255, 255, 255, 0.4);
    color: $color--black;
  }

  // Grey Hover Fill
  &--grey-hover-fill,
  &--grey-hover-fill:link,
  &--grey-hover-fill:visited {
    background-color: transparent;
    background: $color--white !important;
    border-color: $color--grey !important;
    color: $color--grey !important;
  }
  &--grey-hover-fill:hover {
    background-color: $color--grey;
    color: $color--white;
  }
  &--grey-hover-fill:active {
    background-color: $color--grey !important;
    color: $color--white !important;
  }

  &--text,
  &--text:link,
  &--text:visited {
    border: none;
    background-color: transparent;
    color: $color--primary;
  }

  &--cancel,
  &--cancel:link,
  &--cancel:visited {
    border: none;
    background-color: transparent;
    color: $color--cancel;
    font-weight: 400;
  }
  &--cancel:hover {
    background-color: $color--cancel;
    color: $color--white;
  }

  &--delete,
  &--delete:link,
  &--delete:visited {
    border: none;
    background-color: transparent;
    color: $color--delete;
    font-weight: 400;
  }
  &--delete:hover {
    background-color: $color--delete;
    color: $color--white;
  }

  &--delete-solid,
  &--delete-solid:link,
  &--delete-solid:visited {
    border: 1px solid transparent;
    background-color: $color--delete;
    color: $color--white;
    font-weight: 400;
  }

  &--delete-solid:hover {
    background-color: transparent;
    border: 1px solid $color--delete;
    color: $color--delete;
    text-decoration: none;
  }

  &--wide {
    box-sizing: border-box;
    width: 100%;

    @include bp(min-width, $bp--xs-min) {
      min-width: 300px;
      width: auto;
    }

    &--200 {
      @include bp(min-width, $bp--xs-min) {
        min-width: 200px;
      }
    }
  }

  &--medium-width {
    @include bp(min-width, $bp--xs-min) {
      padding-left: 47px;
      padding-right: 47px;
    }
  }
}
</style>
