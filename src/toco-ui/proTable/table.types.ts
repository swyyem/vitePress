import type { VNode, Ref, ComputedRef, Slot } from 'vue';
import type {
  PaginationProps,
  PaginationEmits,
  ButtonProps,
  TableInstance,
  Column,
  Columns,
} from 'element-plus';
// import type { Column, Columns } from 'element-plus/es/components/table-v2/src/types'
import type {
  ProFormProps,
  PropFormFieldProps,
  TextSpecifiledProps,
  ProFormInstance,
  ProFieldValueType,
  ProFieldPropsType,
} from '../index';

export type ProV2Column = Column;
export type ProV2Columns = Columns<AnyObject>;

export type VueRawSlots = {
  [name: string]: Slot;
};
type ProAsyncEventType = () => {
  resolve: () => void;
};
export type ProTableFieldProps<ValueType extends ProFieldValueType = ProFieldValueType> = Omit<
  ProFieldPropsType<ValueType>,
  'mode' | 'textProps' | 'modelValue' | 'renderFormItem' | 'render'
>;
export type ProTableGetRowKey<RecordType = any> = (record: RecordType) => KeyType;
export type ProTableEditContext<T = AnyObject> = {
  formRef: Ref<ProFormInstance | undefined>;
  editable: ComputedRef<ProTableEditProps | undefined>;
  editingCell: Ref<KeyType | undefined, KeyType | undefined>;
  editingRowKeys: Ref<KeyType[], KeyType[]>;
  getRowKey: ComputedRef<ProTableGetRowKey<T>>;
  childrenColumnName: string;
  getData: () => T[];
  setData: (data: T[]) => void;
  removeRecords: Ref<T[]>;
  editRecords: Ref<T[]>;
  internalIndex: ProTableProviderProps['internalIndex'];
  rowSelectionProps: ComputedRef<ProTableRowSelectionAfter<T>>;
  waterfall: boolean;
  pageInfo: ProTablePageParams;
  getFormInstanceByKey: (key: string, rowData: T) => any;
  onCreate: (e: MouseEvent) => void;
};

export type ProTableOperateMethods<T = any> = {
  edit: (rowData: T) => void;
  delete: (rowData: T) => void;
  cancel: (rowData: T) => void;
  save: (rowData: T) => void;
  add: (rowData?: T) => void;
};

export type ProTableProviderProps = {
  emit: ProTableEmits;
  pageInfo: ProTablePageParams;
  internalIndex: {
    value: number;
  };
  originColumns: ComputedRef<ProColumns>;
  columns: Ref<ProColumns>;
  setTableColumns: (columns: ProColumns) => void;
  resetTableColumns: () => void;
  actions: {
    add: ProTableOperateMethods['add'];
    delete: ProTableOperateMethods['delete'];
  };
  setEditRecord: (v: any) => void;
  waterfall: boolean;
  getRowKey: ComputedRef<ProTableGetRowKey<any>>;
  pureFetch: (p: ProTablePageParams) => Promise<any>;
  setCellRef: (key: KeyType, ref: any) => void;
  getCellRef: (key?: KeyType) => any;
  getSelectionRows: () => AnyObject[];
  editableConfig: ComputedRef<ProTableEditProps | undefined>;
  selectionRowKeys: Ref<KeyType[]>;
  tableData: Ref<AnyObject[]>;
  rowSelectionProps: ComputedRef<ProTableRowSelectionAfter<AnyObject>>;
};

export type ProCellRendererParams = {
  cellKey: KeyType;
  cellData: any;
  rowData: any;
  rowIndex: number;
  columns?: ProColumns;
  column: ProColumn;
  columnIndex: number;
};
export type KeyType = PropertyKey;
export type AnyObject = Record<PropertyKey, any>;
export type ProTableButtonProps = Partial<ButtonProps> & {
  onClick?: (e: MouseEvent, rowData: any, asyncEvent: ProAsyncEventType) => void;
};
export type ProActionButtonProps =
  | false
  | ProTableButtonProps
  | ((params: ProCellRendererParams) => false | ProTableButtonProps);
type TablePaginationPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'
  | 'none';
// 分页
export type ProPagerProps = {
  pagination: Partial<PaginationProps> &
    Partial<PaginationEmits> & {
      position?: TablePaginationPosition[];
      onChange?: (currentPage: number, pageSize: number) => void;
    };
};
export type ProTableEditButtonType = {
  label?: string;
  icon?: string;
  onClick: (v?: any) => any;
};

export type ProTablePageParams = {
  currentPage?: number;
  pageSize?: number;
  total?: number;
  scrollId?: string;
  hasMore?: boolean;
};

