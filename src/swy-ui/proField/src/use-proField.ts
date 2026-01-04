import { ref } from 'vue'
import { componentMap } from './proField'
import type { SetupContext } from 'vue'
import type { ProFieldEmits, ProFieldProps, ValueType, GetPropsByValueType } from './proField'

export const useProField = (props: ProFieldProps, emit: SetupContext<ProFieldEmits>['emit']) => {
  // console.log('componentMap', componentMap, componentMap[props.valueType]['props'])
  const _filedProps = ref<GetPropsByValueType<ValueType>>(componentMap[props.valueType]['props'])
  /**
   * 功能：创建一个 DOM 引用，用于访问按钮的 DOM 元素
   * 用途：后续可以操作按钮的 DOM 属性或方法
   */
  const _ref = ref<HTMLButtonElement>()

  /**
   * 功能：处理按钮的点击事件
   * 逻辑：
   *   1. 检查按钮是否禁用或加载中
   *   2. 如果是，则停止事件传播
   *   3. 如果是 reset 类型按钮，则调用表单的 resetFields() 方法
   *   4. 触发 click 事件，并传递事件对象
   */
  const handleClick = (evt: MouseEvent) => {
    emit('click', evt)
  }

  return {
    _ref,
    _filedProps,
    handleClick,
  }
}
