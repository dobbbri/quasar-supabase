<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { OrderItemForm } from 'src/components';
import { useOrders, useStore, useDefaults, useTools } from 'src/composables';

const router = useRouter();

const { temp } = useOrders();
const { state, isFromTabMenu } = useStore();
const { attr } = useDefaults();
const { confirm, notify } = useTools();

const title = ref('');
const itemList = ref([]);

const handleBackTo = () => {
  if (state.value.from.form1) {
    router.push({ name: state.value.from.form1 });
  } else {
    router.push({ name: 'main-menu' });
  }
};

const handleAddProduct = () => {
  router.push({ name: 'product-form' });
};

const handleRemoveItem = (index) => {
  try {
    const item = itemList.value[index];
    confirm.delete(`o ${title.value} ${item.name}`).onOk(async () => {
      itemList.value.splice(index, 1);
      notify.success(`${title.value} excluido.`);
    });
  } catch (error) {
    notify.error(`Erro ao excluir o ${title.value}`, error);
  }
};

onMounted(async () => {
  if (temp.value.active == 'service') {
    title.value = 'servicos';
    itemList.value = temp.value.service.list;
  } else {
    title.value = 'produtos';
    itemList.value = temp.value.product.list;
  }
  state.value.from.form2 = 'order-item-list';
});
</script>

<template>
  <page>
    <page-header>
      <template #left>
        <btn-back v-if="!isFromTabMenu" @click="handleBackTo" />
      </template>
      <template #title>Adicionar {{ title }}</template>
      <template #right>
        <btn-add @click="handleAddProduct()" />
      </template>
    </page-header>

    <page-body>
      <q-btn
        v-bind="attr.btn.basic"
        label="Selecionar do catalogo"
        color="info"
        text-color="white"
        class="full-width"
        :to="{ name: 'order-item-select' }"
      />

      <!-- <waiting-load :showing="loading.value" /> -->

      <q-list style="margin: 0 -16px">
        <q-item v-for="(product, index) in itemList" :key="index">
          <q-item-section>
            <order-item-form :product="product" @remove="handleRemoveItem(index)" />
          </q-item-section>
        </q-item>
      </q-list>
    </page-body>
  </page>
</template>
