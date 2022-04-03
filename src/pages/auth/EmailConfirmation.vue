<template>
  <q-page padding>
    <p class="text-body1">Obrigado por se registrar.</p>
    <p class="text-body1">
      Para finalizar o registro, foi enviado um email de confirmação para
      <strong>{{ $route.query.email }}</strong>
    </p>
    <div class="row justify-center">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-btn
          label="Fechar"
          color="dark"
          class="full-width"
          rounded
          :to="{ name: 'login' }"
        />
      </div>
    </div>
  </q-page>
</template>
