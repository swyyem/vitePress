import './index.less';
import './variables.css';
import ProForm, { ProFormField, ModalForm, DrawerForm } from './form';
import ProFormList from './proFormList';
import ProField, { ProText } from './proField';
import QueryFilter from './queryFilter';
export type * from './form';
export type * from './proField';
export * from './components';
import { registerFieldComponent } from './components/utils';
import FieldsComponent from './form/fieldsComponent.vue';
import ProTable, { ProColumn, ProInternalAddPrefix } from './proTable';
import ProSelect, { ProOption } from './proSelect';
import ProTransfer from './proTransfer';
import ProInputTag from './proInputTag';

export type * from './proTransfer';
export type * from './proInputTag';
export * from './proTable/variable';
export type * from './proTable';
export type * from './proSelect';

export { ProText };
export { ProField };
export { ProFormField };
export { ProForm };
export { ProFormList };
export { ModalForm };
export { DrawerForm };
export { QueryFilter };
export { FieldsComponent as ProFieldsComponent };
export { ProOption };
export { ProSelect };
export { ProTransfer };
export { ProInputTag };
export const HisColumn = ProColumn;
export { ProColumn };
export { ProInternalAddPrefix };
export default ProTable;

/***
 * 注册原子组件
 * */
// export { registerComponent }
// 统一使用 registerFieldComponent
export const registerComponent = registerFieldComponent;

// 导出 element-plus
export * from 'element-plus';
export type * from 'element-plus';
