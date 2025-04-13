# 基础知识

## JS 事件循环

::: details 参考回答

#### 1、先说核心模型：单线程与异步的底层逻辑

- **单线程的限制**：JS 是单线程的，意味着它只有一个主线程（Main Thread）处理任务，但浏览器环境需要同时处理渲染、网络请求、用户交互等异步操作。
- **事件循环的意义**：通过「事件循环 + 任务队列」机制，在单线程下实现非阻塞的异步操作，避免页面卡顿。

#### 2. 分层拆解事件循环的工作流程

- **同步代码执行**：所有同步任务（如 console.log、函数调用）在主线程的调用栈（Call Stack）中直接执行。
- **异步任务分类**
  - **宏任务（MacroTask）**：`setTimeout`、`setInterval`、DOM 事件回调、I/O 操作（如 fetch 完成后的回调）。
  - **微任务（MicroTask）**：`Promise.then`、`MutationObserver`、`queueMicrotask`。

#### 3. 任务队列管理：

- 遇到异步任务时，浏览器内核的对应模块（如定时器线程、网络线程）会接管异步操作，完成后将回调函数推入对应的队列。
- **微任务队列优先级高于宏任务队列**：每次主线程清空（调用栈为空）后，会先依次执行所有微任务，再取出一个宏任务执行，如此循环。

#### 4. 结合浏览器渲染流程：

- **渲染时机**：在每一轮事件循环中，浏览器可能（不一定会）在宏任务之间插入渲染流程（样式计算、布局、绘制）。

- **微任务的影响**：微任务在渲染之前执行，如果微任务中频繁修改 DOM，可能导致多次布局计算，影响性能。

- **优化点**：长任务（Long Task）会阻塞渲染，可以通过将任务拆分为多个微任务（如 `requestIdleCallback`）或使用 `Web Worker` 优化。

#### 5. 扩展知识 Node.js 与浏览器的事件循环差异：

- **Node.js 的事件循环阶段**：分为 `timers`、`pending callbacks`、`idle/prepare`、`poll`、`check`、`close callbacks` 多个阶段。

- **宏任务优先级不同**：例如 `setImmediate` 和 `setTimeout` 的执行顺序可能因调用时机不同而变化。

- **微任务触发时机**：`Node.js` 中微任务在每个阶段结束后执行，而浏览器是在每个宏任务结束后执行。

#### 6. 例子

```js{6}
console.log('script start')

async function async1() {
  console.log('async1 start')
  await async2() // 返回 Promise 放入事件队列 并让出主线程
  console.log('async1 end')//   await 后的代码被包装为微任务，加入微任务队列
}

async function async2() {
  Promise.resolve().then(() => {
    console.log('async2')
  })
}

async1()

setTimeout(() => {
  console.log('timeout')
}, 0)

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')
```

#### 7. 参考资料 [面试必问之 JS 事件循环（Event Loop），看这一篇足够](https://mp.weixin.qq.com/s/wugntKhMZpgr6RtB1AwAmQ)

:::
