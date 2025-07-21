import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { ElButton, ElRow, ElCol, ElRadio, ElRadioGroup } from 'element-plus'
import type { EffectContextType, ProFieldFCMode, ProFormValueType } from '../index'
import {
  ProForm,
  ProFormField,
  ProField,
  ProFormText,
  ProFormDatePicker,
  ProFormCheckbox,
  ProFormInputNumber,
  ProFormSelect,
  ProFormSelectEnhance,
} from '../index'
import { registerComponent } from '../index'
import Carousel from '../stories/ProFormFields/Carousel.vue'
import Breadcrumb from '../stories/ProFormFields/Breadcrumb.vue'
import Dropdown from '../stories/ProFormFields/Dropdown.vue'
import Custom from '../stories/ProFormFields/Custom.vue'

registerComponent({
  Carousel: Carousel,
  Breadcrumb: Breadcrumb,
  Dropdown: Dropdown,
  Custom: Custom,
})

const meta = {
  title: 'Example/ProForm',
  component: ProForm,
  tags: ['autodocs'],
  argTypes: {
    submitter: {
      control: 'object',
      description: '表单底部的按钮配置',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '基于 ElementPlus 封装的表单组件',
      },
      type: {
        // 自动生成类型文档
        showType: true,
        // 展开嵌套类型
        expandType: true,
      },
    },
  },
} satisfies Meta<typeof ProForm>

export default meta
type Story = StoryObj<typeof ProForm>

