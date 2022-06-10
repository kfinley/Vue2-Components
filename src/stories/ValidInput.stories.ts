import { Story } from '@storybook/vue/types-6-0';
import ValidInput from '../components/validation/valid-input.vue';
import Button from '@/components/buttons/button.vue';
import { ValidationObserver } from "vee-validate";

export default {
  title: 'Components/Inputs/Valid Input',
  component: ValidInput,
  parameters: {
    layout: 'centered'
  }
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ValidInput },
  template: '<valid-input v-bind="$props" v-model="model.email"/>'
});


export const Default = Template.bind({});
Default.args = {
  focus: "true",
  rules: 'email|required',
  placeholder: 'Enter email...',
  name: "email",
  model: {
    name: null,
    email: null
  }
};
