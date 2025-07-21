import type {
  ProColumns,
  ProColumn,
  AnyObject,
  ProTableEditContext,
  ProCellRenderer,
  ProTablePageParams,
} from './table.types'
import { nextTick,computed, h, type ComputedRef, type Ref } from 'vue'
import type { FormValidateFailure } from 'element-plus'
import { entries, groupBy, fromPairs, mapValues } from 'lodash-unified'
import HeaderCell, { type ProTabeHeaderCellProps } from './headerCell.tsx'
import TableCell, { type ProTableCellProps } from './tableCell.vue'
import ProTableCheckbox from './tableCheckbox.vue'
import { getRealRowKey, getOrder, getNextRowData, findFirstMatchedKV } from './utils'
// import { nextTick } from 'process'

type HandleMethod = (() => void) | undefined
type HandleBoolMethod = ((v: KeyboardEvent) => void) | undefined
// 获取 column 类名集合
const rowClassName = (column: ProColumn) => {
  const arr = []
  if (column.class) {
    arr.push(column.class)
  }
  if (column.className) {
    arr.push(column.className)
  }
  if (column.valueType === 'option') {
    arr.push('pro-table--body__operate')
  }
  if (column.type === 'seq' || column.type === 'index') {
    arr.push('pro-table--body__seq')
  }
  return arr.join(' ')
}
// 判断 column 是否能 focus
const canFocus = (column: ProColumn): boolean => {
  if (column.mode === 'read') {
    return false
  }
  const disabled = column.proFieldProps?.fieldProps?.disabled
  if (disabled) {
    return false
  }
  return true
}
// 查找下一个 column
const filterTypes = ['option', 'checkbox']
const findNextColumn = (columns: ProColumns, currentColumn?: ProColumn) => {
  // 循环查找下一个可 foucs 的 column
  const start = currentColumn
    ? columns.findIndex((item) => item.dataKey === currentColumn.dataKey)
    : 0
  const end = columns.length - 1
  let nextColumn
  let i = start
  while (i < end) {
    i += 1
    if (!filterTypes.includes(columns[i].valueType || 'text') && canFocus(columns[i])) {
      nextColumn = columns[i]
      break
    }
  }
  return nextColumn
}
type SetInvalidControlType = (valid: boolean, invalidFields?: FormValidateFailure['fields']) => void
export function useColumns<T = AnyObject>(
  proColumns: Ref<ProColumns | undefined>,
  editContext: ProTableEditContext<T>,
): { columns: ComputedRef<ProColumns>; setInvalidControl: SetInvalidControlType } {
  const pageData = computed(() => {
    return (
      editContext.pageInfo || {
        currentPage: 1,
        pageSize: 10,
      }
    )
  })
  const tableColumns = computed(() => {
    // 过滤不展示在 table 的 column
    const filterColumns = (proColumns.value || [])
      .filter((item) => {
        if (item.hideInTable) {
          return false
        }
        return true
      })
      .map((item) => {
        const { label, title, prop, dataKey, field, ...rest } = item
        const realTitle = title || label
        const realKey = dataKey || prop || field
        return {
          title: realTitle,
          dataKey: realKey,
          ...rest,
        }
      })
    console.log('=filterColumns=', filterColumns)
    const retColumns = filterColumns.map((proColumn) => {
      const {
        children,
        ellipsis,
        copyable,
        tooltip,
        editable,
        required,
        editCellRenderer,
        cellRenderer: elementCellRenderer,
        render: vxeRenderer,
        ...rest
      } = proColumn
      // 此处需要把 render 方法更转成 cellRenderer
      const cellRenderer =
        vxeRenderer || elementCellRenderer
          ? (record: any) => {
              if (vxeRenderer) {
                return vxeRenderer(record.rowData, record.rowIndex)
              }
              if (!record.row) {
                record.row = record.rowData
              }
              return (elementCellRenderer as ProCellRenderer)(record)
            }
          : undefined
      // column-class
      const columnClass = rowClassName(proColumn)
      if (proColumn.valueType === 'option') {
        const operateColumn: ProColumn = {
          ...rest,
          class: columnClass,
          cellRenderer: cellRenderer,
        }
        return operateColumn
      }
      // 如果存在 children，则认为是多级表头
      if (children) {
        const childColumns = useColumns(
          computed(() => children),
          editContext,
        )
        return {
          ...rest,
          required,
          class: columnClass,
          headerCellRenderer: (params: any) => {
            const props: ProTabeHeaderCellProps = {
              ...params,
              tooltip,
              required,
            }
            const dom = <HeaderCell {...props} />
            return rest.headerCellRenderer ? rest.headerCellRenderer(props) : dom
          },
          children: childColumns.columns.value,
        }
      }
      const column: ProColumn = {
        ...rest,
        required,
        class: columnClass,
        headerCellRenderer: (params) => {
          const props: ProTabeHeaderCellProps = {
            ...params,
            tooltip,
            required,
          }
          const dom = <HeaderCell {...props} />
          return rest.headerCellRenderer ? rest.headerCellRenderer(props) : dom
        },
        cellRenderer: (params) => {
          const colunParams = params.column
          const columnKey = colunParams.dataKey
          const extraParams = {
            ...params,
            cellKey: columnKey,
          }
          // 序号直接返回数字
          if (colunParams.type === 'seq' || colunParams.type === 'index') {
            return h(
              'span',
              {},
              editContext?.waterfall
                ? params.rowIndex + 1
                : getOrder(params.rowIndex, pageData.value as Required<ProTablePageParams>),
            )
          }
          const { getRowKey, editingRowKeys, editable: editableConfig, editingCell } = editContext
          const rowKeyValue = getRealRowKey(getRowKey.value, params.rowData)
          let editing = false
          const type = editableConfig.value?.type
          let onClick: HandleMethod = undefined
          let onDoubleClick: HandleMethod = undefined
          let onBlur: HandleMethod = undefined
          let onKeyDownEnter: HandleBoolMethod = undefined
          // 如果是行编辑模式
          if (type === 'single' || type === 'multiple') {
            editing = editingRowKeys.value.includes(rowKeyValue)
          } else if (type === 'cell') {
            // 单元格编辑
            editing = editingRowKeys.value.includes(rowKeyValue) && editingCell.value === columnKey
            if (editableConfig.value?.cellProps?.mode === 'doubleClick') {
              onDoubleClick = () => {
                editingCell.value = columnKey
                editingRowKeys.value = [rowKeyValue]
              }
            } else {
              onClick = () => {
                editingCell.value = columnKey
                editingRowKeys.value = [rowKeyValue]
              }
            }
            onBlur = () => {
              // blur 事件有延迟，当点击了其他 cell 时，则不需要清空
              if (editingCell.value !== columnKey || !editingRowKeys.value.includes(rowKeyValue)) {
                return
              }
              // TODO: 触发onchange
              editingRowKeys.value = editingRowKeys.value.filter((key) => key !== rowKeyValue)
              editingCell.value = undefined
            }
          } else if (type === 'only') {
            editing = true
          }
          // 如果当前列配置了 mode='read'，则表示当前列不能编辑
          if (colunParams.mode === 'read') {
            editing = false
          }
          if (editing && editableConfig.value?.keyboard) {
            const enterColumn = editableConfig.value?.keyboardNextRow
            onKeyDownEnter = () => {
              // 内部已经处理了 enter 键的判断
              const nextColumn = findNextColumn(filterColumns, colunParams)
              const isEnter = enterColumn === columnKey
              if (nextColumn && !isEnter) {
                if (type === 'cell') {
                  editingCell.value = nextColumn.dataKey
                  editingRowKeys.value = [rowKeyValue]
                } else {
                  const instance = editContext.getFormInstanceByKey(
                    nextColumn.dataKey!,
                    params.rowData,
                  )
                  instance?.focus?.()
                }
              } else {
                // 如果不存在则认为到最后一列了，需要换行；如果当前是底部，则新增一行
                let nextRow = getNextRowData<T>(editContext.getData(), (item) => {
                  return rowKeyValue === getRealRowKey<T>(getRowKey.value, item)
                })
                if (!nextRow) {
                  editContext.onCreate(new MouseEvent('click', { bubbles: true }))
                  const totalData = editContext.getData()
                  nextRow = totalData[totalData.length - 1]
                }
                const nextRowKey = getRealRowKey<T>(getRowKey.value, nextRow)
                const currentColumn = findNextColumn(filterColumns)
                if (currentColumn) {
                  nextTick(() => {
                    if (type === 'cell') {
                      editingCell.value = currentColumn.dataKey
                      editingRowKeys.value = [nextRowKey]
                    } else {
                      const instance = editContext.getFormInstanceByKey(
                        currentColumn.dataKey!,
                        params.rowData,
                      )
                      instance?.focus?.()
                    }
                  })
                }
              }
            }
          }
          const props: ProTableCellProps<T> = {
            ...extraParams,
            required,
            ellipsis,
            copyable,
            editable,
            editing,
            onClick,
            onDoubleClick,
            onBlur,
            'onKeydown:enter': onKeyDownEnter,
            cellRenderer,
            editCellRenderer,
            getRowKey: getRowKey.value,
          }
          return <TableCell {...props} />
        },
      }
      return column
    })
    // 如果需要多选框，则需要在最前面添加一列
    const rowSelection = editContext.rowSelectionProps.value
    if (rowSelection.type === 'checkbox') {
      retColumns.unshift({
        key: 'selection',
        width: 50,
        align: 'center',
        cellRenderer: ({ rowData }) => {
          const rowValue = getRealRowKey(editContext.getRowKey.value, rowData)
          return <ProTableCheckbox rowValue={rowValue} rowData={rowData} />
        },
        headerCellRenderer: () => {
          return <ProTableCheckbox all={true} />
        },
      })
    }
    return retColumns
  })

  // cell 场景下校验不通过的控件提示
  const setInvalidControl: SetInvalidControlType = (valid, invalidFields) => {
    // 校验未通过
    if (!valid) {
      // 按 key 分组
      const grouped = groupBy(entries(invalidFields || {}), ([key]) => key.split('.')[0])
      const res = mapValues(grouped, (pairs) => {
        return fromPairs(
          pairs.map(([key, val]) => {
            // 移除 key 的第一位
            const keys = key.split('.')
            keys.shift()
            return [keys.join('.'), val]
          }),
        )
      })
      const tableData = editContext.getData()
      // 找出排在前面的 row
      const requiredColumns = tableColumns.value.filter((column) => {
        return column.required
      })
      const firstRow = findFirstMatchedKV<T>(res, tableData, (item: T) => {
        return getRealRowKey(editContext.getRowKey.value, item) as string
      })
      if (firstRow) {
        const firstRowKey = getRealRowKey(editContext.getRowKey.value, firstRow) as string
        const firstColumn = findFirstMatchedKV<ProColumn>(
          res[firstRowKey],
          requiredColumns,
          (item: ProColumn) => {
            return item.dataKey!
          },
        )
        // 定位进入编辑态
        if (firstColumn) {
          editContext.editingCell.value = firstColumn.dataKey
          editContext.editingRowKeys.value = [firstRowKey]
        }
      }
    }
  }

  return {
    setInvalidControl,
    columns: tableColumns,
  }
}
