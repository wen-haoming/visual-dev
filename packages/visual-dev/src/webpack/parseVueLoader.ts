import { parse, transform, NodeTypes } from '@vue/compiler-dom';
import MagicString from 'magic-string';

export const parseVueLoader = function webpackLoader(this: any, source: string) {
  const { resourcePath: filePath } = this;

  const ast = parse(source);
  const s: any = new MagicString(source);

  const tplAst: any = ast.children.find((item: any) => item.tag === 'template');

  if (tplAst) {
    transform(tplAst, {
      nodeTransforms: [
        (node) => {
          if (node.type === NodeTypes.ELEMENT && node.tagType === 0 && node.tag !== 'template') {
            const { start } = node.loc;
            const tagLen = node.tag.length;
            const idx = start.offset + tagLen;

            const absolutePath = `${filePath}:${start.line.toString()}:${start.column.toString()}`;

            const relativePath = `${absolutePath.replace(process.cwd(), '')}`;

            const attr = ` data-v-p="${absolutePath}|${relativePath}|${node.tag}|vue" `;

            // `${absolutePath}|${relativePath}|${componentName}|react`
            // const pathVal = `${filePath}:${start.line.toString()}:${start.column.toString()}`;

            s.insertLeft(idx + 1, attr);
          }
        },
      ],
    });
  }
  return s.toString();
};

export default parseVueLoader;
