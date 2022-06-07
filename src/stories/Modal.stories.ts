import { Story } from '@storybook/vue/types-6-0';
import Modal from '../components/modal.vue';
import FlatModal from '../components/flat-modal.vue';

export default {
  title: 'Components/Controls/Modals',
};

const DefaultTemplate: Story = (args, { argTypes }) => ({
  components: { Modal },
  props: Object.keys(args),
  template:
    `<modal v-bind="$props">
      <div slot="header"><h2>Header</h2></div>
      <div slot="body" class="text-center">
        <p>This is a test modal</p>
      </div>
    </modal>`
});

export const Default = DefaultTemplate.bind({});

const FlatTemplate: Story = (args, { argTypes }) => ({
  components: { FlatModal },
  props: Object.keys(args),
  template:
    `<flat-modal v-bind="$props">
      <div slot="header"><h2>Header</h2></div>
      <div slot="body" class="text-center">
        <p>This is a test modal</p>
      </div>
    </flat-modal>`
});

export const Flat = FlatTemplate.bind({});
