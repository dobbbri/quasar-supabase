<!-- todo -->
<!-- https://quasar.dev/vue-components/select#filtering-and-autocomplete -->
<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();

defineProps({
  options: { type: Array, required: true },
  useTemplate: { type: Number, default: 1 }
});
</script>

<template>
  <q-select
    v-bind="attr.input.basic"
    :options="options"
    option-value="id"
    option-label="name"
    emit-value
    map-options
  >
    <template #option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section v-if="useTemplate == 1">
          <q-item-label :class="{ 'text-negative text-strike': !scope.opt.active }">
            {{ scope.opt.name }}
          </q-item-label>
        </q-item-section>
        <q-item-section v-else>
          <q-item-label class="text-weight-bold">{{ scope.opt.id }}</q-item-label>
          <q-item-label style="magin-top: -3px">{{ scope.opt.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
