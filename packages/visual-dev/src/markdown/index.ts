import MarkdownIt from 'markdown-it';

export const createMarkdownRenderer = (source: string): string => {
  const md = MarkdownIt({
    html: true,
  });

  return md.render(source);
};
