import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, reactive, h } from 'vue';
import { ElButton, ElInput, ElMessage, ElPopconfirm } from 'element-plus';
import ProTable, {
  ProColumn,
  HisColumn,
  ProInternalAddPrefix,
  type ProTableInstance,
  type ProTableRowSelectionProps,
  type EffectContextType,
  ModalForm,
} from '../index';
import './table.css';

const meta = {
  title: 'Example/ProTable',
  component: ProTable as any,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '基于 ElementPlus 封装的表格组件',
      },
    },
  },
} satisfies Meta<typeof ProTable>;

export default meta;
type Story = StoryObj<typeof ProTable>;
type RowVO = {
  id: number;
  nesting: {
    chargeItemId: string;
  };
  list: {
    chargeItemId: string;
    state: string;
    city: string;
    address: string;
  }[];
  campusId: RowV1 | RowV1[];
  chargeItemCount: number;
  filmFeeType: number;
  graphicFeeFlag: boolean;
  digitalImagingFeeFlag: boolean;
  useScopeList: string[];
  enableFlag: boolean;
  xxxx?: string;
  yyyy?: string;
};
type RowV1 = Pick<RowVO, 'id' | 'nesting' | 'chargeItemCount' | 'xxxx' | 'yyyy'>;
const getRandom = () => {
  return Math.floor(Math.random() * 10000);
};
const generateChildData = (n: number = 10, start?: number): RowV1[] => {
  const res: RowV1[] = [];
  const realStart = start || getRandom();
  for (let i = 0; i < n; i++) {
    res.push({
      id: realStart + i,
      nesting: {
        chargeItemId: `45_${i}`,
      },
      chargeItemCount: 3,
      xxxx: undefined,
      yyyy: undefined,
    });
  }
  return res;
};
const generateData = (n: number = 10, start?: number): RowVO[] => {
  const res: RowVO[] = [];
  const realStart = start || getRandom();
  for (let i = 0; i < n; i++) {
    res.push({
      id: realStart + i,
      nesting: {
        chargeItemId:
          i === 0 ? `45435_45435_45435_45435_45435_45435_45435_45435_${i}` : `45435_${i}`,
      },
      list: [
        {
          chargeItemId: '45435',
          state: 'China',
          city: 'hangzhou',
          address: '3650 21st St, xiaoshan',
        },
        {
          chargeItemId: '45436',
          state: 'China',
          city: 'shanghai',
          address: '3650 21st St, pudong',
        },
      ],
      campusId: generateChildData(6, 90)[0],
      chargeItemCount: 10,
      filmFeeType: 2,
      graphicFeeFlag: false,
      digitalImagingFeeFlag: true,
      useScopeList: ['INP'],
      enableFlag: i % 3 === 0 ? true : false,
    });
  }
  return res;
};
const campusOption = {
  fieldProps: {
    tableProps: {
      request: (params: any) => {
        console.log('=filedProps=', params);
        const list = generateChildData(params.size, 90);
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              data: {
                count: 351,
                result: list,
                hasMore: true,
              },
            });
          }, 1000);
        });
      },
      columns: [
        {
          label: '序号',
          type: 'seq',
          width: '50',
        },
        {
          prop: 'nesting.chargeItemId',
          label: '收费项目ID',
          minWidth: 150,
        },
        {
          field: 'chargeItemCount',
          title: '收费项目次数',
          width: '120',
          valueType: 'inputNumber',
        },
      ],
    },
    valueKey: 'id',
    collapseTags: true,
    labelKey: (v: any) => {
      return v?.nesting?.chargeItemId;
    },
  },
  onValueChange: (v: any, row: RowVO) => {
    console.log('=campus onValueChange=', v, row);
  },
};

