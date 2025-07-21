<script lang="ts" setup generic="OriginT extends AnyObject">
/**
 * 编辑时，table 数据和 form 数据同步说明
 * tableData 变化时，会判断哪些变化了同步给 form
 * formItem 变化时，会同对应的数据给 tableData
 * 所以 form 隐藏的字段目前没有同步给 tableData
 */
import {
  computed,
  nextTick,
  toRaw,
  ref,
  provide,
  useAttrs,
  useSlots,
  watch,
  type VNode,
  unref,
  toRef,
} from "vue";
import { ElButton, type FormValidateFailure } from "element-plus";
import { getValue } from "../utils/value";
import { createDeferredExecutor } from "../utils/defer";
import { isArray, isUndefined } from "../utils";
import {
  omit,
  isEqual,
  getRealRowKey,
  removeInternalKey,
  getValueFromTable,
  getListFromForm,
  getTableDataDiff,
  getDataFromKeys,
  editTableDataByRow,
  getIndexFormKeys,
} from "./utils";
import { importMethod, exportMethod } from "./utils/tools";
import { ProForm } from "../index";
import { ProPage, ProTableToolbar, ProTableContent } from "./index";
import useRequest from "./useRequest";
import { InternalAddPrefix, InternalKey } from "./variable";
import { useColumns } from "./useColumn.tsx";
import { useEditable } from "./useEditable.tsx";
import { useNavigate } from "./useNavigate";
import { useResize } from "./useResize";
import { AddIcon } from "./icons/index";
import type { ProFormInstance } from "../form/index";
import type {
  KeyType,
  VueRawSlots,
  AnyObject,
  ProTableProps,
  ProTableToolbarProps,
  ProTableInstance,
  ProTableFormValidateType,
  ProTableEditProps,
  ProTableProviderProps,
  ProColumns,
  ProPagerProps,
  ProRecordDataType,
  ProTableRowSelectionProps,
  ProTableEmits,
  ProTableToolbarExportProps,
} from "./index";

// 定义泛型类型
type AnyObjectS = Record<string, any>;

type T = AnyObjectS & {
  [InternalKey]?: string;
};
defineOptions({
  name: "ProTable",
  inheritAttrs: false,
});
const props = withDefaults(defineProps<ProTableProps<T>>(), {
  pagination: undefined,
  toolbar: undefined,
  manualRequest: undefined,
  recordCreatorProps: undefined,
  edit: false,
  editable: false,
  waterfall: false,
  autoHeight: false,
  sameMaxHeight: false,
  round: true,
  virtual: false,
});
const emit = defineEmits<ProTableEmits>();
type SearchMethodType = (params?: AnyObject) => void;
defineSlots<{
  // 操作列插槽
  "column-operating": (props: {
    actions: ProTableProviderProps["actions"];
  }) => any;
  // 展开行插槽
  expand: (props: { row: AnyObject; column: AnyObject; $index: number }) => any;
  default: (v: AnyObject) => any;
  "toolbar-filters": (onSearch: SearchMethodType, searchForm: AnyObject) => any;
  "toolbar-search": (onSearch: SearchMethodType, searchForm: AnyObject) => any;
  "toolbar-buttons": (onSearch: SearchMethodType, searchForm: AnyObject) => any;
  "table-side": () => any;
  "body-bottom": () => any;
}>();
const attrs = useAttrs() as any;
const slots = useSlots();
const formRef = ref<ProFormInstance>();
const ProFormProps = computed(() => {
  return props.formProps || {};
});
// key 的递增
const internalIndex = {
  value: 0,
};
// 选择相关
const rowSelectionProps = computed(() => {
  const rowSelection =
    props.rowSelection || ({} as ProTableRowSelectionProps<T>);
  const {
    type,
    selectedRowKeys,
    selectable = (_data: AnyObject) => true,
    ...rest
  } = rowSelection;
  let rowKeys = [] as KeyType[];
  if (type && selectedRowKeys) {
    rowKeys = isArray(selectedRowKeys) ? selectedRowKeys : [selectedRowKeys];
  }
  return {
    type,
    selectable: selectable,
    selectedRowKeys: rowKeys,
    ...rest,
  };
});
const selectionRowKeys = ref<KeyType[]>(
  rowSelectionProps.value.selectedRowKeys
);
const getSelectionRows = () => {
  // 输出 rowData[]
  const rows = getDataFromKeys(
    selectionRowKeys.value,
    tableData.value,
    getRowKey.value
  );
  return rows;
};
// 使用 onChange 同步 selectionRowKeys 到组件外
watch(selectionRowKeys, (newVal) => {
  const keys = newVal.slice();
  const selectedRows = getDataFromKeys(keys, tableData.value, getRowKey.value);
  rowSelectionProps.value.onChange?.(keys, selectedRows);
});
// 组件外通过 selectedRowKeys 控制 checkbox
watch(
  () => rowSelectionProps.value.selectedRowKeys,
  (newVal) => {
    if (!isEqual(newVal, unref(selectionRowKeys))) {
      selectionRowKeys.value = newVal;
    }
  }
);

