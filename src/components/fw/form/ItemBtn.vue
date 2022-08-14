<script setup>
import { defineProps } from 'vue';
import { useDefaults, useTools } from 'src/composables';

defineProps({
  label: { type: String, required: true },
  type: { type: String, default: 'arrow' },
  total: { type: Number, default: 0 }
});

const { attr } = useDefaults();
const { fmt } = useTools();
</script>

<template>
  <q-item v-ripple v-bind="attr.input.arrow" tag="label" class="fully items-center">
    <q-item-section>
      <q-item-label class="full-width row">
        <div class="col">
          {{ label }}
        </div>
        <div v-if="total > 0" class="col q-pr-sm text-right">
          {{ fmt.currency(total) }}
        </div>
      </q-item-label>
    </q-item-section>
    <q-icon v-if="total > 0" size="sm" color="info" name="sym_o_arrow_forward_ios" />
    <q-icon
      v-if="total == 0"
      size="sm"
      color="white"
      style="border-radius: 50%"
      class="bg-info"
      name="sym_o_add"
    />
  </q-item>
</template>

<style lang="scss">
.fully {
  margin-top: 0;
  margin-left: -16px;
  margin-right: -16px;
}
</style>
