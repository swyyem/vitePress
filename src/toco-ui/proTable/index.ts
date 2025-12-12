import ProTable from './baseTable.vue';
import ProColumn from './proColumn.vue';

import ProPage from './page.vue';
import ProTableToolbar from './toolbar.vue';
import ProTableContent from './content.vue';
import TableMenu from './menu.vue';
import TableMenuItem from './menuItem.vue';
import ProTableToolbarSetting from './toolbarSetting.vue';
import ProTableToolbarExport from './toolbarExport.vue';
import ProTableTollbarImport from './toolbarImport.vue';
import { InternalAddPrefix } from './variable';

export type * from './table.types';
export { ProColumn };

export {
  ProPage,
  ProTableToolbar,
  ProTableContent,
  TableMenu,
  TableMenuItem,
  ProTableToolbarSetting,
  ProTableToolbarExport,
  ProTableTollbarImport,
};
export const ProInternalAddPrefix = InternalAddPrefix;
export default ProTable;
