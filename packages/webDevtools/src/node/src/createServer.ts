import { createSocketServe } from './createSocketServe'

export async function createServer() {
  const ws = createSocketServe()

  // ws broadcast
  ws.send({ type: 'connected' })

  ws.listen((data) => {
    console.log(data.toString())
  })
}