const columns = computed(() => {
  const list = slots.default?.({}) || [];
  const actions = editorImpl.operateMethods;
  const operateSlot = slots["column-operating"]?.({ actions }) || [];
  if (operateSlot.length > 0) {
    list.push(operateSlot[0]);
  }
  // 没有配置 columns，但传入了 slot
  const columnProps = list
    .filter((vnode: VNode) => {
      const type: any = vnode.type || {};
      // 只筛选出 ProColumn 组件
      if (typeof type === "object" && type.name === "ProColumn") {
        return true;
      }
      return false;
    })
    .map((vnode: VNode) => {
      const vprops = vnode.props || {};
      const children = vnode.children;
      if (
        typeof children === "object" &&
        children !== null &&
        "default" in children
      ) {
        const slots = children as VueRawSlots;
        const defaultSlot = slots.default;
        if (typeof defaultSlot === "function") {
          if (vprops.valueType === "option") {
            vprops.cellRenderer = defaultSlot;
          } else {
            vprops.render = defaultSlot;
          }
        }
      }
      return vprops;
    });
  return (props.columns || []).concat(columnProps);
});
/** 工具栏相关 */
const showToolbar = computed(() => props.toolbar !== false);
const toolbar = computed<ProTableToolbarProps>(() => {
  const inToolbar = props.toolbar;
  return inToolbar || ({} as ProTableToolbarProps);
});
// 显示页码，瀑布流和虚拟滚动不显示
const showPage = computed(() => {
  return (
    props.pagination !== false && props.waterfall === false && !props.virtual
  );
});
const dataRef = toRef(props, "data");
const paramsRef = toRef(props, "params");
// 选中第一行，第一次标记
const firstRef = ref(true);
// 第一次回调，使用在编辑场景的默认新增一行
const firstAddRef = ref(true);
const handleFirstCallback = () => {
  if (firstAddRef.value && editableConfig.value?.defaultRow) {
    onCreate(new MouseEvent("click", { bubbles: true }));
    firstAddRef.value = false;
  }
};
// 延迟函数
const deferReadyExecutor = createDeferredExecutor();
// 请求封装
const {
  tableData,
  searchForm,
  loading,
  pageInfo,
  first,
  fetchMethod,
  pureFetch,
  selectFetch,
  setLoading,
  getTableData,
  getTableDataHasKey,
  setTableData,
  setPage,
  setSearchForm,
  clearSearchForm,
  resetRequest,
  getTableDataSize,
  getRowDataByIndex,
} = useRequest<T>(props.request, {
  deferReadyExecutor,
  showPage: showPage.value,
  manualRequest: props.manualRequest,
  waterfall: props.waterfall || props.virtual,
  pagination: props.pagination,
  dataSource: props.dataSource,
  data: dataRef,
  params: paramsRef,
  tableFirstRef: firstRef,
  defaultData: props.defaultData,
  onLoad: props.onLoad,
  onRequestError: props.onRequestError,
  postData: props.postData,
  internalIndex: internalIndex,
  defaultSearchForm: props.defaultSearchForm,
  onFirst: handleFirstCallback,
});
// 页码
const pagination = computed(() => {
  let inPagination = props.pagination;
  if (inPagination === false) {
    return {} as ProPagerProps["pagination"];
  }
  inPagination = inPagination || {};
  const originChange = (props.pagination as ProPagerProps["pagination"])
    ?.onChange;
  inPagination.onChange = (currentPage: number, pageSize: number) => {
    handlePageChange(currentPage, pageSize);
    originChange?.(currentPage, pageSize);
  };
  return {
    ...inPagination,
    ...pageInfo,
  } as ProPagerProps["pagination"];
});
// 页码位置
const paginationAttr = computed(() => {
  let pos: "top" | "bottom" | undefined = undefined;
  let placement: string | undefined = undefined;
  if (showPage.value) {
    const { position } = pagination?.value || {};
    if (position !== null && Array.isArray(position)) {
      const topPos = position.find((p) => p.includes("top"));
      const bottomPos = position.find((p) => p.includes("bottom"));
      const isDisable = position.every((p) => `${p}` === "none");
      if (!topPos && !bottomPos && !isDisable) {
        pos = "bottom";
        placement = "right";
      }
      if (topPos) {
        pos = "top";
        placement = topPos.toLowerCase().replace("top", "");
      }
      if (bottomPos) {
        pos = "bottom";
        placement = bottomPos.toLowerCase().replace("bottom", "");
      }
    } else {
      pos = "bottom";
      placement = "right";
    }
  }
  return pos && placement
    ? {
        pos,
        props: {
          ...pagination.value,
          class: `pro-pagination pro-pagination-${placement}`,
        },
      }
    : undefined;
});
// 刷新表格
const refresh = (clear?: boolean) => {
  // 清空搜索条件和重置分页
  if (clear) {
    clearSearchForm();
    resetRequest();
  }
  removeRecords.value = [];
  editRecords.value = [];
  return fetchMethod();
};
// 搜索事件
const handleSearch = (params?: any) => {
  // 有些控件如下拉框有延迟，故使用了 nextTick
  nextTick(() => {
    setSearchForm(params || {});
    resetRequest();
    fetchMethod();
  });
};
// 页码变化
const handlePageChange = (currentPage: number, pageSize: number) => {
  setPage({
    currentPage,
    pageSize,
  });
  fetchMethod();
};
// 编辑的配置
const editable = computed(() => {
  const editableProps = props.editable || props.edit;
  if (editableProps === false) {
    return false;
  }
  return true;
});
const editableConfig = computed(() => {
  const editableProps = props.editable || props.edit;
  if (editableProps === false) {
    return undefined;
  }
  let res = { type: "single" } as ProTableEditProps;
  // string 的场景
  if (typeof editableProps === "string") {
    res.type = editableProps;
  } else {
    res = editableProps as ProTableEditProps;
  }
  return res;
});

