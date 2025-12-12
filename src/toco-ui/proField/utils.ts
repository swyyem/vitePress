import { dayjs } from 'element-plus';
import { h } from 'vue';
import type { Component, Ref, VNode } from 'vue';
import { isEqual as lodashEqual } from 'lodash-unified';
// 组件
import Input from './components/input';
import Autocomplete from './components/autocomplete';
import Checkbox from './components/checkbox';
import InputNumber from './components/inputNumber';
import Select from './components/select';
import Radio from './components/radio';
import Rate from './components/rate';
import Slider from './components/slider';
import Switch from './components/switch';
import Avatar from './components/avatar';
import Image from './components/image';
import Cascader from './components/cascader';
import ColorPicker from './components/colorPicker';
import Segmented from './components/segmented';
import Divider from './components/divider';
import InputTag from './components/inputTag';
import Mention from './components/mention';
import SelectV2 from './components/selectV2';
import TimePicker from './components/timePicker';
import TimeSelect from './components/timeSelect';
import TreeSelect from './components/treeSelect';
import Transfer from './components/transfer';
import Upload from './components/upload';
import Button from './components/button';
import DatePicker from './components/datePicker';
import InputPrice from './components/inputPrice';

// @typescript-eslint/no-explicit-any

// 定义类型
type ValueEnumItem = { value: any; label: string; children?: ValueEnumItem[] };
type OptionItem = {
  value: any;
  label: string;
  disabled?: boolean;
  status?: string;
  color?: string;
};
type RequestFunction = (...args: any[]) => Promise<any>;
type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => Promise<ReturnType<T>>;

// 默认组件映射
const defaultComponentMap: Record<string, Component> = {
  text: Input,
  autocomplete: Autocomplete,
  checkbox: Checkbox,
  inputNumber: InputNumber,
  select: Select,
  radio: Radio,
  rate: Rate,
  slider: Slider,
  switch: Switch,
  avatar: Avatar,
  image: Image,
  cascader: Cascader,
  colorPicker: ColorPicker,
  segmented: Segmented,
  divider: Divider,
  inputTag: InputTag,
  mention: Mention,
  selectV2: SelectV2,
  timePicker: TimePicker,
  timeSelect: TimeSelect,
  treeSelect: TreeSelect,
  transfer: Transfer,
  upload: Upload,
  button: Button,
  datePicker: DatePicker,
  option: Select, // 为了操作栏配置
  price: InputPrice,
};

// 定义全局的组件映射，默认内置的
const componentMap: Record<string, Component> = { ...defaultComponentMap };

/**
 * 检查组件是否已注册
 * @param name 组件名称
 * @returns 是否已注册
 */
const checkComponentRegistration = (name: string): boolean => {
  if (componentMap[name]) {
    console.error(`组件"${name}"已注册。它将被覆盖。`);
    return false;
  }
  return true;
};

/**
 * 注册单个组件
 * @param name 组件名称
 * @param component 组件实例
 */
const registerSingleComponent = (name: string, component: Component): void => {
  if (!name || !component) {
    throw new Error('组件注册需要同时提供名称和组件');
  }
  checkComponentRegistration(name);
  // 允许覆盖
  componentMap[name] = component;
};

/**
 * 注册组件
 * @param param 组件名称或组件映射对象
 * @param component 可选，当param为字符串时必传组件实例
 */
export const registerComponent = (
  param: string | Record<string, Component>,
  component?: Component
): void => {
  if (!param) {
    throw new Error('组件注册需要名称或组件映射');
  }

  if (typeof param === 'string') {
    // 处理单个组件注册
    if (!component) {
      throw new Error('在注册名称时，需要提供组件实例');
    }
    registerSingleComponent(param, component);
  } else if (typeof param === 'object' && !Array.isArray(param)) {
    // 处理批量组件注册
    Object.entries(param).forEach(([name, comp]) => {
      registerSingleComponent(name, comp);
    });
  } else {
    throw new Error('组件注册的参数类型无效');
  }
};

/**
 * 获取组件映射
 * @returns 组件映射对象
 */
export const getComponentMap = (): Record<string, Component> => {
  return { ...componentMap };
};

// 防抖函数缓存
const debounceCache = new Map<RequestFunction, DebouncedFunction<RequestFunction>>();

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param wait 等待时间(ms)
 * @returns 防抖后的函数
 */
const debounce = <T extends RequestFunction>(func: T, wait: number): DebouncedFunction<T> => {
  let timeout: number | null = null;

  return async function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeout !== null) clearTimeout(timeout);

    return new Promise<ReturnType<T>>(resolve => {
      timeout = setTimeout(async () => {
        try {
          const result = await func.apply(this, args);
          resolve(result);
        } catch (error) {
          console.error('Debounced function error:', error);
          throw error;
        }
      }, wait) as unknown as number; // 类型断言
    });
  };
};

