/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  Slots,
  VNodeChild,
  VNode,
  ExtractPropTypes,
  Component,
} from "vue";
import type {
  AutocompleteProps,
  InputProps,
  InputNumberProps,
  SelectProps,
  CheckboxGroupProps,
  CheckboxProps,
  RadioGroupProps,
  RateProps,
  SwitchProps,
  SliderProps,
  AvatarProps,
  ImageProps,
  ColorPickerProps,
  SegmentedProps,
  DividerProps,
  InputTagProps,
  MentionProps,
  SelectV2Props,
  TimePickerDefaultProps,
  TimeSelectProps,
  TransferProps,
  UploadProps,
  ButtonProps,
  DatePickerProps,
  OptionV2Props,
  cascaderProps,
} from "element-plus";
import type { TextSpecifiledProps } from "./components/text/type";

/**
 * ======================
 * 基础类型定义
 * ======================
 */

export type { Slots };

export type { VNode };
/**
 * 上传组件扩展属性
 */
interface ExtendedUploadProps extends UploadProps {
  "file-list"?: unknown[];
}

/**
 * 数字格式化选项
 */
interface NumberFormatOptions {
  /** 本地化，如 zh-CN、en-US */
  locale?: string;
  /** 格式类型："decimal", "currency", "percent" */
  typeStyle?: string;
  /** 货币类型，如 "USD", "CNY"（需配合 style: "currency"） */
  currency?: string;
  /** 小数位数，默认 2 */
  decimalPlaces?: number;
  /** 是否启用千分位分隔，默认 true */
  useGrouping?: boolean;
  /** 输入事件处理 */
  onInput?: (val: string) => void;
}

/**
 * ======================
 * 组件属性类型定义
 * ======================
 */

/** 价格输入框属性 */
export type ProInputPriceProps = InputProps & NumberFormatOptions;

/** 数字输入框属性 */
export type ProInputNumberProps = InputNumberProps & NumberFormatOptions;

/** 复选框组属性 */
export type ProCheckboxProps = (CheckboxGroupProps | CheckboxProps) & {
  multiple?: boolean;
  readContinue?: boolean;
  checkAll?: boolean;
  checkAllText?: string;
  gap?: number;
  style?: Partial<CSSStyleDeclaration>;
  "onUpdate:modelValue"?: (
    val: ProSchemaValueEnumValue[] | ProSchemaValueEnumValue
  ) => void;
};

/** 选择器属性 */
export type ProSelectProps = SelectProps & {
  checkAll?: boolean;
  checkAllText?: string;
  style?: Partial<CSSStyleDeclaration>;
  "onUpdate:modelValue"?: (
    val: ProSchemaValueEnumValue[] | ProSchemaValueEnumValue
  ) => void;
};

/**
 * ======================
 * 组件实例类型定义
 * ======================
 */

/** ProField 组件实例方法 */
export interface ProFieldControlInstance {
  getText: (val: unknown) => unknown;
  getChild: () => unknown;
  childRef: unknown;
}

/**
 * ======================
 * 值类型与属性映射
 * ======================
 */

/** 字段值类型与对应组件属性的映射 */
export type ProFieldValueTypeWithFieldProps = {
  text: InputProps;
  autocomplete: AutocompleteProps;
  inputNumber: InputNumberProps;
  select: ProSelectProps;
  checkbox: ProCheckboxProps;
  price: ProInputPriceProps;
  radio: RadioGroupProps;
  rate: RateProps;
  slider: SliderProps;
  switch: SwitchProps;
  avatar: AvatarProps;
  image: ImageProps;
  cascader: ExtractPropTypes<typeof cascaderProps>;
  colorPicker: ColorPickerProps;
  segmented: SegmentedProps;
  divider: DividerProps;
  inputTag: InputTagProps;
  mention: MentionProps;
  selectV2: SelectV2Props;
  timePicker: TimePickerDefaultProps;
  timeSelect: TimeSelectProps;
  transfer: TransferProps;
  treeSelect: any;
  upload: ExtendedUploadProps;
  button: ButtonProps;
  datePicker: DatePickerProps;
  option: OptionV2Props;
};

/** ProField 支持的值类型 */
export type ProFieldValueType =
  | keyof ProFieldValueTypeWithFieldProps
  | (string & {});

/** ProField 的显示模式 */
export type ProFieldFCMode = "read" | "edit";

/**
 * ======================
 * 数据相关类型定义
 * ======================
 */

/** 远程请求数据类型 */
export type ProFieldRequestData<T = unknown> = (
  data?: unknown
) => Promise<Array<ProSchemaValueEnumType | T>>;

/** 枚举值类型 */
export type ProSchemaValueEnumValue = unknown;

/** 枚举项配置 */
export interface ProSchemaValueEnumType {
  /** 显示文案 */
  label: VNodeChild;
  /** 实际值 */
  value: ProSchemaValueEnumValue;
  /** 状态颜色 */
  status?: string;
  /** 自定义颜色 */
  color?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 其他自定义属性 */
  [key: string]: unknown;
}

/**
 * ======================
 * ProField 核心属性类型
 * ======================
 */

/** ProField 组件属性 */
export interface ProFieldPropsType<
  T extends ProFieldValueType = ProFieldValueType
> {
  /** 组件模式：只读或编辑 */
  mode?: ProFieldFCMode;

  /** 空值显示文本 */
  emptyText?: string;

  /** 渲染的组件类型 */
  valueType?: T;

  /** 传递给 valueType 组件的属性 */
  fieldProps?: T extends keyof ProFieldValueTypeWithFieldProps
    ? ProFieldValueTypeWithFieldProps[T]
    : unknown;

  /** 文本显示属性 */
  textProps?: Omit<TextSpecifiledProps, "copyText">;

  /** 双向绑定的值 */
  modelValue?: unknown;

  /** 编辑模式自定义渲染 */
  renderFormItem?: (text: unknown, props: unknown, dom: VNode) => VNode;

  /** 只读模式自定义渲染 */
  render?: (text: unknown, props: unknown) => VNode;

  /** 枚举数据 */
  valueEnum?: Array<ProSchemaValueEnumType | string>;

  /** 远程获取枚举数据 */
  request?: ProFieldRequestData;

  /** 请求参数 */
  params?: unknown;

  /** 防抖时间 */
  debounceTime?: number;

  /** 按钮文本/Dragger 文本 */
  title?: string;

  /** 按钮图标/Dragger 图标 */
  icon?: Component;

  /** Dragger 描述 */
  description?: string;
}