const filmFeeOption = {
  valueEnum: [
    {
      label: '全部',
      value: 0,
    },
    {
      label: '胶片费1',
      value: 1,
    },
    {
      label: '胶片费2',
      value: 2,
    },
  ],
  fieldProps: {
    automaticDropdown: true,
  },
};
const chargeEffects = (key: string) => {
  return [
    {
      target: '',
      decorator: {
        value: (ctx: EffectContextType) => {
          console.log('=ctx=', ctx);
          return ctx.$self.value?.id === 92 ? 4 : 10;
        },
      },
      batchLogic: (val: any, { setFormValues, getValue }: any) => {
        const obj = val || {};
        console.log('=val=', val, getValue(key));
        setFormValues({
          [`${key}.filmFeeType`]: 1,
          [`${key}.aaaa`]: obj.chargeItemCount,
          [`${key}.bbb`]: obj.chargeItemCount,
          [`${key}.ccc`]: obj.chargeItemCount,
        });
      },
    },
    {
      target: `${key}.graphicFeeFlag`,
      component: {
        disabled: (ctx: any) => {
          return ctx.$self.value?.id === 90;
        },
      },
    },
    // {
    //   target: `${key}.campusId`,
    //   component: {
    //     disabled: 'true',
    //   },
    // },
  ];
};
const globalColumns = [
  {
    label: '序号',
    type: 'seq',
    width: '50',
  },
  {
    prop: 'nesting.chargeItemId',
    label: '收费项目ID',
    width: 150,
    ellipsis: true,
    mode: 'read',
  },
  {
    field: 'campusId',
    required: true,
    title: '使用院区',
    width: '150',
    valueType: 'selectEnhance',
    proFieldProps: campusOption,
    effects: chargeEffects,
    ellipsis: true,
  },
  {
    field: 'chargeItemCount',
    title: '收费价格',
    width: '120',
    valueType: 'price',
  },
  {
    field: 'filmFeeType',
    title: '胶片费类型',
    width: '150',
    valueType: 'select',
    required: true,
    proFieldProps: filmFeeOption,
  },
  {
    field: 'graphicFeeFlag',
    title: '图文费标识',
    width: '95',
    valueType: 'checkbox',
    proFieldProps: {
      fieldProps: {
        multiple: false,
      },
    },
  },
  {
    field: 'digitalImagingFeeFlag',
    title: '数字影像费标识',
    width: '125',
    valueType: 'checkbox',
    proFieldProps: {
      fieldProps: {
        multiple: false,
      },
    },
  },
  {
    field: 'number',
    title: '数量',
    width: '80',
    valueType: 'inputNumber',
    fixed: 'right',
    proFieldProps: {
      fieldProps: {
        controls: false,
        onKeydown: (e: KeyboardEvent) => {
          console.log('=ev=', e);
        },
      },
    },
  },
];
// 基础表单
export const Basic: Story = {
  render: () => ({
    setup() {
      const tempData = {
        val: 0,
      };
      const getData = (params: any) => {
        console.log('==', params);
        const list = generateData(params.size, 10);
        tempData.val = list[0].id;
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              data: {
                count: 351,
                result: list,
                hasMore: params.from > 50 ? false : true,
              },
            });
          }, 2000);
        });
      };
      const tableRef = ref<ProTableInstance<RowVO>>();
      const handleEdit = (row: RowVO) => {
        console.log('编辑', row);
      };
      const handleEnable = (row: RowVO) => {
        console.log('启用', row);
        row.enableFlag = false;
      };
      const handleDisable = (row: RowVO) => {
        console.log('停用', row);
        row.enableFlag = true;
      };
      const currentLayoutChangeEvent = (row: RowVO, oldRow: RowVO) => {
        console.log('=layout selected row=', row);
        console.log('=layout selected row111=', oldRow);
      };
      const toolbarColumns = {
        title: 'Columns json',
        import: {
          buttonText: '导入文件',
          keys: [
            'index',
            'chargeItemId',
            'campusId',
            'chargeItemCount',
            'filmFeeType',
            'graphicFeeFlag',
            'digitalImagingFeeFlag',
          ],
          onSuccess: (v: any, asyncEvent: any) => {
            // 异步处理
            const res = asyncEvent();
            setTimeout(() => {
              console.log('=import success=', v);
              res.resolve();
            }, 2000);
          },
        },
      };
      const menuConfig = {
        className: 'menu-test',
        visibleMethod: (params: any) => {
          console.log('=params=', params);
          return true;
        },
        body: {
          options: [
            {
              label: '测试1',
              value: 'one',
              disabled: true,
            },
            {
              label: '测试2',
              value: 'two',
              visible: false,
            },
            {
              label: '测试3',
              value: 'three',
              children: [
                {
                  label: '子菜单1子菜单',
                  value: 'child-one',
                },
                {
                  label: '子菜单2',
                  value: 'child-two',
                },
              ],
            },
          ],
        },
        header: {
          options: [
            {
              label: '头部',
              value: 'three',
            },
          ],
        },
      };
      const menuClick = (v: any) => {
        console.log('=menu click=', v);
        console.log('=table ref=', tableRef.value?.getFormInstances());
      };
      const customColumn = ({ actions }: any) => {
        console.log('=actions=', actions);
        return (
          <ProColumn
            title="操作"
            width="100"
            fixed="right"
            valueType="option"
            v-slots={{
              default: (scope: any) => {
                // scope.row.enableFlag
                const enableFlag = scope.row.enableFlag;
                return (
                  <div>
                    {!scope.row.enableFlag && (
                      <ElButton link type="primary" onClick={() => handleEdit(scope.row)}>
                        编辑
                      </ElButton>
                    )}
                    <ElPopconfirm
                      title={`是否确定${enableFlag ? '启用' : '停用'}?`}
                      onConfirm={
                        enableFlag ? () => handleEnable(scope.row) : () => handleDisable(scope.row)
                      }
                      v-slots={{
                        reference: () =>
                          enableFlag ? (
                            <ElButton link type="danger">
                              启用
                            </ElButton>
                          ) : (
                            <ElButton link type="primary">
                              停用
                            </ElButton>
                          ),
                      }}
                    />
                  </div>
                );
              },
            }}
          />
        );
      };
      const rowSelection = reactive<ProTableRowSelectionProps<RowVO>>({
        type: 'checkbox' as const,
        selectedRowKeys: [12],
        selectable: (row: RowVO) => {
          return row.id !== tempData.val;
        },
        rowClick: true,
        onChange: (v: any, rows: RowVO[]) => {
          rowSelection.selectedRowKeys = v;
          console.log('=row selection change=', v, rows);
        },
        // onSelect: (rows: RowVO[], row: RowVO) => {
        //   console.log('=row selection onSelect=', rows, row)
        //   return new Promise((resolve) =>
        //     setTimeout(() => {
        //       resolve(row.id !== 14)
        //     }, 1000),
        //   )
        // },
      });
      const exportLoading = ref(false);
      const handleExport = () => {
        exportLoading.value = true;
        tableRef.value?.actions
          .exportMethod({
            filename: '测试excel',
          })
          .then(() => {
            exportLoading.value = false;
          })
          .catch(e => {
            ElMessage.error(e.message);
            exportLoading.value = false;
          });
      };
      const clearSelection = () => {
        rowSelection.selectedRowKeys = [];
      };
      const changeSelection = () => {
        rowSelection.selectedRowKeys = [12, 13];
      };
      const wrapParams = reactive({
        extra: 'extra',
      });
      const changeParams = () => {
        wrapParams.extra = 'extra2';
      };
      const customBase = () => {
        return (
          <>
            <ElButton type="primary" onClick={handleExport} loading={exportLoading.value}>
              自定义导出
            </ElButton>
            <ElButton type="primary" onClick={clearSelection}>
              清除selection
            </ElButton>
            <ElButton type="primary" onClick={changeSelection}>
              控制selection
            </ElButton>
            <ElButton type="primary" onClick={changeParams}>
              修改参数
            </ElButton>
          </>
        );
      };
      return () => (
        <div class="app" style="height: 500px">
          <ProTable
            rowKey="id"
            autoHeight={true}
            ref={tableRef}
            removedKey="enableFlag"
            firstRowSelected={true}
            request={getData}
            params={wrapParams}
            toolbar={toolbarColumns}
            columns={globalColumns}
            pagination={{ pageSize: 20 }}
            onCurrentChange={currentLayoutChangeEvent}
            menuConfig={menuConfig}
            onMenuClick={menuClick}
            v-slots={{
              'column-operating': customColumn,
              'toolbar-buttons': customBase,
            }}
          />
        </div>
      );
    },
  }),
};

