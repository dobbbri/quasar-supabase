<template>
  <q-card
    class="my-card"
    bordered
    v-ripple:primary
  >
    <q-skeleton
      height="50px"
      v-if="load"
    />

    <q-card-section
      horizontal
      v-else
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

<script setup>
import { defineProps, ref, onMounted } from 'vue'
import { useApi, useAuthUser } from 'src/composables'

const count = ref(0)
const load = ref(true)
const { user } = useAuthUser()
const { getCount } = useApi()

const props = defineProps({
  table: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
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
