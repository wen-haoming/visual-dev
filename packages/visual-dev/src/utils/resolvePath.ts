import fs from 'fs';
import path from 'path';

const joinPath = (...args: string[]) => path.join(...args);

interface Options {
  ext?: string[];
  dealString?: (content: string) => string;
}

export const resolvePath = (includes: string[], options?: Options) => {
  const { ext = [], dealString } = options || {};

  const resultMapObj: any = {};
  includes.forEach((curPath) => {
    const isDirectory = fs.statSync(curPath).isDirectory();
    const isFile = fs.statSync(curPath).isFile();
    const basename = path.basename(curPath);

    if (isDirectory) {
      const dirs = fs.readdirSync(curPath);
      resultMapObj[basename] = resolvePath(
        dirs.map((basePath) => joinPath(curPath, basePath)),
        options,
      );
    } else if (isFile && ext.includes(path.extname(curPath).substr(1))) {
      const content = fs.readFileSync(curPath, 'utf-8');
      resultMapObj[basename] = dealString ? dealString(content) : content;
    }
  });
  return resultMapObj;
};
