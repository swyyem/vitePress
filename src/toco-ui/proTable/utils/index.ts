import { isEqual as lodashEqual, findIndex, get, keys, find } from 'lodash-unified';
import { InternalKey, InternalPrefix, InternalAddPrefix } from '../variable';
import type {
  AnyObject,
  KeyType,
  ProTableProviderProps,
  ProTablePageParams,
  ProTableGetRowKey,
} from '../index';

export const getDelayRes = (cb: () => void) => {
  let delay = false;
  const res = () => {
    delay = true;
    return {
      resolve: () => {
        cb();
      },
    };
  };
  return {
    getDelay: () => delay,
    asyncEvent: res,
  };
};

export function arrDel<T>(list: T[], value: T) {
  if (!list) return [];
  const clone = list.slice();
  const index = clone.indexOf(value);
  if (index >= 0) {
    clone.splice(index, 1);
  }
  return clone;
}

export function arrAdd<T>(list: T[], value: T) {
  const clone = (list || []).slice();
  if (clone.indexOf(value) === -1) {
    clone.push(value);
  }
  return clone;
}

export const extendsObject = <T extends AnyObject = AnyObject>(...list: T[]) => {
  const result: AnyObject = { ...list[0] };

  for (let i = 1; i < list.length; i++) {
    const obj = list[i];
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key];
        if (val !== undefined) {
          result[key] = val;
        }
      });
    }
  }

  return result;
};

type PostDataType<T> = (data: T) => T;

/**
 * 一个转化的 pipeline 列表
 *
 * @param data
 * @param pipeline
 */
export function postDataPipeline<T>(data: T, pipeline: PostDataType<T>[]) {
  if (pipeline.filter(item => item).length < 1) {
    return data;
  }
  return pipeline.reduce((pre, postData) => {
    return postData(pre);
  }, data);
}

type OmitUndefined<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export const omitUndefined = <T extends AnyObject>(obj: T): OmitUndefined<T> => {
  const newObj = {} as AnyObject as T;
  Object.keys(obj || {}).forEach(key => {
    if (obj[key] !== undefined) {
      (newObj as any)[key] = obj[key];
    }
  });
  if (Object.keys(newObj as AnyObject).length < 1) {
    return undefined as any;
  }
  return newObj as OmitUndefined<T>;
};

// 不引用 lodash，实现使用的几个方法
export const omit = <T extends AnyObject = AnyObject, K extends KeyType = KeyType>(
  obj: T,
  keys: K | K[]
): T => {
  const result = { ...obj };
  const transKeys = Array.isArray(keys) ? keys : [keys];
  transKeys.forEach(key => {
    if (key in obj) {
      delete result[key as keyof T];
    }
  });
  return result;
};

export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === 'boolean') {
    // 布尔值不是空
    return false;
  }
  if (typeof value === 'number') {
    // 数字不是空
    return false;
  }
  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  if (value instanceof Map || value instanceof Set) {
    // 空 Map/Set
    return value.size === 0;
  }
  return false;
};

export const isEqual = lodashEqual;

export const pick = <T extends AnyObject, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

// 给数据添加统一的内部 key -> _proKey
export const addInternalKey = <T>(
  data: T | T[],
  idx: ProTableProviderProps['internalIndex']
): T | T[] => {
  if (Array.isArray(data)) {
    return data.map(item => {
      if ((item as any)[InternalKey]) {
        return item;
      }
      idx.value += 1;
      return {
        ...item,
        [InternalKey]: `${InternalPrefix}${idx.value}`,
      };
    });
  }
  if ((data as any)[InternalKey]) {
    return data;
  }
  idx.value += 1;
  return {
    ...data,
    [InternalKey]: `${InternalPrefix}${idx.value}`,
  };
};

export const addNewRecordKey = <T>(
  data: T | T[],
  idx: ProTableProviderProps['internalIndex']
): T | T[] => {
  if ((data as any)[InternalKey]) {
    return data;
  }
  idx.value += 1;
  return {
    ...data,
    [InternalKey as keyof T]: `${InternalAddPrefix}${idx.value}`,
  };
};

export const removeInternalKey = <T extends AnyObject>(data: T | T[]) => {
  if (Array.isArray(data)) {
    return data.map(item => {
      return omit<T, '_proKey'>(item as T, ['_proKey']);
    });
  }
  return omit<T, '_proKey'>(data as T, ['_proKey']);
};

export const transScope = (scope: any) => {
  const { row, ...reset } = scope;
  return {
    ...reset,
    row: removeInternalKey(row),
  };
};
// 把 column slot default 中的 scope 转换成统一的
export const transRowData = (scope: any) => {
  // console.log('=transRowData=', scope)
  const row = removeInternalKey(scope.row);
  return {
    row,
    rowData: row,
    rowIndex: scope.$index,
    column: scope.column,
    columnIndex: scope.cellIndex,
  };
};

