<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { OrderItemForm, OrderFooter } from 'src/components';
import { useOrders, useStore, useDefaults, useTools } from 'src/composables';

const router = useRouter();

const { temp } = useOrders();
const { state, isFromTabMenu } = useStore();
const { attr } = useDefaults();
const { confirm, notify } = useTools();

const title = ref('');
const itemList = ref([]);

const total = computed(() => {
  return itemList.value.reduce((total, product) => total + product.unit_price * product.amount, 0);
});

const handleBackTo = () => {
  if (state.value.from.form1) {
    if (temp.value.active == 'service') {
      temp.value.service.total = total;
    } else {
      temp.value.product.total = total;
    }
    router.push({ name: state.value.from.form1 });
  } else {
    router.push({ name: 'main-menu' });
  }
};

// const handleAddProduct = () => {
//   router.push({ name: 'product-form' });
// };

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
      <!-- <template #right> -->
      <!--   <btn-add @click="handleAddProduct()" /> -->
      <!-- </template> -->
      <template #subheader>
        <div class="q-px-md q-pt-md q-pb-sm bg-white">
          <q-btn
            v-bind="attr.btn.basic"
            label="Selecionar do catalogo"
            color="info"
            text-color="white"
            class="full-width"
            :to="{ name: 'order-item-select' }"
          />
        </div>
      </template>
    </page-header>

    <page-body>
      <!-- <waiting-load :showing="loading.value" /> -->

      <q-list style="margin: 0 -16px">
        <q-item v-for="(item, index) in itemList" :key="index">
          <q-item-section>
            <order-item-form :product="item" @remove="handleRemoveItem(index)" />
          </q-item-section>
        </q-item>
      </q-list>
    </page-body>

    <page-footer class="text-grey-9 bg-grey-4">
      <order-footer :label="`${title} subtotal:`" :total="total" />
    </page-footer>
  </page>
</template>