const tableContentRef = ref();
watch(
  () => tableData.value,
  (newVal) => {
    // console.log('=table newVal=', newVal)
    // 表单数据从数组更换成以 rowKey 的值做 key 对象
    if (formRef.value) {
      // 不能全量覆盖，会导致配置了 effects 的逻辑都执行
      const { modifys, removes } = getTableDataDiff<T>(
        newVal,
        formRef.value.getFormFullValues(),
        getRowKey.value
      );
      if (modifys.length > 0) {
        formRef.value.setFormValues(
          getValueFromTable(modifys, getRowKey.value)
        );
      }
      if (removes.length > 0) {
        formRef.value.removeFormValues(
          getValueFromTable(removes, getRowKey.value)
        );
      }
    }
    // 只有 table.value 第一次赋值时
    if (firstRef.value) {
      // 设置下拉表格场景的默认位置
      const { selectedRowKeys } = rowSelectionProps.value;
      const rowIndexArray: number[] = getIndexFormKeys(
        selectedRowKeys,
        newVal,
        getRowKey.value
      );
      if (rowIndexArray.length > 0) {
        setHoverIndex(rowIndexArray[0]);
      }
      nextTick(() => {
        handleFirstCallback();
        const tableContentIns = tableContentRef.value;
        tableContentIns?.setScrollTop(rowIndexArray[0]);
        if (tableContentIns && props.firstRowSelected) {
          // 选中第一行
          tableContentIns.setCurrentRow(newVal[0]);
        }
        firstRef.value = false;
      });
    }
  }
);
// 圆角样式
const roundClass = computed(() => {
  const hasAdd = props.recordCreatorProps !== false && editable.value;
  return props.round
    ? hasAdd
      ? "pro-table--roundhalf"
      : "pro-table--round"
    : "";
});
// virtual 下只能固定高度
const autoHeight = computed(() => {
  return props.virtual ? false : props.autoHeight;
});
// 高度自适应样式
const autoHeightClass = computed(() => {
  return autoHeight.value ? "pro-table--autoheight" : "";
});
// 表格高度同 max-height
const sameMaxHeight = computed(() => {
  return autoHeight.value ? false : props.sameMaxHeight;
});
// 编辑的 row 的标记
const editingRowKeys = ref<KeyType[]>([]);
const childrenColumnName = "children";
// 获取 row 的唯一Key
const getRowKey = computed(() => {
  const rowKey = props.rowKey || InternalKey;
  return (record: T) => {
    const res = getValue(record, rowKey);
    if (!isUndefined(res)) {
      return res;
    }
    return getValue(record, InternalKey);
  };
});
// 获取对应的控件实例
const getFormInstanceByKey = (key: string, rowData: T) => {
  const instances = formRef.value?.getFormInstances() || [];
  const prefix = getRealRowKey(getRowKey.value, rowData) as string;
  const fullKey = `${prefix}.${key}`;
  const matchIns = instances.find((item: any) => item.key === fullKey);
  if (matchIns) {
    return matchIns.getInstance() || matchIns.instance;
  }
  return null;
};
// 编辑的 cell 的标记
const editingCell = ref<string>();
// 编辑的记录
const editRecords = ref<T[]>([]);
// 删除的记录
const removeRecords = ref<T[]>([]);
const editingContext = {
  formRef: formRef,
  editable: editableConfig,
  editingCell,
  editingRowKeys,
  getRowKey,
  childrenColumnName,
  getData: getTableDataHasKey,
  setData: (newValue: T[]) => {
    setTableData(newValue, true);
  },
  removeRecords,
  editRecords,
  internalIndex: internalIndex,
  rowSelectionProps: rowSelectionProps,
  waterfall: props.waterfall,
  pageInfo: pageInfo,
  getFormInstanceByKey: getFormInstanceByKey,
  onCreate: (e: MouseEvent) => onCreate(e),
};
// 滚动信息
// 表格事件
const handleScroll = (v: any) => {
  if (!props.waterfall) {
    return;
  }
  const container = tableBodyRef.value?.querySelector(".el-scrollbar__wrap");
  if (container) {
    const maxScroll = container.scrollHeight - container.clientHeight;
    if (maxScroll > 32 && v.scrollTop > maxScroll - 32) {
      if (loading.value) {
        return;
      }
      setPage({
        currentPage: (pageInfo.currentPage || 1) + 1,
      });
      // 加载下一页
      fetchMethod();
    }
  }
};

