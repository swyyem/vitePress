/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VNode, Ref } from 'vue';
import type {
  FormValidateCallback,
  ButtonProps,
  FormProps,
  FormItemProps,
  FormValidationResult,
} from 'element-plus';

import type { ProFieldPropsType, ProSchemaValueEnumType } from '../proField/index';
import type { Responsive } from '../grid/index';

import type { ProFormListProps } from '../proFormList/index';

export type ProFormValueType = Record<PropertyKey, any>;
export type DisplayEnum = 'none' | 'visible' | 'hidden';

export type ProFieldValueTypeWithFieldComponentProps = {
  text: FiledForm;
  passWord: FiledForm;
  textArea: FiledForm;
  digit: FiledForm;
  autocomplete: FiledForm;
  inputNumber: FiledForm;
  select: FiledForm;
  radio: FiledForm;
  rate: FiledForm;
  slider: FiledForm;
  cascader: FiledForm;
  colorPicker: FiledForm;
  segmented: FiledForm;
  inputTag: FiledForm;
  mention: FiledForm;
  selectV2: FiledForm;
  timePicker: FiledForm;
  timeSelect: FiledForm;
  treeSelect: FiledForm;
  uploadButton: FiledForm;
  uploadDragger: FiledForm;
  checkbox: FiledForm;
  switch: FiledForm;
  datePicker: FiledForm;
  dateTimePicker: FiledForm;
  dateRangePicker: FiledForm;
  dateTimeRangePicker: FiledForm;
  formList: ProFormListProps;
  group: FiledForm;
  option: FiledForm; // 仅做 table 中的操作判断
};
export type ProFieldComponentValueType =
  | Extract<keyof ProFieldValueTypeWithFieldComponentProps, unknown>
  | (string & {});

export type ProEffectContextObject = {
  value: any;
  rules: FormItemProps['rules'];
  option?: ProSchemaValueEnumType | ProSchemaValueEnumType[];
};
export type EffectCallbackType = (k: string, v: any) => void;
export type EffectContextType = {
  $self: ProEffectContextObject;
  $target: ProEffectContextObject | ProEffectContextObject[];
};
type TriggerType = 'change' | 'blur';
export type EffectType = {
  /** 触发方式 */
  trigger?: TriggerType;
  /** 将改变的字段名 */
  target: string | string[];
  /** ProFormField 的属性配置 */
  decorator?: {
    display?: string | ((ctx: EffectContextType, value: ProFormValueType) => DisplayEnum);
    value?: string | ((ctx: EffectContextType, value: ProFormValueType) => any);
    required?: string | ((ctx: EffectContextType, value: ProFormValueType) => boolean);
    rules?: string | ((ctx: EffectContextType, value: ProFormValueType) => FormItemProps['rules']);
    valueEnum?: string | ((ctx: EffectContextType, value: ProFormValueType) => any[]);
  };
  /** ProFormField 内子组件的配置 */
  component?: Partial<Record<string, string | ((ctx: EffectContextType) => any)>>;
  /** 异步一对多的场景 */
  batchLogic?: (
    v: ProFormValueType,
    methods: {
      getValue: (key: string) => ProFormValueType;
      setFormValues: (data: ProFormValueType) => void;
    }
  ) => any;
};

export type ProFormInstance = {
  getFormFullValues: () => ProFormValueType;
  getFormValues: () => ProFormValueType;
  setFormValues: (data: ProFormValueType, isCover?: boolean) => void;
  removeFormValues: (data: ProFormValueType) => void;
  validate: (cb: FormValidateCallback) => FormValidationResult;
  resetFields: (cb: FormValidateCallback) => void;
  submit: () => Promise<any>;
  reset: (e: MouseEvent) => void;
  hasEditorStatus: () => boolean;
  getFormInstances: () => Record<string, any>[];
};

export type PropFormFieldProps = Partial<Omit<FormItemProps, 'prop'>> &
  Pick<ProFieldPropsType, 'mode' | 'fieldProps' | 'valueEnum' | 'request'> & {
    /** 键名，同 formItem 的 prop */
    name: string | string[];
    /** 表单项联动配置 */
    effects?: EffectType[];
    /** 隐藏 label */
    hasLabelSpace?: boolean;
    /** 仅做布局使用 */
    layout?: boolean;
    /** values 中的 key，和 ProField 的 params 不一致 */
    params?: string | string[];
    /** 提示 */
    tooltip?: string;
    /** 表单项的初始值 */
    initialValue?: any;
    /**
     * columns json配置
     */
    columns?: FiledForm[];
    colProps?: Responsive;
    /** label 后的冒号 */
    colon?: boolean;
    /** profield 空态 */
    emptyText?: string;
    /** 控制显示 */
    display?: DisplayEnum;
    /** 设置控件是否获得焦点，用于 table edit 场景 */
    immFocus?: boolean;
    /** value 变化的回调 */
    onValueChange?: (value: any) => void;
  } & { [key: string]: any };

