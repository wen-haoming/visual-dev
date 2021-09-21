import express, { json } from 'express';
import cors from 'cors';
import launchEditor from '@umijs/launch-editor';
import { SERVER_PORT } from '../index';
import { resolvePath } from '../utils';
import injectFile from './MiddleWare/injectFile';

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

  const mdFile = resolvePath(resolve.includes, ['md']);

  app.post('/web-devtools/launchEditor', async (req, res) => {
    await launchEditor(process.cwd() + req.body.filePath);
    res.send(JSON.stringify(mdFile));
  });

  app.post('/web-devtools/injectFile', injectFile);

  app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`dev-plugin is listening ${port}`);
  });
};
