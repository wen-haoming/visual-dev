import fs from 'fs';
import path from 'path';

const joinPath = (...args: string[]) => path.join(...args);

export const resolvePath = (includes: string[], ext: string[]) => {
  const resultMapObj: any = {};
  includes.forEach((curPath) => {
    const isDirectory = fs.statSync(curPath).isDirectory();
    const isFile = fs.statSync(curPath).isFile();
    const basename = path.basename(curPath);

    if (isDirectory) {
      const dirs = fs.readdirSync(curPath);
      resultMapObj[basename] = resolvePath(
        dirs.map((basePath) => joinPath(curPath, basePath)),
        ext,
      );
    } else if (isFile && ext.includes(path.extname(curPath).substr(1))) {
      resultMapObj[basename] = fs.readFileSync(curPath, 'utf-8');
    }
  });
  return resultMapObj;
};
