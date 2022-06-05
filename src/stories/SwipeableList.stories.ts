import { Story } from '@storybook/vue/types-6-0';
import SwipeableList from '@/components/swipeable-list.vue';


export default {
  title: 'Components/Controls/Swipeable',
  parameters: {
    layout: 'centered'
  }
};

var items = [
  {
    id: '778d377b-5810-4727-b890-30efd6a8c342',
    name: 'foo',
    visible: true
  },
  {
    id: '161ffd90-3684-499f-b166-c79bf9364105',
    name: 'bar',
    visible: true
  },
  {
    id: 'ebf1787c-1a7e-45fe-b7dc-19adc79bdd3d',
    name: 'goo',
    visible: true
  },
  {
    id: '6f64ed85-be44-4c52-b6c5-75731f06d72b',
    name: 'moo',
    visible: true
  },
  {
    id: '86e82992-2c28-4507-8142-1982909e4b8b',
    name: 'boo',
    visible: true
  },
  {
    id: 'c5fa66f4-ceb5-467e-aadf-881842a1e083',
    name: 'too',
    visible: true
  }
] as Array<{ id: string; name: string, visible: boolean }>;

const ListTemplate: Story = (args, { updateArgs }) => ({
  components: { SwipeableList },
  props: Object.keys(args),
  template:
    `<swipeable-list
      v-bind="$props"
      @draggedComplete="dragged"
      @outOfSight="out"
      >
    </swipeable-list>`,
  methods: {
    // Example of using an any type for the function
    dragged(args: { handleDragged: any, dragged: { direction: string, id: any } }) {
      items = args.handleDragged(items, args.dragged);
      updateArgs({ ...args, items });
    },

    out<T extends {
      id: string,
      name: string,
      visible: boolean
    }>(args: {
      outOfSightHandle: (i: Array<{
        id: string,
        name: string,
        visible: boolean
      }>, item: T
      ) => Array<T>, item: T
    }) {
      // handle item here then call func to remove the item
      items = args.outOfSightHandle(items, args.item);
      updateArgs({ ...args, items });
    }
  }
});


export const List = ListTemplate.bind({});
List.args = {
  items
};
