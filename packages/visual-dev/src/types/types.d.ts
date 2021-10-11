declare module '@babel/traverse' {
  import Traverse from 'babel-traverse';

  export * from 'babel-traverse';

  export default Traverse;
}

declare module '@babel/core' {
  export * from 'babel-core';
}

declare module '@babel/generator' {
  import generator from 'babel-generator';

  export * from 'babel-generator';

  export default generator;
}

// import  Traverse from '@babel/traverse'

declare module '@babel/template' {
  import template from 'babel-template';

  export * from 'bablel-template';

  export default template;
}

declare module 'slash2';

declare module 'prismjs';

declare module 'escape-html';
