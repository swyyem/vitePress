# Vue路由钩子函数

- 把路由切换想象成进出不同房间：

1. 路由守卫 = 保安检查流程
2. 导航 = 进入房间的过程
3. 路由 = 不同的房间

## 一、路由守卫的三种类型

### 1. 全局守卫 - "大楼总保安"

- 作用范围： 所有路由切换都会经过

### 2. 路由独享守卫 - "特定房间的专属保安"

- 作用范围： 只针对某个特定路由

### 3. 组件内守卫 - "房间内部的检查"

- 作用范围： 只针对某个组件

## 二、全局守卫（最常用）

### 1. 全局前置守卫 `beforeEach`

- 时机： 路由跳转前执行

```javascript
// router/index.js
import { createRouter } from 'vue-router';

const router = createRouter({
  // 路由配置...
});

// 全局前置守卫 - 每次路由跳转前都会执行
router.beforeEach((to, from, next) => {
  console.log('从', from.path, '跳转到', to.path);

  // to: 即将要进入的目标路由
  // from: 当前导航正要离开的路由
  // next: 函数，必须调用才能继续导航

  // 示例1: 登录检查
  if (to.meta.requiresAuth && !isLoggedIn()) {
    // 如果需要登录且未登录，跳转到登录页
    next('/login');
  }
  // 示例2: 权限检查
  else if (to.meta.requiredRole && !hasPermission(to.meta.requiredRole)) {
    // 如果没有权限，跳转到无权限页面
    next('/no-permission');
  }
  // 示例3: 简单的访问统计
  else {
    logVisit(to.path);
    next(); // 放行
  }
});
```

### 2. 全局解析守卫 `beforeResolve`

- 时机： 在所有组件内守卫和异步路由组件被解析之后

```javascript
router.beforeResolve((to, from) => {
  // 适合做最后的权限验证
  if (to.meta.requiresSpecialPermission) {
    return validateSpecialPermission();
  }
});
```

### 3. 全局后置钩子 `afterEach`

- 时机： 路由跳转完成后执行

```javascript
router.afterEach((to, from) => {
  // 适合做页面统计、修改页面标题等
  document.title = to.meta.title || '默认标题';

  // 发送页面访问统计
  analytics.trackPageView(to.path);

  // 回到页面顶部
  window.scrollTo(0, 0);
});
```

## 三、路由独享守卫

- 只在特定路由上生效：

```javascript
const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 只有访问 /dashboard 时才会执行
      if (!checkUserRole('admin')) {
        next('/unauthorized'); // 权限不足
      } else {
        next(); // 允许进入
      }
    },
    meta: {
      requiresAuth: true,
      requiredRole: 'admin',
    },
  },
  {
    path: '/user/:id',
    component: UserProfile,
    beforeEnter: (to, from, next) => {
      // 参数验证
      const userId = parseInt(to.params.id);
      if (isNaN(userId) || userId <= 0) {
        next('/not-found'); // 参数无效
      } else {
        next(); // 参数有效
      }
    },
  },
];
```

## 四、组件内守卫

### 1. `beforeRouteEnter` - 进入组件前

- 特殊： 不能访问 `this`（组件实例还没创建）

```vue
<template>
  <div>用户详情页面</div>
</template>

<script>
export default {
  name: 'UserDetail',
  // 进入该组件对应的路由前调用
  beforeRouteEnter(to, from, next) {
    // 不能访问 this，因为组件实例还没被创建

    // 但可以通过回调访问
    next(vm => {
      // 通过 vm 访问组件实例
      console.log('组件实例:', vm);
      vm.loadUserData(to.params.id);
    });

    // 示例：预加载数据
    if (to.params.id) {
      preloadUserData(to.params.id).then(() => {
        next();
      });
    } else {
      next('/users'); // 没有ID参数，跳转到用户列表
    }
  },
};
</script>
```

### 2. `beforeRouteUpdate` - 路由参数变化时

- 场景： 同一个组件，但路由参数变化

```vue
<script>
export default {
  name: 'UserDetail',
  beforeRouteUpdate(to, from, next) {
    // 可以访问 this
    console.log('路由参数变化:', from.params.id, '→', to.params.id);

    // 重新加载数据
    this.userId = to.params.id;
    this.loadUserData();

    next(); // 必须调用
  },
  methods: {
    loadUserData() {
      // 加载用户数据
    },
  },
};
</script>
```

### 3. beforeRouteLeave - 离开组件前

- 场景： 用户尝试离开当前页面