export type SearchConfig = {
  /** 重置按钮的文本 */
  resetText?: string | VNode;
  /** 提交按钮的文本 */
  submitText?: string | VNode;
};

export type SubmitterProps<T = Record<string, any>> = {
  align?: 'left' | 'center' | 'right';
  /** 提交方法 */
  onSubmit?: () => void;
  /** 重置方法 */
  onReset?: (e: MouseEvent) => void;
  /** 搜索的配置，一般用来配置文本 */
  searchConfig?: SearchConfig;
  /** 提交按钮的 props */
  submitButtonProps?: false | Partial<ButtonProps>;
  /** 重置按钮的 props */
  resetButtonProps?: false | Partial<ButtonProps>;
  /** 自定义操作的渲染 */
  render?:
    | ((
        props: SubmitterProps &
          T & {
            submit: () => void;
            reset: (e: MouseEvent) => void;
          },
        doms: VNode[]
      ) => VNode[] | VNode | false)
    | false;
};
type SelectOption = {
  label: string;
  value: string | number | boolean;
};
type BaseFormSchemaProperties = {
  label?: string;
  component: string;
  componentProps?: Record<string, any>;
  rules?: object[];
  effects?: object[];
  options?: SelectOption[];
};
// 基础类型的属性
type PrimitiveProperties = BaseFormSchemaProperties & {
  type: 'string' | 'number' | 'boolean';
  properties?: never;
};
// 复杂类型的属性（必须包含 properties）
type ComplexProperties = BaseFormSchemaProperties & {
  type: 'object' | 'array' | 'void';
  properties: {
    [key: string]: FormSchemaProperties;
  };
};
type FormSchemaProperties = PrimitiveProperties | ComplexProperties;
export type ProFormFieldJson = {
  type: 'object' | 'array' | 'void';
  properties: {
    [key: string]: FormSchemaProperties;
  };
};

export interface ProFormProps<T = ProFormValueType>
  extends Partial<Omit<FormProps, 'model'>>,
    Pick<ProFieldPropsType, 'mode'>,
    Pick<PropFormFieldProps, 'colon' | 'emptyText'> {
  /** 表单初始值 */
  initialValues?: T | Ref<T>;
  /** 表单请求数据的方法 */
  request?: (params: ProFormValueType) => Promise<any>;
  /** 请求参数 */
  params?: ProFormValueType;
  /** 是否同步到初始值 */
  // syncToInitialValues?: boolean
  /** 是否忽略空值 */
  omitNil?: boolean;
  /** 是否自动聚焦第一个输入框 */
  autoFocusFirstInput?: boolean;
  /** 提交按钮配置 */
  submitter?: SubmitterProps | false;
  /** JSON 配置生成表单项 */
  columns?: FiledForm[];
  /** 表单重置回调 */
  onReset?: (e: MouseEvent) => void;
  /** 表单提交回调 */
  onSubmit?: (values: T) => void | Promise<any>;
  /** 表单提交且数据验证成功后回调 */
  onFinish?: (values: T) => void | Promise<any>;
  /** 表单提交且数据验证失败后回调 */
  onFinishFailed?: (values: T) => void;
  /** 表单项值变化回调 */
  onValuesChange?: (changedValues: Partial<T>, allValues: T) => void;
  /** 是否为搜索表单 */
  searchForm?: boolean;
  /** 是否显示搜索按钮 */
  searchBtn?: boolean;
  /** 栅格间隔 */
  gutter?: [number, number] | number;
  /** 表单列限制 */
  colLimit?: number;
  /** 表单初始化完成回调 */
  onInit?: (values: T, form: ProFormInstance) => void;
  /** 表单标题 */
  formTitle?: string;
  /** field 错误提示方式 */
  fieldErrorType?: 'icon' | 'tip';
  /** 表单标题样式 */
  formTitleClass?: string;
  /** 初始化时执行 effects */
  initEffect?: boolean;
  /** 是否grid布局 */
  grid?: boolean;
  /** 格式化表单的值 */
  formatValue?: (value: ProFormValueType) => ProFormValueType;
}

export type GroupProps = {
  labelPosition: 'left' | 'right' | 'top';
  labelWidth: string;
  labelSuffix: string;
  inline: boolean;
  colon?: boolean;
  emptyText?: string;
  fieldErrorType: string;
  initEffect: boolean;
  grid: boolean;
};

export type FormJsonType = {
  columns?: FiledForm[];
};

export type FiledForm = PropFormFieldProps &
  Omit<ProFieldPropsType, 'mode' | 'fieldProps' | 'valueEnum' | 'request' | 'valueType'> & {
    valueType?: ProFieldComponentValueType;
  };