// 标签的方式
export const Tag: Story = {
  render: () => ({
    setup() {
      const getData = (params: any) => {
        console.log('==', params);
        const list = generateData(params.size);
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              data: {
                count: 351,
                result: list,
                hasMore: true,
              },
            });
          }, 2000);
        });
      };
      const hideChargeItemCount = ref(false);
      // const rowClassName = ({ row }: any) => {
      //   console.log('=row classname=', row)
      //   if (row.enableFlag) {
      //     return 'base-table--row__stopped'
      //   }
      //   return ''
      // }
      const currentLayoutChangeEvent = (row: RowVO) => {
        console.log('=layout selected row=', row);
      };
      const toolbarColumns = {
        title: 'ProColumn Tag',
      };
      const toggle = () => {
        hideChargeItemCount.value = !hideChargeItemCount.value;
      };
      const customToolbar = () => {
        return (
          <>
            <ElButton
              type="primary"
              onClick={toggle}
            >{`${hideChargeItemCount.value ? '隐藏' : '显示'}次数`}</ElButton>
          </>
        );
      };
      return () => (
        <div style="height: 500px">
          <ProTable
            rowKey="id"
            removedKey="enableFlag"
            request={getData}
            toolbar={toolbarColumns}
            onCurrentChange={currentLayoutChangeEvent}
            firstRowSelected={true}
            v-slots={{
              'toolbar-buttons': customToolbar,
            }}
          >
            <ProColumn label="序号" type="seq" width="50" />
            <ProColumn label="收费项目ID" minWidth={150} prop="nesting.chargeItemId" />
            <HisColumn
              label="使用院区"
              field="campusId"
              valueType="select"
              proFieldProps={campusOption}
            />
            {hideChargeItemCount.value && (
              <ProColumn
                label="收费项目次数"
                field="chargeItemCount"
                width="120"
                valueType="inputNumber"
              />
            )}
            <ProColumn
              label="图文费标识"
              field="graphicFeeFlag"
              width="95"
              valueType="checkbox"
              proFieldProps={{
                fieldProps: {
                  multiple: false,
                },
              }}
            />
          </ProTable>
        </div>
      );
    },
  }),
};

