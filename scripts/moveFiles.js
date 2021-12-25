const path = require('path');
const fs = require('fs-extra');

const resolve = (str) => path.resolve(__dirname, str);

fs.copySync(resolve('../packages/dev-ui/dist'), resolve('../packages/visual-dev/dev-ui'));
fs.copySync(resolve('../packages/visual-dev/src'), resolve('../demo/plugins'));
fs.copySync(resolve('../packages/dev-ui/dist'), resolve('../demo/dev-ui'));

// 插件路径的转换（为了注入脚本到 demo 页面提供正确的路径）
const transformFlePath = resolve('../demo/plugins/vite/index.ts');

let newContent = fs.readFileSync(transformFlePath, 'utf-8');

newContent = newContent.replace(
  `targetTemplate.replace(/\\/assets/g, assetsDir);`,
  `targetTemplate.replace(/\\/assets/g, '/visual-dev/assets');`,
);

newContent = newContent.replace('createServer({});', '');

fs.writeFileSync(transformFlePath, newContent);
