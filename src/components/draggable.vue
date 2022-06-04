<template>
  <div
    ref="interactElement"
    :class="draggableClasses"
    :style="{
      transform: transformString,
      transition: transitionString,
      opacity: opacityString,
      position: 'relative',
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

export interface DraggableProps {
  maxRotation: number;
  yThreshold: number;
  xThreshold: number;
}

/*
  TODO: Fix the rotation on drag. It's still pivoting around center.
*/
@Component
export default class Draggable extends Vue implements DraggableProps {
  @Prop({ default: 0 }) maxRotation!: number;
  @Prop({ default: 200 }) yThreshold!: number;
  @Prop({ default: 200 }) xThreshold!: number;
  @Prop({ default: "" }) type!: string;

  isDraggable = true;
  dragged = false;
  position: InteractPosition = {
    x: 0,
    y: 0,
    rotation: 0,
  };

  mounted() {
    const element = this.$refs.interactElement as Interact.Target;

    interact(element).draggable({
      autoScroll: true,
      onstart: this.onStart,
      onmove: this.onMove,
      onend: this.onEnd,
    });
  }

  get transformString() {
    if (!this.isDraggable || this.dragged) {
      const { x, y, rotation } = this.position;
      const transform = `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      // console.log(transform);
      return transform;
    }
    return "";
  }

  get transitionString() {
    if (this.isDraggable)
      return "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    return "";
  }

  get opacityString() {
    if (!this.isDraggable) return ".69";
    return "1";
  }

  get draggableClasses() {
    //TODO: look into this....

    const classes = { draggable: this.isDraggable, item: "true" };
    (classes as any)[`${this.type.toLowerCase()}-entity`] = true;
    return classes;
  }

  setPosition(coordinates: InteractPosition) {
    this.position = coordinates;

    // console.log(`setPosition ${this.position}`);
    // console.log(
    //   `${this.position.x} ${this.position.y} ${this.position.rotation}`
    // );
  }

  resetPosition() {
    this.setPosition({ x: 0, y: 0, rotation: 0 });
  }

  onStart(event: Interact.InteractEvent): void {
    this.isDraggable = false;
    // Set the target z-index to a higher value than the last dropped element
    event.target.style.zIndex = Math.ceil(
      new Date().getTime() / 1000
    ).toString();
  }

  onMove(event: Interact.InteractEvent) {
    // works but very clunky
    const x = (this.position.x || 0) + event.dx;
    const y = (this.position.y || 0) + event.dy;

    const calc = ((x - this.position.x) / this.xThreshold) * 25;

    let rotation = this.maxRotation * calc;

    // let moving = "none";
    // if (x < this.position.x) {
    //   moving = "left";
    // } else if (x > this.lastXPosition) {
    //   moving = "right";
    // }
    // console.log(
    //   `moving ${moving}
    //     lastX: ${this.lastXPosition.toFixed(2)}
    //     x: ${x.toFixed(2)}
    //     position.x: ${this.position.x.toFixed(2)}
    //     calc: ${calc.toFixed(2)}
    //     rotation: ${rotation.toFixed(2)}`
    // );

    if (rotation > this.maxRotation) rotation = this.maxRotation;
    else if (rotation < -this.maxRotation) rotation = -this.maxRotation;

    this.setPosition({ x, y, rotation });
  }

  lastXPosition = 0;

  onEnd(event: Interact.InteractEvent) {
    console.log("onEnd");

    const x = (this.position.x || 0) + event.dx;
    const y = (this.position.y || 0) + event.dy;

    this.lastXPosition = x;

    this.isDraggable = true;
    this.dragged = true;
    this.setPosition({ x, y, rotation: 0 });
  }
}
</script>

<style scoped>
.item {
  touch-action: none;
  user-select: none;
}
</style>
