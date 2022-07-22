<script setup>
import { Page, PageHeader, PageBody, ShortcutMenu } from 'src/components';
</script>

<template>
  <page class="q-pa-md q-pt-none">
    <q-form>
      <page-header>
        <template #title>Endless</template>
      </page-header>
      <page-body>
        <shortcut-menu />
      </page-body>
    </q-form>
  </page>
</template>
