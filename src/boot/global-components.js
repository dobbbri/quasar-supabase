import { defineAsyncComponent } from 'vue';
import { boot } from 'quasar/wrappers';

const globalComponents = {
  page: () => import('components/fw/page/Page.vue'),
  'page-header': () => import('components/fw/page/PageHeader.vue'),
  'page-body': () => import('components/fw/page/PageBody.vue'),
  'page-footer': () => import('components/fw/page/PageFooter.vue'),

  'text-input': () => import('components/fw/form/TextInput.vue'),
  'money-input': () => import('components/fw/form/MoneyInput.vue'),
  'integer-input': () => import('components/fw/form/IntegerInput.vue'),
  'percentage-input': () => import('components/fw/form/PercentageInput.vue'),
  'textarea-input': () => import('components/fw/form/TextareaInput.vue'),
  'date-input': () => import('components/fw/form/DateInput.vue'),
  'cep-input': () => import('components/fw/form/CepInput.vue'),
  'password-input': () => import('components/fw/form/PasswordInput.vue'),
  'phone-input': () => import('components/fw/form/PhoneInput.vue'),
  'cpf-cnpj-input': () => import('components/fw/form/CpfCnpjInput.vue'),
  'search-input': () => import('components/fw/form/SearchInput.vue'),
  // 'ImagePicker': () =>  import ('components/fw/form/ImagePicker.vue'),
  'check-box': () => import('components/fw/form/CheckBox.vue'),
  // 'CheckboxIcon': () =>  import ('components/fw/form/CheckboxIcon.vue'),
  'select-input': () => import('components/fw/form/SelectInput.vue'),
  'select-options': () => import('components/fw/form/SelectOptions.vue'),
  'radio-options': () => import('components/fw/form/RadioOptions.vue'),
  'btn-toggle': () => import('components/fw/form/BtnToggle.vue'),

  'expansion-item': () => import('components/fw/form/ExpansionItem.vue'),
  'waiting-load': () => import('components/fw/form/WaitingLoad.vue'),

  'text-view': () => import('components/fw/form/TextView.vue'),

  btn: () => import('components/fw/form/Btn.vue'),
  'btn-icon': () => import('components/fw/form/BtnIcon.vue'),
  'btn-back': () => import('components/fw/form/BtnBack.vue'),
  'btn-save': () => import('components/fw/form/BtnSave.vue'),
  'btn-add': () => import('components/fw/form/BtnAdd.vue'),

  'btn-big': () => import('components/fw/form/BtnBig.vue'),
  'item-btn': () => import('components/fw/form/ItemBtn.vue'),

  'fab-menu': () => import('components/fw/form/FabMenu.vue'),
  'fab-edit-action': () => import('components/fw/form/FabEditAction.vue'),
  'fab-remove-action': () => import('components/fw/form/FabRemoveAction.vue')
};

export default boot(async ({ app }) => {
  for (const key in globalComponents) {
    app.component(key, defineAsyncComponent(globalComponents[key]));
  }
});
