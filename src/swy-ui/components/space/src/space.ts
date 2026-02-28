/** File: space.ts - TypeScript File */

// ========== Dependencies Import ==========
import { Comment, defineComponent, isVNode, renderSlot, createVNode, createTextVNode } from 'vue'
import {
  buildProps,
  definePropType,
  isArray,
  isFragment,
  isValidElementNode,
  PatchFlags,
} from '@swy-ui/utils'
import { componentSizes } from '@swy-ui/constants'
import Item from './item'
import { useSpace } from './use-space'

import type { ExtractPropTypes, VNode, VNodeArrayChildren, VNodeChild } from 'vue'

export const spaceProps = buildProps({
  direction: {
    type: String,
    values: ['horizontal', 'vertical'],
    default: 'horizontal',
  },
  align: {
    type: String,
    values: ['start', 'end', 'center', 'baseline', 'stretch'],
  },
  spacer: {
    type: definePropType<VNodeChild>([Object, String, Number, Array]),
    default: null,
  },
  wrap: Boolean,
  fill: Boolean,
  fillRatio: {
    type: Number,
    default: 100,
  },
  size: {
    type: [String, Array, Number],
    values: componentSizes,
    default: 'default',
  },
  prefixCls: {
    type: String,
  },
  tag: {
    type: String,
    default: 'div',
  },
} as const)

export type SpaceProps = ExtractPropTypes<typeof spaceProps>

const Space = defineComponent({
  name: 'SwySpace',

  props: spaceProps,

  setup(props, { slots }) {
    const { classes, containerStyle, itemStyle } = useSpace(props)

    function extractChildren(
      children: VNodeArrayChildren,
      parentKey = '',
      extractedChildren: VNode[] = []
    ) {
      const { prefixCls } = props
      children.forEach((child, loopKey) => {
        if (isFragment(child)) {
          if (isArray(child.children)) {
            child.children.forEach((nested, key) => {
              if (isFragment(nested) && isArray(nested.children)) {
                extractChildren(nested.children, `${parentKey + key}-`, extractedChildren)
              } else {
                if (isVNode(nested) && nested?.type === Comment) {
                  extractedChildren.push(nested)
                } else {
                  extractedChildren.push(
                    createVNode(
                      Item,
                      {
                        style: itemStyle.value,
                        prefixCls,
                        key: `nested-${parentKey + key}`,
                      },
                      {
                        default: () => [nested],
                      },
                      PatchFlags.PROPS | PatchFlags.STYLE,
                      ['style', 'prefixCls']
                    )
                  )
                }
              }
            })
          }
        } else if (isValidElementNode(child)) {
          extractedChildren.push(
            createVNode(
              Item,
              {
                style: itemStyle.value,
                prefixCls,
                key: `LoopKey${parentKey + loopKey}`,
              },
              {
                default: () => [child],
              },
              PatchFlags.PROPS | PatchFlags.STYLE,
              ['style', 'prefixCls']
            )
          )
        }
      })

      return extractedChildren
    }

    return () => {
      const { spacer, direction } = props

      const children = renderSlot(slots, 'default', { key: 0 }, () => [])

      if ((children.children ?? []).length === 0) return null

      if (isArray(children.children)) {
        let extractedChildren = extractChildren(children.children)

        if (spacer) {
          const len = extractedChildren.length - 1
          extractedChildren = extractedChildren.reduce<VNode[]>((acc, child, idx) => {
            const result = [...acc, child]
            if (idx !== len) {
              result.push(
                createVNode(
                  'span',
                  {
                    style: [itemStyle.value, direction === 'vertical' ? 'width: 100%' : null],
                    key: idx,
                  },
                  [isVNode(spacer) ? spacer : createTextVNode(spacer as string, PatchFlags.TEXT)],
                  PatchFlags.STYLE
                )
              )
            }
            return result
          }, [])
        }

        return createVNode(
          props.tag,
          {
            class: classes.value,
            style: containerStyle.value,
          },
          extractedChildren,
          PatchFlags.STYLE | PatchFlags.CLASS
        )
      }

      return children.children
    }
  },
})

export type SpaceInstance = InstanceType<typeof Space>

export default Space