export type ProTableToolbarExportProps = {
  /** 导出文件名 */
  filename?: string;
  /** 按钮名称 */
  buttonText?: string;
  /** 选中行导出 */
  checked?: boolean;
  /** 导出成功的回调 */
  onSuccess?: () => void;
};
export type ProTableToolbarImportProps = {
  /** 按钮名称 */
  buttonText?: string;
  /** json 中的 key，数组顺序 */
  keys?: string[];
  /** 导入成功的回调 */
  onSuccess?: (data: any[], asyncEvent: ProAsyncEventType) => void;
};
// 工具栏
export type ProTableToolbarProps = {
  className?: string; // 样式
  title?: string; // 标题
  custom?: boolean; // 自定义列
  export?: boolean | ProTableToolbarExportProps; // 导出
  import?: ProTableToolbarImportProps; // 导入
};

// content
export type ProTableContentProps<T> = {
  bodyHeight: number;
  bodyWidth: number;
  loading: boolean;
  tableData: T[];
  getRowKey?: ProTableGetRowKey<T>;
  rowKey: ProTableProps['rowKey'];
  first?: boolean;
  waterfall?: boolean;
  virtual?: boolean;
  onScroll?: (v: { scrollLeft: number; scrollTop: number }) => void;
  rowClassName: ProTableRowClassName;
  menuConfig?: ProTableMenuConfigType<T>;
  expandable?: ProTableExpandableProps;
  autoHeight: boolean;
  /** 删除样式 */
  removedKey?: string;
  sameMaxHeight?: boolean;
  emptyText?: string;
  /** 选中行高亮 */
  highlightCurrentRow?: boolean;
};
export type ProTableContentInstance = {
  getElTableInstance: () => Ref<TableInstance | undefined>;
  setScrollTop: (v: number) => void;
  setCurrentRow: (row: any, isEmit?: boolean) => void;
};
// export type ProColumnRenderParams<T> = {
//   mode: string
//   actions: {
//     add: () => void
//     remove: (rowIndex: number, row: T) => void
//   }
// }
export type ProCellRenderer = (params: any) => VNode;
export type ProHeaderCellRenderer = (params: any) => VNode;
export type ProColumn = Omit<TextSpecifiledProps, 'copyText'> & {
  /** 标题，同label */
  title?: string;
  /** 标题，同 title */
  label?: string;
  /** 字段名 */
  field?: string;
  /** 字段名，同 field */
  prop?: string;
  /** 数据字段名，同 field */
  dataKey?: string;
  /** 类型，支持 seq(序号) */
  type?: string;
  /** 对齐方式 */
  align?: 'center' | 'right';
  /** column 模式 */
  mode?: string;
  /** 控件类型 */
  valueType?: string;
  /** 控件 props */
  proFieldProps?: AnyObject;
  /** 是否必填 */
  required?: boolean;
  /** 控件 校验规则 */
  rules?: PropFormFieldProps['rules'] | ((rowIndex: string) => PropFormFieldProps['rules']);
  /** 控件联动规则 */
  effects?: (rowIndex: string) => PropFormFieldProps['effects'];
  /** cell自定义渲染 */
  render?: (scope: AnyObject, index: number) => VNode;
  /** 在 搜索 中隐藏 */
  hideInSearch?: boolean;
  /**在 弹窗表单 中删除 */
  hideInForm?: boolean;
  /** 在 table 中隐藏 */
  hideInTable?: boolean;
  /**
   *  @name 可编辑表格是否可编辑
   *
   * @example 不允许编辑
   * editable={false}
   *
   * @example 如果id=1不允许编辑
   * editable={(params)=> params.rowData.id !==1 }
   */
  editable?: false | ((params: ProCellRendererParams) => boolean);
  /** cell自定义渲染 */
  cellRenderer?: ProCellRenderer;
  /** 编辑状态cell自定义渲染 */
  editCellRenderer?: ProCellRenderer;
  /** 表头自定义渲染 */
  headerCellRenderer?: ProHeaderCellRenderer;
  /** 嵌套表头 */
  children?: ProColumn[];
} & {
  [key: string]: any;
};
export type ProColumns = ProColumn[];
// 编辑配置
type ProTableEditType = 'single' | 'multiple' | 'cell' | 'only';
export type ProTableEditProps = {
  type: ProTableEditType;
  /** 是否隐藏操作列 */
  hideColumn?: boolean;
  /** 新增时是否添加默认的一行 */
  defaultRow?: boolean;
  /** 开启键盘 enter 跳转下一个 */
  keyboard?: boolean;
  /** 定义 column 列回车切换下一行，若没有下一行则新增一行，默认最后一列 */
  keyboardNextRow?: string;
  /** 保存一行的文字 */
  saveText?: string | VNode;
  /** 取消编辑一行的文字 */
  cancelText?: string | VNode;
  /** 删除一行的文字 */
  deleteText?: string | VNode;
  /** 编辑一行的文字 */
  editText?: string | VNode;
  /**
   * 编辑按钮属性
   */
  editButtonProps?: ProActionButtonProps;
  /**
   * 删除按钮属性
   */
  deleteButtonProps?: ProActionButtonProps;
  cellProps?: {
    mode?: 'doubleClick' | 'click';
  };
  deletePopconfirmMessage?: string;
  onlyOneLineEditorAlertMessage?: string | VNode;
  onlyAddOneLineAlertMessage?: string | VNode;
  /**
   * 操作列属性
   */
  optionColumnProps?: any;
};
/** 选中相关定义 */
export type ProTableRowSelectionProps<T> = {
  type?: 'checkbox' | 'radio';
  selectedRowKeys: KeyType | KeyType[];
  hideSelectAll?: boolean;
  reserveSelection?: boolean;
  rowClick?: boolean;
  selectable?: (rowData: T) => boolean;
  onChange?: (selectedRowKeys: KeyType[], selectedRows: T[]) => void;
  onSelect?: (selectedRows: T[], row: T) => void | boolean | Promise<boolean>;
};
export type ProTableRowSelectionData<T> = ProTableRowSelectionProps<T> & {
  selectedRowKeys: KeyType[];
};
// RowSelection 处理后的类型, selectable 一定存在
type ProTableRowSelectionAfter<T> = Omit<ProTableRowSelectionData<T>, 'selectable'> & {
  selectable: (row: T) => boolean;
};
/** 展开行定义 */
export type ProTableExpandableProps = {
  defaultExpandAllRows?: boolean;
  defaultExpandedRowKeys?: KeyType[];
  expandedRowKeys?: KeyType[];
  preserveExpandedContent?: boolean;
  onExpandedRowsChange?: (expandedRowKeys: KeyType[], rows: AnyObject[]) => void;
};
export type ProTableOperateType = {
  add: (v: any) => void;
};
export type ProTableRowClassNameParams = { row: any; rowData: any; rowIndex: number };
export type ProTableRowClassName = (data: ProTableRowClassNameParams) => string;
/** 右键菜单配置 */
export type ProTableMenuOption = {
  label: string;
  value?: any;
  disabled?: boolean;
  visible?: boolean;
  children?: ProTableMenuOption[];
};
export type ProTableMenuVisibleParams<T> = {
  options: ProTableMenuOption[];
  // columns: ProColumns
  row?: T;
  rowIndex?: number;
  column?: ProColumn;
  columnIndex?: number;
};
export type ProTableMenuClickParams<T> = {
  menu?: ProTableMenuOption;
  row?: T;
  rowIndex?: number;
  column?: ProColumn;
  columnIndex?: number;
  $event: MouseEvent;
};
export type ProTableMenuConfigType<T> = {
  className?: string;
  visibleMethod?: (v: ProTableMenuVisibleParams<T>) => boolean;
  trigger?: 'row' | 'cell';
  header?: {
    options: ProTableMenuOption[];
  };
  body?: {
    options: ProTableMenuOption[];
  };
};

