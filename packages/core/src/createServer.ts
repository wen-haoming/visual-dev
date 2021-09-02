import express, { json } from 'express';
import cors from 'cors';
import launchEditor from '@umijs/launch-editor';
import { SERVER_PORT } from './index';

export const createServer = () => {
  const app = express();

  app.use(cors());
  // @ts-ignore
  app.use(json());

  app.post('/launchEditor', async (req, res) => {
    const { filePath } = req.body;
    await launchEditor(process.cwd() + filePath);
    res.send('ok');
  });

  app.listen(SERVER_PORT, () => {
    console.log(`dev-plugin is listening ${SERVER_PORT}`);
  });
};

export const createServerMiddleWare: any = async (ctx: any, next: any) => {
  if (ctx.req.url === '/web-devtools/launchEditor') {
    const { filePath } = ctx.req.body;
    await launchEditor(process.cwd() + filePath);
    ctx.res.send('ok');
    await next();
  }
};
