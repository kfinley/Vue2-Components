import { Story } from '@storybook/vue/types-6-0';
import Card from '@/components/card.vue';
import DraggableEntity from '@/components/draggable-entity.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Controls/Entity',
  parameters: {
    layout: 'centered'
  }
};

const DraggableTemplate: Story = (args, { argTypes }) => ({
  components: { Card, DraggableEntity },
  props: Object.keys(args),
  template:
    `<draggable-entity v-bind="$props">
        <card>
          <slot name="header"><h3 style="text-align:center;">Draggable Entity Example</h3></slot>
          <div class="text-center">
            <p>Name: {{ entity.name }}</p>
            <p>Description: {{ entity.description }}</p>
          </div>
        </card>
    </draggable-entity>`
});

var entity = { id: 123, name: "Draggable Event", description: "This event is draggable!!" }
export const Draggable = DraggableTemplate.bind({});
Draggable.args = {
  entity: entity,
};
