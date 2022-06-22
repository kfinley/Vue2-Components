import { Story } from '@storybook/vue/types-6-0';
import CountingNumber from '../components/counting-number.vue';

export default {
  title: 'Components/Controls/Counting Number',
  component: CountingNumber,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    number: {
      control: { type: 'range', max: 200, min: -200, step: 1 },
      meta_description: "The value for the number. The number will be counted down or up when the number changes."
    }
  }
};

const DefaultTemplate: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CountingNumber },
  template: '<counting-number v-bind="$props" style="font-family: \'Nunito Sans\'; font-size: 100px;"/>'
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  number: 10
};