const generateData = (n: number = 10, start?: number) => {
  const res = []
  const realStart = start || Math.floor(Math.random() * 10000)
  for (let i = 0; i < n; i++) {
    res.push({
      id: realStart + i,
      name: `name${i}`,
      price: i * 100,
      stock: i * 10,
    })
  }
  return res
}
// 基础表单
export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'ProForm 的 JSX 基本用法，ProFormText 组件是对 element-plus 中的 el-input 组件封装，其他 form 表单组件一样',
      },
    },
  },
  render: () => {
    return {
      setup() {
        const handleSubmit = (values: ProFormValueType) => {
          console.log('提交数据：', values)
        }
        const newData = ref<ProFormValueType>({})
        const handleChange = (newValues: ProFormValueType, values: ProFormValueType) => {
          newData.value = values
          console.log('valueChange', newValues, values, newData)
        }

        const handleFinish = (values: ProFormValueType) => {
          console.log('=finish=', values)
          // 返回 promise，按钮会有 loading 效果
          return new Promise<boolean>((resolve) => {
            setTimeout(() => {
              resolve(true)
            }, 2000)
          })
        }

        const rules = {
          IDcard: [{ min: 15, max: 18, message: 'Length should be 15 to 18', trigger: 'blur' }],
        }

        const genderEffect = [
          {
            target: 'IDcard',
            decorator: {
              rules: (ctx: EffectContextType) => {
                console.log('=gender ctx=', ctx)
                if (ctx.$self.value === 'female') {
                  return [{ min: 1, max: 5, message: 'Length should be 1 to 5', trigger: 'blur' }]
                } else {
                  return rules.IDcard
                }
              },
            },
          },
          {
            target: 'fullName',
            decorator: {
              display: "ctx.$self.value === 'male'? 'none' : 'visible'",
            },
          },
          {
            target: 'address',
            decorator: {
              display: (ctx: EffectContextType) => {
                console.log('=gender ctx=', ctx)
                return ctx.$self.value === 'male' ? 'hidden' : 'visible'
              },
            },
          },
        ]

        const selEffects = [
          {
            target: 'address',
            decorator: {
              value: (ctx: EffectContextType, formValues: ProFormValueType) => {
                return ctx.$self.value ? `${formValues.username || ''}的地址` : ''
              },
            },
          },
        ]
        const getData = (params: any) => {
          console.log('=params=', params)
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  count: 31,
                  result: [
                    {
                      key: 'other',
                      value: 'other',
                      label: '其他',
                    },
                    {
                      key: 'male',
                      value: 'male',
                      label: '男',
                    },
                    {
                      key: 'female',
                      value: 'female',
                      label: '女',
                    },
                  ],
                  hasMore: false,
                },
              })
            }, 2000)
          })
        }

        const mode = ref<ProFieldFCMode>('edit')
        // 添加计算属性
        const modeValue = computed({
          get: () => mode.value,
          set: (val: ProFieldFCMode) => {
            console.log('=mode=', val)
            mode.value = val
          },
        })
        const firstNameKey = ['full', 'firstName']
        const lastNameKey = ['full', 'lastName']

        // username
        const userNameProps = {
          placeholder: '用户名',
        }
        const format = 'YYYY/MM/DD'
        // 下拉表格组件属性
        const medicineProps = {
          placeholder: '请选择药品',
          waterfall: true,
          filterable: true,
          valueKey: 'id',
          labelKey: (v: any) => v.name,
          tableProps: {
            request: () => {
              return new Promise((resolve) => {
                const list = generateData(20)
                resolve({
                  data: {
                    count: 351,
                    result: list,
                    hasMore: true,
                  },
                })
              })
            },
            columns: [
              {
                prop: 'name',
                label: '名称',
              },
              {
                prop: 'price',
                label: '价格',
              },
              {
                prop: 'stock',
                label: '库存',
              },
            ],
          },
        }
        const handleMedicineChange = (value: any) => {
          console.log('=handleMedicineChange=', value)
        }
        return () => (
          <div>
            <div style={{ height: '30px' }}>
              <ElRadioGroup
                modelValue={modeValue.value}
                onUpdate:modelValue={(v: any) => (modeValue.value = v)}
              >
                <ElRadio value="edit">编辑</ElRadio>
                <ElRadio value="read">只读</ElRadio>
              </ElRadioGroup>
            </div>
            <div>
              <ProForm
                gutter={0}
                formTitle="表单标题"
                labelWidth="100px"
                rules={rules}
                mode={mode.value}
                emptyText="/"
                colon={true}
                initialValues={{ gender: 'male', sel: false }}
                onSubmit={handleSubmit}
                onFinish={handleFinish}
                onValuesChange={handleChange}
              >
                <ProFormText
                  required={true}
                  name="username"
                  label="用户名"
                  fieldProps={userNameProps}
                />
                <ProFormField name="fullName" layout={true} label="姓名" required={true}>
                  <ElRow gutter={12} style={{ flex: 1 }}>
                    <ElCol span={12}>
                      <ProFormText required={true} name={firstNameKey} />
                    </ElCol>
                    <ElCol span={12}>
                      <ProFormText required={true} name={lastNameKey} />
                    </ElCol>
                  </ElRow>
                </ProFormField>
                <ProFormField name="custom" label="自定义">
                  <ProField valueType="Custom" />
                </ProFormField>
                <ProFormSelectEnhance
                  name="medicine"
                  label="药品"
                  onValueChange={handleMedicineChange}
                  fieldProps={medicineProps}
                />
                <ProFormSelectEnhance
                  name="gender"
                  label="性别"
                  effects={genderEffect}
                  fieldProps={{
                    remoteMethod: getData,
                    defaultValueEnum: [
                      {
                        key: 'male',
                        value: 'male',
                        label: '男',
                      },
                    ],
                  }}
                />
                <ProFormSelect
                  name="province"
                  label="省份"
                  valueEnum={[
                    {
                      label: '浙江',
                      value: 'zhejiang',
                    },
                    {
                      label: '江苏',
                      value: 'jiangsu',
                    },
                  ]}
                  fieldProps={{
                    multiple: true,
                    checkAll: true,
                    placeholder: '请选择省份',
                  }}
                />
                <ProFormCheckbox
                  label="选择"
                  name="sel"
                  effects={selEffects}
                  fieldProps={{ multiple: false }}
                />
                <ProFormInputNumber
                  name="number"
                  label="数字"
                  fieldProps={{
                    controls: false,
                    controlsPosition: 'right',
                    placeholder: '请输入数字',
                  }}
                />
                <ProFormDatePicker
                  name="birthday"
                  label="出生日期"
                  fieldProps={{
                    format,
                    placeholder: '请选择日期',
                  }}
                />
                <ProFormText required={true} label="身份证号" name="IDcard" />
                <ProFormText
                  required={true}
                  label="地址"
                  colon={false}
                  name="address"
                  display="hidden"
                />
              </ProForm>
            </div>
          </div>
        )
      },
    }
  },
}

