declare module '@babel/traverse' {
    import Traverse from 'babel-traverse'
  
    export * from 'babel-traverse'
  
    export default Traverse
  }
  
  declare module '@babel/core' {
    export * from 'babel-core'
  }
  
  declare module '@babel/generator' {
    import generator from 'babel-generator'
  
    export * from 'babel-generator'
  
    export default generator
  }
  
  // import  Traverse from '@babel/traverse'
  