export type ProTableProps<T = AnyObject> = {
  /** 外层容器类名 */
  containerClass?: string;
  /** 同 containerClass */
  tableClassName?: string;
  /** table 中 body 类名 */
  bodyClassName?: string;
  /** table 中 main 类名 */
  bodyMainClassName?: string;
  /** 自适应高度，设置 true 后 height 则无效 */
  autoHeight?: boolean;
  /** 表格高度 */
  height?: number;
  /** 行样式的处理 */
  rowClassName?: ProTableRowClassName;
  /** 圆角 */
  round?: boolean;
  /** 删除样式 */
  removedKey?: string;
  /** 选择相关 */
  rowSelection?: ProTableRowSelectionProps<T>;
  /** 展开行相关 */
  expandable?: ProTableExpandableProps;
  /** 是否手动触发请求 */
  manualRequest?: boolean;
  /**
   * request 的参数，修改之后会触发更新
   *
   * @example pathname 修改重新触发 request
   * params={{ pathName }}
   */
  params?: AnyObject;
  /** 请求数据的方法 */
  request?: (params: AnyObject) => Promise<any>;
  /** 静态数据源，推荐使用 defaultData。如果 request 存在，会被 request 中的数据覆盖 */
  dataSource?: T[];
  /** 静态数据源，同 dataSource */
  data?: T[];
  /** 同 dataSource */
  defaultData?: T[];
  /** 表格列的 json 配置 */
  columns?: ProColumns;
  /** 开启瀑布流分页 */
  waterfall?: boolean;
  /** 每行的 key 值 */
  rowKey: string;
  /** 分页页码配置 */
  pagination?: ProPagerProps['pagination'] | false;
  /** 表格的工具栏配置 */
  toolbar?: ProTableToolbarProps | false;
  /** 表格编辑行相关的配置 */
  edit?: false | ProTableEditProps['type'] | ProTableEditProps;
  /** 同 edit */
  editable?: false | ProTableEditProps['type'] | ProTableEditProps;
  // editButtons?: ProEditButtonConfig
  /** 新建按钮属性 */
  recordCreatorProps?:
    | (Partial<ButtonProps> & {
        creatorButtonText?: string | VNode;
        /** @default: 'body' */
        placement?: 'body' | 'toolbar';
        /** @default: 'bottom' */
        position?: 'top' | 'bottom';
        onClick: (e: MouseEvent, operate: ProTableOperateType) => void;
      })
    | false;
  /** proform 的 props 透传 */
  formProps?: Omit<ProFormProps, 'initialValues' | 'submitter' | 'grid' | 'fieldErrorType'>;
  /** 数据加载完的回调 onAfterDataLoad 废弃 */
  onLoad?: (data: T[]) => void;
  /**
   * @name 数据加载失败时触发
   */
  onRequestError?: (e: Error) => void;
  /**
   * 数据源变化时的回调函数
   * @type {(data?: T[]) => void}
   */
  onDataChange?: (data?: T[]) => void;
  /**
   * 请求时附带的数据
   * @type {T}
   */
  postData?: (data: T[]) => T[];
  /** 是否开启虚拟滚动 */
  virtual?: boolean;
  /** 初始化选中第一行 */
  firstRowSelected?: boolean;
  /** 搜索表单初始值 */
  defaultSearchForm?: AnyObject;
  /** 表格右键菜单 */
  menuConfig?: ProTableMenuConfigType<T>;
  /** 右键菜单事件 */
  onMenuClick?: (v: ProTableMenuClickParams<T>) => void;
  /** 空态文案 */
  emptyText?: string;
  /** 开启 height 和 max-height 一致 */
  sameMaxHeight?: boolean;
} & {
  [key: string]: any;
};

