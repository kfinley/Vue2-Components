import { Story } from '@storybook/vue/types-6-0';
import TypeAhead from '../components/type-ahead.vue';

export default {
  title: 'Components/Inputs/Type Ahead',
  component: TypeAhead,
  parameters: {
    layout: 'centered'
  }
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TypeAhead },
  template: '<type-ahead v-bind="$props" v-model="model.state"/>'
});

function onSelect(item: string){
  window.alert(item);
}
export const Default = Template.bind({});
Default.args = {
  rules: 'required',
  placeholder: 'Select a state...',
  name: "state",
  src: 'https://some.fake.url.com/states',
  onSelect,
  model: {
    name: null,
    email: null,
    state: null
  }
};
