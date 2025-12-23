import { computed, inject, ref, unref } from 'vue'
import { useGlobalSize } from '@swy-ui/hooks/use-size'
import { useProp } from '@swy-ui/hooks/use-prop'
import { formContextKey, formItemContextKey } from '../constants'

import type { ComponentSize } from '@swy-ui/constants'
import type { MaybeRef } from '@vueuse/core'

export const useFormSize = (
  fallback?: MaybeRef<ComponentSize | undefined>,
  ignore: Partial<Record<'prop' | 'form' | 'formItem' | 'global', boolean>> = {}
) => {
  const emptyRef = ref(undefined)

  const size = ignore.prop ? emptyRef : useProp<ComponentSize>('size')
  const globalConfig = ignore.global ? emptyRef : useGlobalSize()
  const form = ignore.form ? { size: undefined } : inject(formContextKey, undefined)
  const formItem = ignore.formItem ? { size: undefined } : inject(formItemContextKey, undefined)

  return computed(
    (): ComponentSize =>
      size.value || unref(fallback) || formItem?.size || form?.size || globalConfig.value || ''
  )
}

export const useFormDisabled = (fallback?: MaybeRef<boolean | undefined>) => {
  // 获取当前组件的 disabled 属性
  const disabled = useProp<boolean>('disabled')
  // 注入父级表单上下文
  const form = inject(formContextKey, undefined)
  // 返回计算属性，按优先级判断禁用状态
  return computed(() => {
    return disabled.value ?? unref(fallback) ?? form?.disabled ?? false
  })
}

// These exports are used for preventing breaking changes
export const useSize = useFormSize
export const useDisabled = useFormDisabled
