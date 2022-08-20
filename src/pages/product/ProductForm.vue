<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useProducts, useTools, useData } from 'src/composables';

const router = useRouter();

const { measureUnits } = useData();
const { loading, product, addProduct, editProduct } = useProducts();
const { notify } = useTools();

const isEditMode = computed(() => (product.value && product.value.id ? true : false));

const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'));

const handleBackTo = () => {
  router.push({ name: 'product-list' });
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

        <select-options
          v-model="product.measure_unit"
          label="Unidade de medida"
          :options="measureUnits"
          :show-id="true"
          :option-disable="(opt) => (Object(opt) === opt ? opt.active === false : false)"
        />

        <expansion-item :fake="true" label="Preço">
          <div class="line row q-gutter-x-md">
            <div class="col">
              <money-input v-model="product.unit_price" label="Preço de venda" />
            </div>
            <div class="q-mt-auto">
              <btn-icon
                icon="sym_o_calculate"
                class="bg-info"
                tooltip="calcular preço de venda"
                :to="{ name: 'calculate-sale-value-form' }"
              />
            </div>
          </div>

          <money-input v-model="product.cost_price" label="Preço de custo" />
        </expansion-item>

        <expansion-item default-opened label="Outros Detalhes">
          <text-input v-model="product.brand" label="Marca" />

          <textarea-input v-model="product.details" label="Detalhes do produto" />

          <text-input v-model="product.code_bar" label="Código de barras" />
        </expansion-item>
      </page-body>
    </q-form>
  </page>
</template>
