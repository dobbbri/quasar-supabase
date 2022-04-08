<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCategories, useNotify } from 'src/composables'

const router = useRouter()
const route = useRoute()
const { loading, getCategory, addCategory, editCategory } = useCategories()
const { notify } = useNotify()

const isUpdate = computed(() => (route.params.id ? true : false))
const title = computed(() => (isUpdate.value ? 'Alterar' : 'Adicionar'))

const form = ref({
  name: '',
  inactive: false
})

const handleSubmit = async () => {
  try {
    if (isUpdate.value) {
      await editCategory(form.value)
    } else {
      await addCategory(form.value)
    }
    notify.success(`Categoria ${isUpdate.value ? 'alterada' : 'adicionada'}.`)
    router.push({ name: 'category-list' })
  } catch (error) {
    notify.error(`Erro ao ${title.value.toLowerCase()} a categoria.`, error)
  }
}

const handleGetCategory = async () => {
  try {
    form.value = await getCategory(route.params.id, 'id, name, inactive')
  } catch (error) {
    notify.error('Erro ao obter a categoria.', error)
  }
}

onMounted(() => {
  if (isUpdate.value) handleGetCategory()
})
</script>

<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">{{ title + ' categoria' }}</p>
      </div>

      <q-form
        class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md"
        @submit.prevent="handleSubmit"
      >
        <q-input
          label="Name"
          v-model="form.name"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <q-checkbox
          label="desativado"
          v-model="form.inactive"
        />

        <q-btn
          label="Gravar"
          color="primary"
          class="full-width"
          rounded
          :loading="isUpdate ? loading.edit.value : loading.add.value"
          :disable="loading.disable.value"
          type="submit"
        />

        <q-btn
          label="Cancel"
          color="primary"
          class="full-width"
          rounded
          flat
          :disable="loading.disable.value"
          :to="{ name: 'category-list' }"
        />
      </q-form>
    </div>
  </q-page>
</template>