// 编辑表单
export const Editable: Story = {
  render: () => ({
    setup() {
      const getData = (params: any) => {
        console.log('==', params);
        const list = generateData(params.size);
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              data: {
                count: 351,
                result: list,
                hasMore: true,
              },
            });
          }, 1000);
        });
      };

      const toolbarColumns = {
        title: '编辑态',
      };
      const tableColumnRef = ref<ProTableInstance<RowVO>>();
      const tableComluns = (globalColumns as any).concat([
        {
          title: '操作',
          width: '80',
          valueType: 'option',
          fixed: 'right',
          render: (row: any) => {
            return (
              <div>
                <ElPopconfirm
                  title="确定要删除吗"
                  onConfirm={() => tableColumnRef.value?.actions.delete(row)}
                >
                  {{
                    reference: () => (
                      <ElButton link type="danger">
                        删除
                      </ElButton>
                    ),
                  }}
                </ElPopconfirm>
              </div>
            );
          },
        },
      ]);
      const getInstance = () => {
        const data = tableColumnRef.value?.getDataHasKey() || [];
        // 获取第一行的院区控件
        const campusInstance = tableColumnRef.value?.getFormInstanceByKey('campusId', data[0]);
        const chargeItemInstance = tableColumnRef.value?.getFormInstanceByKey(
          'nesting.chargeItemId',
          data[0]
        );
        console.log('=campusInstance=', campusInstance, chargeItemInstance);
        // campusInstance.focus()
      };
      const handleModify = () => {
        const tableData = tableColumnRef.value?.getDataHasKey() as RowVO[];
        tableData[0].nesting.chargeItemId = '123456';
        // tableData[0].campusId = 2
        tableColumnRef.value?.setDataClad(tableData[0]);
      };
      const handleValidate = () => {
        const res = tableColumnRef.value?.validate();
        res?.then(v => console.log('=v=', v));
      };
      const handleData = () => {
        console.log('=instances=', tableColumnRef.value?.getFormInstances());
        // form 全量数据
        console.log('=handleData=', tableColumnRef.value?.getFormData());
        // form 修改的数据 { add: [], edit: [], remove: []  }，未修改的行数据不返回
        console.log('=getRecordSet=', tableColumnRef.value?.getFormRecord());
      };
      const setRow = () => {
        const tableData = tableColumnRef.value?.getDataHasKey();
        if (tableData) {
          tableColumnRef.value?.setCurrentRow(tableData[0]);
        }
      };
      const handleRefresh = () => {
        tableColumnRef.value?.refresh();
      };
      const customColumn = () => {
        return (
          <>
            <ElButton type="primary" onClick={handleRefresh}>
              保存后刷新
            </ElButton>
            <ElButton type="primary" onClick={setRow}>
              设置选中
            </ElButton>
            <ElButton type="primary" onClick={getInstance}>
              获取控件实例
            </ElButton>
            <ElButton type="primary" onClick={handleModify}>
              设置数据
            </ElButton>
            <ElButton type="primary" onClick={handleValidate}>
              表单验证
            </ElButton>
            <ElButton type="primary" onClick={handleData}>
              获取表单数据
            </ElButton>
          </>
        );
      };
      const rowSelection = {
        type: 'checkbox' as const,
        selectedRowKeys: [],
        onChange: (v: any, rows: RowVO[]) => {
          console.log('=row selection change=', v, rows);
        },
      };
      const editableConfig = {
        type: 'only' as const,
        defaultRow: true, // 默认新增一行
        keyboard: true, // 开启键盘
        keyboardNextRow: 'campusId', // 回车进入到下一行，不传则默认从最后一列切换
        deleteText: '我是删除',
        deleteButtonProps: {
          onClick: (e: MouseEvent, rowData: any, asyncEvent: any) => {
            // 如果需要处理异步
            const res = asyncEvent();
            setTimeout(() => {
              // 执行内部的删除
              res.resolve();
            }, 2000);
            console.log('=delete=', '删除', e, rowData);
          },
        },
        optionColumnProps: {
          width: '100',
        },
      };
      const recordCreatorProps = {
        onClick: (e: MouseEvent, operate: any) => {
          operate.add({ id: `${ProInternalAddPrefix}_${getRandom()}` });
        },
      };
      return () => (
        <div style="height: 500px">
          <ProTable
            ref={tableColumnRef}
            request={getData}
            rowSelection={rowSelection}
            rowKey="id"
            formProps={{ initEffect: true }}
            toolbar={toolbarColumns}
            columns={tableComluns}
            editable={editableConfig}
            pagination={false}
            recordCreatorProps={recordCreatorProps}
            v-slots={{
              'toolbar-buttons': customColumn,
            }}
          />
        </div>
      );
    },
  }),
};

