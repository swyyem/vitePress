/** File: use-common-color.ts - TypeScript File */

// ========== Dependencies Import ==========
import { reactive, watch } from 'vue'
import Color from '../utils/color'

type CommonColorProps = {
  modelValue?: string | null
  showAlpha: boolean
  colorFormat?: string
}
type CommonColorEmits = (event: 'update:modelValue', ...args: any[]) => void

export const useCommonColor = <P extends CommonColorProps, E extends CommonColorEmits>(
  props: P,
  emit: E
) => {
  const color = reactive(
    new Color({
      enableAlpha: props.showAlpha,
      format: props.colorFormat || '',
      value: props.modelValue,
    })
  ) as Color

  watch(
    () => [props.colorFormat, props.showAlpha],
    () => {
      color.enableAlpha = props.showAlpha
      color.format = props.colorFormat || color.format
      color.doOnChange()
      emit('update:modelValue', color.value)
    }
  )

  return {
    color,
  }
}
