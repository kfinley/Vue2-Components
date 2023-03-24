<template>
  <transition name="slide-right" mode="out-in">
    <div class="notification" v-if="!loading && !isClosed">
      <div class="content-column">
        <div :class="['notification--message', determineNotificationClass]">
          {{ message }}
          <div class="notification--close" @click="close">
            <i class="material-icons">close</i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class Notification extends Vue {
  @Prop({ default: false })
  timed!: boolean;

  @Prop({ required: false, default: "alert" })
  type!: "alert" | "error" | "success";

  @Prop()
  message!: string;

  @Prop({ default: 5 })
  delay!: number;

  loading = true;
  isClosed = false;
  timedClose!: NodeJS.Timeout;

  created() {
    this.setupTimed();
  }

  mounted() {
    this.loading = false;
  }

  beforeDestroy() {
    // console.log("beforeDestroy");
    clearTimeout(this.timedClose);
  }

  @Watch("message")
  messageChanged() {
    // console.log("messageChanged");
    if (this.message != "") {
      this.setupTimed();
      this.isClosed = false;
    }
  }

  get determineNotificationClass() {
    return "notification--message--" + this.type;
  }

  close() {
    this.isClosed = true;
    this.$emit("notification-closed", "");
  }

  setupTimed() {
    if (this.timed) {
      // console.log("setupTimed");
      this.timedClose = setTimeout(this.close, this.delay * 1000);
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  font-family: $font-family;
  font-size: 15px;

  .content-column {
    padding-bottom: $s;
    padding-top: $s;
  }

  &--message {
    background-color: #888;
    border-radius: $border-radius * 1.5;
    color: $color--white;
    padding: $s * 0.5 $s * 4 $s * 0.5 $s;
    position: relative;
    text-align: center;

    &--warning {
      background-color: $notification--warning-color;
      color: $color--blue;
    }

    &--error {
      background-color: $notification--error-color;
    }

    &--success {
      background-color: $notification--success-color;
    }

    a {
      &:link,
      &:visited {
        color: white;
        font-weight: 700;
        text-decoration: none;
      }
    }
  }

  &--close {
    border-radius: $border-radius * 1.5;
    cursor: pointer;
    display: block;
    float: right;
    padding: $s * 0.5 6px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: background-color $transition--default-time ease-in-out;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    i {
      display: block;
      padding: 3px;
    }
  }
}
</style>
