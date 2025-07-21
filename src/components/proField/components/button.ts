import { ElButton } from "element-plus";
import type { ButtonProps } from "element-plus";
import { defineComponent, h, ref } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  props: {
    fieldProps: {
      type: Object as PropType<ButtonProps>,
      required: true,
    },
    mode: {
      type: String as PropType<string>,
      required: true,
    },
    childRef: {
      type: Object as PropType<typeof ref>,
      default: () => {
        return ref(null);
      },
    },
    value: {
      type: String as PropType<string>,
      default: "按钮",
    },
  },
  setup(props, { slots }) {
    return () => {
      const { childRef, mode, fieldProps: a } = props;
      const fieldProps = { ...a, ref: childRef };

      // 判断 slots 是否为空对象
      const hasSlots = Object.keys(slots || {}).length > 0;

      if (mode === "read") {
        // 处理自定义只读渲染
        // TODO: i18n
        return h(
          ElButton,
          { ...fieldProps, disabled: true },
          hasSlots ? slots : () => "按钮"
        );
      }
      // TODO: i18n
      return h(
        ElButton,
        fieldProps,
        hasSlots ? slots : () => props.value
      );
    };
  },
});
