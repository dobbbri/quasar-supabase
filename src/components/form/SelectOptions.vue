<!-- todo -->
<!-- https://quasar.dev/vue-components/select#filtering-and-autocomplete -->
<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();

defineProps({
  options: { type: Array, required: true },
  showId: { type: Boolean, default: false }
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
        <q-item-section v-if="!showId">
          <q-item-label> {{ scope.opt.name }} </q-item-label>
        </q-item-section>
        <q-item-section v-else>
          <q-item-label class="text-weight-bold">{{ scope.opt.id }}</q-item-label>
          <q-item-label caption>{{ scope.opt.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
