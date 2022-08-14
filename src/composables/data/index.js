import { ref } from 'vue';

const measureUnits = ref([
  { group: 'Unidade', id: 'un', name: 'unidades', active: true },
  { group: 'Área', id: 'm²', name: 'metros quadrados', active: true },
  { group: null, id: 'km²', name: 'kilometros quadrados', active: true },
  { group: 'Distância', id: 'mm', name: 'milimetros', active: true },
  { group: null, id: 'cm', name: 'centimetros', active: true },
  { group: null, id: 'm', name: 'metros', active: true },
  { group: null, id: 'km', name: 'kilomemetros', active: true },
  { group: 'Peso', id: 'g', name: 'gramas', active: true },
  { group: null, id: 'kg', name: 'kilogramas', active: true },
  { group: 'Tempo', id: 'min', name: 'minutos', active: true },
  { group: null, id: 'h', name: 'horas', active: true },
  { group: null, id: 'dias', name: 'dias', active: true },
  { group: null, id: 'semanas', name: 'semanas', active: true },
  { group: null, id: 'meses', name: 'meses', active: true },
  { group: 'Volume', id: 'ml', name: 'mililitros', active: true },
  { group: null, id: 'l', name: 'litro', active: true },
  { group: null, id: 'm³', name: 'metros cúbicos', active: true }
]);

const paymentMethods = ref([
  { name: 'Dinheiro', active: true },
  { name: 'Cartão de Crédito', active: true },
  { name: 'Cartão de Débito', active: true },
  { name: 'Pix', active: true },
  { name: 'Cheque', active: true },
  { name: 'Boleto', active: true },
  { name: 'Fiado', active: true },
  { name: 'Transf. bancária', active: true },
  { name: 'Outro', active: true }
]);

const orderStatuses = ref([
  { name: 'Pendente', active: true },
  { name: 'Aguardando Aprovação', active: true },
  { name: 'Aprovado', active: true },
  { name: 'Aguardando Pagamento', active: true },
  { name: 'Enviado', active: true },
  { name: 'Concluido', active: true },
  { name: 'Garantia', active: true },
  { name: 'Cancelado', active: true }
]);

const costCategories = ref([
  { name: 'Ajudantes', active: true },
  { name: 'Alimentação', active: true },
  { name: 'Aluguel', active: true },
  { name: 'Combustíveis', active: true },
  { name: 'Conta de luz', active: true },
  { name: 'Conta de água', active: true },
  { name: 'Ferramentas', active: true },
  { name: 'Funcionários', active: true },
  { name: 'Impostos', active: true },
  { name: 'Internet', active: true },
  { name: 'Matéria-prima', active: true },
  { name: 'Outros', active: true },
  { name: 'Produtos', active: true },
  { name: 'Retirada de lucro', active: true },
  { name: 'Taxas', active: true },
  { name: 'Telefone', active: true },
  { name: 'Transporte', active: true }
]);

const paymentConditions = ref([
  { name: 'À vista', active: true },
  { name: 'Sinal', active: true },
  { name: 'Parcelado', active: true }
]);

const personTypes = ref([
  { label: 'Pessoa Física', value: false },
  { label: 'Pessoa Juríca', value: true }
]);

const settingId = ref(0);

export default function useData() {
  const convertToObject = (source) => {
    let newTarget = [];
    for (var i = 0; i < source.length; i++) {
      const obj = source[i];
      newTarget.push(obj);
    }
    return newTarget;
  };

  const toJS = (value) => {
    return convertToObject(JSON.parse(value));
  };

  const toJSON = (value) => {
    return JSON.stringify(value);
  };

  return {
    settingId,
    measureUnits,
    orderStatuses,
    costCategories,
    paymentMethods,
    paymentConditions,
    personTypes,
    toJS,
    toJSON
  };
}
