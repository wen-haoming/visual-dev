declare module '@babel/traverse' {
  import Traverse from '@types/babel-traverse'

  export * from '@types/babel-traverse'

  export default Traverse
}

declare module '@babel/core' {
  import core from '@types/babel-core'

  export * from '@types/babel-core'

  export default core
}

declare module '@babel/generator' {
  import generator from '@types/babel-generator'

  export * from '@types/babel-generator'

  export default generator
}

declare module 'react-dev-utils/launchEditorEndpoint' {}
// import  Traverse from '@babel/traverse'
