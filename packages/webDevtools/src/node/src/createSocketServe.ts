import { Server } from 'ws'
import type { ServerOptions } from 'ws'
import { HMRPayload } from './types/hmrPayload'

export function createSocketServe() {
  const websocketServerOptions: ServerOptions = {
    port: 24686
  }

  let bufferedError = null

  const wss = new Server(websocketServerOptions)

  wss.on('connection', (socket) => {
    socket.send(JSON.stringify({ type: 'connected' }))
    if (bufferedError) {
      socket.send(JSON.stringify(bufferedError))
      bufferedError = null
    }
  })
  wss.on('error', (e: Error & { code: string }) => {
    if (e.code !== 'EADDRINUSE') {
      //   config.logger.error(
      //     chalk.red(`WebSocket server error:\n${e.stack || e.message}`),
      //     { error: e }
      //   )
    }
  })

  return {
    send(payload: HMRPayload) {
      if (payload.type === 'error' && !wss.clients.size) {
        bufferedError = payload
        return
      }
      const stringified = JSON.stringify(payload)
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(stringified)
        }
      })
    },
    close() {
      return new Promise<void>((resolve, reject) => {
        wss.close((err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
    }
  }
}
