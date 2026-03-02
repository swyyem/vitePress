/**
 * 判断值是否为 null 或 undefined
 *
 * @param v 待检测的值
 */
export function isNullOrUndefined(v: any): v is null | undefined {
  return v === null || v === undefined
}

/**
 * 判断传入值是否为函数类型
 *
 * @param fn 值
 */
export function isFunction(fn: unknown): fn is (...args: unknown[]) => unknown {
  return typeof fn === 'function'
}

/**
 * 将原始类型转换为对应的包装对象（如 string -> String），
 * 如果已是对象则直接返回。
 *
 * @param value 任意值
 */
export function toObject<T>(value: T): T | object {
  if (value !== null && value !== undefined && typeof value !== 'object') {
    try {
      return Object(value)
    } catch {
      // 转换失败时原样返回
      return value
    }
  }
  return value as any
}

/**
 * 对任意值执行 instanceof 检查，包含安全保护与原始值包装处理。
 *
 * @param value 待检测的值
 * @param classFunction 构造函数
 */
export function safeInstanceOf(value: any, classFunction: any): boolean {
  if (isNullOrUndefined(value) || !isFunction(classFunction)) {
    return false
  }

  const candidate = toObject(value)

  try {
    return candidate instanceof classFunction
  } catch {
    return false
  }
}

/**
 * 检查指定值是否为目标类/构造函数的实例
 *
 * @param value 待检测的值
 * @param classFunction 目标构造函数
 * @returns 是否为目标类实例的布尔值
 */
export function checkIfInstanceOf(value: any, classFunction: any): boolean {
  // 简单委托给更完善的 safeInstanceOf 工具
  return safeInstanceOf(value, classFunction)
}

/**
 * 判断是否为数组
 */
export function isArray(v: any): v is any[] {
  return Array.isArray(v)
}

/**
 * 判断是否为对象（不包括 null）
 */
export function isObject(v: any): v is object {
  return v !== null && typeof v === 'object'
}

/**
 * 判断是否为普通对象（原型为 Object.prototype）
 */
export function isPlainObject(v: any): v is Record<string, any> {
  return isObject(v) && Object.getPrototypeOf(v) === Object.prototype
}

/**
 * 判断是否为 Promise
 */
export function isPromise(v: any): v is Promise<any> {
  return isObject(v) && isFunction((v as any).then) && isFunction((v as any).catch)
}

/**
 * 判断是否为字符串
 */
export function isString(v: any): v is string {
  return typeof v === 'string'
}

/**
 * 判断是否为数字（排除 NaN）
 */
export function isNumber(v: any): v is number {
  return typeof v === 'number' && !isNaN(v)
}

/**
 * 判断是否为布尔值
 */
export function isBoolean(v: any): v is boolean {
  return typeof v === 'boolean'
}

/**
 * 判断是否为 Date 实例
 */
export function isDate(v: any): v is Date {
  return v instanceof Date && !isNaN(v.getTime())
}

/**
 * 简单断言，如果条件为 false 则抛出错误
 */
export function assert(condition: any, message = 'Assertion failed'): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}

/**
 * 对象浅合并，类似 Object.assign
 */
export function mergeObjects<T extends object, U extends object>(
  target: T,
  ...sources: U[]
): T & U {
  return Object.assign(target, ...sources)
}

/**
 * 从对象中选择指定键，返回新对象
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach(k => {
    if (k in obj) {
      result[k] = obj[k]
    }
  })
  return result
}

/**
 * 从对象中删除指定键，返回新对象
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj } as any
  keys.forEach(k => {
    delete result[k]
  })
  return result
}

/**
 * 延迟指定毫秒后解析的 Promise
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 判断数组、字符串或普通对象是否为空
 */
export function isEmpty(v: any): boolean {
  if (v == null) return true
  if (Array.isArray(v) || typeof v === 'string') return v.length === 0
  if (isPlainObject(v)) return Object.keys(v).length === 0
  return false
}

/**
 * 防抖函数，返回处理后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait = 0
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), wait)
  }
}

/**
 * 节流函数，返回处理后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  wait = 0
): (...args: Parameters<T>) => void {
  let last = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - last >= wait) {
      last = now
      fn(...args)
    }
  }
}

/**
 * 生成 [min, max] 之间的随机整数
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 扁平化任意嵌套数组
 */
export function flatten(arr: any[]): any[] {
  return arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [] as any[])
}

/**
 * 数组去重
 */
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}

/**
 * 将字符串首字母大写
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 限定数值在[min, max]范围内
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * 生成指定范围的整型数组
 */
export function range(start: number, end: number, step = 1): number[] {
  const arr: number[] = []
  for (let i = start; i <= end; i += step) arr.push(i)
  return arr
}

/**
 * Camel case 转换
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, c => c.toLowerCase())
}

/**
 * Kebab case 转换
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase()
}

/**
 * 查询字符串解析
 */
export function parseQueryString(qs: string): Record<string, string> {
  const obj: Record<string, string> = {}
  qs.replace(/^[?#]/, '')
    .split('&')
    .forEach(param => {
      const [key, val] = param.split('=')
      if (key) obj[decodeURIComponent(key)] = decodeURIComponent(val || '')
    })
  return obj
}

/**
 * 对象转查询字符串
 */
export function stringifyQuery(obj: Record<string, any>): string {
  return Object.keys(obj)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]?.toString() || ''))
    .join('&')
}

/**
 * 防抖版本，返回会返回 Promise 并等待执行
 */
export function debouncePromise<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  wait = 0
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let resolver: ((value: any) => void) | null = null
  return (...args: Parameters<T>) =>
    new Promise(resolve => {
      if (timeout) clearTimeout(timeout)
      resolver = resolve
      timeout = setTimeout(async () => {
        const result = await fn(...args)
        if (resolver) resolver(result)
      }, wait)
    }) as unknown as Promise<ReturnType<T>>
}

/**
 * 判断是否是可迭代对象
 */
export function isIterable(v: any): v is Iterable<any> {
  return v != null && typeof v[Symbol.iterator] === 'function'
}

/**
 * 判断是否为 Map
 */
export function isMap(v: any): v is Map<any, any> {
  return v instanceof Map
}

/**
 * 判断是否为 Set
 */
export function isSet(v: any): v is Set<any> {
  return v instanceof Set
}

/**
 * 等待条件成立或超时
 */
export function waitFor(
  check: () => boolean | Promise<boolean>,
  interval = 50,
  timeout = 2000
): Promise<boolean> {
  const start = Date.now()
  return new Promise(resolve => {
    const timer = setInterval(async () => {
      const ok = await check()
      if (ok || Date.now() - start >= timeout) {
        clearInterval(timer)
        resolve(ok)
      }
    }, interval)
  })
}

