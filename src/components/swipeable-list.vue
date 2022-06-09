<template>
  <div class="list">
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <swipeable
          :out-of-sight-x-coordinate="outOfSightXCoordinate"
          :out-of-sight-y-coordinate="outOfSightYCoordinate"
          :max-rotation="maxRotation"
          :x-threshold="xThreshold"
          :y-threshold="yThreshold"
          :blockDragDown="true"
          :blockDragUp="true"
          @draggedComplete="draggedComplete"
          @outOfSight="outOfSight"
          :item="item"
          @doubleClick="doubleClicked(item)"
        >
          <div v-if="hasSlot('card')" class="card-slot">
            <card showClose="false">
              <entity :entity="item">
                <slot name="card" :entity="item"></slot>
              </entity>
            </card>
          </div>
          <div v-else>
            <slot>
              <card showClose="false">
                <entity :entity="item">
                  ID: {{ item.id }} <br />
                  Name: {{ item.name }}
                </entity>
              </card>
            </slot>
          </div>
        </swipeable>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue, Watch } from "vue-property-decorator";
import Swipeable from "./swipeable.vue";
import Entity from "./entity.vue";
import Card from "./card.vue";
import { setAppHeight, setAppWidth } from "../utils";

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
  @Prop({ default: "75%" })
  maxWidth!: string;

  @Emit("doubleClicked")
  doubleClicked(entity) {
    console.log("doubleClicked");
    console.log(entity);
    return entity;
  }

  mounted() {

    //TODO: refactor...
    setAppHeight();
    setAppWidth();

    this.setMaxWidth();
    this.setItemWidth();
  }

  //TODO: refactor this.. We'll have more than on item type on a page that may need this set.
  setMaxWidth() {
    document.documentElement.style.setProperty("--max-width", this.maxWidth);
  }

  //TODO: refactor this.. We'll have more than on item type on a page that may need this set.
  setItemWidth() {
    const maxWidthAsPixels =
      window.innerWidth * (Number(this.maxWidth.replace("%", "")) * 0.01);
    const itemWidthAsPixels = maxWidthAsPixels - maxWidthAsPixels * 0.2;
    document.documentElement.style.setProperty(
      "--item-width",
      `${itemWidthAsPixels.toFixed(0).toString()}px`
    );
  }

  hasSlot(name = "default") {
    //console.log(this.$scopedSlots);
    return !!this.$slots[name] || !!this.$scopedSlots[name];
  }

  @Emit("draggedComplete")
  draggedComplete(dragged: { direction: string; id: any }) {
    return { handleDragged: this.draggedFunc, dragged };
  }

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
.list {
  display: flex;
  justify-content: center;
}

ul {
  list-style: none;
  padding: 0;
  max-width: var(--max-width);
}

.card-slot {
  width: var(--item-width);
}
</style>
