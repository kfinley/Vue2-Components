import { Story } from '@storybook/vue/types-6-0';
import Card from '@/components/card.vue';
import Swipeable from '@/components/swipeable.vue';
import { action } from '@storybook/addon-actions';

const dragged = (direction: string) => action(`dragged ${direction}`);

export default {
  title: 'Components/Controls/Swipeable',
  parameters: {
    layout: 'centered'
  }
};

const DefaultTemplate: Story = (args, { argTypes }) => ({
  components: { Card, Swipeable },
  props: Object.keys(args),
  template:
    `<swipeable
      :out-of-sight-x-coordinate="500"
      :out-of-sight-y-coordinate="500"
      :max-rotation="15"
      :x-threshold="50"
      :y-threshold="50"
      v-bind="$props"
      >
        <card>
          <div class="text-center">
            <p>This is a swipeable Card</p>
            <p>Swipe me right, left, up, or down.</p>
          </div>
        </card>
    </swipeable>`
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  draggedComplete: dragged,
};