/**
 * 深拷贝（基于 JSON，无法处理函数/循环引用）
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 确保值为数组形式
 */
export function ensureArray<T>(v: T | T[]): T[] {
  return Array.isArray(v) ? v : [v]
}

/**
 * 空函数
 */
export function noop(): void {}

/**
 * 恒等函数，返回自身
 */
export function identity<T>(v: T): T {
  return v
}

/**
 * 创建只执行一次的函数
 */
export function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false
  let result: any
  return ((...args: any[]) => {
    if (!called) {
      called = true
      result = fn(...args)
    }
    return result
  }) as T
}

/**
 * 简易记忆化，缓存上一次参数与结果
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  let lastArgs: any[] | null = null
  let lastResult: any
  return ((...args: any[]) => {
    if (lastArgs && args.length === lastArgs.length && args.every((v, i) => v === lastArgs![i])) {
      return lastResult
    }
    lastArgs = args
    lastResult = fn(...args)
    return lastResult
  }) as T
}

/**
 * 递归合并两个或多个对象
 */
export function deepMerge(target: any, ...sources: any[]): any {
  if (!sources.length) return target
  const src = sources.shift()
  if (isPlainObject(target) && isPlainObject(src)) {
    Object.keys(src).forEach(key => {
      if (isPlainObject(src[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        deepMerge(target[key], src[key])
      } else {
        Object.assign(target, { [key]: src[key] })
      }
    })
  }
  return deepMerge(target, ...sources)
}

/**
 * 根据 predicate 过滤对象保留键
 */
export function pickBy<T extends object>(
  obj: T,
  predicate: (val: any, key: string) => boolean
): Partial<T> {
  const res: any = {}
  Object.keys(obj).forEach(k => {
    const v = (obj as any)[k]
    if (predicate(v, k)) res[k] = v
  })
  return res
}

/**
 * 根据 predicate 过滤对象移除键
 */
export function omitBy<T extends object>(
  obj: T,
  predicate: (val: any, key: string) => boolean
): Partial<T> {
  const res: any = {}
  Object.keys(obj).forEach(k => {
    const v = (obj as any)[k]
    if (!predicate(v, k)) res[k] = v
  })
  return res
}

/**
 * 按指定键函数对数组分组
 */
export function groupBy<T>(arr: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return arr.reduce(
    (acc, cur) => {
      const key = keyFn(cur)
      acc[key] = acc[key] || []
      acc[key].push(cur)
      return acc
    },
    {} as Record<string, T[]>
  )
}

/**
 * 从数组随机取一个元素
 */
export function randomChoice<T>(arr: T[]): T | undefined {
  if (!arr || arr.length === 0) return undefined
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * 判断数字是否为偶数
 */
export function isEven(n: number): boolean {
  return n % 2 === 0
}

/**
 * 判断数字是否为奇数
 */
export function isOdd(n: number): boolean {
  return n % 2 !== 0
}

/**
 * 简单日期格式化（支持 YYYY MM DD hh mm ss）
 */
export function formatDate(date: Date, format = 'YYYY-MM-DD hh:mm:ss'): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  const map: Record<string, string> = {
    YYYY: String(date.getFullYear()),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    hh: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
  }
  return format.replace(/YYYY|MM|DD|hh|mm|ss/g, m => map[m])
}

/**
 * 转换为数字，失败时返回默认值
 */
export function toNumber(v: any, def = 0): number {
  const n = Number(v)
  return isNaN(n) ? def : n
}

/**
 * 转换为布尔值
 */
export function toBoolean(v: any): boolean {
  if (typeof v === 'boolean') return v
  if (typeof v === 'string') {
    const s = v.trim().toLowerCase()
    return s === 'true' || s === '1'
  }
  return Boolean(v)
}

/**
 * 将数组分块
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const res: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size))
  }
  return res
}

/**
 * 随机打乱数组
 */
export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * 将多个数组按索引组合
 */
export function zip(...arrays: any[][]): any[][] {
  const len = Math.max(...arrays.map(a => a.length))
  const res: any[][] = []
  for (let i = 0; i < len; i++) {
    res[i] = arrays.map(a => a[i])
  }
  return res
}

/**
 * 给一个 Promise 添加超时
 */
export function timeoutPromise<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms)
    p.then(
      v => {
        clearTimeout(t)
        resolve(v)
      },
      e => {
        clearTimeout(t)
        reject(e)
      }
    )
  })
}

/**
 * 重试异步函数
 */
export async function retry<T>(fn: () => Promise<T>, attempts = 3, delayMs = 0): Promise<T> {
  let lastError: any
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err
      if (delayMs && i < attempts - 1) await sleep(delayMs)
    }
  }
  throw lastError
}

/**
 * 字符串前/后填充
 */
export function padStart(str: string, length: number, padChar = ' '): string {
  return str.padStart(length, padChar)
}
export function padEnd(str: string, length: number, padChar = ' '): string {
  return str.padEnd(length, padChar)
}

/**
 * 截断字符串
 */
export function truncate(str: string, length: number, ellipsis = '...'): string {
  if (str.length <= length) return str
  return str.slice(0, length - ellipsis.length) + ellipsis
}

/**
 * 简单的事件发射器
 */
export function createEventEmitter<Events extends Record<string, any[]>>() {
  const handlers: { [K in keyof Events]?: ((...args: Events[K]) => void)[] } = {}
  return {
    on<K extends keyof Events>(event: K, cb: (...args: Events[K]) => void) {
      ;(handlers[event] || (handlers[event] = [])).push(cb)
    },
    off<K extends keyof Events>(event: K, cb: (...args: Events[K]) => void) {
      handlers[event] = (handlers[event] || []).filter(h => h !== cb)
    },
    emit<K extends keyof Events>(event: K, ...args: Events[K]) {
      ;(handlers[event] || []).slice().forEach(h => h(...args))
    },
  }
}

/**
 * 给日期添加天数
 */
export function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

/**
 * 计算两个日期相差多少天
 */
export function diffDays(a: Date, b: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000
  return Math.round((a.getTime() - b.getTime()) / msPerDay)
}

/**
 * 判断是否为 HTMLElement（运行于浏览器）
 */
export function isHTMLElement(v: any): v is HTMLElement {
  return typeof HTMLElement !== 'undefined' && v instanceof HTMLElement
}

/**
 * 添加/移除/检查 class
 */
export function addClass(el: Element, className: string): void {
  if (el.classList) el.classList.add(className)
  else el.className += ' ' + className
}
export function removeClass(el: Element, className: string): void {
  if (el.classList) el.classList.remove(className)
  else el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '')
}
export function hasClass(el: Element, className: string): boolean {
  if (el.classList) return el.classList.contains(className)
  return new RegExp('\\b' + className + '\\b').test(el.className)
}

