const path = require('path');

exports.dirName = 'web_devtools_assets';
exports.assetsDir = path.resolve(__dirname, `./dist/${dirName}`);
exports.templateFile = path.resolve(__dirname, './dist/index.html');
