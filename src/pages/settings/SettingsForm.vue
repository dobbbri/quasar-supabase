<script setup>
import { ref } from 'vue';
import { PageHeader } from 'src/components';

const form = ref({
  stock_is_automatic: false
});
</script>

<template>
  <q-page padding>
    <page-header>
      <template #title>Endless</template>
    </page-header>
    <q-list class="rounded-borders">
      <q-item
        dense
        tag="label"
      >
        <q-item-section>
          <q-item-label>Utilizar estoque automático</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle
            v-model="form.stock_is_automatic"
            val="picture"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>
