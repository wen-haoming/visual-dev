import type { RequestHandler } from 'express';
import { resolvePath } from '../../utils';
import { createMarkdownRenderer } from '../../markdown';

interface Props {
  includes: string[];
}

const getMenu = (props: Props): RequestHandler => {
  const { includes } = props;
  const mdFile = resolvePath(includes, {
    ext: ['md'],
    dealString: (conrent) => createMarkdownRenderer(conrent),
  });

  return (req, res) => {
    res.send(JSON.stringify(mdFile));
  };
};

export default getMenu;
