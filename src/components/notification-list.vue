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
import { Component, Vue } from "vue-property-decorator";
import { NotificationState } from "../store";
import Notification from "./notification.vue";
import { State } from "vuex-class";

@Component({
  components: {
    Notification,
  },
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
  width: 90%;
  left: 5%;
  z-index: 1000;
}
</style>
