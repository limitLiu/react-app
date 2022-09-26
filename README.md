# Learn App

## 介绍

主要是用来学习调试 **React** 源码的基础项目，配置文件只适配 NodeJS v16+ 跟 Webpack 5，可以把 webpack.base.js 的

```javascript
const path = require("path");
const resolve = dir => path.resolve(process.cwd(), dir);
// ...

module.exports = {
  // ...
  resolve: {
    alias: {
      react: resolve("src/3rd-party/react/packages/react"),
      "react-dom": resolve("src/3rd-party/react/packages/react-dom"),
      shared: resolve("src/3rd-party/react/packages/shared"),
      "react-reconciler": resolve("src/3rd-party/react/packages/react-reconciler"),
      scheduler: resolve("src/3rd-party/react/packages/scheduler")
    }
  }
}
```

改一下就能做为一个模板项目。  
现在直接克隆就再安装依赖。

```bash
git clone https://github.com/limitLiu/react-app.git
yarn
```

## 获取 React 源码

首先是把 **React** 源码从 [GitHub](https://github.com/facebook/react) 上克隆下来。
然后直接 `checkout` 一个稳定版本（建议直接 `fork` 一份到自己的 GitHub 账号下，如果是使用自己 `fork` 的版本，还可以进行调试，
记住不要勾选 **Copy them `main` branch only**，最好建个自己用的分支）。

```bash
git clone https://github.com/facebook/react.git
git checkout v18.2.0
or
git clone https://github.com/<your github username>/react.git
git checkout v18.2.0
git checkout -b <u named branch>
```

因为 **React** 到今年为止 **至少** 迭代了有 8 年时间，不可能从第一次 commit 开始慢慢看，不如直接啃最近的一个稳定版本，所以这里选择
18.2.0。  
接着我们可以通过 `yarn` 把依赖装上，这一步比较耗时，
因为要装 Electron，还有就是 NodeJS 版本不能选最新的，不然安装过程中必定失败，因为这个项目做了相关的限制，直接装一个比较新的
LTS 版的 NodeJS（我的设备上装得是 v16.17.0）。

以上这些操作完成后，把 **react** 源码仓库放到当前这个仓库的某个路径下，我这边放在 `src/3rd-party`。

```bash
cd <your path>
mkdir -p react-app/src/3rd-party
mv react react-app/src/3rd-party
```

## 错误解决

现在直接通过 `yarn dev` 启动一下项目，在浏览器打开 [http://localhost:3000](http://localhost:3000)，
于是就看到几个错误讯息，此时我们得再改点东西。

```text
Compiled with problems:

WARNING in ../src/index.js 4:0-15

export 'default' (imported as 'ReactDOM') was not found in 'react-dom' (possible exports: __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, createPortal, createRoot, findDOMNode, flushSync, hydrate, hydrateRoot, render, unmountComponentAtNode, unstable_batchedUpdates, unstable_createEventHandle, unstable_flushControlled, unstable_isNewReconciler, unstable_renderSubtreeIntoContainer, unstable_runWithPriority, version)


WARNING in ../src/3rd-party/react/packages/react-reconciler/src/Scheduler.js 27:33-62

export 'unstable_yieldValue' (imported as 'Scheduler') was not found in 'scheduler' (possible exports: unstable_IdlePriority, unstable_ImmediatePriority, unstable_LowPriority, unstable_NormalPriority, unstable_Profiling, unstable_UserBlockingPriority, unstable_cancelCallback, unstable_continueExecution, unstable_forceFrameRate, unstable_getCurrentPriorityLevel, unstable_getFirstCallbackNode, unstable_next, unstable_now, unstable_pauseExecution, unstable_requestPaint, unstable_runWithPriority, unstable_scheduleCallback, unstable_shouldYield, unstable_wrapCallback)


WARNING in ../src/3rd-party/react/packages/react-reconciler/src/Scheduler.js 28:43-82

export 'unstable_setDisableYieldValue' (imported as 'Scheduler') was not found in 'scheduler' (possible exports: unstable_IdlePriority, unstable_ImmediatePriority, unstable_LowPriority, unstable_NormalPriority, unstable_Profiling, unstable_UserBlockingPriority, unstable_cancelCallback, unstable_continueExecution, unstable_forceFrameRate, unstable_getCurrentPriorityLevel, unstable_getFirstCallbackNode, unstable_next, unstable_now, unstable_pauseExecution, unstable_requestPaint, unstable_runWithPriority, unstable_scheduleCallback, unstable_shouldYield, unstable_wrapCallback)
```

根据这里的提示，我们先定位到 react 源码仓库中 react-dom 的 index.js，然后就看到官方说

```javascript
// Export all exports so that they're available in tests.
// We can't use export * from in Flow for some reason.
```

我们把当前文件内容改成如下代码

```javascript
import {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  createPortal,
  createRoot,
  hydrateRoot,
  findDOMNode,
  flushSync,
  hydrate,
  render,
  unmountComponentAtNode,
  unstable_batchedUpdates,
  unstable_createEventHandle,
  unstable_flushControlled,
  unstable_isNewReconciler,
  unstable_renderSubtreeIntoContainer,
  unstable_runWithPriority, // DO NOT USE: Temporarily exposed to migrate off of Scheduler.runWithPriority.
  version,
} from './src/client/ReactDOM';

export {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  createPortal,
  createRoot,
  hydrateRoot,
  findDOMNode,
  flushSync,
  hydrate,
  render,
  unmountComponentAtNode,
  unstable_batchedUpdates,
  unstable_createEventHandle,
  unstable_flushControlled,
  unstable_isNewReconciler,
  unstable_renderSubtreeIntoContainer,
  unstable_runWithPriority, // DO NOT USE: Temporarily exposed to migrate off of Scheduler.runWithPriority.
  version,
};

export default {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  createPortal,
  createRoot,
  hydrateRoot,
  findDOMNode,
  flushSync,
  hydrate,
  render,
  unmountComponentAtNode,
  unstable_batchedUpdates,
  unstable_createEventHandle,
  unstable_flushControlled,
  unstable_isNewReconciler,
  unstable_renderSubtreeIntoContainer,
  unstable_runWithPriority, // DO NOT USE: Temporarily exposed to migrate off of Scheduler.runWithPriority.
  version,
};
```

然后我们发觉，浏览器页面自动刷新后错误少了一条，直接看第二条错误提示，它说找不到下面这些东西

```javascript
  unstable_IdlePriority, unstable_ImmediatePriority,
  unstable_LowPriority, unstable_NormalPriority,
  unstable_Profiling, unstable_UserBlockingPriority,
  unstable_cancelCallback, unstable_continueExecution,
  unstable_forceFrameRate, unstable_getCurrentPriorityLevel,
  unstable_getFirstCallbackNode, unstable_next,
  unstable_now, unstable_pauseExecution,
  unstable_requestPaint, unstable_runWithPriority,
  unstable_scheduleCallback, unstable_shouldYield,
  unstable_wrapCallback
```

因为其实上面这些东西它是从 `src/3rd-party/react/packages/scheduler/src/forks/Scheduler.js` 同级目录中的 `SchedulerMock.js`
文件中引入的，
只不过我们 fork 的这个 react 没有构建，所以跟平常使用时的结构有点不一样。  
总之先改一下 **src/3rd-party/react/packages/scheduler/src/forks/Scheduler.js** 再说，
在结尾加上下面这段代码

```text
// ...
export {
  unstable_flushAllWithoutAsserting,
  unstable_flushNumberOfYields,
  unstable_flushExpired,
  unstable_clearYields,
  unstable_flushUntilNextPaint,
  unstable_flushAll,
  unstable_yieldValue,
  unstable_advanceTime,
  unstable_setDisableYieldValue,
} from './SchedulerMock';
```

然后浏览器页面好像没警告/错误讯息了，但是看到控制台又发现新问题，找不到全局变量 `__DEV__`，
直接一次性把这几个全局变量设置一下，主要是修改 webpack.base.js 文件的配置。

```javascript
module.exports = {
  // ...
  plugins: [
    // ...
    new webpack.DefinePlugin({
      __DEV__: !PRODUCTION,
      __EXPERIMENTAL__: !PRODUCTION,
      __PROFILE__: !PRODUCTION,
      __UMD__: !PRODUCTION,
    }),
  ]
}
```

马上又有新错误了

```text
Uncaught TypeError: can't access property "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED", _src_React__WEBPACK_IMPORTED_MODULE_0__ is undefined
```

这次定位到 `src/3rd-party/react/packages/shared/ReactSharedInternals.js` 文件中，修改成如下代码

```javascript
// import * as React from 'react';
//
// const ReactSharedInternals =
//   React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

import ReactSharedInternals from "../react/src/ReactSharedInternals";

export default ReactSharedInternals;
```

盲猜控制台马上又报新错误

```text
Uncaught Error: This module must be shimmed by a specific renderer.
```

我们看到控制台提示了一个文件名 `ReactFiberHostConfig.js`
，定位到 `src/3rd-party/react/packages/react-reconciler/src/ReactFiberHostConfig.js`
改点东西

```javascript
// throw new Error('This module must be shimmed by a specific renderer.');

export * from './forks/ReactFiberHostConfig.dom';
```

然后又看到控制台说 `Uncaught ReferenceError: React is not defined`
没办法，只能定位到 `src/3rd-party/react/packages/react/index.js`再改

```javascript
import * as React from './src/React';

export default React;
```

至此，应该是没什么问题了。

## 学习历程

[0x01. 从 JSX 开始](./docs/0x01.%20从%20JSX%20开始.md)  
[0x02. Component](./docs/0x02.%20Component.md)  
[0x03. ref](./docs/0x03.%20ref.md)  
[0x04. Context](./docs/0x04.%20Context.md)  
[0x05. ReactChildren](./docs/0x05.%20ReactChildren.md)  
[0x06. ReactDOM](./docs/0x06.%20ReactDOM.md)  
