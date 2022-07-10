<script setup>
import { Page, PageHeader, PageBody, BtnBig } from 'src/components';
import { useMenuStore } from 'src/stores/menuStore';

const store = useMenuStore();
</script>

<template>
  <page class="q-pa-md q-pt-none">
    <q-form>
      <page-header>
        <template #title>Endless</template>
      </page-header>
      <page-body style="margin-top: -16px">
        <div v-for="(group, idx1) in store.menuPage" :key="idx1" class="row q-gutter-sm">
          <div class="col-12 title-expansion text-primary q-pt-sm">{{ group.name }}</div>
          <btn-big
            v-for="(btn, idx2) in group.btns"
            :key="idx2"
            :item="btn"
            :to="{ name: btn.routeName, params: { backTo: 'index' } }"
            exact
            style="min-width: 44%"
            class="col"
          />
        </div>
      </page-body>
    </q-form>
  </page>
</template>
