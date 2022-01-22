import type { RequestHandler } from 'express';
import type { PluginOptions } from '../../';

export const getConfig = (props: PluginOptions): RequestHandler => {
  return (req, res) => {
    res.send({
      mode: props.mode,
      editor: props.editor || 'vscode',
      devServerProxy: props.devServerProxy ? props.devServerProxy : false,
      shortcuts: props.shortcuts || {},
    });
  };
};

export default getConfig;