// layout
export const Layout: Story = {
  render: () => ({
    setup() {
      const currentLayoutChangeEvent = (row: RowVO) => {
        console.log('=layout selected row=', row);
      };

      const tableRef = ref<ProTableInstance<RowVO>>();
      const childTableRef = ref<ProTableInstance<RowVO>>();

      const handleSetData = () => {
        console.log('=childTableRef=', childTableRef.value);
        childTableRef.value?.setData(generateData(20));
        // 改变左侧表格高度
        tableRef.value?.resize();
      };

      const getData = (params: any) => {
        console.log('==', params);
        const list = generateData(params.size);
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              data: {
                count: 351,
                result: list,
                scrollId: 'sdfsafsaf',
              },
            });
          }, 1000);
        });
      };
      const toolbarLayout = {
        className: 'base-table--header',
      };
      const childColumns = [
        {
          prop: 'chargeItemId',
          label: '收费项目ID',
          minWidth: '150',
        },
        {
          field: 'campusId',
          title: '使用院区',
          width: '150',
          valueType: 'select',
          proFieldProps: campusOption,
        },
        {
          field: 'chargeItemCount',
          title: '收费项目次数',
          width: '120',
          valueType: 'inputNumber',
        },
      ];
      const customFilters = ({ searchForm, onSearch }: any) => {
        const handleSaveAge = (val: string) => {
          searchForm.age = val;
        };
        return (
          <ElInput
            modelValue={searchForm.age}
            onUpdate:modelValue={handleSaveAge}
            placeholder="输入年龄"
            onKeydown={() => onSearch()}
          />
        );
      };
      const customColumn = () => {
        return (
          <>
            <ElButton type="primary" onClick={handleSetData}>
              插槽内容修改
            </ElButton>
            <ElButton type="primary">新增入库</ElButton>
          </>
        );
      };
      const customSide = () => {
        return (
          <div class="base-table--side">
            <ProTable
              ref={childTableRef}
              rowKey="id"
              request={getData}
              columns={childColumns}
              pagination={false}
              toolbar={false}
            />
          </div>
        );
      };
      return () => (
        <ProTable
          ref={tableRef}
          tableClassName="base-table--layout"
          bodyClassName="base-table--body"
          bodyMainClassName="base-table--main"
          request={getData}
          columns={globalColumns}
          toolbar={toolbarLayout}
          rowKey="id"
          pagination={false}
          onCurrentChange={currentLayoutChangeEvent}
          firstRowSelected={true}
          v-slots={{
            'toolbar-filters': customFilters,
            'toolbar-buttons': customColumn,
            'table-side': customSide,
          }}
        />
      );
    },
  }),
};

