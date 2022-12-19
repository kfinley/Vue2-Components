import { Story } from '@storybook/vue/types-6-0';
import Card from '@/components/card.vue';
import Entity from '@/components/entity.vue';
import { action } from '@storybook/addon-actions';

// const dragged = (direction: string) => action(`dragged ${direction}`);

export default {
  title: 'Components/Controls/Entity',
  parameters: {
    layout: 'centered'
  }
};

const DefaultTemplate: Story = (args, { argTypes }) => ({
  components: { Card, Entity },
  props: Object.keys(args),
  template:
    `<entity v-bind="$props">
        <card>
          <slot name="header"><h3 style="text-align:center;">Entity Example</h3></slot>
          <div class="text-center">
            <p>Name: {{ entity.name }}</p>
            <p>Description: {{ entity.description }}</p>
          </div>
        </card>
    </entity>`
});

var entity = { id: 123, name: "Some Event", description: "The description of the event" }
export const Default = DefaultTemplate.bind({});
Default.args = {
  entity: entity,
};
