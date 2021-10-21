<h1 align="center"><i style="color:#2082a6">visual</i><i style="color:#3ab9d4">dev</i> </h1>

<p align="center">
  <a href="https://www.npmjs.com/package/visual-dev" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/v/visual-dev" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/react-dev-inspector" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/dt/visual-dev" alt="NPM Downloads" /></a>
  <!-- <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/node/visual-dev" alt="Node.js" /></a> -->
  <a href="https://github.com/wen-haoming/visual-dev/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/wen-haoming/visual-dev" alt="License" /></a>
</p>

## Introduction

Tools to facilitate project maintenance, provide document rendering, and the ability to locate components to ide

## Preview

## Installation

```bash
npm i visual-dev -D
```

## Usage

webpack

```js
// webpack.config.js
const WebpackDevToolPLugin = require('visual-dev/webpack').default;

module.exports = {
  plugins: [new WebpackDevToolPLugin()],
};
```

umi

```js
// .umiirc.ts
plugins: [require.resolve('visual-dev/umi')];
```