// 多级表头
export const MultiHeader: Story = {
  render: () => ({
    setup() {
      const getData = (params: any) => {
        console.log('==', params);
        const list = generateData(params.size);
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              data: {
                count: 351,
                result: list,
                scrollId: 'sdfsafsaf',
              },
            });
          }, 1000);
        });
      };
      const toolbarMutil = {
        title: '多级表头',
      };
      const mutilColumns = [
        {
          label: '序号',
          type: 'seq',
          width: '50',
        },
        {
          label: '信息',
          children: [
            {
              prop: 'chargeItemId',
              label: '收费项目ID',
              required: true,
              minWidth: 150,
            },
            {
              field: 'campusId',
              title: '使用院区',
              width: '150',
              valueType: 'select',
              proFieldProps: campusOption,
            },
            {
              field: 'chargeItemCount',
              title: '收费项目次数',
              width: '120',
              valueType: 'inputNumber',
            },
          ],
        },
      ];
      return () => (
        <div style="height: 500px">
          <ProTable
            request={getData}
            columns={mutilColumns}
            toolbar={toolbarMutil}
            rowKey="id"
            pagination={false}
          />
        </div>
      );
    },
  }),
};

// 展开行
export const Expand: Story = {
  render: () => ({
    setup() {
      const getData = (params: any) => {
        console.log('==', params);
        const list = generateData(params.size, 10);
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              data: {
                count: 351,
                result: list,
                scrollId: 'sdfsafsaf',
              },
            });
          }, 1000);
        });
      };
      const toolbarMutil = {
        title: '展开行',
      };
      const mutilColumns = [
        {
          label: '序号',
          type: 'seq',
          width: '50',
        },
        {
          prop: 'nesting.chargeItemId',
          label: '收费项目ID',
          required: true,
          minWidth: 150,
        },
        {
          field: 'campusId',
          title: '使用院区',
          width: 150,
          valueType: 'select',
          proFieldProps: campusOption,
        },
        {
          field: 'chargeItemCount',
          title: '收费项目次数',
          width: 120,
          valueType: 'inputNumber',
        },
      ];
      const expandColumns = [
        {
          prop: 'chargeItemId',
          label: '收费项目ID',
          required: true,
          minWidth: 120,
        },
        {
          prop: 'state',
          label: '国家',
          width: 80,
        },
        {
          prop: 'city',
          label: '城市',
          width: 80,
        },
        {
          prop: 'address',
          label: '地址',
          width: 150,
        },
      ];
      const expandableConfig = reactive({
        expandedRowKeys: [12],
        onExpandedRowsChange: (keys: any, rows: any) => {
          console.log('=onExpandedRowsChange rows=', rows);
          expandableConfig.expandedRowKeys = keys;
        },
      });
      const changeExpand = () => {
        expandableConfig.expandedRowKeys = [12, 13];
      };
      const customToolbar = () => {
        return (
          <>
            <ElButton type="primary" onClick={changeExpand}>
              控制expand
            </ElButton>
          </>
        );
      };
      const custom = (res: any) => {
        const { row } = res;
        console.log('=res=', res);
        return (
          <div style={{ padding: '10px' }}>
            <p>收费项目ID: {row.nesting.chargeItemId}</p>
            <p>收费项目次数: {row.chargeItemCount}</p>
            <h3>表格</h3>
            <ProTable
              rowKey="chargeItemId"
              defaultData={row.list}
              columns={expandColumns}
              toolbar={false}
              pagination={false}
              autoHeight={true}
            />
          </div>
        );
      };
      return () => (
        <div style="height: 500px">
          <ProTable
            request={getData}
            columns={mutilColumns}
            toolbar={toolbarMutil}
            rowKey="id"
            expandable={expandableConfig}
            v-slots={{
              expand: custom,
              'toolbar-buttons': customToolbar,
            }}
          />
        </div>
      );
    },
  }),
};

