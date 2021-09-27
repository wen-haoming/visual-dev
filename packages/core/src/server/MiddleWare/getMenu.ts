import type { RequestHandler } from 'express';
import { resolvePath } from '../../utils';

interface Props {
  includes: string[];
}

const getMenu = (props: Props): RequestHandler => {
  const { includes } = props;
  const mdFile = resolvePath(includes, ['md']);

  return (req, res) => {
    res.send(JSON.stringify(mdFile));
  };
};

export default getMenu;
