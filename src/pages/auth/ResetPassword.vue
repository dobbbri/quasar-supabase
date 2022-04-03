<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthUser, useNotify } from 'src/composables'

const router = useRouter()
const route = useRoute()
const { resetPassword } = useAuthUser()
const { notifyError, notifySuccess } = useNotify()

const token = route.query.token
const password = ref('')

const handlePasswordReset = async () => {
  try {
    await resetPassword(token, password.value)
    notifySuccess('Senha alterada')
    router.push({ name: 'login' })
  } catch (error) {
    notifyError(error.message)
  }
}
</script>

<template>
  <q-page padding>
    <q-form
      class="row justify-center"
      @submit.prevent="handlePasswordReset"
    >
      <p class="col-12 text-h5 text-center">Reset Password</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="New Password"
          v-model="password"
          lazy-rules
          :rules="[(val) => (val && val.length >= 6) || 'Password is required']"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Gravar"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
