<template>
  <div class="notification-list">
    <div v-for="(note, index) in state.notifications" :key="index">
      <notification
        :type="note.type"
        :timed="note.timed"
        :message="note.message"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { NotificationState } from '../store';
import Notification from './notification.vue';
import { State } from "vuex-class";

@Component({
  components: {
    Notification
  }
})
export default class NotificationList extends Vue {
  @State("Notification") state!: NotificationState;
}
</script>

<style lang="scss" scoped>
.notification-list {
  min-width: 100px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 20;
}
</style>
