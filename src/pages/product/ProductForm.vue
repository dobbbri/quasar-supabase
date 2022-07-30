<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useProducts, useTools, useActive, useData } from 'src/composables';

const router = useRouter();

const { measureUnits } = useData();
const { active, fromTabMenu } = useActive();
const { loading, product, addProduct, editProduct } = useProducts();
const { notify } = useTools();

const price_profit = ref(0);
const price_markup = ref(0);

watch(
  () => (product.value.unit_price, product.value.cost_price),
  () => {
    let profit = 0;
    let markup = 0;
    const unit_price = parseFloat(product.value.unit_price);
    const cost_price = parseFloat(product.value.cost_price);
    if (unit_price > 0 && cost_price > 0) {
      profit = ((unit_price - cost_price) / unit_price) * 100;
      markup = ((unit_price - cost_price) / cost_price) * 100;
    }
    price_profit.value = Math.round(profit) + '%';
    price_markup.value = Math.round(markup) + '%';
  }
);

const isEditMode = computed(() => (product.value && product.value.id ? true : false));

const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'));

const handleBackTo = () => {
  if (active.value.from1Form) {
    router.push({ name: active.value.from1Form });
  } else if (fromTabMenu.value) {
    router.push({ name: 'product-list' });
  } else {
    router.push({ name: active.value.fromMenu });
  }
};

const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await editProduct(product.value);
    } else {
      await addProduct(product.value);
    }
    notify.success(`Produto ${isEditMode.value ? 'alterado' : 'adicionado'}.`);
    router.push({ name: 'product-list' });
  } catch (error) {
    notify.error(`Erro ao ${title.value.toLowerCase()} o produto.`, error);
  }
};
</script>

<template>
  <page>
    <q-form @submit.prevent="handleSubmit">
      <page-header>
        <template #left>
          <btn-back @click="handleBackTo()" />
        </template>
        <template #title>{{ title }} Produto</template>
        <template #right>
          <btn-save :loading="loading.value" type="submit" />
        </template>
      </page-header>

      <page-body>
        <text-input
          v-model="product.name"
          label="Nome do produto"
          :rules="[(val) => !!val]"
          error-message="O nome do produto deve ser informado!"
        />

        <expansion-item :fake="true" label="Preço">
          <money-input
            v-model="product.unit_price"
            label="Preço de venda"
            :rules="[(val) => Number(val.replaceAll('.', '').replaceAll(',', '.')) > 0]"
            error-message="O preço de venda do produto deve ser informado"
          />

          <select-options
            v-model="product.measure_unit"
            label="Unidade de medida"
            :options="measureUnits"
            :show-id="true"
            :option-disable="(opt) => (Object(opt) === opt ? opt.active === false : false)"
            :rules="[(val) => !!val]"
            error-message="Uma unidade de medida deve ser selecionada"
          />
        </expansion-item>

        <expansion-item default-opened label="Custo e Lucro">
          <money-input v-model="product.cost_price" label="Preço de custo" />
          <div class="line row q-gutter-x-md">
            <div class="col">
              <text-input
                v-model="price_profit"
                label="lucro"
                input-class="text-center no-pointer-events"
                readonly
              />
            </div>
            <div class="col">
              <text-input
                v-model="price_markup"
                label="Markup"
                input-class="text-center no-pointer-events"
                readonly
              />
            </div>
          </div>
        </expansion-item>

        <expansion-item label="Outros Detalhes">
          <text-input v-model="product.brand" label="Marca" />

          <textarea-input v-model="product.details" label="Detalhes do produto" />

          <!-- <text-input v-model="product.code_bar" label="Código de barras" /> -->
        </expansion-item>
      </page-body>
    </q-form>
  </page>
</template>
