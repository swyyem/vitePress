import type Button from './button.vue'
import type ButtonGroup from './button-group.vue'

// 定义按钮实例类型，结合 Button 组件的实例类型 ，并添加额外的属性
export type ButtonInstance = InstanceType<typeof Button> & unknown
export type ButtonGroupInstance = InstanceType<typeof ButtonGroup> & unknown
