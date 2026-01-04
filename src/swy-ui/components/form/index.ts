import { withNoopInstall } from '@swy-ui/utils'
import Form from './src/form.vue'
import FormItem from './src/form-item.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export default Form
export const SwyFormItem: SFCWithInstall<typeof FormItem> = withNoopInstall(FormItem)

export * from './src/form'
export * from './src/form-item'
export * from './src/types'
export * from './src/constants'
export * from './src/hooks'

export type FormInstance = InstanceType<typeof Form> & unknown
export type FormItemInstance = InstanceType<typeof FormItem> & unknown
