import { createSocketServe } from './createSocketServe'
import { CreateSocketServeOptions } from './createSocketServe'
// import launchEditor from 'react-dev-utils/launchEditor'
import launchEditor from '@umijs/launch-editor'
import { WSPayload } from './types/payload'

export async function createServer(options: CreateSocketServeOptions) {
  const ws = createSocketServe(options)

  // ws broadcast
  // ws.send({ type: 'connected' })

  // ws listener
  ws.listen((buffer: Buffer) => {
    const payload: WSPayload = JSON.parse(buffer.toString())

    switch (payload.type) {
      case 'launch-editor-payload': {
        launchEditor(payload.path)
        break
      }
      default:
        break
    }
  })
}
