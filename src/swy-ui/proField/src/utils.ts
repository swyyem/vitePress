const components = import.meta.glob('../../components/*/index.ts', { eager: true })

interface ComponentDefaultProps {
  [componentName: string]: {
    [propName: string]: any
  }
}
// 获取组件信息的函数
const extractComponentInfo = (componentModule: any): [string, any] => {
  if (!componentModule || !componentModule.default) {
    return ['', {}]
  }

  const component = componentModule.default
  return [component.name, component]
}

// 创建组件映射的方法
export const createComponentMap = (): ComponentDefaultProps => {
  const componentMap: ComponentDefaultProps = {}

  Object.entries(components).forEach(([, module]) => {
    const [name, component] = extractComponentInfo(module)
    if (name) {
      // 确保组件名存在
      componentMap[name] = component
    }
  })

  return componentMap
}