/**
 * 简化的 querySelector
 */
export function qs(selector: string, root: Document | Element = document): Element | null {
  return root.querySelector(selector)
}

/**
 * fetch 并解析 JSON（浏览器/Node 环境均可）
 */
export async function fetchJson(url: string, opts?: RequestInit): Promise<any> {
  const res = await fetch(url, opts)
  if (!res.ok) throw new Error(`HTTP error ${res.status}`)
  return res.json()
}
/**
 * 函数组合，从右往左执行
 */
export function compose(
  ...fns: ((...args: unknown[]) => unknown)[]
): (...args: unknown[]) => unknown {
  return (arg: any) => fns.reduceRight((prev, fn) => fn(prev), arg)
}

/**
 * 管道，从左往右执行
 */
export function pipe(...fns: ((...args: unknown[]) => unknown)[]): (...args: unknown[]) => unknown {
  return (arg: any) => fns.reduce((prev, fn) => fn(prev), arg)
}

/**
 * 求数组和/平均值
 */
export function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0)
}
export function average(arr: number[]): number {
  return arr.length === 0 ? 0 : sum(arr) / arr.length
}

/**
 * 数组合并/交集/差集/去重按映射
 */
export function union<T>(...arrays: T[][]): T[] {
  return Array.from(new Set(arrays.flat()))
}
export function intersection<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) return []
  return arrays.reduce((a, b) => a.filter(x => b.includes(x)))
}
export function difference<T>(a: T[], b: T[]): T[] {
  return a.filter(x => !b.includes(x))
}
export function uniqBy<T>(arr: T[], fn: (item: T) => any): T[] {
  const seen = new Set()
  return arr.filter(x => {
    const k = fn(x)
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

/**
 * 判断值是否为 null 或 undefined（别名）
 */
export const isNil = isNullOrUndefined

/**
 * 解析 URL
 */
export function parseUrl(url: string): URL {
  return new URL(url, typeof window !== 'undefined' ? window.location.href : undefined)
}

/**
 * Cookie 操作
 */
export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}
export function setCookie(name: string, value: string, days = 7): void {
  const d = new Date()
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`
}
export function deleteCookie(name: string): void {
  setCookie(name, '', -1)
}

/**
 * localStorage/sessionStorage 简单封装
 */
export const storage = {
  get(key: string, def: any = null) {
    try {
      const v = localStorage.getItem(key)
      return v === null ? def : JSON.parse(v)
    } catch {
      return def
    }
  },
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
}

/**
 * 限制并发执行
 */
export function limitConcurrency<T>(tasks: (() => Promise<T>)[], limit: number): Promise<T[]> {
  const results: T[] = []
  let i = 0
  return new Promise((resolve, reject) => {
    let active = 0
    function next() {
      if (i === tasks.length && active === 0) {
        resolve(results)
      }
      while (active < limit && i < tasks.length) {
        const idx = i++
        active++
        tasks[idx]()
          .then(res => {
            results[idx] = res
            active--
            next()
          })
          .catch(reject)
      }
    }
    next()
  })
}

/**
 * 简单 email 验证
 */
export function isEmail(str: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)
}

/**
 * URL 格式检测
 */
export function isURL(str: string): boolean {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

/**
 * 安全 JSON 解析，失败时返回默认值
 */
export function parseJSON(str: string, def: any = null): any {
  try {
    return JSON.parse(str)
  } catch {
    return def
  }
}

/**
 * 生成简单 uuid v4
 */
export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 将每个单词首字母大写
 */
export function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, c => c.toUpperCase())
}

/**
 * 确保值为数组 (别名)
 */
export const asArray = ensureArray

/**
 * 从数组随机挑选一个元素 (别名)
 */
export const pickRandom = randomChoice

/**
 * 判断是否为原始类型
 */
export function isPrimitive(v: any): boolean {
  return v === null || (typeof v !== 'object' && typeof v !== 'function')
}

/**
 * 递归冻结对象
 */
export function deepFreeze<T>(obj: T): T {
  Object.freeze(obj)
  Object.getOwnPropertyNames(obj).forEach(prop => {
    const value = (obj as any)[prop]
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value)
    }
  })
  return obj
}

/**
 * 异步记忆化，只缓存最近一次
 */
export function memoizeAsync<T extends (...args: any[]) => Promise<any>>(fn: T): T {
  let lastArgs: any[] | null = null
  let lastPromise: Promise<any>
  return (async (...args: any[]) => {
    if (lastArgs && args.length === lastArgs.length && args.every((v, i) => v === lastArgs![i])) {
      return lastPromise
    }
    lastArgs = args
    lastPromise = fn(...args)
    return lastPromise
  }) as T
}

/**
 * HTML 实体编码/解码
 */
export function htmlEncode(str: string): string {
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}
export function htmlDecode(str: string): string {
  const div = document.createElement('div')
  div.innerHTML = str
  return div.textContent || ''
}

/**
 * 生成随机十六进制字符串
 */
export function randomHex(length = 8): string {
  let res = ''
  while (res.length < length) {
    res += Math.random().toString(16).slice(2)
  }
  return res.slice(0, length)
}

/**
 * 深度比较两个值是否相等
 */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true
  if (typeof a !== typeof b) return false
  if (a && b && typeof a === 'object') {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false
      return a.every((v, i) => deepEqual(v, b[i]))
    }
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) return false
    return keysA.every(k => deepEqual((a as any)[k], (b as any)[k]))
  }
  return false
}

/**
 * 根据属性或迭代函数对数组排序并返回新数组
 */
export function sortBy<T>(arr: T[], iteratee: keyof T | ((item: T) => any)): T[] {
  return [...arr].sort((x, y) => {
    const a = typeof iteratee === 'function' ? iteratee(x) : x[iteratee]
    const b = typeof iteratee === 'function' ? iteratee(y) : y[iteratee]
    if (a < b) return -1
    if (a > b) return 1
    return 0
  })
}

/**
 * 返回数组第一个元素
 */
export function first<T>(arr: T[]): T | undefined {
  return arr && arr.length ? arr[0] : undefined
}

/**
 * 返回数组最后一个元素
 */
export function last<T>(arr: T[]): T | undefined {
  return arr && arr.length ? arr[arr.length - 1] : undefined
}

/**
 * 删除对象中值为 null 或 undefined 的属性
 */
export function cleanObject<T extends object>(obj: T): T {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    if (v !== null && v !== undefined) {
      ;(acc as any)[k] = v
    }
    return acc
  }, {} as T)
}

/**
 * 生成随机字母数字字符串
 */
export function randomAlphaNumeric(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let res = ''
  for (let i = 0; i < length; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return res
}

/**
 * 将字符串转换为蛇形命名法
 */
export function toSnakeCase(str: string): string {
  return str.replace(/\.?([A-Z]+)/g, (x, y) => '_' + y.toLowerCase()).replace(/^_/, '')
}

/**
 * 格式化字节数为易读字符串
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * 等待 DOM 元素出现
 */
export function waitForElement(selector: string, timeout = 5000): Promise<Element | null> {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      const el = document.querySelector(selector)
      if (el) {
        clearInterval(interval)
        resolve(el)
      }
    }, 100)
    setTimeout(() => {
      clearInterval(interval)
      resolve(null)
    }, timeout)
  })
}

/**
 * 可取消的睡眠
 */
export function cancellableSleep(ms: number) {
  let timer: any
  const promise = new Promise<void>(resolve => {
    timer = setTimeout(resolve, ms)
  })
  return {
    promise,
    cancel: () => clearTimeout(timer),
  }
}

/**
 * 断言值为数字
 */
export function assertNumber(
  value: any,
  message = 'Value must be a number'
): asserts value is number {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error(message)
  }
}

/**
 * 根据点分隔路径深度获取属性值
 */
export function deepPick(obj: any, path: string, def: any = undefined): any {
  return path.split('.').reduce((o, key) => (o && o[key] !== undefined ? o[key] : def), obj)
}

/**
 * 根据点分隔路径深度设置属性值
 */
export function deepSet(obj: any, path: string, value: any): any {
  const keys = path.split('.')
  let cur = obj
  keys.forEach((k, i) => {
    if (i === keys.length - 1) {
      cur[k] = value
    } else {
      if (cur[k] === undefined || cur[k] === null) cur[k] = {}
      cur = cur[k]
    }
  })
  return obj
}

/**
 * 生成随机十六进制颜色字符串
 */
export function randomColor(): string {
  return (
    '#' +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0')
  )
}

/**
 * 简单递增唯一 ID，可传入前缀
 */
export function uniqueId(prefix = ''): string {
  ;(uniqueId as any).counter = ((uniqueId as any).counter || 0) + 1
  return prefix + (uniqueId as any).counter
}

/**
 * 对异步函数进行节流，返回一个只能每隔 wait 毫秒调用一次的版本
 */
export function throttleAsync<T extends (...args: any[]) => Promise<any>>(fn: T, wait: number): T {
  let lastCall = 0
  let pending: Promise<any> | null = null
  return async function (...args: any[]) {
    const now = Date.now()
    if (now - lastCall < wait) {
      return pending
    }
    lastCall = now
    pending = fn(...args)
    return pending
  } as any as T
}

/**
 * 简单 CSV 解析器，返回二维数组
 */
export function parseCSV(str: string, delimiter = ','): string[][] {
  return str
    .trim()
    .split('\n')
    .map(line => line.split(delimiter))
}

/**
 * 用两个数组生成对象
 */
export function zipObject(keys: string[], values: any[]): Record<string, any> {
  const res: Record<string, any> = {}
  keys.forEach((k, i) => {
    res[k] = values[i]
  })
  return res
}

/**
 * 递归扁平化多维数组
 */
export function flattenDeep(arr: any[]): any[] {
  return arr.reduce((acc, v) => acc.concat(Array.isArray(v) ? flattenDeep(v) : v), [] as any[])
}

/**
 * 判断年份是否为闰年
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * 计算阶乘
 */
export function factorial(n: number): number {
  if (n < 0) return NaN
  return n <= 1 ? 1 : n * factorial(n - 1)
}

/**
 * 斐波那契数列第 n 项
 */
export function fibonacci(n: number): number {
  let a = 0,
    b = 1
  for (let i = 0; i < n; i++) {
    ;[a, b] = [b, a + b]
  }
  return a
}

/**
 * 将秒转换为 HH:MM:SS 格式
 */
export function secondsToTime(sec: number): string {
  const h = Math.floor(sec / 3600)
    .toString()
    .padStart(2, '0')
  const m = Math.floor((sec % 3600) / 60)
    .toString()
    .padStart(2, '0')
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, '0')
  return `${h}:${m}:${s}`
}

/**
 * 首字母大写
 */
export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 将字符串转换为标题格式
 */
export function toTitleCase(str: string): string {
  return str.toLowerCase().split(' ').map(capitalizeFirst).join(' ')
}

/**
 * 简化 addEventListener
 */
export function on(
  el: Element | Window | Document,
  event: string,
  fn: EventListenerOrEventListenerObject
) {
  el.addEventListener(event, fn as EventListener)
  return () => el.removeEventListener(event, fn as EventListener)
}

/**
 * 简化 removeEventListener
 */
export function off(
  el: Element | Window | Document,
  event: string,
  fn: EventListenerOrEventListenerObject
) {
  el.removeEventListener(event, fn as EventListener)
}

/**
 * 生成固定步长范围
 */
export function rangeWithStep(start: number, end: number, step = 1): number[] {
  const res: number[] = []
  for (let i = start; i <= end; i += step) res.push(i)
  return res
}

/**
 * 合并两个数组并去重
 */
export function mergeUnique<T>(a: T[], b: T[]): T[] {
  return Array.from(new Set([...a, ...b]))
}

/**
 * 深度省略对象属性
 */
export function omitDeep(obj: any, keys: string[]): any {
  if (Array.isArray(obj)) return obj.map(v => omitDeep(v, keys))
  if (obj && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [k, v]) => {
      if (!keys.includes(k)) {
        ;(acc as any)[k] = omitDeep(v, keys)
      }
      return acc
    }, {} as any)
  }
  return obj
}

/**
 * 将对象的值映射
 */
export function mapValues(obj: any, fn: (v: any, k: string) => any): any {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    ;(acc as any)[k] = fn(v, k)
    return acc
  }, {} as any)
}

/**
 * 将对象的键映射
 */
export function mapKeys(obj: any, fn: (k: string) => string): any {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    ;(acc as any)[fn(k)] = v
    return acc
  }, {} as any)
}

/**
 * 深度拾取对象字段
 */
export function pickDeep(obj: any, paths: string[]): any {
  const res: any = {}
  paths.forEach(p => {
    const val = deepPick(obj, p)
    if (val !== undefined) deepSet(res, p, val)
  })
  return res
}

/**
 * 将字符串转为正则安全文本
 */
export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * 部分应用
 */
export function partial(fn: (...args: unknown[]) => unknown, ...preset: unknown[]) {
  return (...later: any[]) => fn(...preset, ...later)
}

/**
 * 函数柯里化
 */
export function curry(fn: (...args: unknown[]) => unknown): unknown {
  return function curried(...args: any[]): any {
    if (args.length >= fn.length) return fn(...args)
    return (...more: any[]) => curried(...args, ...more)
  }
}

/**
 * Base64 编码
 */
export function base64Encode(str: string): string {
  if (typeof window !== 'undefined' && window.btoa) {
    return window.btoa(str)
  }
  return (Buffer as any).from(str, 'utf-8').toString('base64')
}

/**
 * Base64 解码
 */
export function base64Decode(str: string): string {
  if (typeof window !== 'undefined' && window.atob) {
    return window.atob(str)
  }
  return (Buffer as any).from(str, 'base64').toString('utf-8')
}

/**
 * 判断字符串是否为十六进制
 */
export function isHex(str: string): boolean {
  return /^[0-9A-Fa-f]+$/.test(str)
}

/**
 * 给异步函数加防抖
 */
export function debounceAsync<T extends (...args: any[]) => Promise<any>>(fn: T, wait: number): T {
  let timeout: any = null
  let lastPromise: Promise<any> | null = null
  return (async (...args: any[]) => {
    if (timeout) clearTimeout(timeout)
    return new Promise(resolve => {
      timeout = setTimeout(() => {
        lastPromise = fn(...args)
        resolve(lastPromise)
      }, wait)
    })
  }) as T
}

/**
 * 异步只执行一次
 */
export function onceAsync<T extends (...args: any[]) => Promise<any>>(fn: T): T {
  let called = false
  let result: Promise<any>
  return (async (...args: any[]) => {
    if (!called) {
      called = true
      result = fn(...args)
    }
    return result
  }) as T
}

/**
 * 获取数组最大值，通过迭代函数或属性
 */
export function maxBy<T>(arr: T[], iteratee: keyof T | ((item: T) => number)): T | undefined {
  if (!arr || !arr.length) return undefined
  let max = arr[0]
  let maxVal = typeof iteratee === 'function' ? iteratee(max) : (max as any)[iteratee]
  for (let i = 1; i < arr.length; i++) {
    const val = typeof iteratee === 'function' ? iteratee(arr[i]) : (arr[i] as any)[iteratee]
    if (val > maxVal) {
      maxVal = val
      max = arr[i]
    }
  }
  return max
}

/**
 * 获取数组最小值，通过迭代函数或属性
 */
export function minBy<T>(arr: T[], iteratee: keyof T | ((item: T) => number)): T | undefined {
  if (!arr || !arr.length) return undefined
  let min = arr[0]
  let minVal = typeof iteratee === 'function' ? iteratee(min) : (min as any)[iteratee]
  for (let i = 1; i < arr.length; i++) {
    const val = typeof iteratee === 'function' ? iteratee(arr[i]) : (arr[i] as any)[iteratee]
    if (val < minVal) {
      minVal = val
      min = arr[i]
    }
  }
  return min
}

/**
 * 随机 RGB 颜色字符串
 */
export function randomRGB(): string {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r},${g},${b})`
}

/**
 * 交换对象键和值
 */
export function invertObject(obj: Record<string, any>): Record<string, any> {
  return Object.entries(obj).reduce(
    (acc, [k, v]) => {
      acc[v] = k
      return acc
    },
    {} as Record<string, any>
  )
}

/**
 * 引用 sleep 的别名
 */
export const delay = sleep

/**
 * 异步版本的 groupBy，迭代器可以返回 promise
 */
export async function groupByAsync<T, K extends string | number>(
  arr: T[],
  iteratee: (item: T) => Promise<K> | K
): Promise<Record<K, T[]>> {
  const result: any = {}
  for (const item of arr) {
    const key = await iteratee(item)
    ;(result[key] ||= []).push(item)
  }
  return result
}

/**
 * 判断运行时是否位于浏览器环境
 */
export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'

/**
 * 判断运行时是否位于 Node.js 环境
 */
export const isNode =
  typeof process !== 'undefined' &&
  (process as any).versions != null &&
  (process as any).versions.node != null

/**
 * 根据布尔函数对数组进行分区
 */
export function partition<T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]] {
  return arr.reduce(
    (acc, v) => {
      acc[predicate(v) ? 0 : 1].push(v)
      return acc
    },
    [[], []] as [T[], T[]]
  )
}

