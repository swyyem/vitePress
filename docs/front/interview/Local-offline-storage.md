# cookie、sessionStorage、localStorage的区别

- Cookie：像前台登记本 - 容量小，每次都要带给服务员看
- sessionStorage：像临时储物柜 - 关柜门就清空，只在一次训练期间有效
- localStorage：像长期租赁柜 - 永久有效，除非你主动清理

| 特性       | Cookie           | sessionStorage      | localStorage           |
| ---------- | ---------------- | ------------------- | ---------------------- |
| 容量       | 4KB左右          | 5MB左右             | 5MB左右                |
| 生命周期   | 可设置过期时间   | 页面会话结束就清除  | 永久有效，除非手动删除 |
| 数据共享   | 每次请求自动携带 | 仅当前标签页可用    | 同源的所有标签页共享   |
| 服务器参与 | 自动发送到服务器 | 仅存储在客户端      | 仅存储在客户端         |
| API易用性  | 操作复杂         | 简单的key-value API | 简单的key-value API    |

## 代码示例对比

- Cookie - 操作最复杂

```javascript
// 设置Cookie（麻烦！）
document.cookie = 'username=小明; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/';

// 获取Cookie（更麻烦！）
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

console.log(getCookie('username')); // "小明"

// 删除Cookie（要设置过期时间）
document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
```

- sessionStorage - 临时会话存储

```javascript
// 存储数据（超简单！）
sessionStorage.setItem('token', 'abc123');
sessionStorage.setItem('user', JSON.stringify({ name: '小明', age: 18 }));

// 获取数据
const token = sessionStorage.getItem('token');
const user = JSON.parse(sessionStorage.getItem('user'));
console.log(token); // "abc123"
console.log(user.name); // "小明"

// 删除数据
sessionStorage.removeItem('token'); // 删除单个
// sessionStorage.clear(); // 清空所有

// 特点：刷新页面数据还在，但关闭标签页就消失
```

- localStorage - 永久本地存储

```javascript
// 存储数据
localStorage.setItem('theme', 'dark');
localStorage.setItem('settings', JSON.stringify({ lang: 'zh', notify: true }));

// 获取数据
const theme = localStorage.getItem('theme');
const settings = JSON.parse(localStorage.getItem('settings'));
console.log(theme); // "dark"
console.log(settings.lang); // "zh"

// 删除数据
localStorage.removeItem('theme'); // 删除单个
// localStorage.clear(); // 清空所有

// 特点：关闭浏览器再打开，数据还在！
```

## 现代开发中的选择建议

### Cookie：

- ✅ 需要与服务器通信的数据（登录状态）
- ❌ 不要用于存储大量数据

### sessionStorage：

- ✅ 单次会话的临时数据
- ✅ 敏感数据（关闭页面自动清除）
- ❌ 需要持久化的数据

### localStorage：

- ✅ 用户偏好设置
- ✅ 离线数据缓存
- ✅ 不敏感的应用数据
- ❌ 不要存储敏感信息（密码、token等）

## 面试回答

- 我从四个维度来区分它们：
- 容量方面：Cookie只有4KB，而Web Storage（sessionStorage和localStorage）有5MB左右
- 生命周期：
- Cookie可以设置过期时间
- sessionStorage在页面会话结束时清除
- localStorage永久有效，除非手动删除
- 数据通信：
- Cookie会自动随HTTP请求发送到服务器
- Web Storage只存储在客户端，不会自动发送
- 使用场景：
- Cookie适合存储需要与服务端通信的数据，比如登录凭证
- sessionStorage适合存储临时数据，如表单草稿
- localStorage适合存储用户偏好、应用配置等持久化数据
- 在现代前端开发中，我们通常用localStorage替代Cookie来存储客户端数据，因为API更友好，容量更大。
