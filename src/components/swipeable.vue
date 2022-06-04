<template>
  <div
    ref="interactElement"
    :class="{ 'vue-interact-animated': isAnimating }"
    :style="{
      transform: transformString,
      transition: transitionString,
      opacity: opacityString,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit, Watch } from "vue-property-decorator";
import interact from "interactjs";

export interface InteractPosition {
  x: number;
  y: number;
  rotation: number;
}

@Component
export default class Swipeable extends Vue {

  isAnimating: Boolean = true;
  dragged: Boolean = false;
  position: InteractPosition = {
    x: 0,
    y: 0,
    rotation: 0,
  };

  @Prop({ default: false }) blockDragDown!: Boolean;
  @Prop({ default: false }) blockDragLeft!: Boolean;
  @Prop({ default: false }) blockDragRight!: Boolean;
  @Prop({ default: false }) blockDragUp!: Boolean;
  @Prop({ default: 0 }) maxRotation!: number;
  @Prop({ default: false }) lockXAxis!: Boolean;
  @Prop({ default: false }) lockYAxis!: Boolean;
  @Prop({ default: false }) lockSwipeDown!: Boolean;
  @Prop({ default: false }) lockSwipeLeft!: Boolean;
  @Prop({ default: false }) lockSwipeRight!: Boolean;
  @Prop({ default: false }) lockSwipeUp!: Boolean;
  @Prop({ default: 500 }) outOfSightXCoordinate!: number;
  @Prop({ default: 1000 }) outOfSightYCoordinate!: number;
  @Prop({ default: 200 }) yThreshold!: number;
  @Prop({ default: 200 }) xThreshold!: number;

  mounted() {

    const element = this.$refs.interactElement as Interact.Target;

    interact(element).draggable({
      onstart: this.onStart,
      onmove: this.onMove,
      onend: this.onEnd,
    });
  }

  beforeDestroy() {
    const element = this.$refs.interactElement as Interact.Target;
    interact(element).unset();
  }

  // computed:
  get transformString() {
    if (!this.isAnimating || this.dragged) {
      const { x, y, rotation } = this.position;
      return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
    }

    return null;
  }

  get transitionString() {
    if (this.isAnimating)
      return "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    return null;
  }

  get opacityString() {
    if (!this.isAnimating) return ".69"; // ;^)
    return "1";
  }

  // methods
  @Emit("draggedDownComplete")
  draggedDown() {
    if (this.blockDragDown) {
      this.resetCardPosition();
      return;
    }
    this.unsetElement();
    this.setPosition({
      x: 0,
      y: this.outOfSightYCoordinate,
      rotation: 0,
    });
    console.log("draggedDown");
  }

  @Emit("draggedLeftComplete")
  draggedLeft() {
    if (this.blockDragLeft) {
      this.resetCardPosition();
      return;
    }
    this.unsetElement();
    this.setPosition({
      x: -this.outOfSightXCoordinate,
      y: 0,
      rotation: -this.maxRotation,
    });
    console.log("draggedLeft");
  }

  @Emit("draggedRightComplete")
  draggedRight() {
    if (this.blockDragRight) {
      this.resetCardPosition();
      return;
    }
    this.unsetElement();
    this.setPosition({
      x: this.outOfSightXCoordinate,
      y: 0,
      rotation: this.maxRotation,
    });
    console.log("draggedRight");
  }

  @Emit("draggedUpComplete")
  draggedUp() {
    if (this.blockDragUp) {
      this.resetCardPosition();
      return;
    }
    this.unsetElement();
    this.setPosition({
      x: 0,
      y: -this.outOfSightYCoordinate,
      rotation: 0,
    });
    console.log("draggedUp");
  }

  setPosition(coordinates: InteractPosition) {
    this.position = coordinates;
  }

  unsetElement() {
    const element = this.$refs.interactElement as Interact.Target;
    if (element !== undefined) {
      interact(element).unset();
    }
    this.dragged = true;
  }

  resetCardPosition() {
    this.setPosition({ x: 0, y: 0, rotation: 0 });
  }

  onStart(event: Interact.InteractEvent): void {
    this.isAnimating = false;
  }

  onMove(event: Interact.InteractEvent) {
    let x = 0;
    let y = 0;

    if (this.lockSwipeLeft && event.dx < 0) x = 0;
    else if (this.lockSwipeRight && event.dx > 0) x = 0;
    else x = this.lockXAxis ? 0 : (this.position.x || 0) + event.dx;

    if (this.lockSwipeUp && event.dy < 0) y = 0;
    else if (this.lockSwipeDown && event.dy > 0) y = 0;
    else y = this.lockYAxis ? 0 : (this.position.y || 0) + event.dy;

    let rotation = this.maxRotation * (x / this.xThreshold);

    if (rotation > this.maxRotation) rotation = this.maxRotation;
    else if (rotation < -this.maxRotation) rotation = -this.maxRotation;

    this.setPosition({ x, y, rotation });
  }

  @Emit("draggedComplete")
  onEnd(event: Interact.InteractEvent) {
    const { x: cardPositionX, y: cardPositionY } = this.position;
    const { xThreshold, yThreshold } = this;
    this.isAnimating = true;

    if (cardPositionX > xThreshold) {
      this.draggedRight();
      return "right";
    } else if (cardPositionX < -xThreshold) {
      this.draggedLeft();
      return "left";
    } else if (cardPositionY > yThreshold) {
      this.draggedDown();
      return "down";
    } else if (cardPositionY < -yThreshold) {
      this.draggedUp();
      return "up";
    } else this.resetCardPosition();
  }
}
</script>

<style scoped>
.transparent {
  opacity: 0.5;
}
</style>