const tableColumns = useColumns<T>(columns, editingContext);
/** 编辑态场景 */
const editorImpl = useEditable<T>(editingContext);
const finalColumns = computed(() =>
  editorImpl.transformEditableColumns(tableColumns.columns.value)
);

// console.log('=finalColumns=', finalColumns.value)
// 可改变的 columns
const changeColumns = ref(finalColumns.value);
watch(
  () => finalColumns.value,
  (newVal) => {
    changeColumns.value = newVal;
    // console.log('=changeColumns=', newVal)
  }
);
// 修改 columns
const setTableColumns = (columns: ProColumns) => {
  changeColumns.value = columns;
};
// 重置 columns
const resetTableColumns = () => {
  changeColumns.value = finalColumns.value;
};
// 新增一行
const createButtonProps = computed(() => {
  if (props.recordCreatorProps === false) {
    return {};
  }
  return omit(props.recordCreatorProps || {}, [
    "placement",
    "position",
    "creatorButtonText",
    "onClick",
  ]);
});
const creatorButtonText = computed(() => {
  if (props.recordCreatorProps === false) {
    return undefined;
  }
  return props.recordCreatorProps?.creatorButtonText || "新增一行";
});

const onCreate = (e: MouseEvent) => {
  if (props.recordCreatorProps && props.recordCreatorProps.onClick) {
    props.recordCreatorProps.onClick(e, {
      add: (data: any) => editorImpl.operateMethods.add(data),
    });
  } else {
    editorImpl.operateMethods.add();
  }
};
// 表格容器和表格体的引用
const tableBodyRef = ref<HTMLElement | null>(null);
const { bodyHeight, bodyWidth, calculateBodyHeight } = useResize({
  tableBodyRef,
  height: props.height,
  width: props.width,
  recordCreatorProps: props.recordCreatorProps,
  hasPager: showPage.value && !props.waterfall,
});

