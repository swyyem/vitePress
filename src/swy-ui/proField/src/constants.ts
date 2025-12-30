import type { InjectionKey } from 'vue'
import type { ProFieldProps } from './proField'

export interface ProFieldGroupContext {
  size?: ProFieldProps['size']
  type?: ProFieldProps['type']
}

export const buttonGroupContextKey: InjectionKey<ProFieldGroupContext> =
  Symbol('buttonGroupContextKey')
