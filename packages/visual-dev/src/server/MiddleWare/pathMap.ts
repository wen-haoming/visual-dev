import type { RequestHandler } from 'express';

export const pathMapMid = (): RequestHandler => {
  return (req, res) => {
    res.send(JSON.stringify({}));
  };
};

export default pathMapMid;
