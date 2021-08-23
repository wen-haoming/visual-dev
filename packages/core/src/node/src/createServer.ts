/* eslint-disable no-console */
import { createSocketServe } from './createSocketServe'
import type { CreateSocketServeOptions } from './createSocketServe'
import launchEditor from 'react-dev-utils/launchEditor'

export async function createServer(options: CreateSocketServeOptions) {
  const ws = createSocketServe(options)

  // ws broadcast
  ws.send({ type: 'connected' })

  // ws listener
  ws.listen((data) => {
    console.log(data.toString())
    ;(async () => {
      try {
        const res = await launchEditor(
          '/Users/wenhaoming/Desktop/practise/web-devtools/examples/cra-app/src/index.js',
          2,
          1
        )
        console.log(res)
      } catch (e) {
        // Ignore
      }
    })()
  })
}
