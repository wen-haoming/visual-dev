import fs from 'fs'
import path from 'path'

const staticDir = 'assets'
const templateFile = path.resolve(__dirname, '../dev-ui/index.html')
const assetsDir = path.resolve(__dirname, `../dev-ui/${staticDir}`)

const writeAndCopyFile = (compilation: any) => {
  const mathchHtmlFile = Object.keys(compilation.assets).filter((filePath) =>
    /\.html$/.test(filePath)
  )

  mathchHtmlFile.forEach((filePath) => {
    let htmlContent = compilation.assets['index.html'].source()

    // eslint-disable-next-line no-param-reassign
    compilation.assets[filePath] = {
      source() {
        const targetTemplate = fs.readFileSync(templateFile, 'utf-8')

        htmlContent = htmlContent.replace(
          /<body>([\s\S]*)<\/body>/g,
          ($1: string, $2: string) => {
            return $2 + targetTemplate
          }
        )
        return htmlContent
      },
      size() {
        return htmlContent.length
      }
    }
  })

  // copy file
  const dirs = fs.readdirSync(assetsDir)

  dirs.forEach((fileName) => {
    const content = fs.readFileSync(`${assetsDir}/${fileName}`, 'utf-8')
    // eslint-disable-next-line no-param-reassign
    compilation.assets[`${staticDir}/${fileName}`] = {
      source() {
        return content
      },
      size() {
        return content.length
      }
    }
  })
}

export default writeAndCopyFile
