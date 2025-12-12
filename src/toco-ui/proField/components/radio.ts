/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, ref, onMounted, h, watch } from 'vue';
import type { PropType } from 'vue';
import { ElRadioGroup, ElRadio } from 'element-plus';
import type { RadioGroupProps } from 'element-plus';
import { handleRequest, isEqual, renderRead } from '../utils';
import type { PropsType } from '../utils';
import type { ProSchemaValueEnumType, ProFieldRequestData } from '../index';
import { ProText } from './text/index';
import type { TextSpecifiledProps } from './text/index';

export default defineComponent({
  props: {
    fieldProps: {
      type: Object as PropType<RadioGroupProps>,
      required: true,
    },
    textProps: {
      type: Object as PropType<Omit<TextSpecifiledProps, 'copyText'>>,
    },
    mode: {
      type: String as PropType<string>,
      required: true,
    },
    modelValue: {
      type: [String, Number, Boolean] as PropType<string | number | boolean>,
      default: () => {
        return '';
      },
    },
    emptyText: {
      type: String as PropType<string>,
    },
    request: {
      type: Function as PropType<ProFieldRequestData>,
    },
    valueEnum: {
      type: Array as PropType<ProSchemaValueEnumType[]>,
      default: () => {
        return [];
      },
    },
    params: {
      type: [Object, Number, String] as PropType<object | number | string>,
    },
    debounceTime: {
      type: Number,
      default: () => {
        return 100;
      },
    },
  },
  setup(props, { slots, expose }) {
    const options = ref<any[]>([]);
    const childRef = ref(null);
    onMounted(async () => {
      options.value = await handleRequest(props as unknown as PropsType);
    });

    // 监听 props 的变化
    watch(
      () => [props.params, props.valueEnum],
      async ([newParams, newValueEnum], [oldParams, oldValueEnum]) => {
        const { request, valueEnum } = props;

        if (request && !isEqual(newParams, oldParams)) {
          options.value = await handleRequest(props as unknown as PropsType);
        }
        if (!request && !isEqual(newValueEnum, oldValueEnum)) {
          options.value = valueEnum;
        }
      },
      { deep: true } // 启用深度监听
    );

    expose({
      childRef,
      getChild: () => childRef.value,
      getText: (v: any) => {
        const { text } = renderRead(options, { modelValue: v });
        return text;
      },
    });

    return () => {
      const { mode, emptyText } = props;
      if (mode === 'read') {
        const { renderChildH, text } = renderRead(options, props);

        const renderH = renderChildH.length
          ? h(ProText, { ...props.textProps, ref: childRef, copyText: text }, () => renderChildH)
          : h(ProText, { ...props.textProps, ref: childRef, copyText: emptyText }, () => emptyText);

        return renderH;
      }

      // 判断 slots 是否为空对象
      const hasSlots = Object.keys(slots || {}).length > 0;

      return h(
        ElRadioGroup,
        { ...props.fieldProps, ref: childRef },
        hasSlots
          ? slots
          : () =>
              options.value.map((option: any) =>
                h(ElRadio, {
                  ...option,
                  key: option.value, // 确保每个选项有唯一的 key
                })
              )
      );
    };
  },
});
