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

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: `
    <Button v-bind="$props">{{ label }}</Button>`,
});

export const Default = Template.bind({});
Default.args = {
  label: "Submit",
  classes: [],
  link: null,
  clickEvent: () => { }
}

export const Wide = Template.bind({});
Wide.args = {
  label: "Submit",
  classes: ["btn--wide"],
  link: null,
  clickEvent: () => { }
}

export const Cancel = Template.bind({});
Cancel.args = {
  label: "Cancel",
  classes: ['btn--cancel'],
  link: null,
  clickEvent: () => { }
}

export const Delete = Template.bind({});
Delete.args = {
  label: "Delete",
  classes: ['btn--delete'],
  link: null,
  clickEvent: () => { }
}

export const DeleteSolid = Template.bind({});
DeleteSolid.args = {
  label: "Delete Solid",
  classes: ['btn--delete-solid'],
  link: null,
  clickEvent: () => { }
}

export const HoverFill = Template.bind({});
HoverFill.args = {
  label: "Hover Fill",
  classes: ['btn--hover-fill'],
  link: null,
  clickEvent: () => { }
}

export const White = Template.bind({});
White.args = {
  label: "White",
  classes: ['btn--white'],
  link: null,
  clickEvent: () => { }
}

export const WhiteHoverDisplay = Template.bind({});
WhiteHoverDisplay.args = {
  label: "White Hover Display",
  classes: ['btn--white-hover-display'],
  link: null,
  clickEvent: () => { }
}

export const GreyHoverFill = Template.bind({});
GreyHoverFill.args = {
  label: "Grey Hover Fill",
  classes: ['btn--grey-hover-fill'],
  link: null,
  clickEvent: () => { }
}