/**
 * 产生高斯（正态）分布随机数
 */
export function randomGaussian(mean = 0, stdDev = 1): number {
  let u = 0,
    v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  return num * stdDev + mean
}

/**
 * 将回调风格函数转换为 Promise
 */
export function promisify(
  fn: (...args: unknown[]) => void
): (...args: unknown[]) => Promise<unknown> {
  return (...args: any[]) =>
    new Promise((resolve, reject) => {
      fn(...args, (err: any, res: any) => (err ? reject(err) : resolve(res)))
    })
}

/**
 * 将返回 Promise 的函数转换为回调风格
 */
export function callbackify(
  fn: (...args: unknown[]) => Promise<unknown>
): (...args: unknown[]) => void {
  return (...args: any[]) => {
    const cb = args.pop()
    fn(...args)
      .then(res => cb(null, res))
      .catch(err => cb(err))
  }
}

/**
 * 将数值转换为十六进制字符串
 */
export function toHex(num: number, pad = 2): string {
  return num.toString(16).padStart(pad, '0')
}

/**
 * 从十六进制字符串转换为数值
 */
export function fromHex(str: string): number {
  return parseInt(str, 16)
}

/**
 * RGB 值转换为十六进制颜色
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
}

/**
 * 十六进制颜色转换为 RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return match
    ? {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16),
      }
    : null
}

/**
 * 根据属性或函数求和
 */
