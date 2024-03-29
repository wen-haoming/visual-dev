import type { RequestHandler } from 'express';
import { resolvePath } from '../../utils';
import path from 'path';

interface Props {
  includes: string[]; // file or dir
}

export const getMenu = (props: Props): RequestHandler => {
  const { includes = [] } = props;
  const mdFile = resolvePath([path.resolve(process.cwd(), './README.MD'), ...includes], {
    ext: ['md'],
    dealString: (conrent) => conrent,
  });

  return (req, res) => {
    res.send(JSON.stringify(mdFile));
  };
};

export default getMenu;
