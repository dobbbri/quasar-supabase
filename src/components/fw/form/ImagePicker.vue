<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  url: { type: String, default: '' }
})

const emit = defineEmits(['update:file'])

const file = ref(null)
const image = ref(props.url)

const updateThumbnail = () => {
  if (file.value) {
    image.value = URL.createObjectURL(file.value)
    emit('update:file', file.value)
  }
}
</script>

<template>
  <div>
    <q-img
      v-ripple
      class="img-size bg-white rounded-borders cursor-pointer q-uploader--bordered"
      :ratio="1"
      spinner-color="primary"
      spinner-size="82px"
      :src="image"
      @click="$refs.fileInput.pickFiles()"
    >
      <template #error>
        <div class="absolute-full flex flex-center bg-negative text-white">Erro!</div>
      </template>
    </q-img>
    <q-file
      ref="fileInput"
      v-model="file"
      class="hidden"
      accept="image/jpeg"
      max-files="1"
      @update:model-value="updateThumbnail"
    />
  </div>
</template>

<style lang="scss" scoped>
.img-size {
  width: 100%;
  height: 150px;
}
.q-img__content > div {
  padding: 8px;
  border-radius: 3px;
}
.label {
  font-weight: 700;
  font-size: 13px;
  margin: 10px 0 2px 8px;
}
</style>
