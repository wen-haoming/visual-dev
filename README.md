<h1 align="center">visual-dev</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/visual-dev" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/v/visual-dev" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/visual-dev" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/dt/visual-dev" alt="NPM Downloads" /></a>
  <!-- <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/node/visual-dev" alt="Node.js" /></a> -->
  <a href="https://github.com/wen-haoming/visual-dev/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/wen-haoming/visual-dev" alt="License" /></a>
</p>

## Introduction

Just one click, you can jump directly to the local IDE source code and **vue** and **react** are supported! !

## Preview

![Jan-19-2022 01-34-02](https://user-images.githubusercontent.com/42735363/149988859-8577c98f-74ef-4a36-81a1-682d0e405253.gif)

## Motivation

In a huge project, there are many different components on the page, but it will be very troublesome to find where the component is. Using this plugin, you only need to click to jump to the corresponding position of the ide.

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
  editor: Editor; //vscode  webstorm atom sublime textmate emacs macvim phpstorm idea
};
```

## Usage

webpack

```js
// webpack.config.js
const VisualDev = require('visual-dev/plugins/webpack').default;

module.exports = {
  plugins: [new VisualDev(options)],
};
```

umi

```js
// .umiirc.ts
{
  plugins: ['visual-dev/plugins/umi'];
  visualDev: options;
}
```

vite

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VisualDev from 'visual-dev/plugins/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),VisualDev(options)]
})
```

## License

[MIT LICENSE](./LICENSE)
