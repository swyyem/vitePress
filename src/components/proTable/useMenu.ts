import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { removeInternalKey } from './utils'
import type {
  AnyObject,
  ProTableMenuConfigType,
  ProTableMenuVisibleParams,
  ProTableMenuOption,
  ProTableRowAndColumnType,
} from './table.types'

export const useMenu = <T extends AnyObject>(menuConfig?: ProTableMenuConfigType<T>) => {
  const headerDisplay = ref(false)
  const bodyDisplay = ref(false)
  const layoutCoord = ref({
    x: 0,
    y: 0,
  })
  if (!menuConfig) {
    return {
      layoutCoord,
      headerDisplay: headerDisplay,
      bodyDisplay: headerDisplay,
    }
  }
  const { className, visibleMethod, trigger, header, body } = menuConfig
  const triggerType = trigger || 'row'
  const isRow = triggerType === 'row'
  const bodyOptions = computed(() => {
    const options = body?.options || []
    return options
      .map((item) => {
        return {
          ...item,
          visible: item.visible ?? true,
          disabled: item.disabled ?? false,
        }
      })
      .filter((item) => item.visible)
  })
  const headerOptions = computed(() => {
    const options = header?.options || []
    return options
      .map((item) => {
        return {
          ...item,
          visible: item.visible ?? true,
          disabled: item.disabled ?? false,
        }
      })
      .filter((item) => item.visible)
  })
  const options = ref<ProTableMenuOption[]>([])
  headerDisplay.value = headerOptions.value.length > 0
  bodyDisplay.value = bodyOptions.value.length > 0
  const visible = ref(false)
  const justOpen = ref(false)
  // 保存 row 和 column，输出给 menu-click 回调中
  const rowAndColumn = ref<ProTableRowAndColumnType>({
    row: undefined,
    column: undefined,
  })

  const changeVisible = (v: boolean) => {
    visible.value = v
    if (!v) {
      rowAndColumn.value = {
        row: undefined,
        column: undefined,
      }
    }
  }

  const handleVisible = (params: ProTableMenuVisibleParams<T>) => {
    if (visibleMethod) {
      const v = visibleMethod(params)
      return v ?? true
    }
    return true
  }

  const disposeVisible = (event: MouseEvent, type?: string) => {
    event.preventDefault()
    justOpen.value = true
    layoutCoord.value = {
      x: event.clientX,
      y: event.clientY,
    }
    if (type === 'header') {
      options.value = headerOptions.value
    } else {
      options.value = bodyOptions.value
    }
    setTimeout(() => {
      justOpen.value = false
    }, 1)
  }

  const handleRowContextMenu = (row: any, column: any, event: MouseEvent) => {
    const transRow = removeInternalKey<T>(row) as T
    const vb = handleVisible({
      row: transRow,
      column,
      options: bodyOptions.value,
    })
    // 不显示右键菜单
    if (!vb) {
      changeVisible(false)
      return
    }
    changeVisible(true)
    disposeVisible(event)
    rowAndColumn.value = {
      row: transRow,
      column,
    }
  }

  const handleCellContextMenu = (
    row: any,
    column: any,
    cell: HTMLTableCellElement,
    event: MouseEvent,
  ) => {
    const transRow = removeInternalKey<T>(row) as T
    const vb = handleVisible({
      row: transRow,
      column,
      options: bodyOptions.value,
    })
    // 不显示右键菜单
    if (!vb) {
      changeVisible(false)
      return
    }
    changeVisible(true)
    disposeVisible(event)
    rowAndColumn.value = {
      row: transRow,
      column,
    }
  }

  const handleHeaderContextMenu = (column: any, event: MouseEvent) => {
    const vb = handleVisible({
      column,
      options: headerOptions.value,
    })
    // 不显示右键菜单
    if (!vb) {
      changeVisible(false)
      return
    }
    changeVisible(true)
    disposeVisible(event, 'header')
    rowAndColumn.value = {
      row: undefined,
      column,
    }
  }

  const handleScroll = () => {
    // 滚动时关闭菜单
    changeVisible(false)
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, true) // true 可捕获子元素滚动
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll, true)
  })

  return {
    handleRowContextMenu: bodyDisplay.value && isRow ? handleRowContextMenu : undefined,
    handleCellContextMenu: bodyDisplay.value && !isRow ? handleCellContextMenu : undefined,
    handleHeaderContextMenu: headerDisplay.value ? handleHeaderContextMenu : undefined,
    changeVisible,
    display: bodyDisplay.value || headerDisplay.value,
    visible,
    justOpen,
    layoutCoord,
    options,
    className,
    rowAndColumn,
  }
}
