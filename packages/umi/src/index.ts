import type { IApi } from 'umi'
import { createServer } from '@web-devtools/core'
import writeAndCopy from './writeAndCopy'
import fs from 'fs'
import path from 'path'

const htmlTplPath = path.resolve(__dirname, '../dev-ui/index.html')

export default (api: IApi) => {
  api.onStart(() => {
    createServer()
  })

  api.chainWebpack((config) => {
    config.plugin('writeAndCopy').use(writeAndCopy)
    config.module
      .rule('compile')
      .test(/\.tsx$/)
      .use('')
      .loader(path.resolve(__dirname, './loader.js'))
    return config
  })

  api.modifyHTML(($) => {
    $('body').append(`${fs.readFileSync(htmlTplPath)}`)
    return $
  })
}
