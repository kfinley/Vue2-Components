<template>
  <div class="notification-list">
    <div v-for="(note, index) in notifications" :key="index">
      <notification :type="note.type" :timed="note.timed">
        {{ note.message }}
      </notification>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Notification from './notification.vue';

@Component({
  components: {
    Notification
  }
})
export default class NotificationList extends Vue {

    @Prop({ required: true})
        notifications!: Array<string>;

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
