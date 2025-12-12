import { reactive, ref, shallowRef, toRaw, onMounted, onBeforeUnmount, watch, type Ref } from 'vue';
import { createFetch } from '../utils/createFetch';
import { postDataPipeline, addInternalKey, removeInternalKey } from './utils';
import type { DeferredExcutorType } from '../utils/defer';
import type {
  AnyObject,
  ProTableProps,
  ProTablePageParams,
  ProTableProviderProps,
} from './table.types';

type useRequestOptions<T> = {
  deferReadyExecutor: DeferredExcutorType;
  showPage: boolean;
  waterfall: boolean;
  manualRequest?: boolean;
  pagination?: ProTableProps['pagination'];
  internalIndex: ProTableProviderProps['internalIndex'];
  data: Ref<T[] | undefined>;
  params: Ref<AnyObject | undefined>;
  tableFirstRef: Ref<boolean>;
  onFirst: () => void;
} & Pick<
  ProTableProps<T>,
  'dataSource' | 'defaultData' | 'onLoad' | 'onRequestError' | 'postData' | 'defaultSearchForm'
>;

type transPageResType = {
  size: number;
  from: number;
  scrollId?: string;
};
// page 转换
const transPage = (pageValue: ProTablePageParams) => {
  // currentPage -> from, pageSize -> size
  const { currentPage = 1, pageSize = 10, scrollId } = pageValue;
  const res: transPageResType = {
    size: pageSize,
    from: (currentPage - 1) * pageSize,
  };
  if (scrollId) {
    res.scrollId = scrollId;
  }
  return res;
};

