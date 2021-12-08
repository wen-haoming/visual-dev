import type { RequestHandler } from 'express';
import { pathMap } from '../../babel';

export const pathMapMid = (): RequestHandler => {
  return (req, res) => {
    res.send(JSON.stringify(pathMap));
  };
};

export default pathMapMid;
