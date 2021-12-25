const path = require('path');
const fs = require('fs-extra');

const resolve = (str) => path.resolve(__dirname, str);

fs.removeSync(resolve('../packages/visual-dev/dist'));
fs.removeSync(resolve('../packages/visual-dev/dev-ui'));
fs.removeSync(resolve('../packages/visual-dev/plugins'));
fs.removeSync(resolve('../packages/dev-ui/dist'));
fs.removeSync(resolve('../demo/dev-ui'));
fs.removeSync(resolve('../demo/plugins'));
fs.removeSync(resolve('../demo/dist'));
