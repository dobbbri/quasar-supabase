import { boot } from 'quasar/wrappers';
import Page from 'src/components/fw/page/Page.vue';
import PageHeader from 'src/components/fw/page/PageHeader.vue';
import PageBody from 'src/components/fw/page/PageBody.vue';
import PageFooter from 'src/components/fw/page/PageFooter.vue';

import TextInput from 'src/components/fw/form/TextInput.vue';
import MoneyInput from 'src/components/fw/form/MoneyInput.vue';
import IntegerInput from 'src/components/fw/form/IntegerInput.vue';
import TextareaInput from 'src/components/fw/form/TextareaInput.vue';
import DateInput from 'src/components/fw/form/DateInput.vue';
import CepInput from 'src/components/fw/form/CepInput.vue';
import PasswordInput from 'src/components/fw/form/PasswordInput.vue';
import PhoneInput from 'src/components/fw/form/PhoneInput.vue';
import CpfCnpjInput from 'src/components/fw/form/CpfCnpjInput.vue';
import SearchInput from 'src/components/fw/form/SearchInput.vue';
// import ImagePicker from 'src/components/fw/form/ImagePicker.vue';
import CheckBox from 'src/components/fw/form/CheckBox.vue';
// import CheckboxIcon from 'src/components/fw/form/CheckboxIcon.vue';
import SelectInput from 'src/components/fw/form/SelectInput.vue';
import SelectOptions from 'src/components/fw/form/SelectOptions.vue';
import RadioOptions from 'src/components/fw/form/RadioOptions.vue';

import ExpansionItem from 'src/components/fw/form/ExpansionItem.vue';
import WaitingLoad from 'src/components/fw/form/WaitingLoad.vue';

import TextView from 'src/components/fw/form/TextView.vue';

import BtnBack from 'src/components/fw/form/BtnBack.vue';
import BtnSave from 'src/components/fw/form/BtnSave.vue';
import BtnAdd from 'src/components/fw/form/BtnAdd.vue';
import BtnEdit from 'src/components/fw/form/BtnEdit.vue';
import BtnRemove from 'src/components/fw/form/BtnRemove.vue';
import BtnBig from 'src/components/fw/form/BtnBig.vue';

import ItemBtn from 'src/components/fw/form/ItemBtn.vue';

import FabMenu from 'src/components/fw/form/FabMenu.vue';
import FabEditAction from 'src/components/fw/form/FabEditAction.vue';
import FabRemoveAction from 'src/components/fw/form/FabRemoveAction.vue';

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
  'btn-edit': BtnEdit,
  'btn-remove': BtnRemove,
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
