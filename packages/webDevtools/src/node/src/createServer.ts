import { createSocketServe } from './createSocketServe'
import type { CreateSocketServeOptions } from './createSocketServe'

export async function createServer(options: CreateSocketServeOptions) {
  const ws = createSocketServe(options)

  // ws broadcast
  ws.send({ type: 'connected' })

  // ws listener
  ws.listen((data) => {
    console.log(data.toString())
  })
}
