<template>
  <div
    ref="interactElement"
    :class="{ 'vue-interact': true, 'vue-interact-animated': isAnimating }"
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
  @Prop({ default: 15 }) maxRotation!: number;
  @Prop({ default: false }) lockXAxis!: Boolean;
  @Prop({ default: false }) lockYAxis!: Boolean;
  @Prop({ default: false }) lockSwipeDown!: Boolean;
  @Prop({ default: false }) lockSwipeLeft!: Boolean;
  @Prop({ default: false }) lockSwipeRight!: Boolean;
  @Prop({ default: false }) lockSwipeUp!: Boolean;
  @Prop({ default: 1000 }) outOfSightXCoordinate!: number;
  @Prop({ default: 1000 }) outOfSightYCoordinate!: number;
  @Prop({ default: 200 }) yThreshold!: number;
  @Prop({ default: 200 }) xThreshold!: number;
  @Prop({ required: false })
  item!: { id: string; name: string; visible: boolean };

  outOfSight: boolean = false;

  mounted() {
    const element = this.$refs.interactElement as Interact.Target;

    interact(element).draggable({
      onstart: this.onStart,  
      onmove: this.onMove,
      onend: this.onEnd,
    });

    this.$el.addEventListener("click", this.makeDoubleClick(), false);
  }

  beforeDestroy() {
    const element = this.$refs.interactElement as Interact.Target;
    interact(element).unset();
  }

  // ht: https://stackoverflow.com/a/46812691
  makeDoubleClick(doubleClickCallback?: any, singleClickCallback?: any) {
    var clicks = 0,
      timeout;
    const t = this;
    return function () {
      clicks++;
      if (clicks == 1) {
        singleClickCallback && singleClickCallback.apply(this, arguments);
        // console.log("single click");
        t.$emit("click");
        timeout = setTimeout(function () {
          clicks = 0;
        }, 400);
      } else {
        timeout && clearTimeout(timeout);
        // console.log("double click");
        t.$emit("doubleClick");
        doubleClickCallback && doubleClickCallback.apply(this, arguments);
        clicks = 0;
      }
    };
  }

  @Watch("item")
  itemChanged() {
    //console.log("item changed...");

    if (this.item.visible == false) {
      setTimeout(() => {
        //console.log("remove item");
        //console.log(this.outOfSightXCoordinate);
        this.outOfSight = true;
        this.$emit("outOfSight", this.item);
        this.dragged = false;
        //console.log(this.transformString);
        this.resetPosition();
        this.isAnimating = true;
        //console.log(this.opacityString);
        this.resetElement();
      }, 200);
    } else {
      //console.log("item visible is true");
    }
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
    if (this.isAnimating && !this.outOfSight) {
      return "transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    }
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
      this.resetPosition();
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
      this.resetPosition();
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
      this.resetPosition();
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
      this.resetPosition();
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

  resetElement() {
    const element = this.$refs.interactElement as Interact.Target;

    interact(element).draggable({
      onstart: this.onStart,
      onmove: this.onMove,
      onend: this.onEnd,
    });
  }

  resetPosition() {
    this.setPosition({ x: 0, y: 0, rotation: 0 });
  }

  onStart(event: Interact.InteractEvent): void {
    this.isAnimating = false;

    // Set the target z-index to a higher value than the last dropped element
    const zIndex = Math.ceil(new Date().getTime() / 1000).toString();

    (event.currentTarget as any).style.zIndex = zIndex;
  }

  onMove(event: Interact.InteractEvent) {
    this.outOfSight = false;
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

    const element = this.$refs.interactElement as any;
    const id = element.querySelector(".entity-wrapper")?.id;

    if (cardPositionX > xThreshold) {
      this.draggedRight();
      return { direction: "right", id };
    } else if (cardPositionX < -xThreshold) {
      this.draggedLeft();
      return { direction: "left", id };
    } else if (cardPositionY > yThreshold) {
      this.draggedDown();
      return { direction: "down", id };
    } else if (cardPositionY < -yThreshold) {
      this.draggedUp();
      return { direction: "up", id };
    } else this.resetPosition();
    return { direction: "none", id };
  }
}
</script>

<style scoped>
.transparent {
  opacity: 0.5;
}

.vue-interact {
  position: relative;
  touch-action: none;
  user-select: none;
}
</style>
