import { boot } from 'quasar/wrappers';
import Page from 'src/components/page/Page.vue';
import PageHeader from 'src/components/page/PageHeader.vue';
import PageBody from 'src/components/page/PageBody.vue';
import PageFooter from 'src/components/page/PageFooter.vue';

import TextInput from 'src/components/form/TextInput.vue';
import MoneyInput from 'src/components/form/MoneyInput.vue';
import IntegerInput from 'src/components/form/IntegerInput.vue';
import TextareaInput from 'src/components/form/TextareaInput.vue';
import DateInput from 'src/components/form/DateInput.vue';
import CepInput from 'src/components/form/CepInput.vue';
import PasswordInput from 'src/components/form/PasswordInput.vue';
import PhoneInput from 'src/components/form/PhoneInput.vue';
import CpfCnpjInput from 'src/components/form/CpfCnpjInput.vue';
import SearchInput from 'src/components/form/SearchInput.vue';
// import ImagePicker from 'src/components/form/ImagePicker.vue';
import CheckBox from 'src/components/form/CheckBox.vue';
// import CheckboxIcon from 'src/components/form/CheckboxIcon.vue';
import SelectInput from 'src/components/form/SelectInput.vue';
import SelectOptions from 'src/components/form/SelectOptions.vue';
import RadioOptions from 'src/components/form/RadioOptions.vue';

import ExpansionItem from 'src/components/form/ExpansionItem.vue';
import WaitingLoad from 'src/components/form/WaitingLoad.vue';

import TextView from 'src/components/form/TextView.vue';

import BtnBack from 'src/components/form/BtnBack.vue';
import BtnSave from 'src/components/form/BtnSave.vue';
import BtnAdd from 'src/components/form/BtnAdd.vue';
import BtnBig from 'src/components/form/BtnBig.vue';

import ItemBtn from 'src/components/form/ItemBtn.vue';

import FabMenu from 'src/components/form/FabMenu.vue';
import FabEditAction from 'src/components/form/FabEditAction.vue';
import FabRemoveAction from 'src/components/form/FabRemoveAction.vue';

const globalComponents = {
  page: Page,
  'page-header': PageHeader,
  'page-body': PageBody,
  'page-footer': PageFooter,
  'text-input': TextInput,
  'money-input': MoneyInput,
  'integer-input': IntegerInput,
  'textarea-input': TextareaInput,
  'date-input': DateInput,
  'cep-input': CepInput,
  'password-input': PasswordInput,
  'phone-input': PhoneInput,
  'cpf-cnpj-input': CpfCnpjInput,
  'expansion-item': ExpansionItem,
  'search-input': SearchInput,
  // 'image-picker': ImagePicker,
  'check-box': CheckBox,
  // 'checkbox-icon': CheckboxIcon,
  'select-input': SelectInput,
  'select-options': SelectOptions,
  'radio-options': RadioOptions,
  'waiting-load': WaitingLoad,
  'text-view': TextView,
  'btn-back': BtnBack,
  'btn-save': BtnSave,
  'btn-add': BtnAdd,
  'item-btn': ItemBtn,
  'btn-big': BtnBig,
  'fab-menu': FabMenu,
  'fab-edit-action': FabEditAction,
  'fab-remove-action': FabRemoveAction
};

export default boot(async ({ app }) => {
  for (const key in globalComponents) {
    app.component(key, globalComponents[key]);
  }
});
