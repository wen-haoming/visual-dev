const path = require('path');
const fs = require('fs-extra');

const resolve = (str) => path.resolve(__dirname, str);

fs.copySync(resolve('../demo/dev-ui/assets'), resolve('../demo/dist/assets'));
