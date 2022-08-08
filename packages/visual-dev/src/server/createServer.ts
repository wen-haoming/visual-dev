import express, { json } from 'express';
import cors from 'cors';
import path from 'path';
import { SERVER_PORT } from '../index';
import type { PluginOptions } from '../';
import analysisFile from './MiddleWare/analysisFile';
import fs from 'fs-extra';

export interface ServerProps {
  analysisFileData: {
    nodes: { id: string; label: string; name: string }[];
    edges: { source: string; target: string }[];
  };
}

export const createServer = async (options: PluginOptions, props: ServerProps) => {
  // const { resolve = { includes: [''] } } = options;
  let { port = SERVER_PORT } = options;
  const app = express();

  // 如果端口冲突了，替换当前端口
  app.engine('.html', function (filePath, _options, callback) {
    fs.readFile(filePath, function (err, content) {
      if (err) return callback(err);
      const rendered = content.toString().replace('10078', String(port));
      return callback(null, rendered);
    });
  });

  // 读取本地 dev-page 文件
  app.use(express.static(path.resolve(__dirname, './dev-page')));

  app.use(cors());
  // @ts-ignore
  app.use(json());

  app.get('/web-devtools/analysisFile', analysisFile(props));

  app.get('/*', (req, res) => res.render(path.resolve(__dirname, './dev-page/index.html')));

  const startListen = (appPort: number) => {
    app.listen(appPort, () => {
      // eslint-disable-next-line
      console.log(`visual-dev is listening on port : ${port}`);
    });
  };
  process.on('uncaughtException', (err) => {
    if (err.message && err.message.includes('address already in use')) {
      startListen((port += 1));
    }
  });
  startListen(port);
};
