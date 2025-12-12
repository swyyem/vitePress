// import { InjectionKey } from "vue";
import { provide, inject } from 'vue'

export const CodePreviewContextKey: any = Symbol('CodePreview')
export function registerContext(context: any) {
  provide(CodePreviewContextKey, context)
  return context
}
export function loadContext() {
  return inject(CodePreviewContextKey, {})
}
