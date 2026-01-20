import { ref } from 'vue'
import { componentMap } from './proField'
import type { SetupContext } from 'vue'
import type { ProFieldEmits, ProFieldProps, ValueType, GetPropsByValueType } from './proField'

export const useProField = (props: ProFieldProps, emit: SetupContext<ProFieldEmits>['emit']) => {
  // console.log('componentMap', componentMap, componentMap[props.valueType]['props'])
  const _fieldProps = ref<GetPropsByValueType<ValueType>>(componentMap[props.valueType]['props'])
  /**
   * 功能：创建一个 DOM 引用，用于访问组件的 DOM 元素
   * 用途：后续可以操作组件的 DOM 属性或方法
   */
  const _ref = ref<HTMLButtonElement>()

  /**
   * 功能：处理点击事件
   */
  const handleClick = (evt: MouseEvent) => {
    emit('click', evt)
  }

  /**
   * 功能：处理 change 事件
   */
  const handleChange = (value: any) => {
    emit('change', value)
  }

  /**
   * 功能：处理 input 事件
   */
  const handleInput = (value: any) => {
    emit('input', value)
  }

  /**
   * 功能：处理 blur 事件
   */
  const handleBlur = (evt: FocusEvent) => {
    emit('blur', evt)
  }

  /**
   * 功能：处理 focus 事件
   */
  const handleFocus = (evt: FocusEvent) => {
    emit('focus', evt)
  }

  return {
    _ref,
    _fieldProps,
    handleClick,
    handleChange,
    handleInput,
    handleBlur,
    handleFocus,
  }
}
