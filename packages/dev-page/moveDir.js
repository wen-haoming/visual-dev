const path = require('path');
const fs = require('fs-extra');

const resolve = (str) => path.resolve(__dirname, str);

fs.copySync(resolve('./dist'), resolve('../visual-dev/plugins/server/dev-page'));
