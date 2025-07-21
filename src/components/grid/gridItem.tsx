import { defineComponent, computed, inject, ref, useAttrs, watch } from 'vue'
import type { Responsive, GridConifgType } from './index'
import { ElCol } from 'element-plus'
import type { searchFormConfigType } from '../queryFilter/index'

// type Props = {
//   offset?: number
//   span?: number
//   suffix?: boolean
//   xs?: Responsive
//   sm?: Responsive
//   md?: Responsive
//   lg?: Responsive
//   xl?: Responsive
// }

export default defineComponent({
  name: 'GridItem',
  props: {
    colStyle: { type: Object },
    isCol: { type: Boolean, default: true },
    offset: { type: Number, default: 0 },
    span: { type: Number, default: undefined },
    suffix: { type: Boolean, default: false },
    xs: { type: Object as () => Responsive, default: undefined },
    sm: { type: Object as () => Responsive, default: undefined },
    md: { type: Object as () => Responsive, default: undefined },
    lg: { type: Object as () => Responsive, default: undefined },
    xl: { type: Object as () => Responsive, default: undefined },
  },
  setup(props, { slots }) {
    const attrs = useAttrs() as { index: string }
    const isShow = ref(true)

    const searchFormConfig = inject<searchFormConfigType>('searchFormConfig', {})
    const gridConifg = inject<GridConifgType>('gridConifg', {
      breakPoint: ref('xl'),
      shouldHiddenIndex: ref(-1),
      cols: ref(4),
    })

    watch(
      () => [gridConifg.shouldHiddenIndex.value, gridConifg.breakPoint.value],
      (n) => {
        if (!searchFormConfig?.searchBtn || !searchFormConfig?.showCollapse) {
          isShow.value = true
        } else {
          if (attrs.index) {
            isShow.value = !(n[0] !== -1 && parseInt(attrs.index) >= Number(n[0]))
          }
        }
      },
      { immediate: true },
    )

    const style = computed(() => {
      if (searchFormConfig?.searchForm) {
        if (props.suffix) {
          return {
            textAlign: 'end',
            marginLeft: 'auto',
          } as any
        } else {
          return {}
        }
      } else {
        return {}
      }
    })

    const setProps = computed(() => {
      if (searchFormConfig?.searchForm) {
        const span =
          props[gridConifg.breakPoint.value]?.['span'] ?? props.span ?? 24 / gridConifg.cols.value
        const offset = props[gridConifg.breakPoint.value]?.['offset'] ?? props.offset

        return {
          span,
          offset,
        }
      } else {
        return {
          span: props.span,
          offset: props.offset,
          xs: props.xs,
          sm: props.sm,
          md: props.md,
          lg: props.lg,
          xl: props.xl,
        }
      }
    })
    return () =>
      isShow.value &&
      (props.isCol ? (
        <ElCol {...setProps.value} style={[style.value, props.colStyle]}>
          {slots.default ? slots.default() : null}
        </ElCol>
      ) : (
        <div style={props.colStyle}>{slots.default ? slots.default() : null}</div>
      ))
  },
})
