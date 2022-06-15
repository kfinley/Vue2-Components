import { Story } from '@storybook/vue/types-6-0';
import TypeAhead from '../components/type-ahead.vue';
import { states } from '@/data';
import { numeric } from 'vee-validate/dist/rules';

export default {
  title: 'Components/Inputs/Type Ahead',
  component: TypeAhead,
  parameters: {
    layout: 'centered'
  }
};


const Template: Story = (args, { argTypes, updateArgs }) => ({
  props: Object.keys(argTypes),
  components: { TypeAhead },
  template: '<type-ahead v-bind="$props" @update="log" @select="handleSelect" />',
  methods: {
    log: (text) => console.log(text),
    handleSelect: (item: any) => {
      console.log(item);
      model.state = item;
      const value = model;
      updateArgs({ ...args, value});
      console.log('done select');
    }
  }
});

let model: Record<string, any> = {
  name: '',
  email: '',
  state: ''
};


export const Default = Template.bind({});
Default.args = {
  value: model,
  rules: 'required',
  placeholder: 'Type a state...',
  name: "state",
  queryPropertyName: "state", //TODO: rename prop...
  // onSelect: (item: any) => {
  //   console.log(item);
  //   model.name = item;
  // },
  items: Object.values(states),
};