const {
  navigateRow,
  setNavigateRow,
  scrollToCurrentRow,
  setRowClassName,
  setHoverIndex,
} = useNavigate({
  deferReadyExecutor,
  tableContentRef,
  rowSelectionProps,
  rowClassName: props.rowClassName,
  getTableDataSize,
  getTableDataHasKey,
  getRowDataByIndex,
  getRowKey,
});

// 设置编辑行
const setEditRecord = (record: any) => {
  const idVal = getRealRowKey(getRowKey.value, record);
  const isAdd =
    typeof idVal === "string" && idVal.startsWith(InternalAddPrefix);
  if (isAdd) {
    return;
  }
  const existIndex = editRecords.value.findIndex((item) => {
    const itemKey = getRealRowKey(getRowKey.value, item);
    return idVal === itemKey;
  });
  if (existIndex === -1) {
    editRecords.value.push(record);
  }
};
// 只读存储一行的控件实例
const cellRefs = ref<AnyObject>({});
const setCellRef = (key: KeyType, ref: any) => {
  if (!cellRefs.value[key]) {
    cellRefs.value[key] = ref;
  }
};
const getCellRef = (key?: KeyType) => {
  return key ? cellRefs.value[key] : cellRefs.value;
};
provide<ProTableProviderProps>("ProTableData", {
  emit,
  pageInfo: pageInfo,
  internalIndex: internalIndex,
  originColumns: finalColumns,
  columns: changeColumns,
  setTableColumns,
  resetTableColumns,
  actions: editorImpl.operateMethods,
  setEditRecord: setEditRecord,
  waterfall: props.waterfall,
  pureFetch: pureFetch,
  getRowKey: getRowKey,
  getCellRef: getCellRef,
  setCellRef: setCellRef,
  getSelectionRows: getSelectionRows,
  editableConfig: editableConfig,
  selectionRowKeys: selectionRowKeys,
  tableData: tableData,
  rowSelectionProps: rowSelectionProps,
});
// 获取表单中的增，改，删的数据
const getRecordSet = (): ProRecordDataType<T> => {
  const formDataValue = getTableDataHasKey();
  // 新增的数据带入了 InternalAddPrefix
  const addSet = formDataValue.filter((item: T) => {
    const idVal = getRealRowKey(getRowKey.value, item);
    return typeof idVal === "string" && idVal.startsWith(InternalAddPrefix);
  });
  // 删除的数据
  return {
    add: getListFromForm<T>(
      addSet as T[],
      formRef.value?.getFormFullValues(),
      getRowKey.value
    ),
    edit: getListFromForm<T>(
      editRecords.value as T[],
      formRef.value?.getFormFullValues(),
      getRowKey.value
    ),
    remove: removeInternalKey(removeRecords.value) as T[],
  };
};
// expose
defineExpose<ProTableInstance<T>>({
  getData: getTableData,
  getDataHasKey: getTableDataHasKey,
  getTableDataSize: getTableDataSize,
  validate: (cb?: ProTableFormValidateType) => {
    return formRef.value?.validate(
      (isValid: boolean, invalidFields?: FormValidateFailure["fields"]) => {
        tableColumns.setInvalidControl(isValid, invalidFields);
        if (typeof cb === "function") {
          cb?.(isValid, invalidFields);
        }
      }
    ) as ReturnType<ProFormInstance["validate"]>;
  },
  resetForm: (data: T[]) => {
    setTableData(data, true);
  },
  getFormData: () => {
    if (formRef.value) {
      // form 的值都会同步到 tableData 中，直接返回 tableData 即可，如果form 中存在非 column 字段，则需要使用 getFormFullValues
      return getListFromForm<T>(
        getTableDataHasKey(),
        formRef.value?.getFormFullValues(),
        getRowKey.value
      );
    }
    return [];
    // return formRef.value?.getFormFullValues()[FormDataKey]
  },
  getFormRecord: () => {
    return getRecordSet();
  },
  getFormInstances: () => {
    return formRef.value?.getFormInstances() || [];
  },
  getFormInstanceByKey: getFormInstanceByKey,
  refresh: refresh,
  resize: calculateBodyHeight,
  onSearch: handleSearch,
  selectFetch: selectFetch,
  setLoading: setLoading,
  setTableData,
  setData: setTableData, // 和 getData 呼应
  setDataClad: (data: T | T[]) => {
    setTableData(
      editTableDataByRow<T>(data, getTableDataHasKey(), getRowKey.value),
      true
    );
  },
  setSearchForm,
  getSearchForm: () => toRaw(searchForm),
  navigateRow,
  setNavigateRow,
  updateRow: scrollToCurrentRow,
  actions: {
    add: editorImpl.operateMethods.add,
    delete: editorImpl.operateMethods.delete,
    exportMethod: (options?: ProTableToolbarExportProps) => {
      const params = options || {};
      return exportMethod({
        ...params,
        getSelectionRows: getSelectionRows,
        pureFetch: pureFetch,
        columns: changeColumns,
        getCellRef: getCellRef,
      });
    },
    importMethod: importMethod,
  },
  setCurrentRow: (row: any) => {
    tableContentRef.value?.setCurrentRow(row);
  },
});
</script>