export type ProTableFormValidateType = Parameters<ProFormInstance['validate']>[0];
export type ProRecordDataType<T> = {
  add: T[];
  edit: T[];
  remove: T[];
};
export type ProTableRowDirection = 'prev' | 'next';
export type ProTableInstance<T> = {
  setLoading: (v: boolean) => void;
  getData: () => T[];
  getDataHasKey: () => T[];
  getTableDataSize: () => number;
  refresh: (v?: boolean) => Promise<any>;
  resize: () => void;
  onSearch: (params?: AnyObject) => void;
  selectFetch: () => void;
  validate: (cb?: ProTableFormValidateType) => Promise<boolean>;
  getFormData: () => T[] | undefined;
  getFormRecord: () => ProRecordDataType<T>;
  setSearchForm: (data: AnyObject) => void;
  getSearchForm: () => AnyObject;
  setTableData: (data: T[], isCover?: boolean) => void;
  setData: (data: T[], isCover?: boolean) => void;
  setDataClad: (data: T | T[]) => void;
  resetForm: (data: T[]) => void;
  navigateRow: (dir: ProTableRowDirection) => void;
  setNavigateRow: () => T;
  updateRow: () => void;
  actions: ProTableProviderProps['actions'] & {
    exportMethod: (options?: ProTableToolbarExportProps) => Promise<any>;
    importMethod: (file: Blob, options?: ProTableToolbarImportProps) => Promise<any>;
  };
  getFormInstances: () => Record<string, any>[];
  getFormInstanceByKey: (key: string, rowData: T) => any;
  setCurrentRow: ProTableContentInstance['setCurrentRow'];
};
export type ProTableEmits<T = AnyObject> = {
  (e: 'menu-click', val: ProTableMenuClickParams<T>): void;
};
export type ProTableRowAndColumnType = {
  row?: any;
  column?: ProColumn;
};
export type ProTableContentProvider = {
  rowAndColumn: Ref<ProTableRowAndColumnType>;
};
