<script setup>
import { defineProps, defineEmits } from 'vue'
import { formatCurrency } from 'src/utils/format'
import { openURL } from 'quasar'
import { UseApi } from 'src/composables'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  product: {
    type: Object
  }
})

const emit = defineEmits(['hideDialog'])

const msg = 'Olá, fiquei interressado no produto: '
const { brand } = UseApi()

const handleClose = () => {
  emit('hideDialog')
}

const handleSendWpp = () => {
  const link = encodeURI(
    `https://api.whatsapp.com/send?phone=55${brand.value.phone}&text=${msg} - ${
      props.product.name
    } - ${formatCurrency(props.product.price_to_sell)}`
  )
  openURL(link)
}
</script>

<template>
  <q-dialog
    :full-width="$q.platform.is.mobile"
    :model-value="show"
    @before-hide="handleClose"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">Details</div>
      </q-card-section>

      <q-card-section v-if="product.image_url">
        <q-img
          :src="product.image_url"
          :ratio="4 / 3"
          style="min-width: 300px"
        />
      </q-card-section>

      <q-card-section>
        <div class="text-h6">
          {{ product.name }}
        </div>
        <div class="text-subtitle2">
          {{ formatCurrency(product.price_to_sell) }}
        </div>
        <div
          class="text-body2"
          v-html="product.description"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Cancel"
          color="primary"
          outline
          v-close-popup
        />
        <q-btn
          v-if="brand.phone"
          label="Buy on whatsapp"
          icon="whatsapp"
          color="green-7"
          @click="handleSendWpp"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