export function sumBy<T>(arr: T[], iteratee: keyof T | ((item: T) => number)): number {
  return arr.reduce((acc, x) => {
    const val = typeof iteratee === 'function' ? iteratee(x) : (x as any)[iteratee]
    return acc + (isNumber(val) ? val : 0)
  }, 0)
}

/**
 * differenceBy: 找出 a 相对于 b 不同的元素，可指定 iteratee
 */
export function differenceBy<T>(a: T[], b: T[], iteratee: keyof T | ((item: T) => any)): T[] {
  const bVals = new Set(
    b.map(x => (typeof iteratee === 'function' ? iteratee(x) : (x as any)[iteratee]))
  )
  return a.filter(
    x => !bVals.has(typeof iteratee === 'function' ? iteratee(x) : (x as any)[iteratee])
  )
}

/**
 * 扁平化对象为点形式键
 */
export function flattenObject(obj: any, prefix = ''): Record<string, any> {
  return Object.keys(obj).reduce(
    (res, k) => {
      const val = obj[k]
      const key = prefix ? `${prefix}.${k}` : k
      if (isPlainObject(val)) {
        Object.assign(res, flattenObject(val, key))
      } else {
        res[key] = val
      }
      return res
    },
    {} as Record<string, any>
  )
}

/**
 * 将点形式键的对象恢复为嵌套
 */