<template>
  <div
    :class="[
      'pro-table',
      roundClass,
      autoHeightClass,
      props.containerClass,
      props.tableClassName,
    ]"
  >
    <ProTableToolbar v-if="showToolbar" v-bind="toolbar">
      <template #toolbar-filters v-if="$slots['toolbar-filters']">
        <slot
          name="toolbar-filters"
          :onSearch="handleSearch"
          :searchForm="searchForm"
        ></slot>
      </template>
      <template #toolbar-search v-if="$slots['toolbar-search']">
        <slot
          name="toolbar-search"
          :onSearch="handleSearch"
          :searchForm="searchForm"
        ></slot>
      </template>
      <template #toolbar-buttons v-if="$slots['toolbar-buttons']">
        <slot name="toolbar-buttons"></slot>
      </template>
    </ProTableToolbar>
    <div
      class="pro-table--body"
      :class="[
        {
          'pro-table--body__row': $slots['table-side'],
        },
        props.bodyClassName,
      ]"
      ref="tableBodyRef"
    >
      <div class="pro-table--body__main" :class="props.bodyMainClassName">
        <ProPage
          v-if="showPage && paginationAttr?.pos === 'top'"
          :pagination="paginationAttr?.props"
        />
        <ProForm
          v-if="editable"
          :omit-nil="false"
          v-bind="ProFormProps"
          ref="formRef"
          :submitter="false"
          :grid="false"
          fieldErrorType="tip"
        >
          <ProTableContent
            ref="tableContentRef"
            :bodyHeight="bodyHeight"
            :bodyWidth="bodyWidth"
            :loading="loading"
            :tableData="tableData"
            :rowKey="props.rowKey"
            :waterfall="props.waterfall"
            :virtual="props.virtual"
            :first="first"
            :rowClassName="setRowClassName"
            :menuConfig="props.menuConfig"
            :autoHeight="autoHeight"
            :sameMaxHeight="sameMaxHeight"
            :emptyText="props.emptyText"
            :removedKey="props.removedKey"
            v-bind="attrs"
            @scroll="handleScroll"
          >
            <slot />
          </ProTableContent>
        </ProForm>
        <ProTableContent
          v-else
          ref="tableContentRef"
          :bodyHeight="bodyHeight"
          :bodyWidth="bodyWidth"
          :loading="loading"
          :tableData="tableData"
          :rowKey="props.rowKey"
          :waterfall="props.waterfall"
          :virtual="props.virtual"
          :first="first"
          :rowClassName="setRowClassName"
          :menuConfig="props.menuConfig"
          :expandable="props.expandable"
          :autoHeight="autoHeight"
          :sameMaxHeight="sameMaxHeight"
          :emptyText="props.emptyText"
          :removedKey="props.removedKey"
          v-bind="attrs"
          @scroll="handleScroll"
        >
          <slot />
          <template #expand="slotData" v-if="$slots['expand']">
            <slot name="expand" v-bind="slotData"></slot>
          </template>
        </ProTableContent>
        <div
          v-if="props.recordCreatorProps !== false && editable"
          class="pro-table--operate"
        >
          <ElButton
            type="primary"
            class="add-btn"
            v-bind="createButtonProps"
            @click="onCreate"
          >
            <AddIcon style="margin-right: 4px" />
            {{ creatorButtonText }}
          </ElButton>
        </div>
        <slot name="body-bottom"></slot>
        <ProPage
          v-if="showPage && paginationAttr?.pos === 'bottom'"
          :pagination="paginationAttr?.props"
        />
      </div>
      <slot name="table-side" />
    </div>
  </div>
