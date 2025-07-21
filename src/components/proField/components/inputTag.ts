/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElInputTag } from "element-plus";
import type { InputTagProps } from "element-plus";
import { defineComponent, h, ref } from "vue";

import type { PropType } from "vue";
import { ProText } from "./text/index";
import type { TextSpecifiledProps } from "./text/index";

export default defineComponent({
  props: {
    fieldProps: {
      type: Object as PropType<InputTagProps>,
      required: true,
    },
    textProps: {
      type: Object as PropType<Omit<TextSpecifiledProps, "copyText">>,
    },
    mode: {
      type: String as PropType<string>,
      required: true,
    },
    modelValue: {
      type: Array as PropType<any[]>,
      default: () => {
        return [];
      },
    },
    emptyText: {
      type: String as PropType<string>,
    },
    childRef: {
      type: Object as PropType<typeof ref>,
      default: () => {
        return ref(null);
      },
    },
  },
  setup(props, { slots }) {
    return () => {
      const {
        childRef,
        mode,
        modelValue,
        fieldProps: a,
        textProps,
        emptyText,
      } = props;
      const fieldProps = { ...a, ref: childRef };

      if (mode === "read") {
        // 处理自定义只读渲染
        const text = modelValue.length ? modelValue.join(",") : emptyText;
        return h(
          ProText,
          { ...textProps, ref: childRef, copyText: text },
          text
        );
      }

      return h(ElInputTag, fieldProps, slots);
    };
  },
});
