<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';

defineProps({
  label: { type: String, required: true },
  type: { type: String, default: 'arrow' }
});

const { attr } = useDefaults();
</script>

<template>
  <q-item v-ripple v-bind="attr.input.arrow" tag="label" class="fully">
    <q-item-section>
      <q-item-label class="text-weight-medium">{{ label }}</q-item-label>
    </q-item-section>
    <q-item-section avatar>
      <q-icon v-if="type == 'arrow'" size="sm" color="info" name="sym_o_arrow_forward_ios" />
      <q-icon
        v-if="type == 'plus'"
        size="sm"
        color="white"
        style="border-radius: 50%"
        class="bg-info"
        name="sym_o_add"
      />
    </q-item-section>
  </q-item>
</template>

<style lang="scss">
.fully {
  margin-top: 0;
  margin-left: -16px;
  margin-right: -16px;
}
</style>
