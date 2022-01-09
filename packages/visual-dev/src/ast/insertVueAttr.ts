import { parse, transform } from '@vue/compiler-dom';
import MagicString from 'magic-string';

export const insertVueAttr = (source: string, filePath: string): string => {
  const ast = parse(source);
  const s: any = new MagicString(source);

  const tplAst: any = ast.children.find((item: any) => item.tag === 'template');

  if (tplAst) {
    transform(tplAst, {
      nodeTransforms: [
        (node) => {
          //  1  is NodeTypes.Element
          if (node.type === 1 && node.tagType === 0 && node.tag !== 'template') {
            const { start } = node.loc;

            const tagLen = node.tag.length;

            const idx = start.offset + tagLen;

            const absolutePath = `${filePath}:${start.line.toString()}:${start.column.toString()}`;

            const relativePath = `${absolutePath.replace(process.cwd(), '')}`;

            const attrValue = `${absolutePath}|${relativePath}|${node.tag}|vue`;

            const attr = ` data-v-p="${attrValue}" `;

            s.appendLeft(idx + 1, attr);
          }
        },
      ],
    });
  }
  return s.toString();
};
