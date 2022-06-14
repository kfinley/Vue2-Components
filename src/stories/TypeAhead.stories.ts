import { Story } from '@storybook/vue/types-6-0';
import TypeAhead from '../components/type-ahead.vue';
import { states } from '@/data';

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
  template: '<type-ahead v-bind="$props" @update="log" v-model="model.state"/>',
  methods: {
    log: (text) => console.log(text)
  }
});

let model: Record<string, string> = {
  name: '',
  email: '',
  state: ''
};

function onSelect(item: string) {
  model.state = item;
}

export const Default = Template.bind({});
Default.args = {
  model,
  rules: 'required',
  placeholder: 'Type a state...',
  name: "state",
  onSelect,
  items: Object.values(states),
};
