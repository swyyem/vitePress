import { isArray } from './types'

// 数组去重
export const unique = <T>(arr: T[]) => [...new Set(arr)]

// 提取第一个元素
export const extractFirst = <T>(arr: T | T[]): T => {
  return isArray(arr) ? arr[0] : arr
}

type Many<T> = T | ReadonlyArray<T>
// 确保数组格式
export const castArray = <T>(arr: Many<T>): T[] => {
  if (!arr && (arr as any) !== 0) return []
  return isArray(arr) ? arr : [arr as T]
}

// TODO: remove import alias
// avoid naming conflicts
export { castArray as ensureArray } from 'lodash-unified'
