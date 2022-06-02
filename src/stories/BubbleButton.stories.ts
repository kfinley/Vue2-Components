import { Story } from '@storybook/vue/types-6-0';
import BubbleButton from '../components/buttons/bubble-button.vue';
import BubbleButtonBanner from '../components/buttons/bubble-button-banner.vue';

export default {
  title: 'Components/Buttons/Bubble',
  parameters: {
    layout: 'centered'
  }
};

const DefaultTemplate: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BubbleButton },
  template: '<bubble-button v-bind="$props" />'
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  id: "foo",
  value: "bar",
  checked: true
}

const BannerTemplate: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BubbleButtonBanner },
  template: `<bubble-button-banner v-bind="$props" />`
});

export const Banner = BannerTemplate.bind({});
Banner.parameters = {
  layout: "padded"
};
Banner.args = {
  id: "bar",
  value: "foo",
  checked: false,
  title: "Banner Title",
  text: "Banner text content",
}
