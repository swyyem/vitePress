import { componentSizeMap } from '@swy-ui/constants'

import type { ComponentSize } from '@swy-ui/constants'

export const getComponentSize = (size?: ComponentSize) => {
  return componentSizeMap[size || 'default']
}
