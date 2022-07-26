<h1 align="center">visual-dev</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/visual-dev" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/v/visual-dev" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/visual-dev" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/dt/visual-dev" alt="NPM Downloads" /></a>
  <!-- <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/node/visual-dev" alt="Node.js" /></a> -->
  <a href="https://github.com/wen-haoming/visual-dev/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/wen-haoming/visual-dev" alt="License" /></a>
</p>

## Introduction

Just one click, you can jump directly to the local IDE source code and **vue** and **react** are supported! !

一键直接跳转到本地 IDE 源码，支持 vue 和 react ！！

## Preview

![Jan-19-2022 01-34-02](https://user-images.githubusercontent.com/42735363/149988859-8577c98f-74ef-4a36-81a1-682d0e405253.gif)

## Motivation

In a huge project, there are many different components on the page, but it will be very troublesome to find where the component is. Using this plugin, you only need to click to jump to the corresponding position of the ide.

在一个大型的项目中，页面上有很多不同的组件，但是要找到组件在哪里会很麻烦。使用这个插件，只需要点击对应的 dom，就能跳转到 IDE 的对应位置。

## Installation

```bash
npm i visual-dev -D
```

## Options

```typescript
type Options = {
  /**
   *  default open vscode.
   */
  editor: Editor; //vscode  webstorm atom sublime textmate emacs macvim phpstorm idea 支持多种编辑器，默认使用 vscode
};
```

## Usage

webpack

```js
// webpack.config.js
const VisualDev = require('visual-dev/plugins/webpack').default;

module.exports = {
  plugins: [
    new VisualDev({
      editor: 'vscode',
    }),
  ],
};
```

umi

```js
// .umiirc.ts
{
  plugins: ['visual-dev/plugins/umi'];
  visualDev: {
    editor: 'vscode';
  }
}
```

vite

```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VisualDev from 'visual-dev/plugins/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VisualDev({
      editor: 'vscode',
    }),
  ],
});
```

the project is successfully launched, a small icon will appear in the lower left corner of the screen, which can be triggered by clicking.

项目启动成功后，在屏幕的左下角会有一个小图标出现，点击即可触发。

## WeChat

<img width="250" src="https://user-images.githubusercontent.com/42735363/154826910-b45ca498-d83e-4053-9dd2-907d3ad4aab9.jpg" />

## License

[MIT LICENSE](./LICENSE)
