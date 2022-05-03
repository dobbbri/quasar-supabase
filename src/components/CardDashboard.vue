<script setup>
import { defineProps, ref, onMounted } from 'vue'
import { useApi, useAuth } from 'src/composables'

const count = ref(0)
const load = ref(true)
const { user } = useAuth()
const { getCount } = useApi()

const props = defineProps({
  table: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    required: false,
    default: 'database-outline'
  }
})

onMounted(async () => {
  const response = await getCount(props.table, user.value.id)
  count.value = response.count
  load.value = false
})
</script>

<template>
  <q-card
    v-ripple:primary
    class="my-card"
    bordered
  >
    <q-skeleton
      v-if="load"
      height="50px"
    />

    <q-card-section
      v-else
      horizontal
    >
      <div class="col flex flex-center text-h5">{{ count }} - {{ label }}</div>

      <q-card-actions
        vertical
        class="justify-around q-px-md"
      >
        <q-btn
          flat
          round
          color="primary"
          :icon="icon"
        />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>