// 弹窗表格
export const Model: Story = {
  render: () => ({
    setup() {
      const getData = (params: any) => {
        console.log('==', params);
        const list = generateData(params.size);
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              data: {
                count: 351,
                result: list,
                hasMore: true,
              },
            });
          }, 1000);
        });
      };

      const toolbarColumns = {
        title: '弹窗编辑',
      };
      const tableColumnRef = ref<ProTableInstance<RowVO>>();
      const tableComluns = (globalColumns as any).concat([
        {
          title: '操作',
          width: '80',
          valueType: 'option',
          fixed: 'right',
          render: (row: any) => {
            return (
              <div>
                <ElPopconfirm
                  title="确定要删除吗"
                  onConfirm={() => tableColumnRef.value?.actions.delete(row)}
                >
                  {{
                    reference: () => (
                      <ElButton link type="danger">
                        删除
                      </ElButton>
                    ),
                  }}
                </ElPopconfirm>
              </div>
            );
          },
        },
      ]);

      const rowSelection = {
        type: 'checkbox' as const,
        selectedRowKeys: [],
        onChange: (v: any, rows: RowVO[]) => {
          console.log('=row selection change=', v, rows);
        },
      };
      const editableConfig = {
        type: 'cell' as const,
        // defaultRow: true,
        keyboard: true,
        deleteText: '我是删除',
        deleteButtonProps: {
          onClick: (e: MouseEvent, rowData: any, asyncEvent: any) => {
            // 如果需要处理异步
            const res = asyncEvent();
            setTimeout(() => {
              // 执行内部的删除
              res.resolve();
            }, 2000);
            console.log('=delete=', '删除', e, rowData);
          },
        },
        optionColumnProps: {
          width: '100',
        },
      };
      // 使用h函数创建按钮组件
      const triggerNode = h(ElButton, null, {
        default: () => '新建',
      });
      return () => (
        <div style="height: 500px">
          <ModalForm title="弹窗编辑表格" width="1100px" trigger={triggerNode}>
            <ProTable
              ref={tableColumnRef}
              request={getData}
              rowSelection={rowSelection}
              rowKey="id"
              autoHeight
              formProps={{ initEffect: true }}
              toolbar={toolbarColumns}
              columns={tableComluns}
              editable={editableConfig}
              pagination={false}
            />
          </ModalForm>
        </div>
      );
    },
  }),
};
