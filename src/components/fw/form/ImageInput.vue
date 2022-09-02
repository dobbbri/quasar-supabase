<script setup>
import { ref } from 'vue'

const newImage = ref(null)
const image = ref(null)
const file = ref(null)

const handleSelectImage = () => file.value.pickFiles()
// const handleSubmit = async () => {
//     if (image.value) {
//       if (form.value.image_name) {
//         await editProductImage(form.value.image_name, image.value);
//       } else {
//         const filePath = await addProductImage(productFolder, image.value);
//         form.value.image_name = filePath;
//       }
//     }

// const handleGetProduct = async () => {
// if (form.value.image_name) {
//   newImage.value = getProductImageURL(form.value.image_name) + '?t=' + new Date().getTime();
// }

const loadImage = () => {
  if (image.value) {
    newImage.value = URL.createObjectURL(image.value)
  }
}
</script>

<template>
  <q-file
    ref="file"
    v-model="image"
    class="hidden"
    accept="image/*"
    @update:model-value="loadImage()"
  />
  <div
    style="max-height: 200px; max-width: 200px; border: 1px solid rgba(0, 0, 0, 0.3)"
    class="rounded-borders"
  >
    <q-img
      loading="lazy"
      :src="newImage"
      fit="cover"
      style="max-height: 200px; max-width: 200px"
      class="rounded-borders overflow-hidden"
      spinner-color="primary"
    >
      <div class="absolute-bottom">
        <q-btn
          flat
          no-wrap
          class="full-width q-pa-xs"
          icon="sym_o_add_circle"
          label="Adicionar Imagem"
          @click="handleSelectImage()"
        />
      </div>
    </q-img>
  </div>
</template>