// 生成序号
export const getOrder = (index: number, page: Required<ProTablePageParams>) => {
  return (page.currentPage - 1) * page.pageSize + index + 1;
};

// 根据 getRowKey 获取 key，如果没有，则使用 InternalKey
export const getRealRowKey = <T>(getRow: ProTableGetRowKey<T>, row: T) => {
  const key = getRow(row);
  if (typeof key !== 'undefined') {
    return key;
  }
  return (row as any)[InternalKey] as KeyType;
};

// 根据 tableData，生成对象
export const getValueFromTable = <T>(data: T[], getRow: ProTableGetRowKey<T>) => {
  return data.reduce(
    (pre, cur) => {
      const key = getRealRowKey(getRow, cur);
      pre[key] = cur;
      return pre;
    },
    {} as Record<KeyType, T>
  );
};
// 根据 tableData 的顺序，取 formData 的值，生成列表
export const getListFromForm = <T>(
  tableData: T[],
  formData: any,
  getRowKey: ProTableGetRowKey<T>
) => {
  const arr = [];
  for (let i = 0; i < tableData.length; i++) {
    const item = tableData[i];
    const key = getRealRowKey(getRowKey, item);
    if (formData[key]) {
      arr.push(removeInternalKey(formData[key]));
    }
  }
  return arr;
};

// 获取表单中和表格数据的差异
export const getTableDataDiff = <T>(
  tableData: T[],
  formData: any,
  getRowKey: ProTableGetRowKey<T>
): {
  modifys: T[];
  removes: T[];
} => {
  const modifys = [] as T[];
  const removes = [] as T[];
  // console.log('=formData=', formData)
  for (let i = 0; i < tableData.length; i++) {
    const item = tableData[i];
    const key = getRealRowKey(getRowKey, item);
    if (!formData[key]) {
      modifys.push(item);
    } else if (!isObjectSubset<T>(item, formData[key])) {
      modifys.push(item);
    }
  }
  // key 会被转成 string
  Object.keys(formData).forEach(key => {
    const formKey = getRealRowKey(getRowKey, formData[key]);
    const index = tableData.findIndex(item => {
      return getRealRowKey(getRowKey, item) === formKey;
    });
    if (index === -1) {
      removes.push(formData[key]);
    }
  });
  return {
    modifys,
    removes,
  };
};

// 根据 keys 获取对应的对象
export const getDataFromKeys = <T>(
  keys: KeyType[],
  tableData: T[],
  getRowKey: ProTableGetRowKey<T>
) => {
  const arr = [];
  for (let i = 0; i < tableData.length; i++) {
    const item = tableData[i];
    const key = getRealRowKey(getRowKey, item);
    if (keys.includes(key)) {
      arr.push(item as any);
    }
  }
  return arr;
};
// 根据 keys 获取对应的下标
export const getIndexFormKeys = <T>(
  keys: KeyType[],
  tableData: T[],
  getRowKey: ProTableGetRowKey<T>
) => {
  const arr = [];
  for (let i = 0; i < tableData.length; i++) {
    const item = tableData[i];
    const key = getRealRowKey(getRowKey, item);
    if (keys.includes(key)) {
      arr.push(i);
    }
  }
  return arr;
};
// 根据 row 替换对应的数据
export const editTableDataByRow = <T>(
  rowData: T | T[],
  data: T[],
  getRowKey: ProTableGetRowKey<T>
) => {
  const arr = Array.isArray(rowData) ? rowData : [rowData];
  const newData = data.slice(0);
  for (let i = 0; i < newData.length; i++) {
    const itemKey = getRealRowKey(getRowKey, newData[i]);
    const index = arr.findIndex(item => {
      return getRealRowKey(getRowKey, item) === itemKey;
    });
    if (index !== -1) {
      newData[i] = arr[index];
    }
  }
  return newData;
};
// 判断子集
export const isObjectSubset = <T>(subSet: T, fullSet: AnyObject): boolean => {
  for (const key in subSet) {
    if (!Object.prototype.hasOwnProperty.call(fullSet, key)) {
      return false;
    }
    if (!isEqual(subSet[key], fullSet[key])) {
      return false;
    }
  }
  return true;
};
// 根据当前的rowKey，输出下一行 rowData
export const getNextRowData = <T>(list: T[], matcher: (item: T) => boolean): T | undefined => {
  const index = findIndex(list, matcher);
  return index >= 0 ? get(list, index + 1) : undefined;
};

// 查找最前面的
export const findFirstMatchedKV = <T>(source: AnyObject, list: T[], cb: (v: T) => string) => {
  const sourceKeys = keys(source);
  const match = find(list, item => sourceKeys.includes(cb(item)));
  return match ? match : undefined;
};
