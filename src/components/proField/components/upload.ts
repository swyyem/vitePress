import { ElUpload, ElButton } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { defineComponent, h, ref } from 'vue'
import type { PropType, Component } from 'vue'
interface unloadProp extends UploadProps {
  'file-list'?: unknown[]
}

export default defineComponent({
  props: {
    fieldProps: {
      type: Object as PropType<unloadProp>,
      required: true,
    },
    mode: {
      type: String as PropType<string>,
      required: true,
    },
    modelValue: {
      type: [String, Array, Boolean] as PropType<string | Array<string> | boolean>,
      default: () => {
        return ''
      },
    },
    childRef: {
      type: Object as PropType<typeof ref>,
      default: () => {
        return ref(null)
      },
    },
    title: {
      type: String as PropType<string>,
      required: false,
      default: () => {
        return '上传'
      },
    },
    icon: {
      type: Object as PropType<Component>,
      required: false,
    },
  },
  setup(props, { slots }) {
    return () => {
      const { childRef, mode, fieldProps: a, title, icon } = props
      const fieldProps = { ...a, ref: childRef }

      if (mode === 'read') {
        // 处理自定义只读渲染
        return h(ElUpload, { fieldProps, disabled: true }, () =>
          fieldProps['file-list'] ? '' : '',
        )
      }

      // 判断 slots 是否为空对象
      const hasSlots = Object.keys(slots || {}).length > 0

      return h(
        ElUpload,
        fieldProps,
        hasSlots ? slots : () => h(ElButton, { type: 'primary', icon: icon }, () => title),
      )
    }
  },
})
