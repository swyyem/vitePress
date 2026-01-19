# 表单综合示例

展示如何组合使用各种表单组件。

## 完整表单示例

:::demo

```vue
<template>
  <div style="max-width: 600px;">
    <SwyForm :model="formData" label-width="120px">
      <SwyFormItem label="用户名">
        <SwyInput v-model="formData.username" placeholder="请输入用户名" />
      </SwyFormItem>

      <SwyFormItem label="性别">
        <SwyRadioGroup v-model="formData.gender">
          <SwyRadio label="male">男</SwyRadio>
          <SwyRadio label="female">女</SwyRadio>
        </SwyRadioGroup>
      </SwyFormItem>

      <SwyFormItem label="爱好">
        <div style="display: flex; flex-direction: column; gap: 5px;">
          <SwyCheckbox v-model="formData.hobbies.reading">阅读</SwyCheckbox>
          <SwyCheckbox v-model="formData.hobbies.sports">运动</SwyCheckbox>
          <SwyCheckbox v-model="formData.hobbies.music">音乐</SwyCheckbox>
          <SwyCheckbox v-model="formData.hobbies.travel">旅行</SwyCheckbox>
        </div>
      </SwyFormItem>

      <SwyFormItem label="城市">
        <SwySelect v-model="formData.city" :options="cityOptions" placeholder="请选择城市" />
      </SwyFormItem>

      <SwyFormItem label="接收通知">
        <SwySwitch v-model="formData.notification" active-text="开启" inactive-text="关闭" />
      </SwyFormItem>

      <SwyFormItem label="VIP会员">
        <SwySwitch v-model="formData.vip" :active-value="1" :inactive-value="0" />
      </SwyFormItem>

      <SwyFormItem>
        <SwyButton type="primary" @click="handleSubmit">提交</SwyButton>
        <SwyButton @click="handleReset">重置</SwyButton>
      </SwyFormItem>
    </SwyForm>

    <div style="margin-top: 20px; padding: 15px; background: #f5f7fa; border-radius: 4px;">
      <h4 style="margin-top: 0;">表单数据：</h4>
      <pre style="margin: 0;">{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const formData = reactive({
  username: '',
  gender: '',
  hobbies: {
    reading: false,
    sports: false,
    music: false,
    travel: false,
  },
  city: '',
  notification: false,
  vip: 0,
})

const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' },
]

const handleSubmit = () => {
  console.log('提交表单:', formData)
  alert('表单已提交，请查看控制台')
}

const handleReset = () => {
  formData.username = ''
  formData.gender = ''
  formData.hobbies = {
    reading: false,
    sports: false,
    music: false,
    travel: false,
  }
  formData.city = ''
  formData.notification = false
  formData.vip = 0
}
</script>
```

:::

## 注册表单示例

:::demo

```vue
<template>
  <div style="max-width: 500px;">
    <h3>用户注册</h3>
    <SwyForm :model="registerForm" label-width="100px">
      <SwyFormItem label="邮箱">
        <SwyInput v-model="registerForm.email" placeholder="请输入邮箱" />
      </SwyFormItem>

      <SwyFormItem label="密码">
        <SwyInput v-model="registerForm.password" type="password" placeholder="请输入密码" />
      </SwyFormItem>

      <SwyFormItem label="地区">
        <SwySelect
          v-model="registerForm.region"
          :options="regionOptions"
          placeholder="请选择地区"
        />
      </SwyFormItem>

      <SwyFormItem label="同意协议">
        <SwyCheckbox v-model="registerForm.agree">
          我已阅读并同意《用户协议》和《隐私政策》
        </SwyCheckbox>
      </SwyFormItem>

      <SwyFormItem>
        <SwyButton type="primary" @click="register" :disabled="!registerForm.agree">注册</SwyButton>
      </SwyFormItem>
    </SwyForm>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const registerForm = reactive({
  email: '',
  password: '',
  region: '',
  agree: false,
})

const regionOptions = [
  { label: '中国大陆', value: 'china' },
  { label: '香港', value: 'hongkong' },
  { label: '台湾', value: 'taiwan' },
  { label: '其他', value: 'other' },
]

const register = () => {
  if (!registerForm.agree) {
    alert('请先同意用户协议')
    return
  }
  console.log('注册信息:', registerForm)
  alert('注册成功！')
}
</script>
```

:::

## 设置面板示例

:::demo

```vue
<template>
  <div style="max-width: 500px;">
    <h3>系统设置</h3>
    <SwyForm :model="settings" label-width="150px">
      <SwyFormItem label="语言">
        <SwySelect v-model="settings.language" :options="languageOptions" />
      </SwyFormItem>

      <SwyFormItem label="主题模式">
        <SwyRadioGroup v-model="settings.theme">
          <SwyRadio label="light">浅色</SwyRadio>
          <SwyRadio label="dark">深色</SwyRadio>
          <SwyRadio label="auto">跟随系统</SwyRadio>
        </SwyRadioGroup>
      </SwyFormItem>

      <SwyFormItem label="通知设置">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>桌面通知</span>
            <SwySwitch v-model="settings.notifications.desktop" />
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>声音提示</span>
            <SwySwitch v-model="settings.notifications.sound" />
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>邮件提醒</span>
            <SwySwitch v-model="settings.notifications.email" />
          </div>
        </div>
      </SwyFormItem>

      <SwyFormItem label="功能选项">
        <div style="display: flex; flex-direction: column; gap: 5px;">
          <SwyCheckbox v-model="settings.features.autoSave">自动保存</SwyCheckbox>
          <SwyCheckbox v-model="settings.features.spellCheck">拼写检查</SwyCheckbox>
          <SwyCheckbox v-model="settings.features.preview">实时预览</SwyCheckbox>
        </div>
      </SwyFormItem>

      <SwyFormItem>
        <SwyButton type="primary" @click="saveSettings">保存设置</SwyButton>
        <SwyButton @click="resetSettings">恢复默认</SwyButton>
      </SwyFormItem>
    </SwyForm>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const settings = reactive({
  language: 'zh-CN',
  theme: 'light',
  notifications: {
    desktop: true,
    sound: false,
    email: true,
  },
  features: {
    autoSave: true,
    spellCheck: true,
    preview: false,
  },
})

const languageOptions = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
  { label: '日本語', value: 'ja-JP' },
]

const saveSettings = () => {
  console.log('保存设置:', settings)
  alert('设置已保存')
}

const resetSettings = () => {
  settings.language = 'zh-CN'
  settings.theme = 'light'
  settings.notifications = {
    desktop: true,
    sound: false,
    email: true,
  }
  settings.features = {
    autoSave: true,
    spellCheck: true,
    preview: false,
  }
}
</script>
```

:::
