<template>
  <div class="notification-list">
    <div v-for="(note, index) in state.notifications" :key="index">
      <notification
        :type="note.type"
        :timed="note.timed"
        :message="note.message"
        @notification-closed="closed"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { NotificationState } from "../store";
import Notification from "./notification.vue";
import { State } from "vuex-class";
import { notificationModule } from "@finley/vue2-components/src/store";

@Component({
  components: {
    Notification,
  },
})
export default class NotificationList extends Vue {
  @State("Notification") state!: NotificationState;

  closed(message: string) {
    notificationModule.dismiss(
      this.state.notifications.findIndex((n) => n.message == message)
    );
  }
}
</script>

<style lang="scss" scoped>
.notification-list {
  min-width: 100px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  width: 90%;
  left: 5%;
  z-index: 1000;
}
</style>
