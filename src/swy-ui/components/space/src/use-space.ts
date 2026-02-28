/** File: use-space.ts - TypeScript File */

// ========== Dependencies Import ==========
import { computed, ref, watchEffect } from 'vue'
import { isArray, isNumber } from '@swy-ui/utils'
import { useNamespace } from '@swy-ui/hooks'

import type { SpaceProps } from './space'
import type { CSSProperties, StyleValue } from 'vue'

const SIZE_MAP = {
  small: 8,
  default: 12,
  large: 16,
} as const

export function useSpace(props: SpaceProps) {
  const ns = useNamespace('space')

  const classes = computed(() => [ns.b(), ns.m(props.direction)])

  const horizontalSize = ref(0)
  const verticalSize = ref(0)

  const containerStyle = computed<StyleValue>(() => {
    const wrapKls: CSSProperties = props.wrap || props.fill ? { flexWrap: 'wrap' } : {}
    const alignment: CSSProperties = {
      alignItems: props.align,
    }
    const gap: CSSProperties = {
      rowGap: `${verticalSize.value}px`,
      columnGap: `${horizontalSize.value}px`,
    }
    return [wrapKls, alignment, gap]
  })

  const itemStyle = computed<StyleValue>(() => {
    return props.fill ? { flexGrow: 1, minWidth: `${props.fillRatio}%` } : {}
  })

  watchEffect(() => {
    const { size = 'default', wrap, direction: dir, fill } = props

    if (isArray(size)) {
      const [h = 0, v = 0] = size
      horizontalSize.value = h
      verticalSize.value = v
    } else {
      let val: number
      if (isNumber(size)) {
        val = size
      } else {
        val = SIZE_MAP[size as keyof typeof SIZE_MAP] || SIZE_MAP.default
      }

      if ((wrap || fill) && dir === 'horizontal') {
        horizontalSize.value = verticalSize.value = val
      } else {
        if (dir === 'horizontal') {
          horizontalSize.value = val
          verticalSize.value = 0
        } else {
          verticalSize.value = val
          horizontalSize.value = 0
        }
      }
    }
  })

  return {
    classes,
    containerStyle,
    itemStyle,
  }
}
