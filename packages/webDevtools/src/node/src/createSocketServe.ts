import WebSocket, { Server } from 'ws'
import type { ServerOptions } from 'ws'
import type { HMRPayload, ErrorPayload } from './types/hmrPayload'
import { ref, effect } from '@vue/reactivity'

export interface WebSocketServer {
  send: (payload: HMRPayload) => void
  close: () => Promise<void>
  server: Server
}

export type CreateSocketServeOptions = ServerOptions

export function createSocketServe(options?: ServerOptions) {
  const websocketServerOptions: ServerOptions = {
    port: 24686,
    ...options
  }

  let bufferedError: ErrorPayload | null = null

  const wss = new Server(websocketServerOptions)

  // 成为响应式数据
  const clients = ref(new Set<WebSocket>())

  wss.on('connection', (socket) => {
    socket.send(JSON.stringify({ type: 'connected' }))
    if (bufferedError) {
      socket.send(JSON.stringify(bufferedError))
      bufferedError = null
      return
    }
    clients.value.add(socket)
  })

  wss.on('error', (e: Error) => {
    console.log(e)
  })

  return {
    listen(fn: (this: WebSocket, code: number, reason: string) => void) {
      effect(() => {
        clients.value.forEach((client) => {
          client.on('message', fn)
        })
      })
    },
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
        clients.value.forEach((client) => client.close())

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
