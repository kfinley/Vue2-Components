import { Story } from '@storybook/vue/types-6-0';
import Notification from "../components/notification.vue";

export default {
  title: 'Components/Notifications',
  component: Notification,
  argTypes: {
    timed: {
      control: { type: "boolean" },
      required: true,
      meta_description: "Determines if the notification will clear itself after 5 seconds"
    },
    message: {
      control: { type: "text" },
      required: true,
      meta_description: "The message to be displayed"
    },
    type: {
      control: { type: "select" },
      options: ["alert", "error", "success"],
      required: true,
      meta_description: "The type of notification"
    }
  }
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { "notification": Notification },
  template: '<notification v-bind="$props">{{ message }}</notification>'
});

export const Success = Template.bind({});
Success.args = {
  timed: false,
  message: "This is a success notification!",
  type: "success"
};

export const Timed = Template.bind({});
Timed.args = {
  timed: true,
  message: "This message will close in 5 seconds!",
  type: "warning"
}
