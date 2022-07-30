<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();

defineProps({
  date: {
    type: [String, Number],
    required: true
  }
});

const emit = defineEmits(['update:date']);

const myLocale = ref({
  /* starting with Sunday */
  days: 'Domingo_Segunda-feira_Terça-Feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
  daysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
  months:
    'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembr_Outubro_Novembro_Dezembro'.split(
      '_'
    ),
  monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
  firstDayOfWeek: 0, // 0-6, 0 - Sunday, 1 Monday, ...
  format24h: true,
  pluralDay: 'dias'
});

const isValidDate = (date) => {
  if (date) {
    const temp = date.split('/');
    // const d = new Date(temp[2] + '/' + temp[1] + '/' + temp[0]);
    // ISO standard YYYY-MM-DD
    const d = new Date(temp[2], temp[1] - 1, temp[0]);
    return (
      d &&
      d.getDate() === Number(temp[0]) &&
      d.getMonth() + 1 === Number(temp[1]) &&
      d.getFullYear() === Number(temp[2])
    );
  }
};
// Quasar.utils.date.formatDate(new Date(), 'DD.MM.YYYY')
</script>

<template>
  <q-input
    clearable
    v-bind="attr.input.basic"
    mask="##/##/####"
    error-message="Data inválida!"
    :rules="[isValidDate]"
    :model-value="date"
    @update:model-value="(value) => emit('update:date', value)"
  >
    <template #append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
          <q-date
            mask="DD/MM/YYYY"
            minimal
            :locale="myLocale"
            :model-value="date"
            @input="$refs.qDateProxy.hide()"
            @update:model-value="(value) => emit('update:date', value)"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Fechar" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>
