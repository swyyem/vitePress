import { withInstall } from '@swy-ui/utils'
import ConfigProvider from './src/config-provider'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyConfigProvider: SFCWithInstall<typeof ConfigProvider> = withInstall(ConfigProvider)
export default SwyConfigProvider

export * from './src/config-provider'
export * from './src/config-provider-props'
export * from './src/constants'
export * from './src/hooks/use-global-config'
