import { Story } from '@storybook/vue/types-6-0';
import NotificationList from "../components/notification-list.vue";

export default {
  title: 'Components/Controls/Notifications',
  component: NotificationList,
  argTypes: {
    notifications: {
      required: true
    }
  }
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    NotificationList
  },
  template: '<Notification-list v-bind="$props"/>'
});

export const List = Template.bind({});
List.args = {
  notifications: [
    {
      type: "error",
      message: "Error! Something went wrong.  :(",
      timed: false
    },
    {
      type: "success",
      message: "Success!!!",
      timed: false
    },
    {
      type: "warning",
      message: "This is an warning!!",
      timed: false
    },
  ]
};