export function unflattenObject(obj: Record<string, any>): any {
  const res: any = {}
  Object.keys(obj).forEach(k => {
    const keys = k.split('.')
    keys.reduce((r, key, idx) => {
      if (idx === keys.length - 1) {
        r[key] = obj[k]
      } else {
        r[key] = r[key] || {}
      }
      return r[key]
    }, res)
  })
  return res
}

/**
 * 使用二分查找在已排序数组中查找元素索引，找不到则返回 -1
 */
export function binarySearch<T>(arr: T[], target: T, compare: (a: T, b: T) => number): number {
  let low = 0,
    high = arr.length - 1
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const cmp = compare(arr[mid], target)
    if (cmp === 0) return mid
    if (cmp < 0) low = mid + 1
    else high = mid - 1
  }
  return -1
}

/**
 * 简单对象差异，返回存在差异的键及其新旧值
 */
export function objectDiff(a: any, b: any): Record<string, { from: any; to: any }> {
  const diff: Record<string, any> = {}
  const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})])
  keys.forEach(k => {
    if (a?.[k] !== b?.[k]) {
      diff[k] = { from: a?.[k], to: b?.[k] }
    }
  })
  return diff
}

/**
 * 删除字符串中的 HTML 标签
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '')
}

/**
 * 转换为 PascalCase
 */
export function toPascalCase(str: string): string {
  return str
    .replace(/(?:^|[-_\s])([a-z])/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/[-_\s]/g, '')
}

/**
 * 判断对象是否为空（无可枚举属性）
 */
export function isEmptyObject(obj: any): boolean {
  return obj && typeof obj === 'object' && Object.keys(obj).length === 0
}

/**
 * 线性插值
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/**
 * 计算数组中值的中位数
 */
export function median(arr: number[]): number {
  if (!arr.length) return 0
  const sorted = [...arr].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

/**
 * 计算数组中出现最频繁的值
 */
export function mode<T>(arr: T[]): T | undefined {
  const freq = new Map<T, number>()
  arr.forEach(v => freq.set(v, (freq.get(v) || 0) + 1))
  let max = 0
  let result: T | undefined
  freq.forEach((count, value) => {
    if (count > max) {
      max = count
      result = value
    }
  })
  return result
}

/**
 * 根据权重随机选择元素
 */
export function weightedRandom<T>(items: T[], weights: number[]): T | undefined {
  const total = weights.reduce((a, b) => a + b, 0)
  const r = Math.random() * total
  let acc = 0
  for (let i = 0; i < items.length; i++) {
    acc += weights[i]
    if (r < acc) return items[i]
  }
}

/**
 * 归一化数组值到 0-1
 */
export function normalizeArray(arr: number[]): number[] {
  const min = Math.min(...arr)
  const max = Math.max(...arr)
  const range = max - min || 1
  return arr.map(v => (v - min) / range)
}

/**
 * 异步 compose
 */
export function composeAsync(
  ...fns: ((...args: unknown[]) => unknown)[]
): (...args: unknown[]) => Promise<unknown> {
  return async (...args: any[]) => {
    let res = await fns[fns.length - 1](...args)
    for (let i = fns.length - 2; i >= 0; i--) {
      res = await fns[i](res)
    }
    return res
  }
}

/**
 * 异步 pipe
 */
export function pipeAsync(
  ...fns: ((...args: unknown[]) => unknown)[]
): (...args: unknown[]) => Promise<unknown> {
  return async (...args: any[]) => {
    let res = await fns[0](...args)
    for (let i = 1; i < fns.length; i++) {
      res = await fns[i](res)
    }
    return res
  }
}

/**
 * 空异步函数
 */
export async function noopAsync(): Promise<void> {}

/**
 * 让函数返回 null 而不是抛出错误
 */
export function maybe<T extends (...args: unknown[]) => unknown>(fn: T): T {
  return ((...args: any[]) => {
    try {
      return (fn as any)(...args)
    } catch {
      return null
    }
  }) as any
}

/**
 * 返回一个只在下一帧执行的函数版本
 */
export function oncePerFrame(fn: (...args: unknown[]) => void): (...args: unknown[]) => void {
  let scheduled = false
  return (...args: any[]) => {
    if (!scheduled) {
      scheduled = true
      requestAnimationFrame(() => {
        scheduled = false
        fn(...args)
      })
    }
  }
}

/**
 * 获取页面当前滚动高度
 */
export function getScrollTop(): number {
  return window.scrollY || document.documentElement.scrollTop
}

/**
 * 设置页面滚动高度
 */
export function setScrollTop(y: number): void {
  window.scrollTo(0, y)
}

/**
 * 判断元素是否在视口内
 */
export function isElementInViewport(el: Element): boolean {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * 复制文本到剪贴板
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text)
  }
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

/**
 * 添加一次性事件监听器
 */
export function listenOnce(
  el: Element | Window | Document,
  event: string,
  fn: EventListenerOrEventListenerObject
) {
  const wrapper = function (this: any, e: Event) {
    el.removeEventListener(event, wrapper as EventListener)
    if (isFunction(fn)) {
      ;(fn as EventListener)(e)
    }
  }
  el.addEventListener(event, wrapper as EventListener)
}

/**
 * 角度转弧度
 */
export function toRadians(deg: number): number {
  return (deg * Math.PI) / 180
}

/**
 * 弧度转角度
 */
export function toDegrees(rad: number): number {
  return (rad * 180) / Math.PI
}

/**
 * 动态加载脚本
 */
export function loadScript(
  src: string,
  attrs: Record<string, string> = {}
): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v))
    s.onload = () => resolve(s)
    s.onerror = reject
    document.head.appendChild(s)
  })
}

/**
 * 动态加载样式
 */
export function loadStyle(
  href: string,
  attrs: Record<string, string> = {}
): Promise<HTMLLinkElement> {
  return new Promise((resolve, reject) => {
    const l = document.createElement('link')
    l.rel = 'stylesheet'
    l.href = href
    Object.entries(attrs).forEach(([k, v]) => l.setAttribute(k, v))
    l.onload = () => resolve(l)
    l.onerror = reject
    document.head.appendChild(l)
  })
}

/**
 * 返回数组的最后一个满足条件的元素
 */
export function findLast<T>(arr: T[], predicate: (item: T) => boolean): T | undefined {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) return arr[i]
  }
  return undefined
}

/**
 * 返回最后一个满足条件的索引
 */
export function findLastIndex<T>(arr: T[], predicate: (item: T) => boolean): number {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) return i
  }
  return -1
}

