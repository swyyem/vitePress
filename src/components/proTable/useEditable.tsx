import { ElButton, ElIcon, ElMessage, ElPopconfirm } from 'element-plus';
import { h } from 'vue';
import type {
  ProActionButtonProps,
  AnyObject,
  ProTableEditContext,
  ProCellRendererParams,
  ProColumns,
} from './table.types';
import { InfoFilled } from '@element-plus/icons-vue';
import { omit, addNewRecordKey, getRealRowKey, getDelayRes } from './utils';
import { editableRowByKey } from './utils/editableRowByKey';
import { InternalPrefix } from './variable';
import ZhLanguage from '../locale/zh-cn';
const getButtonProps = (params: ProCellRendererParams, buttonProps?: ProActionButtonProps) => {
  if (typeof buttonProps === 'function') {
    return buttonProps(params);
  }
  return buttonProps;
};

const t = (key: string) => {
  const keys = key.split('.');
  return keys.reduce(
    (pre, cur) => {
      return (pre as any)[cur];
    },
    ZhLanguage as unknown as string
  );
};

export const useEditable = <T = AnyObject,>(editContext: ProTableEditContext<T>) => {
  // const { t } = useLocale()
  // 操作方法
  const operateMethods = {
    edit: (rowData: T) => {
      const { getRowKey, editable, editingRowKeys } = editContext;
      const rowKey = getRealRowKey(getRowKey.value, rowData);
      // 编辑按钮触发编辑状态，row 编辑
      if (editable.value?.type === 'single' || editable.value?.type === 'cell') {
        if (editingRowKeys.value.length > 0) {
          ElMessage.warning(
            editable.value.onlyOneLineEditorAlertMessage ?? t('el.pro-table.onlyOneLineEditor')
          );
        } else {
          editingRowKeys.value = [rowKey];
        }
      } else if (editable.value?.type === 'multiple') {
        editingRowKeys.value = [...editingRowKeys.value, rowKey];
      } else {
        // TODO: modal
      }
    },
    delete: (rowData: T) => {
      const { getRowKey } = editContext;
      const rowKey = getRealRowKey(getRowKey.value, rowData);
      // console.log('=delelte=', typeof rowKey, rowKey)
      editContext.setData(
        editableRowByKey(
          {
            data: editContext.getData(),
            getRowKey: editContext.getRowKey.value,
            row: rowData,
            key: rowKey,
            childrenColumnName: editContext.childrenColumnName,
          },
          'delete'
        )
      );
      const isAdd = typeof rowKey === 'string' && rowKey.startsWith(InternalPrefix);
      if (!isAdd) {
        editContext.removeRecords.value.push(rowData);
        // 如果编辑中存在，则需要从编辑列表中移除
        const editRecords = editContext.editRecords.value;
        const existIndex = editRecords.findIndex(item => {
          const itemKey = getRealRowKey(getRowKey.value, item);
          return rowKey === itemKey;
        });
        if (existIndex > -1) {
          editContext.editRecords.value.splice(existIndex, 1);
        }
      }
      // TODO：处理总页数的变化和当前页变化
    },
    cancel: (rowData: T) => {
      const { getRowKey, editingRowKeys } = editContext;
      const rowKey = getRealRowKey(getRowKey.value, rowData);
      editingRowKeys.value = editingRowKeys.value.filter(key => key !== rowKey);
    },
    save: (rowData: T) => {
      const { getRowKey, formRef } = editContext;
      const rowKey = getRealRowKey(getRowKey.value, rowData);
      formRef.value?.validate(isValid => {
        if (!isValid) {
          return;
        }
        const newValues = formRef.value?.getFormValues()[rowKey];
        if (newValues) {
          const copyValues = Object.assign({}, newValues);
          // 只要保存过标记下，恢复取消按钮
          // copyValues._operateAction = '1'
          // if (!copyValues._operateType) {
          //   copyValues._operateType = 'edit'
          // }
          editContext.setData(
            editableRowByKey(
              {
                data: editContext.getData(),
                getRowKey: editContext.getRowKey.value,
                row: copyValues,
                key: rowKey,
                childrenColumnName: editContext.childrenColumnName,
              },
              'update'
            )
          );
        }
        operateMethods.cancel(rowData);
      });
    },
    add: (rowData?: T) => {
      // 新增一行
      const values = editContext.getData();
      const copyRowData = addNewRecordKey(
        rowData ? Object.assign({}, rowData) : {},
        editContext.internalIndex
      ) as T;
      // copyRowData._operateType = 'new'
      // 找到当前最后一个数据，插入到后面
      values.push(copyRowData);
      editContext.setData(values);
      const type = editContext.editable.value?.type;
      if (type === 'single' || type === 'multiple') {
        operateMethods.edit(copyRowData);
      }
      // TODO：处理总页数的变化和当前页变化
    },
  };
  const transformEditableColumns = (columns: ProColumns): ProColumns => {
    const editableWrap = editContext.editable.value;
    if (!editableWrap || editableWrap.type === 'cell') {
      return columns;
    }

    // const cloneColumns = [...columns]
    // 如果存在 valueType='option' 则认为有自定义操作
    const operateColumn = columns.find(item => item.valueType === 'option');
    const cloneColumns = columns.filter(item => item.valueType !== 'option');
    // 如果没有自定义操作列且不隐藏
    if (!operateColumn && !editableWrap.hideColumn) {
      cloneColumns.push({
        key: '__protable_operations',
        title: t('el.pro-table.operations'),
        width: editableWrap.type === 'only' ? 60 : 100,
        align: 'center',
        flexGrow: 1,
        fixed: 'right',
        valueType: 'option',
        ...editableWrap.optionColumnProps,
        cellRenderer: params => {
          const { getRowKey, editingRowKeys, editable } = editContext;
          const rowKey = getRealRowKey(getRowKey.value, params.rowData);
          const editing = editingRowKeys.value.includes(rowKey);
          const deleteButtonProps = getButtonProps(params, editable.value?.deleteButtonProps);
          const onDelete = (e: MouseEvent) => {
            const handleClick = deleteButtonProps && deleteButtonProps.onClick;
            if (handleClick) {
              const delayRes = getDelayRes(() => operateMethods.delete(params.rowData));
              handleClick(e, params.rowData, delayRes.asyncEvent);
              if (!delayRes.getDelay()) {
                operateMethods.delete(params.rowData);
              }
            } else {
              operateMethods.delete(params.rowData);
            }
          };
          const delProps = omit(deleteButtonProps || {}, ['onClick']) as Omit<
            typeof deleteButtonProps,
            'onClick'
          >;
          const deleteChildren = editable.value?.deleteText ?? t('el.pro-table.delete');
          const deleteElement = h(
            ElPopconfirm,
            {
              icon: h(ElIcon, { size: 16 }, () => h(InfoFilled, null)),
              title: editable.value?.deletePopconfirmMessage ?? t('el.pro-table.deleteThisLine'),
              onConfirm: onDelete,
            },
            {
              reference: () =>
                h(
                  ElButton,
                  {
                    link: true,
                    type: 'danger',
                    ...delProps,
                  },
                  () => deleteChildren
                ),
            }
          );
          if (
            editing &&
            (editable.value?.type === 'single' || editable.value?.type === 'multiple')
          ) {
            const onSave = () => {
              operateMethods.save(params.rowData);
            };
            const onCancel = () => {
              operateMethods.cancel(params.rowData);
            };

            const saveChildren = editable.value?.saveText ?? t('el.pro-table.save');
            const cancelChildren = editable.value?.cancelText ?? t('el.pro-table.cancel');
            const lastChild = h(
              ElButton,
              {
                link: true,
                type: 'primary',
                onClick: onCancel,
              },
              () => cancelChildren
            );
            return h('div', null, [
              h(
                ElButton,
                {
                  link: true,
                  type: 'primary',
                  onClick: onSave,
                },
                () => saveChildren
              ),
              lastChild,
            ]);
          }

          if (editContext.editable.value?.optionColumnProps?.cellRenderer) {
            return editContext.editable.value?.optionColumnProps?.cellRenderer(params);
          }

          const onEdit = () => {
            operateMethods.edit(params.rowData);
          };

          const editButtonProps = getButtonProps(params, editable.value?.editButtonProps);
          const editChildren = editable.value?.editText ?? t('el.pro-table.edit');

          let editElement,
            deleteElements = null;
          if (deleteButtonProps !== false) {
            deleteElements = deleteElement;
          }
          if (
            editable.value?.type !== 'cell' &&
            editable.value?.type !== 'only' &&
            editButtonProps !== false
          ) {
            editElement = h(
              ElButton,
              {
                link: true,
                type: 'primary',
                ...editButtonProps,
                onClick: onEdit,
              },
              () => editChildren
            );
          }
          return h('div', null, [editElement, deleteElements]);
        },
      });
    } else if (operateColumn) {
      cloneColumns.push(operateColumn);
    }
    return cloneColumns;
  };
  return { transformEditableColumns, operateMethods };
};
