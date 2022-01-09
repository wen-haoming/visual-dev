import type { RequestHandler } from 'express';
import type { PluginOptions } from '../../';

export const domConfigMap: Record<string, { launcher: string }> = {};

export const getConfig = (props: PluginOptions): RequestHandler => {
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
      editor: props.editor || 'vscode',
    });
  };
};

export default getConfig;
