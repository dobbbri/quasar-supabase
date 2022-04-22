<template>
  <q-header class="bg-transparent text-primary">
    <q-toolbar class="justify-between">
      <div>
        <slot name="left" />
      </div>
      <q-toolbar-title class="absolute-center">
        <slot name="title" />
      </q-toolbar-title>
      <div>
        <slot name="right" />
      </div>
    </q-toolbar>
  </q-header>
</template>
