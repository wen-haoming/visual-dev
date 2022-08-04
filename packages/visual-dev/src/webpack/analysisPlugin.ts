/* eslint-disable @typescript-eslint/no-unused-vars */
import path from 'path';
import fs from 'fs-extra';
import type { Compiler } from 'webpack';

const LEGAL_FILES = ['.js', '.ts', '.jsx', '.tsx', '.css'];

type NODE = {
  id: string;
  label: string;
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

const analysisPlugin = (compiler: Compiler, options?: Options) => {
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
    // console.log('dependenciesTree--->',dependenciesTree);
    if (rootPath) {
      const routers = fs.readdirSync(path.resolve(process.cwd(), rootPath));
      const r = routers.map((dir) => {
        return path.resolve(rootPath, dir, 'index.jsx');
      });
      const templateFilePath = path.resolve(__dirname, '../../dev-ui/index.html');
      if (fs.pathExistsSync(templateFilePath)) {
        const templateFile = fs.readFileSync(templateFilePath, 'utf-8');
        // console.log(dependenciesTree, r);
        const data: analysisData = {
          nodes: Object.keys(dependenciesTree).map((p) => {
            p = p.replace(process.cwd(), '');
            return {
              id: p,
              label: p,
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
                source: p,
                target: nextItem.replace(process.cwd(), ''),
              };
            });
            return [...pre, ...edges];
          }, []),
        };
        // console.log(data);
        // debugger;
        const fileData = `${templateFile}
          <script>
            var analysisPluginData = ${JSON.stringify(data)}
          </script>
          `;
        fs.writeFileSync(templateFilePath, fileData);
      }
    }
  });
};
export default analysisPlugin;