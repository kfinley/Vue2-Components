<template>
  <!-- To Do: Split this into a draggable-entity component? -->
  <draggable
    :max-rotation="DraggableProps.maxRotation"
    :x-threshold="DraggableProps.xThreshold"
    :y-threshold="DraggableProps.yThreshold"
    :type="type"
  >
    <slot> </slot>
  </draggable>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import interact from "interactjs";
import Draggable from "./draggable.vue";
import Entity from './entity.vue';

@Component({
  components: {
    Draggable,
  },
})
export default class DraggableEntity extends Entity {
  @Prop() draggable!: boolean;
  @Prop({
    default: () => {
      return {
        maxRotation: 10,
        xThreshold: 50,
        yThreshold: 50,
      };
    },
  })
  DraggableProps!: {
    maxRotation: number;
    yThreshold: number;
    xThreshold: number;
  }; //refactor... DraggableProps
  @Prop() dropAccepts!: string;
  @Prop({ default: false }) droppable!: boolean;
  @Prop() dropHandler!: (event: Interact.InteractEvent) => {
    emit: boolean;
    move: boolean;
  };

  mounted() {
    //const element = super.mounted();

    if (this.droppable) {
      super.element.classList.add("entity-dropzone");

      interact(super.element as Interact.Target).dropzone({
        accept: this.dropAccepts,
        overlap: 0.5,
        ondrop: this.onDrop,
      });
    }
  }

  onDrop(event: Interact.InteractEvent) {
    const handle = this.dropHandler(event);
    if (handle.emit) {
      // interactjs isn't aware of Vue so 'this' is root context
      // so dig back down to the entity element
      const sourceId = (event as any).relatedTarget.id;
      const source = this.$root.$el.querySelector(
        this.cleanSelector(`#${sourceId}`)
      );

      // source is now the draggable element inside the entity
      // emitting on parent is correct here.
      (source as any).__vue__.$parent.$emit(
        "entity-dropped",
        event.target.getAttribute("data-type"),
        event.target.id
      );
    }
    if (handle.move !== undefined && handle.move) {
      // Create a temp element that will show the item until the EntitySet is reloaded.
      const relatedTarget = event.relatedTarget as any;
      const clone = relatedTarget.cloneNode(true);
      //interact(event.relatedTarget).unset();
      const list = (event.currentTarget as any).querySelector(".entity-list");
      event.currentTarget.classList.add();
      const listItem = document.createElement("li");

      listItem.classList.add("entity-list-item");
      clone.style.opacity = "";
      clone.style.transition = "";
      clone.style.transform = "";
      listItem.appendChild(clone);

      list.appendChild(listItem);
      relatedTarget.style.display = "none";

      // observe this list and remove the clone once the set is reloaded.
      //TODO: improve this. only remove if the new item added is the listItem.
      const removeClone = (mutations: MutationRecord[]) => listItem.remove();
      const observer = new MutationObserver(removeClone);
      observer.observe(list, { attributes: true, subtree: true });
    }
  }

  // Deal with number leading Ids
  // https://stackoverflow.com/a/61637142/2344354
  cleanSelector = function (selector: string) {
    (selector.match(/(#[0-9][^\s:,]*)/g) || []).forEach(function (n: any) {
      selector = selector.replace(n, '[id="' + n.replace("#", "") + '"]');
    });
    return selector;
  };
}
</script>
<style scoped>
</style>