// 所有的参数都应该在此维护
const useRequest = <T extends AnyObject>(
  request: ProTableProps['request'],
  options: useRequestOptions<T>
) => {
  const manualRequest = request ? (options.manualRequest ?? false) : true;
  const initRequest = !manualRequest;
  const showPage = options.showPage;
  const waterfall = options.waterfall;
  const tableData = shallowRef<T[]>([]);
  const initPage = options.pagination ? options.pagination : {};
  const loading = ref(initRequest);
  const error = ref('');
  const first = ref(true);
  // 页码数据
  const pageInfo = reactive<ProTablePageParams>({
    currentPage: initPage.currentPage ?? 1,
    pageSize: initPage.pageSize ?? 10,
    total: 0,
    hasMore: true,
  });

  const searchForm = reactive<AnyObject>(options.defaultSearchForm || {});

  const setLoading = (v: boolean) => {
    loading.value = v;
  };
  const setTableData = (data: T[], isCover?: boolean) => {
    const dataWithKey = addInternalKey<T>(data, options.internalIndex);
    if (isCover) {
      // 清空
      if (data && data.length === 0) {
        options.deferReadyExecutor.reset();
      }
      tableData.value = dataWithKey as T[];
    } else {
      tableData.value = tableData.value.concat(dataWithKey);
    }
  };

  const getTableData = () => {
    const dateNoKey = removeInternalKey<T>(tableData.value);
    return dateNoKey as T[];
  };

  const getRowDataByIndex = (index: number) => {
    return tableData.value[index];
  };

  const getTableDataHasKey = () => {
    return toRaw(tableData.value);
  };

  const getTableDataSize = () => {
    return tableData.value.length;
  };

  const setSearchForm = (formValues: AnyObject) => {
    // 如果form 存在的覆盖 searchForm 中的值，不存在则保持 searchForm 中的值
    if (formValues) {
      if (typeof formValues !== 'object') {
        throw new Error('formValues 必须是一个 object');
      }
      Object.keys(formValues).forEach(key => {
        if (formValues[key] !== undefined && formValues[key] !== null) {
          searchForm[key] = formValues[key];
        }
      });
    }
  };

  const clearSearchForm = () => {
    for (const key in searchForm) {
      Reflect.deleteProperty(searchForm, key);
    }
  };

  const resetPage = () => {
    pageInfo.currentPage = 1;
    pageInfo.total = 0;
    pageInfo.hasMore = true;
    if (pageInfo.scrollId) {
      delete pageInfo.scrollId;
    }
  };

  const resetRequest = () => {
    options.tableFirstRef.value = true;
    resetPage();
    if (waterfall) {
      // 瀑布流模式还原
      setFirst(true);
      setTableData([], true);
    }
  };

  const setPage = (changedPage: ProTablePageParams) => {
    if (changedPage.currentPage) {
      pageInfo.currentPage = changedPage.currentPage;
    }
    if (changedPage.pageSize) {
      pageInfo.pageSize = changedPage.pageSize;
    }
  };

  const setFirst = (v: boolean) => {
    first.value = v;
  };

  const enhanceFetch = createFetch(
    request
      ? (p?: AnyObject) => {
          const pageValue = toRaw(pageInfo);
          const realPage = showPage || waterfall ? transPage(pageValue) : {};
          // console.log('=realPage=', realPage, showPage)
          const searchFormValues = toRaw(searchForm);
          const extraParams = options.params.value ? toRaw(options.params.value) : {};
          const params = {
            ...realPage,
            ...searchFormValues,
            ...extraParams,
            ...(p || {}),
          };
          return request(params);
        }
      : undefined,
    () => {
      first.value = false;
      loading.value = false;
    }
  );
  const fetchSucc = (res: any) => {
    if (res) {
      const { data } = res;
      if (showPage) {
        pageInfo.total = data.count;
      }
      const responseData = postDataPipeline<T[]>(
        data.result || data || [],
        [options.postData].filter(item => !!item)
      );
      // 有些接口 data 就是数组
      if (!waterfall) {
        setTableData(responseData, true);
      } else {
        setTableData(responseData);
        // tableData.value = tableData.value.concat(responseData)
        pageInfo.scrollId = data.scrollId;
        pageInfo.hasMore = data.hasMore ?? false;
      }
      options.onLoad?.(responseData);
    }
  };
  const fetch = () => {
    // 瀑布流场景
    if (waterfall && !pageInfo.hasMore) {
      return Promise.resolve();
    }
    // 避免重复请求，瀑布流场景不考虑
    if (!first.value && !waterfall && loading.value) {
      return Promise.resolve();
    }
    loading.value = true;
    return enhanceFetch()
      .then((res: any) => {
        fetchSucc(res);
        options.deferReadyExecutor.exec();
      })
      .catch((e: Error) => {
        error.value = e.message;
        options.onRequestError?.(e);
      });
  };

  const pureFetch = (pageInfo: ProTablePageParams) => {
    if (request) {
      const searchFormValues = toRaw(searchForm);
      const params = {
        ...transPage(pageInfo),
        ...searchFormValues,
      };
      return request(params).then((res: any) => {
        const { data } = res;
        const responseData = postDataPipeline<T[]>(
          data.result || data || [],
          [options.postData].filter(item => !!item)
        );
        return {
          data: responseData,
          scrollId: data.scrollId,
          hasMore: data.hasMore ?? false,
        };
      });
    }
    // 如果传入的 data，则认为没有翻页
    return Promise.resolve({
      data: tableData.value,
      hasMore: false,
    });
  };

  // 提供一个方法给下拉表格场景使用，需要做第一次和请求中的过滤，防止重复请求
  const selectFirst = ref(true);
  const selectFetch = () => {
    // 只有调用一次
    if (!selectFirst.value) {
      return;
    }
    if (loading.value) {
      return;
    }
    loading.value = true;
    return enhanceFetch()
      .then((res: any) => {
        fetchSucc(res);
        options.deferReadyExecutor.exec();
        selectFirst.value = false;
      })
      .catch((e: Error) => {
        error.value = e.message;
        options.onRequestError?.(e);
        selectFirst.value = false;
      });
  };

  const stopDataWatch = watch(options.data, newVal => {
    if (newVal) {
      setTableData(newVal, true);
    }
  });

  const stopParamsWatch = watch(
    options.params,
    () => {
      // 改变了重新请求
      resetRequest();
      fetch();
    },
    { deep: true }
  );

  onBeforeUnmount(() => {
    stopDataWatch();
    stopParamsWatch();
  });

  onMounted(() => {
    if (options.defaultData) {
      setTableData(options.defaultData, true);
      // tableData.value = options.defaultData
    } else if (options.dataSource) {
      setTableData(options.dataSource, true);
      // tableData.value = options.dataSource
    } else if (options.data.value) {
      setTableData(options.data.value, true);
      // tableData.value = options.data
    }
    if (!request) {
      options.onFirst();
    }
    if (initRequest) {
      fetch();
    }
  });

  return {
    fetchMethod: fetch,
    selectFetch,
    pureFetch,
    setPage,
    setSearchForm,
    clearSearchForm,
    setLoading,
    setTableData,
    getTableData,
    getTableDataHasKey,
    resetRequest,
    setFirst,
    getTableDataSize,
    getRowDataByIndex,
    loading,
    error,
    tableData,
    pageInfo,
    searchForm,
    first,
  };
};
export default useRequest;
