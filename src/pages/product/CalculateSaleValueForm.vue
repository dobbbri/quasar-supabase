<script setup>
import { ref, watchEffect } from 'vue'
import { useProducts, useDefaults } from 'src/composables'

const { product, calcMarkup, calcPctMakup, calcProfit, calcPctProfit } = useProducts()
const { attr } = useDefaults()

const profit = ref(0)
const markup = ref(0)
const profitValue = ref(0)
const percentage = ref(0)
const costPrice = ref(parseFloat(product.value.cost_price))

percentage.value = 0

const toggle = ref('Margem...')
const toggleOptions = [
  { label: 'markup', value: 'Markup' },
  { label: 'margem de lucro', value: 'Margem...' }
]

watchEffect(() => {
  if (parseFloat(percentage.value) > 0 && costPrice.value > 0) {
    if (toggle.value == 'Markup') {
      product.value.unit_price = calcMarkup(costPrice.value, parseFloat(percentage.value))
    } else {
      product.value.unit_price = calcProfit(costPrice.value, parseFloat(percentage.value))
    }
  }
  product.value.cost_price = costPrice.value
  profitValue.value = product.value.unit_price - product.value.cost_price
  profit.value = calcPctProfit(product.value.unit_price, product.value.cost_price)
  markup.value = calcPctMakup(product.value.unit_price, product.value.cost_price)
  if (profit.value > 0 && parseFloat(percentage.value) == 0) {
    percentage.value = calcPctProfit(product.value.unit_price, product.value.cost_price)
  }
})
</script>

<template>
  <page>
    <page-header>
      <template #left>
        <btn-back :to="{ name: 'product-form' }" />
      </template>
      <template #title>Calcular preço de venda</template>
    </page-header>

    <page-body>
      <radio-options v-model="toggle" :options="toggleOptions" />

      <div class="line row q-gutter-x-md">
        <div class="col">
          <money-input v-model="costPrice" label="Preço de custo" />
        </div>
        <div class="col">
          <integer-input v-model="percentage" :label="`% ${toggle}`" />
        </div>
      </div>

      <div class="line row q-gutter-x-md">
        <div class="col">
          <money-input v-model="profitValue" label="Lucro bruto" tabindex="-1" />
        </div>
        <div class="col">
          <text-input
            v-if="toggle == 'Margem...'"
            v-model="markup"
            label="% Markup"
            tabindex="-1"
          />
          <text-input v-else v-model="profit" label="% Margem..." tabindex="-1" />
        </div>
      </div>

      <money-input v-model="product.unit_price" label="Preço de venda" tabindex="-1" />

      <br />
      <q-banner v-bind="attr.banner">
        <p><b>Entenda: Markup e Margem de Lucro</b></p>
        <p>
          <b>Markup</b> é o índice aplicado sobre o custo de um produto para chegar ao seu valor de
          venda. <br />Fórmula: <br />markup =
          <b>((Preço de venda – Preço de Custo) / Preço de Custo) x 100</b>
        </p>
        <p>
          <b>Margem de Lucro</b> é a porcentagem adicionada ao custo de um produto para definir o
          lucro das vendas. <br />
          Fórmula: <br />margem de lucro =
          <b>((Preço de venda – Preço de Custo ) / Preço de venda) x 100</b>
        </p>
      </q-banner>
    </page-body>
  </page>
</template>
