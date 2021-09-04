import express, { json } from 'express';
import type { Handler } from 'express';
import cors from 'cors';
import launchEditor from '@umijs/launch-editor';
import { SERVER_PORT } from './index';

export const createServer = () => {
  const app = express();

  app.use(cors());
  // @ts-ignore
  app.use(json());

  app.post('/web-devtools/launchEditor', async (req, res) => {
    const { filePath } = req.body;
    await launchEditor(process.cwd() + filePath);
    res.send('ok');
  });

  app.listen(SERVER_PORT, () => {
    console.log(`dev-plugin is listening ${SERVER_PORT}`);
  });
};

export const createServerMiddleWare: Handler = async (req, res, next) => {
  if (req.url.startsWith(`/web-devtools/launchEditor`)) {
    const { filePath } = req.query;
    await launchEditor(process.cwd() + filePath);
    res.send('ok');
  } else {
    await next();
  }
};
