<template>
  <header
    style="position: absolute; top: 0; right: 0; left: 0"
    class="q-header q-layout__section--marginal"
  >
    <div class="q-toolbar row no-wrap items-center justify-between">
      <div>
        <slot name="buttons-left" />
      </div>
      <div class="page-header-title q-toolbar__title ellipsis text-h6">
        <slot name="title" />
      </div>
      <div>
        <slot name="buttons-right" />
      </div>
    </div>
  </header>
</template>
