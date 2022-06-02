import { Story } from '@storybook/vue/types-6-0';
import Notification from "../components/notification.vue";

export default {
  title: 'Components/Notifications',
  component: Notification,
  argTypes: {
    timed: {
      control: { type: "boolean" },
      required: true,
      meta_description: "Determines whether the notification will clear itself after 5 seconds"
    },
    message: {
      control: { type: "text" },
      required: true,
      meta_description: "The message to be displayed in the notification itself"
    },
    type: {
      control: { type: "select" },
      options: ["alert", "error", "success"],
      required: true,
      meta_description: "The type of notification to be displayed."
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { "notification": Notification },
  template: '<notification v-bind="$props">{{ message }}</notification>'
});

export const SuccessNotification = Template.bind({});
SuccessNotification.args = {
  timed: false,
  message: "This is a success notification!",
  type: "success"
};

export const TimedNotification = Template.bind({});
TimedNotification.args = {
  timed: true,
  message: "This alert message will disappear after 5 seconds!",
  type: "warning"
}
