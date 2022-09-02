<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { OrderFooter } from 'src/components'
import { useOrders, useTools, useStore } from 'src/composables'

const router = useRouter()

const { state, isFromTabMenu } = useStore()
const { loading, order, temp, addOrder, editOrder } = useOrders()
const { notify } = useTools()

const isEditMode = computed(() => (order.value && order.value.id ? true : false))

const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'))

const total = computed(() => {
  return temp.value.product.total + temp.value.service.total
})

const handleBackTo = () => {
  if (!isFromTabMenu.value) {
    router.push({ name: 'main-menu' })
  } else {
    router.push({ name: 'order-list' })
  }
}

const selectCustomer = () => {
  router.push({ name: 'customer-list' })
}

const handleSubmit = async () => {
  try {
    order.total = total
    order.product_total = temp.value.product.total
    order.service_total = temp.value.service.total
    if (isEditMode.value) {
      await editOrder(order.value)
    } else {
      await addOrder(order.value)
    }
    notify.success(`Pedido ${isEditMode.value ? 'alterado' : 'adicionado'}.`)
    router.push({ name: 'order-list' })
  } catch (error) {
    notify.error(`Erro ao ${title.value.toLowerCase()} o serviço.`, error)
  }
}

const handleListSelectedItems = (value) => {
  temp.value.active = value
  router.push({ name: 'order-item-list' })
}

onMounted(async () => {
  state.value.from.form1 = 'order-form'
})
</script>

<template>
  <page>
    <q-form @submit.prevent="handleSubmit">
      <page-header>
        <template #left>
          <btn-back v-if="!isFromTabMenu" @click="handleBackTo()" />
        </template>
        <template #title>{{ title }} Pedido</template>
        <template #right>
          <btn-save :loading="loading.value" type="submit" />
        </template>
      </page-header>

      <page-body>
        <expansion-item v-if="temp.order_id" :fake="true" label="Pedido">
          <div class="line row q-gutter-x-md">
            <div class="col">
              <text-input
                v-model="temp.order_id"
                label="Número"
                input-class="text-center no-pointer-events"
                readonly
              />
            </div>
            <div class="col">
              <text-input
                v-model="temp.created_at"
                label="Data"
                input-class="text-center no-pointer-events"
                readonly
              />
            </div>
          </div>
        </expansion-item>

        <select-input label="Cliente" :text="order.customerName" @focus="selectCustomer()" />
        <!-- <textarea-input v-model="order.reference" label="Sobre oque é o pedido" /> -->

        <!-- <expansion-item group="basic" default-opened label="Informações básica"> -->
        <!--   <date-input v-model:date="order.delivery_date" label="Data de entrega" /> -->
        <!--   <date-input v-model:date="order.budget_deadline" label="Validade do orçamento" /> -->
        <!--   <date-input v-model:date="order.deadline" label="Prazo de execução" /> -->
        <!-- </expansion-item> -->

        <expansion-item group="itens" default-opened label="Itens do pedido">
          <item-btn
            label="Serviços"
            type="plus"
            :total="temp.service.total"
            @click="handleListSelectedItems('service')"
          />
          <item-btn
            label="Produtos"
            type="plus"
            :total="temp.product.total"
            @click="handleListSelectedItems('product')"
          />
          <item-btn label="Desconto" type="plus" :to="{ name: 'measure-unit-form' }" />
        </expansion-item>

        <expansion-item group="details" default-opened label="Detalhes">
          <item-btn label="Condições de pagamento" type="plus" :to="{ name: 'measure-unit' }" />
          <item-btn label="Meios de pagamento" type="arrow" :to="{ name: 'measure-unit-form' }" />
          <item-btn label="Garantia" type="plus" :to="{ name: 'measure-unit-form' }" />
          <textarea-input v-model="order.comments" label="Informações adicionais" />
        </expansion-item>
        <!-- <br /> -->
        <!-- temp: {{ temp }} -->
        <!-- <br /> -->
        <!-- order: {{ order }} -->
        <!-- <br /> -->
        <!-- services: {{ serviceList }} -->
        <!-- <br /> -->
        <!-- products: {{ productList }} -->
      </page-body>

      <page-footer class="text-white bg-primary">
        <order-footer label="Total" :total="total" />
      </page-footer>
    </q-form>
  </page>
</template>
