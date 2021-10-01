import slash from 'slash2';
import fs from 'fs';
import path from 'path';

const joinPath = (...args: string[]) => path.join(...args);

export const resolvePath = (includes: string[], ext: string[]) => {
  const resultMapObj: any = {};
  includes.forEach((targetDir) => {
    const currentPath = joinPath(process.cwd(), targetDir);
    const dirs = fs.readdirSync(currentPath);
    dirs.forEach((dir) => {
      const isDirectory = fs.statSync(joinPath(currentPath, dir)).isDirectory();
      if (isDirectory) {
        const fileArrs = fs.readdirSync(joinPath(currentPath, dir));
        fileArrs.forEach((fileArrsItemStr) => {
          const currentFile = joinPath(currentPath, dir, fileArrsItemStr);
          // file and extname
          if (
            fs.statSync(currentFile).isFile() &&
            ext.includes(path.extname(joinPath(currentFile)).substr(1))
          ) {
            if (resultMapObj[dir]) {
              resultMapObj[dir][fileArrsItemStr] = slash(currentFile);
            } else {
              resultMapObj[dir] = {
                [fileArrsItemStr]: fs.readFileSync(slash(currentFile), 'utf-8'),
              };
            }
          }
        });
      }
    });
  });
  return resultMapObj;
};
