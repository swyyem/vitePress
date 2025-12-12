import type { ProTableGetRowKey, KeyType } from '../index';
import { getRealRowKey } from '../utils';

export type RecordKey = KeyType;

// export const recordKeyToArray = (rowKey: RecordKey): KeyType[] => {
//   if (Array.isArray(rowKey)) {
//     return rowKey
//   }
//   return [rowKey]
// }

/**
 * 使用map 来删除数据，性能一般 但是准确率比较高
 * 修改成使用内部的 key 来做匹配，未考虑 children 的场景 edit by 2025/05/13
 * @param keyProps
 * @param action
 */
export function editableRowByKey<RecordType>(
  keyProps: {
    data: RecordType[];
    childrenColumnName: string;
    getRowKey: ProTableGetRowKey<RecordType>;
    key: RecordKey;
    row: RecordType;
  },
  action: 'update' | 'top' | 'delete'
) {
  const { getRowKey, row, key, data } = keyProps;
  const copyData = data.slice(0);
  const matchIndex = data.findIndex(item => {
    const itemKey = getRealRowKey(getRowKey, item);
    return itemKey === key;
  });
  if (matchIndex > -1) {
    if (action === 'update') {
      copyData.splice(matchIndex, 1, row);
    } else if (action === 'delete') {
      copyData.splice(matchIndex, 1);
    }
    return copyData;
  }
  return data;
}