/**
 * 求两个数组的异或
 */
export function xor<T>(a: T[], b: T[]): T[] {
  return difference(a, b).concat(difference(b, a))
}

/**
 * 根据 iteratee 计算异或
 */
export function xorBy<T>(a: T[], b: T[], iteratee: keyof T | ((item: T) => any)): T[] {
  const aVals = new Set(
    a.map(x => (typeof iteratee === 'function' ? iteratee(x) : (x as any)[iteratee]))
  )
  const bVals = new Set(
    b.map(x => (typeof iteratee === 'function' ? iteratee(x) : (x as any)[iteratee]))
  )
  const onlyA = a.filter(
    x => !bVals.has(typeof iteratee === 'function' ? iteratee(x) : (x as any)[iteratee])
  )
  const onlyB = b.filter(
    x => !aVals.has(typeof iteratee === 'function' ? iteratee(x) : (x as any)[iteratee])
  )
  return onlyA.concat(onlyB)
}

/**
 * 判断 a 是否为 b 的子集
 */
export function isSubset<T>(a: T[], b: T[]): boolean {
  const setB = new Set(b)
  return a.every(x => setB.has(x))
}

/**
 * 判断 a 是否为 b 的超集
 */
export function isSuperset<T>(a: T[], b: T[]): boolean {
  return isSubset(b, a)
}

/**
 * 计算字符串的 sha256 哈希 (hex)
 */
export async function hashString(str: string): Promise<string> {
  if (typeof crypto !== 'undefined' && (crypto as any).subtle) {
    const buf = await (crypto as any).subtle.digest('SHA-256', new TextEncoder().encode(str))
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  } else if (typeof require !== 'undefined') {
    const { createHash } = (require as any)('crypto')
    return createHash('sha256').update(str).digest('hex')
  }
  throw new Error('No crypto support')
}

/**
 * 下划线风格转驼峰
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
}

/**
 * 中划线风格转驼峰
 */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

/**
 * 转义 HTML
 */
export function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return str.replace(/[&<>"']/g, m => map[m])
}

/**
 * 反转义 HTML
 */
export function unescapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  }
  return str.replace(/&(amp|lt|gt|quot|#39);/g, m => map[m])
}

/**
 * 根据本地化格式化货币
 */
export function formatCurrency(amount: number, locale = 'en-US', currency = 'USD'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)
}

/**
 * 返回数组中的最大值
 */
export function max(arr: number[]): number | undefined {
  return arr.length ? Math.max(...arr) : undefined
}

/**
 * 返回数组中的最小值
 */
export function min(arr: number[]): number | undefined {
  return arr.length ? Math.min(...arr) : undefined
}

/**
 * 带帧节流的函数
 */
export function throttleFrame(fn: (...args: unknown[]) => void): (...args: unknown[]) => void {
  let ticking = false
  return (...args: any[]) => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        fn(...args)
      })
    }
  }
}

/**
 * 对语义版本字符串进行比较，返回 -1/0/1
 */
export function versionCompare(a: string, b: string): number {
  const pa = a.split('.').map(Number)
  const pb = b.split('.').map(Number)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const na = pa[i] || 0
    const nb = pb[i] || 0
    if (na < nb) return -1
    if (na > nb) return 1
  }
  return 0
}

/**
 * 判断字符串是否为有效 Base64
 */
export function isBase64(str: string): boolean {
  try {
    return btoa(atob(str)) === str
  } catch {
    return false
  }
}

/**
 * randomUUID alias
 */
export const randomUUID = uuid

/**
 * 通过创建链接下载文件
 */
export async function downloadFile(url: string, filename?: string): Promise<void> {
  const res = await fetch(url)
  const blob = await res.blob()
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename || url.split('/').pop() || ''
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}

/**
 * 等待指定元素发生 DOM 变动
 */
export function waitForMutation(
  selector: string,
  options: MutationObserverInit = { childList: true, subtree: true },
  timeout = 5000
): Promise<Element | null> {
  return new Promise(resolve => {
    const el = document.querySelector(selector)
    if (!el) return resolve(null)
    const obs = new MutationObserver(muts => {
      if (muts.length) {
        obs.disconnect()
        resolve(el)
      }
    })
    obs.observe(el, options)
    setTimeout(() => {
      obs.disconnect()
      resolve(null)
    }, timeout)
  })
}

/**
 * 判断类似 Promise
 */
export function isPromiseLike(v: any): v is Promise<any> {
  return v != null && typeof v.then === 'function'
}

/**
 * 定义不可枚举属性
 */
export function defineNonEnumerable(obj: any, key: string, value: any): void {
  Object.defineProperty(obj, key, { value, enumerable: false, writable: true, configurable: true })
}

/**
 * 获取对象所有嵌套键
 */
export function deepKeys(obj: any, prefix = ''): string[] {
  if (!isPlainObject(obj)) return []
  return Object.keys(obj).reduce((acc, k) => {
    const path = prefix ? `${prefix}.${k}` : k
    acc.push(path)
    acc.push(...deepKeys(obj[k], path))
    return acc
  }, [] as string[])
}

export function toOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export function scrollToElement(
  el: Element,
  options: ScrollIntoViewOptions = { behavior: 'smooth' }
): void {
  el.scrollIntoView(options)
}

export function delegate(
  parent: Element,
  selector: string,
  event: string,
  handler: EventListener
): void {
  parent.addEventListener(event, function (e) {
    const target = e.target as Element
    if (target && target.matches(selector)) {
      handler.call(target, e)
    }
  })
}

export function parseCookieString(cookieString: string): Record<string, string> {
  return cookieString.split(';').reduce(
    (acc, pair) => {
      const [k, v] = pair.split('=')
      if (k) acc[k.trim()] = decodeURIComponent((v || '').trim())
      return acc
    },
    {} as Record<string, string>
  )
}

