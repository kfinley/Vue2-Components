<template>
  <ul>
    <swipeable
      v-for="(item, index) in items"
      :key="index"
      :out-of-sight-x-coordinate="outOfSightXCoordinate"
      :out-of-sight-y-coordinate="outOfSightYCoordinate"
      :max-rotation="maxRotation"
      :x-threshold="xThreshold"
      :y-threshold="yThreshold"
      @draggedComplete="draggedComplete"
      @outOfSight="outOfSight"
      :item="item"
    >
      <slot>
        <li>
          <card showClose="false">
            <entity :entity="item"> {{ item.id }} : {{ item.name }} </entity>
          </card>
        </li>
      </slot>
    </swipeable>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue, Watch } from "vue-property-decorator";
import Swipeable from "./swipeable.vue";
import Entity from "./entity.vue";
import Card from "./card.vue";

@Component({
  components: {
    Swipeable,
    Entity,
    Card,
  },
})
export default class SwipeableList extends Vue {
  @Prop({ default: () => [] }) items!: Array<{
    id: string;
    name: string;
    visible: boolean;
  }>;
  @Prop({ default: 200 }) yThreshold!: number;
  @Prop({ default: 200 }) xThreshold!: number;
  @Prop({ default: 15 }) maxRotation!: number;
  @Prop({ default: 1000 }) outOfSightXCoordinate!: number;
  @Prop({ default: 1000 }) outOfSightYCoordinate!: number;

  @Emit("draggedComplete")
  draggedComplete(dragged: { direction: string; id: any }) {
    return { handleDragged: this.draggedFunc, dragged };
  }

  //TODO: can these funcs be combined?
  draggedFunc = (
    items: Array<{ id: string; name: string; visible: boolean }>,
    dragged: { direction: string; id: any }
  ) => {
    if (dragged.direction == "right" || dragged.direction == "left") {
      items = items.map((o) => {
        if (o.id === dragged.id) return { ...o, visible: false };
        return o;
      });
    }
    //console.log("updated items");
    //console.log(items);
    return items;
  };

  outOfSightFunc = (
    items: Array<{ id: string; name: string; visible: boolean }>,
    item: { id: string }
  ) => {
    //console.log("outOfSight");

    items = items.filter((i) => i.id != item.id);
    //console.log(items);
    return items;
  };

  @Emit("outOfSight")
  outOfSight(item: { id: string; name: string; visible: boolean }) {
    //console.log(`remove item id: ${item.id}`);
    return { outOfSightHandle: this.outOfSightFunc, item };
  }

  @Watch("items")
  refresh() {
    //console.log("items changed in list");
    //console.log(this.items);
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
</style>
