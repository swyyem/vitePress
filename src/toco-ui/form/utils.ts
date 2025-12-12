import { isRef, type Ref } from 'vue';
import type { ProFormValueType, PropFormFieldProps } from './index';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 深度克隆任意 JavaScript 对象/值
 * @param obj 要克隆的对象或值
 * @param map WeakMap 用于处理循环引用（内部使用，调用时无需传递）
 * @returns 完全独立的克隆副本
 *
 * 功能特点：
 * 1. 支持所有 JavaScript 基本类型和引用类型
 * 2. 正确处理循环引用
 * 3. 保持特殊对象类型（Date/RegExp等）不变
 * 4. 保留原型链
 * 5. 只克隆对象自身属性（不克隆继承属性）
 */
export function structuredClone<T>(obj: T, map = new WeakMap()): T {
  // ============= 基本类型处理 =============
  // null、undefined、string、number、boolean、symbol、bigint 等基本类型
  // 直接返回原值（因为这些类型本身就是不可变的）
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // ============= 循环引用处理 =============
  // 如果已经克隆过该对象，则从缓存中直接返回克隆过的副本
  // 防止无限递归导致栈溢出
  if (map.has(obj)) {
    return map.get(obj);
  }

  // ============= 特殊对象处理 =============
  // Date 对象 - 创建新实例但保持相同时间戳
  if (obj instanceof Date) {
    const clone = new Date(obj.getTime());
    map.set(obj, clone);
    return clone as T;
  }

  // RegExp 对象 - 创建新实例但保持相同模式和标志
  if (obj instanceof RegExp) {
    const clone = new RegExp(obj.source, obj.flags);
    map.set(obj, clone);
    return clone as T;
  }

  // ============= 数组处理 =============
  // 创建新数组并递归克隆每个元素
  if (Array.isArray(obj)) {
    const clone: any[] = [];
    map.set(obj, clone); // 先存入缓存，再处理元素（处理可能的自引用）

    // 使用 for 循环而非 forEach/map 以获得更好性能
    for (let i = 0; i < obj.length; i++) {
      clone[i] = structuredClone(obj[i], map);
    }
    return clone as T;
  }

  // ============= 普通对象处理 =============
  // 创建新对象，保持原型链
  const clone = Object.create(Object.getPrototypeOf(obj));
  map.set(obj, clone); // 先存入缓存，再处理属性（处理可能的自引用）

  // 遍历对象自身属性（不包括原型链上的属性）
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = structuredClone(obj[key], map);
    }
  }

  return clone;
}

type CleanedType<T> = T extends Date
  ? Date
  : T extends RegExp
    ? RegExp
    : T extends Array<infer U>
      ? Array<CleanedType<U>>
      : T extends object
        ? { [K in keyof T]?: CleanedType<T[K]> }
        : T;

/**
 * 清理对象中的空值（null/undefined），递归处理嵌套对象和数组
 * 保留 Date 和 RegExp 等特殊对象不变
 * @param data 要处理的数据对象
 * @returns 清理后的纯净数据对象
 */
export const disposeDataByEmpty = <T>(data: T): CleanedType<T> => {
  // 处理特殊对象类型（Date/RegExp），直接返回不处理
  if (data instanceof Date || data instanceof RegExp) {
    return data as CleanedType<T>;
  }

  // 处理数组：递归处理每个元素并过滤掉空值
  if (Array.isArray(data)) {
    return data
      .map(item => disposeDataByEmpty(item))
      .filter(item => item !== null && item !== undefined) as CleanedType<T>;
  }

  // 处理普通对象：递归处理每个属性并过滤掉空值属性
  if (typeof data === 'object' && data !== null) {
    const result: any = {};
    for (const [key, value] of Object.entries(data)) {
      const processedValue = disposeDataByEmpty(value);
      if (processedValue !== null && processedValue !== undefined) {
        result[key] = processedValue;
      }
    }
    return result as CleanedType<T>;
  }

  // 处理基本类型（非对象），直接返回
  return data as CleanedType<T>;
};

/**
 * 从对象中剔除指定的属性，返回剩余属性的新对象
 * @param props 原始对象
 * @param omitKeys 需要剔除的属性名数组
 * @returns 不包含指定属性的新对象
 */
export const omitProps = <T extends Record<string, unknown>, K extends keyof T>(
  props: T,
  omitKeys: readonly K[]
): Omit<T, K> => {
  const result: Partial<Record<Exclude<keyof T, K>, unknown>> = {};

  // 获取对象所有字符串键
  const keys = Object.keys(props) as Array<Extract<keyof T, string>>;

  // 过滤并复制剩余属性
  for (const key of keys) {
    if (!(omitKeys as readonly string[]).includes(key)) {
      // 这里需要双重断言确保类型安全
      result[key as unknown as Exclude<keyof T, K>] = props[key];
    }
  }

  return result as Omit<T, K>;
};

/**
 * 从表单值中提取指定参数，返回包含这些参数的新对象
 * @param params 需要提取的参数名（单个字符串或字符串数组）
 * @param values 表单值对象
 * @returns 包含提取参数的新对象
 *
 * 功能特点：
 * 1. 支持单个参数名或参数名数组
 * 2. 自动过滤掉值为 undefined/null 的参数
 * 3. 返回新对象，不影响原表单值
 */
export const transferParams = (
  params: PropFormFieldProps['params'],
  values: ProFormValueType
): Partial<ProFormValueType> => {
  // 如果没有指定参数，返回空对象
  if (!params) {
    return {};
  }

  const result: Partial<ProFormValueType> = {};

  // 统一处理参数名为数组形式
  const keysToExtract = Array.isArray(params) ? params : [params];

  // 提取有效的参数值
  keysToExtract.forEach(key => {
    const value = values?.[key];
    // 只包含真实存在的值（非undefined/null）
    if (value != null) {
      result[key] = value;
    }
  });

  return result;
};

/**
 * 获取纯净的表单数据（去除响应式包装，可选过滤空值）
 * @param initialValues 原始表单数据（可能是普通对象或Vue的ref对象）
 * @param omitNil 是否过滤null/undefined值，默认为false
 * @returns 处理后的纯净数据对象
 *
 * 功能特点：
 * 1. 自动处理Vue的ref对象，获取其值
 * 2. 深度克隆数据，确保返回全新对象
 * 3. 可选过滤空值（null/undefined）
 * 4. 保持原始数据结构不变
 */
export const getPureData = <T extends ProFormValueType>(
  initialValues: T | Ref<T>,
  omitNil?: boolean
): T => {
  // 获取原始值（如果是ref则取.value）
  const rawData = isRef(initialValues) ? initialValues.value : initialValues;

  // 深度克隆数据，避免引用问题
  const clonedData = structuredClone(rawData);

  // 根据参数决定是否过滤空值
  if (omitNil) {
    return disposeDataByEmpty(clonedData) as T;
  }
  return clonedData;
};