// 带默认值的表单
export const WithInitialValues: Story = {
  render: () => {
    return {
      setup() {
        const handleSubmit = (values: ProFormValueType) => {
          console.log('提交数据：', values)
        }

        const handleChange = (newValues: ProFormValueType, values: ProFormValueType) => {
          console.log('valueChange', newValues, values)
          console.log('initialValues=', initialValues)
        }

        const formRef = ref()

        const setFormValues = () => {
          console.log('=form=', formRef.value.getFormValues())
          formRef.value.setFormValues({})
        }

        const getStatus = () => {
          console.log('=edit=', formRef.value.hasEditorStatus())
        }

        const userEffect = [
          {
            target: 'name',
            decorator: {
              display: "ctx.$self.value === '123' ? 'none' : 'visible'",
            },
          },
        ]

        // default
        const initialValues = ref({
          id: '111',
          username: '',
          name: '1234',
        })

        const submitter = {
          searchConfig: {
            submitText: '提交',
          },
          align: 'center' as const,
        }
        return () => (
          <div>
            <div style={{ height: '30px' }}>带默认值表单</div>
            <div>
              <div style="margin-bottom: 10px">
                <ElButton onClick={setFormValues}>设置 form 的值</ElButton>
                <ElButton onClick={getStatus}>判断 form 值是否更改</ElButton>
              </div>
              <ProForm
                ref={formRef}
                labelWidth="80px"
                initialValues={initialValues}
                autoFocusFirstInput={true}
                submitter={submitter}
                onSubmit={handleSubmit}
                onValuesChange={handleChange}
              >
                <ProFormText required name="username" label="用户名" effects={userEffect} />
                <ProFormText required label="姓名" name="name" />
              </ProForm>
            </div>
          </div>
        )
      },
    }
  },
}

// 参数联动
export const 联动参数: Story = {
  render: () => {
    return {
      setup() {
        const handleSubmit = (values: any) => {
          console.log('提交数据：', values)
        }

        const userEffect = [
          {
            trigger: 'blur',
            target: 'list',
            decorator: {
              valueEnum: (ctx: EffectContextType) => {
                console.log('=valueEnum=', ctx.$self.value)
                return getEnum(ctx.$self.value)
              },
            },
          },
          {
            target: 'list',
            decorator: {
              label: 'ctx.$self.value?.length > 0 ? `列表 ${ctx.$self.value.slice(0, 4)}` : `列表`',
            },
          },
          {
            target: 'desc',
            component: {
              placeholder: (ctx: EffectContextType) => {
                console.log('=placeholder=', ctx, ctx.$self.value === '222')
                return ctx.$self.value === '222' ? '请输入简介' : '无'
              },
            },
          },
        ]

        const listEffect = [
          {
            target: 'desc',
            component: {
              size: 'ctx.$self.value === "222" ? "large" : "default"',
            },
            batchLogic: async (v: any, { setFormValues }: any) => {
              const data = await new Promise<ProFormValueType>((resolve) => {
                setTimeout(() => {
                  resolve({
                    desc: `异步简介${v}`,
                    mark: `异步备注${v}`,
                  })
                }, 1000)
              })
              setFormValues({
                desc: data.desc,
                mark: data.mark,
              })
            },
          },
        ]
        const getEnum = (username: string = '') => {
          return [
            {
              key: '1',
              value: '111',
              label: `${username}111`,
            },
            {
              key: '2',
              value: '222',
              label: `${username}222`,
            },
          ]
        }
        const listEnum = ref(getEnum(''))
        watch(
          () => listEnum.value,
          (newValue) => {
            console.log('=listEnum changed=', newValue)
          },
        )

        const controlEnum = getEnum('control')
        const editListEnum = () => {
          listEnum.value = controlEnum
        }

        const fieldProps = ref({
          size: 'default',
          placeholder: '',
        })
        const listLabel = ref('列表')
        const editListLabel = () => {
          listLabel.value = '修改列表'
        }
        const editDescPlace = () => {
          fieldProps.value.placeholder = '修改简介 placeholder'
        }
        watch(
          () => fieldProps.value,
          (newValue) => {
            console.log('=fieldProps changed=', newValue)
          },
        )
        return () => (
          <div>
            <div style={{ height: '30px' }}>参数联动</div>
            <div>
              <div>
                <ElButton onClick={editListLabel}>修改列表 label</ElButton>
                <ElButton onClick={editListEnum}>修改列表 valueEnum</ElButton>
                <ElButton onClick={editDescPlace}>修改简介 placeholder</ElButton>
              </div>
              <p style="font-size: 12px; color: #333">
                为了保持响应式，form 外修改 ProFormField 的 props 需要使用 v-model 的方式
              </p>
              <ProForm
                labelWidth="80px"
                onSubmit={handleSubmit}
                submitter={{
                  searchConfig: {
                    submitText: '保存',
                    resetText: '清空',
                  },
                  submitButtonProps: { type: 'success' },
                }}
              >
                <ProFormField name="a.username" label="用户名" effects={userEffect}>
                  <ProField valueType="text" fieldProps={{ placeholder: '用户名' }} />
                </ProFormField>
                <ProFormField
                  name="list"
                  label={listLabel.value}
                  onUpdate:label={(newLabel) => (listLabel.value = newLabel)}
                  valueEnum={listEnum.value}
                  onUpdate:valueEnum={(newValueEnum: any) => (listEnum.value = newValueEnum)}
                  effects={listEffect}
                >
                  <ProField valueType="select" />
                </ProFormField>
                <ProFormText
                  name="desc"
                  label="简介"
                  fieldProps={fieldProps.value}
                  onUpdate:fieldProps={(v: any) => {
                    fieldProps.value = v
                  }}
                />
                <ProFormText name="mark" label="备注" />
              </ProForm>
            </div>
          </div>
        )
      },
    }
  },
}

