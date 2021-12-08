import express, { json } from 'express';
import cors from 'cors';
import launchEditor from '@umijs/launch-editor';
import { SERVER_PORT } from '../index';
import { getMenu, injectFile, pathMapMid } from './MiddleWare';

export interface ServerOptions {
  port?: number;
  resolve?: {
    includes: string[];
  };
}

export const createServer = async (options: ServerOptions = {}) => {
  const { port = SERVER_PORT, resolve = { includes: [''] } } = options;

  const app = express();

  app.use(cors());
  // @ts-ignore
  app.use(json());

  app.get('/web-devtools/pathMap', pathMapMid());

  app.get('/web-devtools/getMenu', getMenu({ includes: resolve.includes }));

  app.post('/web-devtools/launchEditor', async (req, res) => {
    await launchEditor(process.cwd() + req.body.filePath);
    res.send({});
  });

  app.post('/web-devtools/injectFile', injectFile);

  app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`dev-plugin is listening ${port}`);
  });
};
