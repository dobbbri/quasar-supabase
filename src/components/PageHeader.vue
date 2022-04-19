<template>
  <q-header class="bg-transparent text-primary">
    <q-toolbar>
      <div>
        <slot name="buttons-left" />
      </div>
      <q-toolbar-title class="text-center">
        <slot name="title" />
      </q-toolbar-title>
      <div>
        <slot name="buttons-right" />
      </div>
    </q-toolbar>
  </q-header>
</template>
