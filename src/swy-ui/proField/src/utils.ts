import type { ValueType } from './proField'

/* eslint-disable @typescript-eslint/no-explicit-any */
// 修复后的接口定义 - 使用 Record 工具类型
type ComponentDom = Record<ValueType, { [propName: string]: any }>
// 获取组件信息的函数
const extractComponentInfo = (componentModule: any): [string, any] => {
  try {
    if (!componentModule || !componentModule.default) {
      return ['', {}]
    }

    const component = componentModule.default
    if (!component || !component.name) {
      return ['', {}]
    }
    // 移除组件名称中的 'Swy' 前缀
    const name = component.name.replace(/^Swy/, '')
    return [name, component]
  } catch {
    // 捕获循环依赖导致的未初始化错误
    return ['', {}]
  }
}

// 创建组件映射的方法
const createComponentMap = (): ComponentDom => {
  // 排除可能引起循环依赖的组件，如 Table
  const components = import.meta.glob(
    ['../../components/*/index.ts', '!../../components/table/index.ts'],
    { eager: true }
  )
  const componentMap: ComponentDom = {} as ComponentDom

  Object.entries(components).forEach(([, module]) => {
    const [name, component] = extractComponentInfo(module)
    if (name) {
      componentMap[name as ValueType] = component
    }
  })

  return componentMap
}

let _componentMap: ComponentDom | null = null

export const getComponentMap = (): ComponentDom => {
  // 使用 Proxy 来处理循环依赖
  // 当首次访问属性时才执行真正的初始化
  return new Proxy({} as ComponentDom, {
    get(_, prop) {
      if (!_componentMap) {
        _componentMap = createComponentMap()
      }
      return _componentMap[prop as ValueType]
    },
    ownKeys() {
      if (!_componentMap) {
        _componentMap = createComponentMap()
      }
      return Reflect.ownKeys(_componentMap)
    },
    getOwnPropertyDescriptor(target, prop) {
      if (!_componentMap) {
        _componentMap = createComponentMap()
      }
      return Reflect.getOwnPropertyDescriptor(_componentMap, prop)
    },
  })
}
