import { Story } from '@storybook/vue/types-6-0';
import AnimatedNumber from '../components/animated-number.vue';

export default {
  title: 'Components/Animated/Number',
  component: AnimatedNumber,
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
  components: { AnimatedNumber },
  template: '<animated-number v-bind="$props" style="font-family: \'Nunito Sans\'; font-size: 100px;"></animated-number>'
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  number: 10
};
