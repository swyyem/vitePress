import * as XLSX from 'xlsx';
import { dayjs } from 'element-plus';
import { getValue } from '../../utils/value';
import type {
  AnyObject,
  ProTableProviderProps,
  ProTablePageParams,
  ProTableToolbarExportProps,
  ProTableToolbarImportProps,
} from '../index';

type ExportOptions = ProTableToolbarExportProps & {
  getSelectionRows: ProTableProviderProps['getSelectionRows'];
  pureFetch: ProTableProviderProps['pureFetch'];
  columns: ProTableProviderProps['columns'];
  getCellRef: ProTableProviderProps['getCellRef'];
};
const getFilename = (filename?: ProTableToolbarExportProps['filename']) => {
  return filename || dayjs().format('YYYYMMDDHHmmss');
};
const getData = <T = any>(
  pureFetch: ExportOptions['pureFetch'],
  pageInfo: ProTablePageParams,
  totalData: T[] = []
): Promise<T[]> => {
  return pureFetch(pageInfo).then(res => {
    const { scrollId, hasMore, data } = res;
    totalData.push(...data);
    if (hasMore) {
      pageInfo.currentPage = (pageInfo.currentPage || 0) + 1;
      if (scrollId) {
        pageInfo.scrollId = scrollId;
      }
      return getData(pureFetch, pageInfo, totalData);
    }
    return totalData;
  });
};
// 导出 excel
const exportExcel = (params: {
  columns: ExportOptions['columns'];
  getCellRef: ExportOptions['getCellRef'];
  filename: ExportOptions['filename'];
  onSuccess?: ExportOptions['onSuccess'];
  data: any[];
}) => {
  const realColumn = params.columns.value
    .filter(item => {
      const isOption = item.valueType && item.valueType === 'option';
      const isType = item.type && item.type !== 'seq';
      return !isOption && !isType;
    })
    .map(item => ({
      title: item.title,
      dataKey: item.dataKey,
    }));
  const headers = realColumn.map(item => item.title);
  const rows: any[] = [headers];
  params.data.forEach((item, index) => {
    rows.push(
      realColumn.map(column => {
        if (column.dataKey) {
          const ref = params.getCellRef(column.dataKey);
          const value = getValue(item, column.dataKey);
          if (ref) {
            return ref.getText(value);
          }
          return value;
        } else {
          return index + 1;
        }
      })
    );
  });
  const ws = XLSX.utils.aoa_to_sheet([]); // 空工作表
  XLSX.utils.sheet_add_aoa(ws, rows);
  // 设置列宽
  ws['!cols'] = realColumn.map(item => {
    const title = item.title || 'a';
    const len = title.length * 4;
    return { wch: len };
  });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, ws, 'sheet1');
  XLSX.writeFile(workbook, `${getFilename(params.filename)}.xlsx`, {
    compression: true,
  });
  params.onSuccess?.();
};
// 导出方法
export const exportMethod = (options: ExportOptions) => {
  // 如果开启了选中模式
  if (options.checked) {
    const rows = options.getSelectionRows();
    if (rows.length === 0) {
      return Promise.reject(new Error('请选择要导出的数据'));
    }
    exportExcel({
      columns: options.columns,
      getCellRef: options.getCellRef,
      data: rows,
      filename: options.filename,
      onSuccess: options.onSuccess,
    });
    return Promise.resolve(rows);
  }
  const pageInfo: ProTablePageParams = {
    currentPage: 1,
    pageSize: 100,
  };
  return getData(options.pureFetch, pageInfo).then(data => {
    exportExcel({
      columns: options.columns,
      getCellRef: options.getCellRef,
      data: data,
      filename: options.filename,
      onSuccess: options.onSuccess,
    });
  });
};
// 导入
export const importMethod = (file: Blob, options?: ProTableToolbarImportProps) => {
  const props = options || {};
  return file.arrayBuffer().then(buffer => {
    const workbook = XLSX.read(buffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    rawData.shift();
    const list: any[] = [];
    rawData.forEach((item: any) => {
      if (props.keys) {
        const res: AnyObject = {};
        props.keys.forEach((key, index) => {
          res[key] = item[index];
        });
        list.push(res);
      } else {
        list.push(item);
      }
    });
    return list;
  });
};
