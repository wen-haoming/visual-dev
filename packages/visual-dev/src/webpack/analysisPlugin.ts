/* eslint-disable @typescript-eslint/no-unused-vars */
import path from 'path';
import type { Compiler } from 'webpack';
import type { ServerProps } from '../server/createServer';
import G6 from '@antv/g6';

const LEGAL_FILES = ['.js', '.ts', '.jsx', '.tsx', '.css'];

type NODE = {
  id: string;
  label: string;
  name: string;
};

type EDGE = {
  source: string;
  target: string;
};

type analysisData = {
  nodes: NODE[];
  edges: EDGE[];
};

function checkFile(filePath: string) {
  const ext = path.extname(filePath);
  return LEGAL_FILES.includes(ext) && !filePath.includes('/node_modules/');
}

interface Options {
  rootPath?: string;
}

const analysisPlugin = (compiler: Compiler, options: Options, serverProps: ServerProps) => {
  if (!options) {
    return;
  }

  if (options && !options.rootPath) {
    console.error('开启 analysisPlugin 的时候需要配置 rootPath');
    return;
  }

  const { rootPath } = options;
  const dependenciesTree: Record<
    string,
    {
      parent: string;
      next: string[];
    }
  > = {};

  compiler.hooks.normalModuleFactory.tap('analysisPlugin', (nmf) => {
    nmf.hooks.afterResolve.tap('DepAnalysisPlugin', (result: any) => {
      const resourceResolveData =
        result.resourceResolveData || result.createData?.resourceResolveData || {};
      const curFile = resourceResolveData?.path as string;
      const parentFile = resourceResolveData.context ? resourceResolveData.context.issuer : null;
      // 对于合法文件进行分析
      if (curFile && checkFile(curFile)) {
        // dependenciesFileMap[curFile] = dependenciesFileMap[curFile] || [];
        // 如果有父级文件，则直接添加
        if (parentFile) {
          if (!dependenciesTree[curFile]) {
            dependenciesTree[curFile] = {
              parent: parentFile,
              next: [],
            };
          }
          if (dependenciesTree[parentFile]) {
            dependenciesTree[parentFile].next.push(curFile);
          }
        } else {
          // 说明是根路径
          dependenciesTree[curFile] = {
            parent: curFile,
            next: [],
          };
        }
      }
    });
  });

  compiler.hooks.done.tap('DepAnalysisPlugin', async (stats) => {
    if (rootPath) {
      // const routers = fs.readdirSync(path.resolve(process.cwd(), rootPath));
      const data: analysisData = {
        nodes: Object.keys(dependenciesTree).map((p) => {
          return {
            id: p.match('[^/]+(?!.*/)')![0],
            label: p.match('[^/]+(?!.*/)')![0],
            name: p,
          };
        }),
        edges: Object.entries(dependenciesTree).reduce<
          {
            source: string;
            target: string;
          }[]
        >((pre, [p, { parent, next }]) => {
          p = p.replace(process.cwd(), '');
          const edges = next.map((nextItem) => {
            return {
              source: p.match('[^/]+(?!.*/)')![0],
              target: nextItem.match('[^/]+(?!.*/)')![0],
              style: {
                endArrow: {
                  path: G6.Arrow.vee(),
                  fill: '#F6BD16',
                },
              },
            };
          });
          return [...pre, ...edges];
        }, []),
      };
      serverProps.analysisFileData = data;
    }
  });
};
export default analysisPlugin;
