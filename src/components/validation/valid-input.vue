<template>
  <validation-provider
    :name="name"
    :rules="rules"
    v-slot="{ errors }"
  >
    <input
      :name="name"
      :type="type"
      :autocomplete="autocomplete"
      :class="[css, { 'is-invalid': errors[0] }]"
      :placeholder="placeholder"
      :aria-label="placeholder"
      v-model="model"
      ref="element"
      :disabled="disabled"
      @keydown.down="$emit('down')"
      @keydown.up="$emit('up')"
      @keydown.enter.prevent="$emit('select')"
      @keydown.esc="$emit('reset')"
      v-on:focus="$emit('focus')"
      v-on:focusin="$emit('focusin')"
      v-on:focusout="$emit('focusout')"
    />
    <div v-show="errors[0]" class="invalid-feedback">
      {{ errors[0] }}
    </div>
  </validation-provider>
</template>

<script lang="ts">
import { Component, Vue, Ref, Prop, VModel } from "vue-property-decorator";
import { ValidationProvider } from "vee-validate";

@Component({
  components: {
    ValidationProvider,
  },
})
export default class ValidInput extends Vue {
  @Ref() readonly element!: HTMLInputElement;

  @VModel()
  model: any;

  @Prop()
  name: string;

  @Prop()
  rules: string;

  @Prop({ default: "passive" })
  mode!: string;

  @Prop({ default: "text" })
  type: string;

  @Prop()
  placeholder!: string;

  @Prop({ default: false })
  disabled!: boolean;

  @Prop({ default: false })
  focus!: boolean;

  @Prop({ default: '' })
  css!: string;

  @Prop({ default: 'off'})
  autocomplete!: "off" | "on";

  mounted() {
    if (this.focus) {
      (this.element as any).focus();
    }
  }
}
</script>

<style scoped>
  .input-group span {
    width: 100%;
  }
</style>
