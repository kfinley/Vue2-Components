import { Story } from '@storybook/vue/types-6-0';
import { Toggle, FatToggle, FlatToggle } from '@/components/index'

export default {
  title: 'Components/Buttons/Toggles',
  parameters: {
    layout: 'centered'
  }
};

const DefaultTemplate: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Toggle },
  template: '<toggle v-bind="$props" />'
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  id: "SomeProperty",
  checked: false
};

const FatTemplate: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FatToggle },
  template: '<fat-toggle v-bind="$props" />'
});

export const Fat = FatTemplate.bind({});
Fat.args = {
  id: "AnotherProperty",
  checked: false
};
const FlatTemplate: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FlatToggle },
  template: '<flat-toggle v-bind="$props" />'
});

export const Flat = FlatTemplate.bind({});
Flat.args = {
  id: "PropertyId",
  checked: false
};

