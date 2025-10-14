# javascript

## 代码生成绝对唯一 ID

- 极低的碰撞概率：一个 v4 UUID 是由 122 位的随机数生成的，其组合数量是一个天文数字，碰撞概率趋近于零
- 加密级安全：它使用密码学安全伪随机数生成器（CSPRNG），其随机性远非 Math.random() 可比，无法被预测
- 标准化：它生成的是全球公认的标准格式，无论前端、后端还是数据库，都能识别和处理
- 原生、简单、高效：无需引入任何第三方库，一行代码即可调用，性能极高
- 跨平台：它可以在任何支持 JavaScript 的环境中运行，包括浏览器、Node.js、 Deno 等

::: script-preview expand=true

const uniqueId = crypto.randomUUID();
console.log(uniqueId);
:::

## 前端日期处理

- 不可靠的字符串解析

  看这个经典的例子：

::: script-preview expand=true

// 格式一：YYYY-MM-DD
const date1 = new Date('2025-07-15');
// 在多数现代浏览器中，这会被解析为 UTC 时间的零点：
// "Tue Jul 15 2025 08:00:00 GMT+0800 (中国标准时间)"

// 格式二：YYYY/MM/DD
const date2 = new Date('2025/07/15');
// 这通常会被解析为本地时间的零点：
// "Tue Jul 15 2025 00:00:00 GMT+0800 (中国标准时间)"
:::

## 对象的可变性（Mutability）

想象一个场景：
::: script-preview expand=true
const today = new Date(2025-07-31); //假设日期是2025-07-31
function getNextDay(date) {
date.setDate(date.getDate() + 1);//直接修改了传入的date对象
return date;
}
const nextDay = getNextDay(today);
console.log('今天是:',today);//有问题
console.log('明天是:',nextDay);//正确
:::

## JSONP的实现

### JSONP 的核心思想：一个“美丽的误会”

- 同源策略限制了 XMLHttpRequest，但它有一个“漏洞”：它并不限制带有 src 属性的标签，比如 `<script>`、`<img>` 和 `<iframe>`。它们天生就具备从任何地方加载资源的能力，否则你就无法在你的网站上使用 CDN 的图片或脚本了。
- JSONP 正是利用了 `<script>` 标签的这个特性。它的核心思想可以概括为以下对话：

- 前端页面：（对服务器喊话）“你好，我需要一些数据。但我不能直接用 AJAX 拿。这样吧，我动态创建一个 `<script>` 标签来请求你的一个地址。另外，我已经在我的页面上准备好了一个叫 myCallbackFunction 的函数，请你把数据作为参数，放进这个函数调用里，然后把整个 myCallbackFunction({ ...data... }) 作为一段 JavaScript 文本返回给我。”
  服务器：（收到请求后）“好的，没问题。这是你要的数据，我已经用你指定的回调函数名‘包裹’（Padding）好了。”
  于是，当前端页面加载完这个 `<script>` 标签后，它实际上是在执行一段从服务器返回的 JavaScript 代码，这段代码恰好调用了我们预先定义好的全局函数，数据也就自然而然地被传递了进来。

- 整个过程没有使用 XMLHttpRequest，完美绕过了同源策略。

### 动手实现：打造我们自己的 JSONP 工具

- 让我们来封装一个通用的 jsonp 函数。它应该接收一个包含 url、params 和 callback 的配置对象。

::: script-preview expand=true

// 一个简单的 JSONP 实现
// url - 请求的 URL 地址
// params - 需要传递的参数
// callbackKey='callback' - 与后端约定的回调函数参数名
//callback - 成功时调用的回调函数

function jsonp({ url, params = {}, callbackKey = 'callback', callback }) {
// 1. 生成一个独一无二的回调函数名，防止并发请求时冲突
const callbackName = `jsonp_callback_${Date.now()}_${Math.floor(Math.random() * 100000)}`;

// 2. 将回调函数挂载到 window 上，使其成为全局函数
// 这是最关键的一步，因为服务器返回的脚本将直接调用这个函数
window[callbackName] = function(data) {
// 成功接收到数据后，调用我们真正的回调函数
callback(data);

    // 3. 清理工作：用完即焚
    // 移除挂载到 window 上的函数，避免内存泄漏和全局污染
    delete window[callbackName];
    // 移除注入的 script 标签
    document.head.removeChild(scriptElement);

};

// 4. 准备参数，并将其拼接到 URL 上
const paramsArray = [];
for (let key in params) {
paramsArray.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
}
// 加上与后端约定的回调函数名参数
paramsArray.push(`${callbackKey}=${callbackName}`);

const paramsString = paramsArray.join('&');
const finalUrl = url.includes('?') ? `${url}&${paramsString}` : `${url}?${paramsString}`;

// 5. 创建并注入 <script> 标签，发起请求
const scriptElement = document.createElement('script');
scriptElement.src = finalUrl;
document.head.appendChild(scriptElement);

// （可选）错误处理
}
:::
