<!-- todo -->
<!-- https://quasar.dev/vue-components/select#filtering-and-autocomplete -->
<script setup>
import { ref, defineProps } from 'vue'
import { useDefaults } from 'src/composables'
const { attr } = useDefaults()

const props = defineProps({
  options: { type: String, required: true }
})

const options = ref(props.options)

const filterFn = (val, update) => {
  update(() => {
    const needle = val.toLowerCase()
    options.value = props.options.filter((v) => v.toLowerCase().indexOf(needle) > -1)
  })
}
</script>

<template>
  <q-select
    v-bind="attr.input.basic"
    use-input
    hide-selected
    fill-input
    input-debounce="0"
    :options="options"
    @filter="filterFn"
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey"> No result </q-item-section>
      </q-item>
    </template>

    <template #option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label> {{ scope.opt.name }} </q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
