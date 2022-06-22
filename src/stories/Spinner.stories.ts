import { Story } from '@storybook/vue/types-6-0';
import Spinner from '../components/spinner.vue';

export default {
  title: 'Components/Controls/Spinners',
  component: Spinner,
  parameters: {
    layout: 'centered'
  }
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Spinner },
  template: '<spinner v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
  color: "darkblue"
};