```vue
<script>
export default {
  name: 'ArticleEditor',
  data() {
    return {
      hasUnsavedChanges: false,
      content: '',
    };
  },
  // 离开守卫
  beforeRouteLeave(to, from, next) {
    if (this.hasUnsavedChanges) {
      // 如果有未保存的更改，提示用户
      const answer = window.confirm('您有未保存的更改，确定要离开吗？');
      if (answer) {
        next(); // 用户确认离开
      } else {
        next(false); // 取消导航
      }
    } else {
      next(); // 没有未保存更改，直接离开
    }
  },
  methods: {
    onContentChange() {
      this.hasUnsavedChanges = true;
    },
    saveArticle() {
      // 保存逻辑...
      this.hasUnsavedChanges = false;
    },
  },
};
</script>
```

## 五、完整的路由守卫执行顺序

### 导航流程示意图：

```text
1. 导航被触发
2. 调用离开组件的 beforeRouteLeave
3. 调用全局的 beforeEach
4. 在重用的组件里调用 beforeRouteUpdate
5. 调用路由配置中的 beforeEnter
6. 解析异步路由组件
7. 在进入组件中调用 beforeRouteEnter
8. 调用全局的 beforeResolve
9. 导航被确认
10. 调用全局的 afterEach
11. 触发 DOM 更新
```

### 代码示例演示完整流程：

```javascript
// 1. 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('1. 全局 beforeEach');
  next();
});

// 2. 全局解析守卫
router.beforeResolve((to, from) => {
  console.log('5. 全局 beforeResolve');
});

// 3. 全局后置钩子
router.afterEach((to, from) => {
  console.log('6. 全局 afterEach');
});

// 路由配置
const routes = [
  {
    path: '/user/:id',
    component: UserDetail,
    beforeEnter: (to, from, next) => {
      console.log('3. 路由独享 beforeEnter');
      next();
    },
  },
];
```

```vue
<!-- UserDetail.vue -->
<script>
export default {
  beforeRouteEnter(to, from, next) {
    console.log('4. 组件 beforeRouteEnter');
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log('2.5 组件 beforeRouteUpdate (如果组件复用)');
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('1.5 组件 beforeRouteLeave');
    next();
  },
};
</script>
```

## 六、实际应用场景

### 场景1：用户认证系统

```javascript
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    // 重定向到登录页，并保存目标路径
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  } else if (to.path === '/login' && isAuthenticated) {
    // 已登录用户访问登录页，重定向到首页
    next('/');
  } else {
    next();
  }
});
```

### 场景2：页面权限控制

```javascript
// 路由元信息定义权限
const routes = [
  {
    path: '/admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      requiredRole: 'admin',
    },
  },
  {
    path: '/user',
    component: User,
    meta: {
      requiresAuth: true,
      requiredRole: ['admin', 'user'], // 多种角色
    },
  },
];

// 权限检查
router.beforeEach((to, from, next) => {
  const userRole = getUserRole();
  const requiredRole = to.meta.requiredRole;

  if (requiredRole) {
    const hasRole = Array.isArray(requiredRole)
      ? requiredRole.includes(userRole)
      : requiredRole === userRole;

    if (!hasRole) {
      next('/forbidden');
      return;
    }
  }

  next();
});
```

### 场景3：页面访问统计

```javascript
router.afterEach((to, from) => {
  // 发送统计数据
  if (window.gtag) {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: to.meta.title,
      page_location: window.location.href,
    });
  }
});
```

## 七、Vue3 Composition API 中的路由守卫

### 使用 `onBeforeRouteUpdate` 和 `onBeforeRouteLeave`

```vue
<template>
  <div>用户设置页面</div>
</template>

<script setup>
import { onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';
import { ref } from 'vue';

const hasUnsavedChanges = ref(false);

// 路由参数变化时
onBeforeRouteUpdate((to, from) => {
  console.log('用户ID从', from.params.id, '变为', to.params.id);
  // 重新加载数据...
});

// 离开页面时
onBeforeRouteLeave((to, from) => {
  if (hasUnsavedChanges.value) {
    const answer = confirm('有未保存的更改，确定离开？');
    return answer; // 返回 false 取消导航
  }
});
</script>
```

## 面试回答技巧

```text
"Vue路由守卫主要分为三大类：

1. 全局守卫：

beforeEach：路由跳转前，适合做权限验证

beforeResolve：所有组件解析完成后

afterEach：路由跳转完成后，适合做统计

2. 路由独享守卫：

beforeEnter：只对特定路由生效

3. 组件内守卫：

beforeRouteEnter：进入组件前，不能访问this

beforeRouteUpdate：路由参数变化，组件复用时

beforeRouteLeave：离开组件前，适合防止数据丢失

执行顺序是：
离开守卫 → 全局前置 → 更新守卫 → 独享守卫 → 进入守卫 → 解析守卫 → 后置钩子

实际项目中，我常用全局守卫做登录验证和权限控制，用组件内守卫处理未保存数据的提示。"

记住核心用途：
权限控制 + 数据预加载 + 导航控制 + 访问统计
```
