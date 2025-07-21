import { ElAutocomplete } from "element-plus";
import { defineComponent, h, ref } from "vue";
import type { AutocompleteProps } from "element-plus";
import type { PropType, Ref } from "vue";
import { ProText } from "./text/index";
import type { TextSpecifiledProps } from "./text/index";

// 组件实例类型
export interface AutocompleteComponentInstance {
  focus: () => void;
  blur: () => void;
}

export default defineComponent({
  name: "ProAutocomplete",
  props: {
    fieldProps: {
      type: Object as PropType<AutocompleteProps>,
      required: true,
      default: () => ({}),
    },
    textProps: {
      type: Object as PropType<Omit<TextSpecifiledProps, "copyText">>,
      default: () => ({}),
    },
    emptyText: {
      type: String,
      default: "",
    },
    mode: {
      type: String as PropType<"read" | "edit">,
      required: true,
      validator: (value: string) => ["read", "edit"].includes(value),
    },
    modelValue: {
      type: String,
      default: "",
    },
    childRef: {
      type: Object as PropType<Ref<AutocompleteComponentInstance | null>>,
      default: () => ref(null),
    },
  },
  setup(props, { slots }) {
    /**
     * 渲染只读模式内容
     */
    const renderReadMode = () => {
      const text = props.modelValue || props.emptyText;
      return h(
        ProText,
        {
          ...props.textProps,
          ref: props.childRef,
          copyText: text,
        },
        () => text
      );
    };

    /**
     * 渲染编辑模式内容
     */
    const renderEditMode = () => {
      return h(
        ElAutocomplete,
        {
          ...props.fieldProps,
          ref: props.childRef,
        },
        slots
      );
    };

    return () => {
      return props.mode === "read" ? renderReadMode() : renderEditMode();
    };
  },
});
