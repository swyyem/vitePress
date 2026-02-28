/** File: use-button.ts - TypeScript File */

// ========== Dependencies Import ==========
import { Text, computed, inject, ref, useSlots } from 'vue'
import { useFormDisabled, useFormItem, useFormSize } from '@swy-ui/components/form'
import { useGlobalConfig } from '@swy-ui/components/config-provider'
import { useDeprecated } from '@swy-ui/hooks'
import { buttonGroupContextKey } from './constants'

import type { SetupContext } from 'vue'
import type { ButtonEmits, ButtonProps } from './button'

export const useButton = (props: ButtonProps, emit: SetupContext<ButtonEmits>['emit']) => {
  // 检测到 type 属性为 text 时发出弃用警告
  useDeprecated(
    {
      from: 'type.text',
      replacement: 'link',
      version: '3.0.0',
      scope: 'props',
      ref: '',
    },
    computed(() => props.type === 'text')
  )

  /**
   * 功能：从父组件注入按钮组上下文
   * 用途：如果按钮在 <el-button-group> 内，获取按钮组的上下文信息
   * 依赖：使用 buttonGroupContextKey 作为注入的 key
   */
  const buttonGroupContext = inject(buttonGroupContextKey, undefined)
  /**
   * 功能：获取全局配置中的按钮配置
   * 用途：获取应用级别的按钮默认配置，如默认类型、尺寸等
   */
  const globalConfig = useGlobalConfig('button')
  /**
   * 功能：获取表单上下文
   * 用途：如果按钮在表单内，可以访问表单相关功能，如 resetFields()
   */
  const { form } = useFormItem()
  /**
   * 功能：计算按钮的尺寸
   * 用途：优先级顺序 - 按钮自身设置 > 按钮组设置 > 全局配置 > 默认值
   */
  const _size = useFormSize(computed(() => buttonGroupContext?.size))
  /**
   * 功能：计算按钮的禁用状态
   * 用途：按钮自身禁用 > 表单禁用 > 按钮组禁用 > 全局禁用
   */
  const _disabled = useFormDisabled()
  /**
   * 功能：创建一个 DOM 引用，用于访问按钮的 DOM 元素
   * 用途：后续可以操作按钮的 DOM 属性或方法
   */
  const _ref = ref<HTMLButtonSwyement>()
  /**
   * 功能：获取组件的插槽内容
   * 用途：用于处理按钮的默认插槽内容，比如按钮文本
   */
  const slots = useSlots()
  /**
   * 功能：计算按钮的实际类型（primary、success、warning 等）
   * 优先级：：组件自身属性 > 按钮组配置 > 全局配置 > 默认空字符串
   * 用途：确保按钮类型遵循正确的继承链
   */
  const _type = computed(
    () => props.type || buttonGroupContext?.type || globalConfig.value?.type || ''
  )
  /**
   * 功能：计算是否启用自动插入空格功能（用于中文字符间）
   * 优先级：组件属性 ?? 全局配置 ?? 默认值 false
   * 用途：决定是否在两个中文字符间添加空格
   */
  const autoInsertSpace = computed(
    () => props.autoInsertSpace ?? globalConfig.value?.autoInsertSpace ?? false
  )
  /**
   * _plain：计算是否为朴素按钮（边框样式按钮）
   * _round：计算是否为圆角按钮
   * _text：计算是否为文本按钮（无边框无背景）
   * 逻辑：都遵循组件属性 ?? 全局配置 ?? 默认值 false 的优先级
   */
  const _plain = computed(() => props.plain ?? globalConfig.value?.plain ?? false)
  const _round = computed(() => props.round ?? globalConfig.value?.round ?? false)
  const _text = computed(() => props.text ?? globalConfig.value?.text ?? false)

  /**
   * 功能：当组件渲染为原生 <button> 标签时，返回相应的原生属性
   * 逻辑：只有当 props.tag === 'button' 时才返回属性
   * 返回值：
   *   ariaDisabled：用于无障碍访问的禁用状态
   *   disabled：原生禁用属性
   *   autofocus：自动聚焦属性
   *   type：原生按钮类型（submit、reset、button）
   */
  const _props = computed(() => {
    if (props.tag === 'button') {
      return {
        ariaDisabled: _disabled.value || props.loading,
        disabled: _disabled.value || props.loading,
        autofocus: props.autofocus,
        type: props.nativeType,
      }
    }
    return {}
  })

  // 是否需要在中文字符之间添加空格
  /**
   * 检查按钮内容是否恰好为2个中文字符
   * 当满足条件且启用了 autoInsertSpace 时，返回 true
   * 这个值会在模板中用于决定是否在两个中文字符之间添加空格
   */
  const shouldAddSpace = computed(() => {
    const defaultSlot = slots.default?.()
    if (autoInsertSpace.value && defaultSlot?.length === 1) {
      const slot = defaultSlot[0]
      if (slot?.type === Text) {
        const text = slot.children as string
        return /^\p{Unified_Ideograph}{2}$/u.test(text.trim())
      }
    }
    return false
  })

  /**
   * 功能：处理按钮的点击事件（带节流）
   * 逻辑：
   *   1. 检查按钮是否禁用或加载中
   *   2. 如果是，则停止事件传播
   *   3. 如果设置了节流时间，检查是否在冷却期
   *   4. 如果是 reset 类型按钮，则调用表单的 resetFields() 方法
   *   5. 触发 click 事件，并传递事件对象
   */
  let lastClickTime = 0
  const handleClick = (evt: MouseEvent) => {
    if (_disabled.value || props.loading) {
      evt.stopPropagation()
      return
    }

    // 节流处理
    if (props.throttle > 0) {
      const now = Date.now()
      if (now - lastClickTime < props.throttle) {
        evt.stopPropagation()
        return
      }
      lastClickTime = now
    }

    if (props.nativeType === 'reset') {
      form?.resetFields()
    }
    emit('click', evt)
  }

  return {
    _disabled,
    _size,
    _type,
    _ref,
    _props,
    _plain,
    _round,
    _text,
    shouldAddSpace,
    handleClick,
  }
}
