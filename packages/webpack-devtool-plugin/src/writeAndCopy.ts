// import fs from 'fs'
// import { CLIENT_ASSETS_DIR, ASSETS_DIR } from '@web-devtools/core'

// const writeAndCopyFile = (compilation) => {
//   // const rootPath = path.resolve("./lib");
//   const mathchHtmlFile = Object.keys(compilation.assets).filter((filePath) =>
//     /\.html$/.test(filePath)
//   )

//   mathchHtmlFile.forEach((filePath) => {
//     let htmlContent = compilation.assets['index.html'].source()

//     // eslint-disable-next-line no-param-reassign
//     compilation.assets[filePath] = {
//       source() {
//         const targetTemplate = fs.readFileSync(
//           `${CLIENT_ASSETS_DIR}/index.html`,
//           'utf-8'
//         )

//         htmlContent = htmlContent.replace(
//           /<body>([\s\S]*)<\/body>/g,
//           ($1, $2) => {
//             return $2 + targetTemplate
//           }
//         )
//         return htmlContent
//       },
//       size() {
//         return htmlContent.length
//       }
//     }
//   })

//   // copy file
//   const assetsDir = `${CLIENT_ASSETS_DIR}/${ASSETS_DIR}`

//   const dirs = fs.readdirSync(assetsDir)

//   dirs.forEach((fileName) => {
//     const content = fs.readFileSync(`${assetsDir}/${fileName}`, 'utf-8')
//     // eslint-disable-next-line no-param-reassign
//     compilation.assets[`${ASSETS_DIR}/${fileName}`] = {
//       source() {
//         return content
//       },
//       size() {
//         return content.length
//       }
//     }
//   })
// }

// export default writeAndCopyFile
