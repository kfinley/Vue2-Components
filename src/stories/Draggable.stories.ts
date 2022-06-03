import { Story } from '@storybook/vue/types-6-0';
import Card from '@/components/card.vue';
import Draggable from '@/components/draggable.vue';

export default {
  title: 'Components/Controls/Draggable',
  parameters: {
    layout: 'centered'
  }
};

const DefaultTemplate: Story = (args, { argTypes }) => ({
  components: { Card, Draggable },
  props: Object.keys(args),
  template:
    `<draggable v-bind="$props">
        <card>
          <div class="text-center">
            <p>This is a Draggable Card</p>
            <p>Drag me around the page!</p>
          </div>
        </card>
    </draggable>`
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  maxRotation: "15"
};
