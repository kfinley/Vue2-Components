import { Story } from '@storybook/vue/types-6-0';
import Button from '../components/buttons/button.vue';

export default {
  title: 'Components/Buttons/Button',
  component: Button,
  argTypes: {
    label: {
      type: { name: "string", required: true },
      control: "text"
    },
    classes: {
      control: { type: "inline-check" },
      options: [
        "btn--wide",
        "btn--hover-fill",
        "btn--white",
        "btn--white-hover-display",
        "btn--grey-hover-fill",
        "btn--text",
        "btn--cancel",
        "btn--delete",
        "btn--delete-solid",
        "btn--medium-width",
      ]
    },
    link: {
      type: { name: "string", required: false },
      control: "text"
    }
  },
  parameters: {
    layout: 'centered'
  }
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: `
    <Button v-bind="$props">{{ label }}</Button>`,
});

export const Default = Template.bind({});
Default.args = {
  label: "Submit",
  classes: []
}

export const Cancel = Template.bind({});
Cancel.args = {
  label: "Cancel",
  classes: ['btn--cancel'],
}

export const Delete = Template.bind({});
Delete.args = {
  label: "Delete",
  classes: ['btn--delete']
}

export const DeleteSolid = Template.bind({});
DeleteSolid.args = {
  label: "Delete Solid",
  classes: ['btn--delete-solid'],
}

export const HoverFill = Template.bind({});
HoverFill.args = {
  label: "Hover Fill",
  classes: ['btn--hover-fill']
}

export const HoverDisplay = Template.bind({});
HoverDisplay.args = {
  label: "White Hover Display",
  classes: ['btn--white-hover-display']
}

