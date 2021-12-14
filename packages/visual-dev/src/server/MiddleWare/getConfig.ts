import type { RequestHandler } from 'express';
import type { ServerOptions } from '../createServer';

export const getConfig = (props: ServerOptions): RequestHandler => {
  let mode = '';

  if (props.resolve) {
    // 窗口模式
    mode = 'aim';
  } else {
    // 仅显示瞄准
    mode = 'aim';
  }

  return (req, res) => {
    res.send({
      mode,
    });
  };
};

export default getConfig;