export type PropsType = {
  request?: RequestFunction;
  valueEnum?: ValueEnumItem[];
  params?: any;
  fieldProps?: { options?: OptionItem[] };
  debounceTime?: number;
};

/**
 * 处理请求数据
 * @param props 包含请求配置的属性对象
 * @returns 处理后的数据数组
 */
export const handleRequest = async (props: PropsType): Promise<any[]> => {
  const { request, valueEnum = [], params, fieldProps = {}, debounceTime = 300 } = props;

  // 优先使用静态选项
  if (fieldProps.options?.length) {
    return fieldProps.options;
  }

  if (valueEnum.length) {
    return valueEnum;
  }

  if (typeof request === 'function') {
    try {
      // 从缓存获取或创建防抖函数
      if (!debounceCache.has(request)) {
        debounceCache.set(request, debounce(request, debounceTime));
      }
      const debouncedRequest = debounceCache.get(request)!;
      return await debouncedRequest(params);
    } catch (error) {
      console.error('Request failed:', error);
      return [];
    }
  }

  return [];
};

// 判断两个对象是否相等
export const isEqual = lodashEqual;

/**
 * 构建值-标签映射
 * @param options 选项数组
 * @param map 可选的现有映射
 * @returns 值-标签映射
 */
export const buildValueLabelMap = (
  options: ValueEnumItem[],
  map: Map<any, string> = new Map()
): Map<any, string> => {
  options.forEach(option => {
    if (option.value !== undefined && option.label !== undefined) {
      map.set(option.value, option.label);
      if (option.children?.length) {
        buildValueLabelMap(option.children, map);
      }
    }
  });
  return map;
};

/**
 * 根据值获取标签
 * @param value 要查找的值
 * @param valueLabelMap 值-标签映射
 * @returns 对应的标签
 */
export const getLabelFromValue = (value: any, valueLabelMap: Ref<Map<any, string>>): string => {
  if (!value) return '';

  if (Array.isArray(value)) {
    return value
      .map(val => {
        const actualValue = val?.value ?? val;
        return valueLabelMap.value.get(actualValue) ?? '';
      })
      .filter(Boolean)
      .join(' / ');
  }

  const actualValue = value?.value ?? value;
  return valueLabelMap.value.get(actualValue) ?? '';
};

/**
 * 只读模式渲染
 * @param options 选项数组
 * @param props 组件属性
 * @returns 渲染节点和文本
 */
export const renderRead = (
  options: Ref<OptionItem[]>,
  props: { modelValue: any }
): { renderChildH: VNode[]; text: string } => {
  const { modelValue } = props;
  const renderChildH: VNode[] = [];
  let text = '';

  const filteredOptions = options.value.filter(option =>
    Array.isArray(modelValue) ? modelValue.includes(option.value) : option.value === modelValue
  );

  filteredOptions.forEach((option, index) => {
    const label = option.label ?? '';
    const isLast = index === filteredOptions.length - 1;
    const displayText = isLast ? label : `${label},`;

    if (option.status || option.color) {
      renderChildH.push(
        h('span', {
          style: {
            marginRight: '5px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: option.color,
            display: 'inline-block',
          },
          class: option.status ? { [option.status]: true } : undefined,
        }),
        h('span', {}, displayText)
      );
    } else {
      renderChildH.push(h('span', {}, displayText));
    }

    text += displayText;
  });

  return { renderChildH, text };
};

/**
 * 格式化日期
 * @param date 日期值
 * @param format 格式字符串
 * @returns 格式化后的日期字符串
 */
const formatDate = (date: string | number, format = 'YYYY-MM-DD HH:mm:ss'): string => {
  try {
    return dayjs(date).isValid() ? dayjs(date).format(format) : '';
  } catch {
    return '';
  }
};

/**
 * 格式化模型值
 * @param modelValue 模型值
 * @param emptyText 空值显示的文本
 * @param format 日期格式
 * @returns 格式化后的字符串
 */
export const formatModelValue = (modelValue: any, emptyText = '', format?: string): string => {
  if (!modelValue || modelValue === '-') {
    return emptyText;
  }

  if (Array.isArray(modelValue)) {
    if (modelValue.length === 2) {
      return `${formatDate(modelValue[0])} - ${formatDate(modelValue[1], format)}`;
    }
    return formatDate(modelValue[0], format);
  }

  return formatDate(modelValue, format);
};

/**
 * 检查值是否为空
 */
export const isEmpty = (value: any): boolean => {
  return value === undefined || value === null || value === '';
};

/**
 * 过滤禁用的选项
 */
export const filterDisabledOptions = (options: OptionItem[] = []): OptionItem[] => {
  return options.filter(item => !item.disabled);
};
