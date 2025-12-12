import { defineComponent, computed, inject, shallowRef, useAttrs, watch, h } from 'vue';
import type { Responsive, GridConifgType } from './index';
import { ElCol } from 'element-plus';
// import type { ColProps } from 'element-plus/es/components/col/index'
import type { searchFormConfigType } from '../queryFilter/index';

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
    const attrs = useAttrs() as { index: string };
    const isShow = shallowRef(true);

    // 依赖注入
    const searchFormConfig = inject<searchFormConfigType>('searchFormConfig', {});
    const gridConfig = inject<GridConifgType>('gridConifg', {
      breakPoint: shallowRef('xl'),
      shouldHiddenIndex: shallowRef(-1),
      cols: shallowRef(4),
    });

    // 响应式逻辑
    const shouldWatch = computed(
      () => searchFormConfig?.searchBtn && searchFormConfig?.showCollapse
    );

    watch(
      [() => gridConfig.shouldHiddenIndex.value, () => gridConfig.breakPoint.value],
      ([hiddenIndex]) => {
        if (!shouldWatch.value) {
          isShow.value = true;
          return;
        }

        if (attrs.index) {
          isShow.value = !(hiddenIndex !== -1 && parseInt(attrs.index) >= Number(hiddenIndex));
        }
      },
      { immediate: true }
    );

    // 样式计算
    const style = computed(() => {
      if (!props.suffix || !searchFormConfig?.searchForm) return {};
      return {
        textAlign: 'end',
        marginLeft: 'auto',
      };
    });

    // 属性计算
    const colProps = computed(() => {
      if (!searchFormConfig?.searchForm) {
        return {
          span: props.span,
          offset: props.offset,
          xs: props.xs,
          sm: props.sm,
          md: props.md,
          lg: props.lg,
          xl: props.xl,
        };
      }

      const breakPoint = gridConfig.breakPoint.value;
      return {
        span: Number(props[breakPoint]?.['span'] ?? props.span ?? 24 / gridConfig.cols.value),
        offset: Number(props[breakPoint]?.['offset'] ?? props.offset ?? 0),
      };
    });

    // 渲染函数
    return () => {
      if (!isShow.value) return null;

      const baseProps = {
        style: { ...style.value, ...props.colStyle },
      };

      return props.isCol
        ? h(ElCol, { ...colProps.value, ...baseProps }, () => slots.default?.())
        : h('div', baseProps, () => slots.default?.());
    };
  },
});