// 输出的方法
export const Expose: Story = {
  render: () => {
    return {
      setup() {
        const handleSubmit = (values: any) => {
          console.log('提交数据：', values)
        }
        const formRef = ref()
        const setFormValues = () => {
          formRef.value.setFormValues({
            username: 'test',
            address: 'test',
          })
        }
        return () => (
          <div>
            <div style={{ height: '30px' }}>弹窗表单</div>
            <div>
              <div style="margin-bottom: 10px">
                <ElButton onClick={setFormValues}>设置 form 的值</ElButton>
              </div>
              <ProForm
                ref={formRef}
                labelWidth="80px"
                onSubmit={handleSubmit}
                submitter={{
                  searchConfig: {
                    submitText: '保存',
                    resetText: '清空',
                  },
                  submitButtonProps: { type: 'success' },
                }}
              >
                <ProFormText
                  name="username"
                  label="用户名"
                  fieldProps={{ placeholder: '用户名' }}
                />
                <ProFormText name="address" label="地址" fieldProps={{ placeholder: '地址' }} />
                <ProFormText name="mark" label="备注" />
              </ProForm>
            </div>
          </div>
        )
      },
    }
  },
}

export const columns字段: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '这个示例展示了如何使用 columns 配置来声明式地定义表单结构，包括分组、嵌套表单等高级用法。',
      },
    },
  },
  render: () => {
    return {
      setup() {
        const handleSubmit = (values: ProFormValueType) => {
          console.log('提交数据：', values)
        }

        const handleChange = (newValues: ProFormValueType, values: ProFormValueType) => {
          console.log('valueChange', newValues, values)
        }

        const options = [
          {
            key: 'male',
            value: 'male',
            label: '男',
          },
          {
            key: 'female',
            value: 'female',
            label: '女',
          },
        ]

        const mode = ref<ProFieldFCMode>('edit')
        const setMode = (value: any) => {
          mode.value = value
        }
        const initialValues = {
          age: '18',
        }

        const columns = [
          {
            label: '年龄',
            valueType: 'Custom',
            name: 'age',
            required: true,
            rules: [{ min: 15, max: 18, message: 'Length should be 15 to 18', trigger: 'change' }],
            fieldProps: {
              tooltip: '111111111',
              name: '222222',
            },
            colProps: { span: 8 },
          },
          {
            label: '性别',
            valueType: 'select',
            name: 'gender',
            required: true,
            valueEnum: options,
          },
          {
            label: '数量',
            valueType: 'price',
            name: 'number',
            required: true,
          },
          {
            label: '时间',
            valueType: 'datePicker',
            name: 'name',
            fieldProps: {},
            colProps: { span: 8 },
          },
          {
            label: '列表',
            valueType: 'formList',
            name: 'list',
            colProps: { span: 12 },
            columns: [
              {
                label: '姓名',
                valueType: 'text',
                name: 'name1',
                fieldProps: {},
              },
            ],
          },
          {
            label: '组',
            valueType: 'group',
            name: 'group',
            columns: [
              {
                label: '地址',
                valueType: 'text',
                name: 'address',
                required: true,
                // colProps: { span: 8 },
              },
              {
                label: '详情',
                valueType: 'text',
                name: 'detail',
                required: true,
                // colProps: { span: 8 },
              },
            ],
          },
        ]

        const submitter = {
          searchConfig: {
            submitText: '提交',
          },
          align: 'center' as const,
        }
        const formRef = ref()
        onMounted(() => {
          nextTick(() => {
            formRef.value.setFormValues(
              {
                name: null,
              },
              true,
            )
          })
        })
        return () => (
          <div>
            <div style={{ height: '30px' }}>
              <ElRadioGroup modelValue={mode.value} onUpdate:modelValue={setMode}>
                <ElRadio value="edit">编辑</ElRadio>
                <ElRadio value="read">只读</ElRadio>
              </ElRadioGroup>
            </div>
            <div>
              <ProForm
                grid={false}
                ref={formRef}
                submitter={submitter}
                labelPosition="top"
                labelWidth="150px"
                inline={false}
                showMessage={true}
                gutter={20}
                mode={mode.value}
                initialValues={initialValues}
                columns={columns}
                onSubmit={handleSubmit}
                onValuesChange={handleChange}
              ></ProForm>
            </div>
          </div>
        )
      },
    }
  },
}
