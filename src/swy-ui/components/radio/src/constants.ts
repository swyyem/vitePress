/** File: constants.ts - TypeScript File */

// ========== Dependencies Import ==========
import type { InjectionKey } from 'vue'
import type { RadioGroupProps } from './radio-group'

export interface RadioGroupContext extends RadioGroupProps {
  changeEvent: (val: RadioGroupProps['modelValue']) => void
}

export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('radioGroupKey')