export function isJsonString(str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

export function timeIt<T>(fn: () => T): { result: T; time: number } {
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now()
  const result = fn()
  const end = typeof performance !== 'undefined' ? performance.now() : Date.now()
  return { result, time: end - start }
}

export function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

export function nth<T>(arr: T[], n: number): T | undefined {
  const idx = n < 0 ? arr.length + n : n
  return arr[idx]
}

export function compact<T>(arr: (T | null | undefined | false | 0 | '')[]): T[] {
  return arr.filter(Boolean) as T[]
}

export function fill<T>(arr: T[], value: T, start = 0, end = arr.length): T[] {
  for (let i = start; i < end; i++) arr[i] = value
  return arr
}

/**
 * Utils 类 — 静态导出所有工具函数。
 *
 * 用法：通过 `Utils.fnName(...)` 直接访问对应的工具函数。
 *
 * 说明：
 * - 函数实现位于同一文件中，`Utils` 仅作为聚合与导出入口。
 * - 文件较大时可以考虑按功能拆分为多个模块（如 `array.ts`、`dom.ts` 等）。
 */
export class Utils {
  static isNullOrUndefined = isNullOrUndefined
  static isFunction = isFunction
  static toObject = toObject
  static safeInstanceOf = safeInstanceOf
  static checkIfInstanceOf = checkIfInstanceOf
  static isArray = isArray
  static isObject = isObject
  static isPlainObject = isPlainObject
  static isPromise = isPromise
  static isString = isString
  static isNumber = isNumber
  static isBoolean = isBoolean
  static isDate = isDate
  static assert = assert
  static mergeObjects = mergeObjects
  static pick = pick
  static omit = omit
  static deepClone = deepClone
  static ensureArray = ensureArray
  static sleep = sleep
  static cancellableSleep = cancellableSleep
  static assertNumber = assertNumber
  static isEmpty = isEmpty
  static debounce = debounce
  static throttle = throttle
  static randomInt = randomInt
  static flatten = flatten
  static unique = unique
  static capitalize = capitalize
  static capitalizeFirst = capitalizeFirst
  static toTitleCase = toTitleCase
  static clamp = clamp
  static range = range
  static toCamelCase = toCamelCase
  static toKebabCase = toKebabCase
  static parseQueryString = parseQueryString
  static stringifyQuery = stringifyQuery
  static debouncePromise = debouncePromise
  static isIterable = isIterable
  static isMap = isMap
  static isSet = isSet
  static waitFor = waitFor
  static noop = noop
  static identity = identity
  static once = once
  static memoize = memoize
  static deepMerge = deepMerge
  static pickBy = pickBy
  static omitBy = omitBy
  static groupBy = groupBy
  static randomChoice = randomChoice
  static isEven = isEven
  static isOdd = isOdd
  static formatDate = formatDate
  static toNumber = toNumber
  static toBoolean = toBoolean
  static chunk = chunk
  static shuffle = shuffle
  static zip = zip
  static timeoutPromise = timeoutPromise
  static retry = retry
  static padStart = padStart
  static padEnd = padEnd
  static truncate = truncate
  static createEventEmitter = createEventEmitter
  static addDays = addDays
  static diffDays = diffDays
  static isHTMLElement = isHTMLElement
  static waitForElement = waitForElement
  static addClass = addClass
  static removeClass = removeClass
  static hasClass = hasClass
  static qs = qs
  static fetchJson = fetchJson
  static compose = compose
  static pipe = pipe
  static sum = sum
  static average = average
  static union = union
  static intersection = intersection
  static difference = difference
  static uniqBy = uniqBy
  static isNil = isNil
  static parseUrl = parseUrl
  static getCookie = getCookie
  static setCookie = setCookie
  static deleteCookie = deleteCookie
  static storage = storage
  static limitConcurrency = limitConcurrency
  static isEmail = isEmail
  static isURL = isURL
  static parseJSON = parseJSON
  static uuid = uuid
  static capitalizeWords = capitalizeWords
  static asArray = asArray
  static pickRandom = pickRandom
  static deepEqual = deepEqual
  static sortBy = sortBy
  static first = first
  static last = last
  static cleanObject = cleanObject
  static randomAlphaNumeric = randomAlphaNumeric
  static toSnakeCase = toSnakeCase
  static formatBytes = formatBytes
  static isPrimitive = isPrimitive
  static deepFreeze = deepFreeze
  static memoizeAsync = memoizeAsync
  static htmlEncode = htmlEncode
  static htmlDecode = htmlDecode
  static randomHex = randomHex
  static isLeapYear = isLeapYear
  static factorial = factorial
  static fibonacci = fibonacci
  static secondsToTime = secondsToTime
  static on = on
  static off = off
  static rangeWithStep = rangeWithStep
  static mergeUnique = mergeUnique
  static omitDeep = omitDeep
  static mapValues = mapValues
  static mapKeys = mapKeys
  static pickDeep = pickDeep
  static escapeRegExp = escapeRegExp
  static partial = partial
  static curry = curry
  static maxBy = maxBy
  static minBy = minBy
  static randomRGB = randomRGB
  static invertObject = invertObject
  static isBrowser = isBrowser
  static isNode = isNode
  static partition = partition
  static randomGaussian = randomGaussian
  static promisify = promisify
  static callbackify = callbackify
  static toHex = toHex
  static fromHex = fromHex
  static delay = delay
  static groupByAsync = groupByAsync
  static binarySearch = binarySearch
  static objectDiff = objectDiff
  static stripHtml = stripHtml
  static toPascalCase = toPascalCase
  static isEmptyObject = isEmptyObject
  static lerp = lerp
  static median = median
  static mode = mode
  static weightedRandom = weightedRandom
  static normalizeArray = normalizeArray
  static base64Encode = base64Encode
  static base64Decode = base64Decode
  static isHex = isHex
  static debounceAsync = debounceAsync
  static onceAsync = onceAsync
  static composeAsync = composeAsync
  static pipeAsync = pipeAsync
  static noopAsync = noopAsync
  static maybe = maybe
  static oncePerFrame = oncePerFrame
  static toRadians = toRadians
  static toDegrees = toDegrees
  static loadScript = loadScript
  static loadStyle = loadStyle
  static findLast = findLast
  static findLastIndex = findLastIndex
  static xor = xor
  static xorBy = xorBy
  static isSubset = isSubset
  static isSuperset = isSuperset
  static hashString = hashString
  static downloadFile = downloadFile
  static waitForMutation = waitForMutation
  static isPromiseLike = isPromiseLike
  static defineNonEnumerable = defineNonEnumerable
  static deepKeys = deepKeys
  static snakeToCamel = snakeToCamel
  static kebabToCamel = kebabToCamel
  static escapeHtml = escapeHtml
  static unescapeHtml = unescapeHtml
  static formatCurrency = formatCurrency
  static max = max
  static min = min
  static throttleFrame = throttleFrame
  static versionCompare = versionCompare
  static isBase64 = isBase64
  static randomUUID = randomUUID
  static getScrollTop = getScrollTop
  static setScrollTop = setScrollTop
  static isElementInViewport = isElementInViewport
  static copyToClipboard = copyToClipboard
  static listenOnce = listenOnce
  // 新增导出 (recently added utilities)
  static toOrdinal = toOrdinal
  static scrollToElement = scrollToElement
  static delegate = delegate
  static parseCookieString = parseCookieString
  static isJsonString = isJsonString
  static timeIt = timeIt
  static randomDate = randomDate
  static nth = nth
  static compact = compact
  static fill = fill
}
