<script lang="ts">
import { Component } from "vue-property-decorator";
import Toggle from "./toggle.vue";

@Component({
  components: { Toggle },
})
export default class FatToggle extends Toggle {}
</script>

<style lang="scss" scoped>
.toggle-switch {
  align-items: center;
  display: flex;
  margin-left: 15px;

  label {
    height: 30px;
    width: 50px;
  }

  .toggle {
    left: -1px;
  }

  .toggle:before {
    bottom: 2px;
    height: 27px;
    left: 0px;
    width: 27px;
  }
}
</style>
