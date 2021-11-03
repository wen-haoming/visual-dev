import MarkdownIt from 'markdown-it';

import { highlight } from './plugins/highlight';

export const createMarkdownRenderer = (source: string): string => {
  const md = MarkdownIt({
    html: true,
    highlight,
  });
  return md.render(source);
};