</template>

<style lang="less">
.pro-table {
  display: flex;
  flex-direction: column;
  height: 100%;

  &--autoheight {
    height: auto;
  }

  &--operate {
    position: relative;
    top: -1px;
    height: 32px;
    border: 1px solid var(--pro-table-border-color);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    .add-btn {
      width: 100%;
      background-color: transparent;
      color: var(--pro-table-add-color);
      border: 0;
      border-top: 0;
    }
  }

  /* profield 的样式，内部控件存在 inline-flex，导致外层有 1px 的间隙，该样式可解决 */
  .component-box {
    line-height: 0;
  }

  .pro-column--read {
    .component-box {
      line-height: inherit;
    }
  }

  & &--body {
    --el-border-radius-base: 0;

    flex: 1;
    min-height: 0;
    flex-direction: column;
    display: flex;

    &__row {
      flex-direction: row;
    }

    &__main {
      position: relative;
      flex: 1;
      min-width: 0;
      min-height: 0;
    }

    // 控件样式
    .el-table {
      .el-form-item {
        margin-bottom: 0;
        width: 100%;
      }

      .el-form-item__content {
        line-height: inherit;
      }

      .el-select__wrapper,
      .el-input__wrapper {
        padding-left: 10px;
        padding-right: 10px;
      }

      .el-input-number.is-controls-right .el-input__wrapper {
        padding-right: 42px;
      }

      .el-input-number {
        width: 100%;
      }
    }
  }

  .el-table__border-left-patch,
  .el-table--border::before,
  .el-table--border::after,
  .el-table__inner-wrapper::before {
    display: none; /* 隐藏默认边框 */
  }

  /* 表格边框 */
  .el-table--border .el-table__inner-wrapper,
  .el-table-v2__table {
    &:after {
      content: " ";
      position: absolute;
      height: auto;
      background-color: transparent;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px var(--pro-table-border-color) solid;
      pointer-events: none;
      box-sizing: border-box;
    }
  }

  /* 表格圆角 */
  &--round,
  &--roundhalf {
    .el-table--border .el-table__inner-wrapper,
    .el-table-v2__table {
      &:after {
        border-radius: var(--pro-table-border-radius);
      }
    }
    .el-table-v2__table.el-table-v2__left:after {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .el-table-v2__table.el-table-v2__right:after {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    .el-table--border .el-table__body-wrapper {
      border-bottom-left-radius: var(--pro-table-border-radius);
      border-bottom-right-radius: var(--pro-table-border-radius);
    }

    .el-table__header-wrapper {
      border-top-left-radius: var(--pro-table-border-radius);
      border-top-right-radius: var(--pro-table-border-radius);
    }
  }
  /* 底部有新增一行 */
  &--roundhalf {
    .el-table--border .el-table__inner-wrapper {
      &:after {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }

  .el-table .el-table__body,
  .el-table-v2 .el-table-v2__body {
    /* 序号 */
    .pro-table--body__seq {
      .cell {
        padding: 0 10px;
      }
    }
    /* 操作列 */
    .pro-table--body__operate {
      .cell {
        padding: 0 10px;
      }

      .el-button + .el-button {
        margin-left: 0;
      }
    }
  }

  .el-table-v2 .el-table-v2__header {
    background-color: var(--pro-table-thead-bg);
    border-top-left-radius: var(--pro-table-border-radius);
    border-top-right-radius: var(--pro-table-border-radius);

    .el-table-v2__header-cell {
      padding: 0 10px;
      background-color: transparent;
    }
  }

  .el-table-v2 .el-table-v2__row,
  .el-table-v2 .el-table-v2__header-row {
    border-bottom-color: var(--pro-table-border-color);
  }

  .el-table-v2 .el-table-v2__row-cell,
  .el-table-v2 .el-table-v2__header-cell {
    border-right: 1px var(--pro-table-border-color) solid;
  }
  .el-table-v2 .el-table-v2__row-cell {
    padding: 0;
  }
  /* fixed right 场景下去除最右侧的边框 */
  .el-table-v2
    .el-table-v2__row
    .el-table-v2__row-cell:not(:has(~ .el-table-v2__row-cell)),
  .el-table-v2
    .el-table-v2__header-row
    .el-table-v2__header-cell:not(:has(~ .el-table-v2__header-cell)) {
    border-right: none;
  }

  .el-table-v2 .pro-table--body__seq,
  .el-table-v2 .pro-table--body__operate {
    padding: 0 10px;
  }
  /* v2 选中和 hover */
  .el-table-v2 .el-table-v2__row.current-row .el-table-v2__row-cell {
    background-color: var(--pro-table-tr-selected-bg);
  }

  .el-table-v2 .el-table-v2__row.is-hovered,
  .el-table-v2 .el-table-v2__row:hover {
    background-color: var(--pro-table-tr-hover-bg);
  }

  .el-table {
    .el-table__header {
      thead {
        color: var(--pro-table-font-color);
      }

      .el-table__cell {
        background-color: var(--pro-table-thead-bg);
        padding: 0px;
        height: 32px;

        .cell {
          font-weight: bold;
          padding: 0 10px;
        }
      }
    }
    /* 选中行和 hover 行 */
    .el-table__body {
      // selected
      tr.current-row > td.el-table__cell {
        background-color: var(--pro-table-tr-selected-bg);
      }
      // hover
      tr.hover-row.current-row > td.el-table__cell,
      tr.hover-row.el-table__row--striped.current-row > td.el-table__cell,
      tr.hover-row.el-table__row--striped > td.el-table__cell,
      tr.hover-row > td.el-table__cell,
      tr > td.hover-cell {
        background-color: var(--pro-table-tr-hover-bg);
      }

      .cell {
        padding: 0;
      }
    }

    td.el-table__cell,
    th.el-table__cell.is-leaf {
      border-bottom-color: var(--pro-table-border-color);
    }

    .el-table__cell {
      padding: 0;
    }
  }

  .el-table--border {
    .el-table__cell {
      border-right-color: var(--pro-table-border-color);
    }
    th.el-table__cell {
      border-bottom-color: var(--pro-table-border-color);
    }
    /* 表格边框 */
    &:after,
    &:before {
      background-color: var(--pro-table-border-color);
    }
  }
}
</style>
