import type { RequestHandler } from 'express';
import type { ServerProps } from '../../';

// const analysisPluginData = {
//   nodes: [
//     { id: '/src/index.js', label: '/src/index.js', name: 'index.js' },
//   ],
//   edges: [
//     { source: '/src/index.js', target: '/src/reportWebVitals.js' },
//   ],
// };

export const analysisFile = (props: ServerProps): RequestHandler => {
  return (req, res) => {
    res.send({
      data: props.analysisFileData,
    });
  };
};

export default analysisFile;
