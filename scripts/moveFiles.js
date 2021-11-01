const path = require('path');
const fs = require('fs-extra');

const resolve = (str) => path.resolve(__dirname, str);

fs.copy(resolve('../packages/dev-ui/dist'), resolve('../packages/visual-dev/dev-ui'), (err) => {
  if (err) return console.error(err);
  console.log('dev-ui dir moved successfully!');
});

fs.copy(resolve('../packages/visual-dev/dist/plugins'), resolve('../packages/visual-dev/plugins'));
