import type { Options } from 'http-proxy-middleware'

export type HttpProxyOptions = Record<string, string | Options>

export function httpProxy(options: HttpProxyOptions): HttpProxyOptions {
  const proxyOptions: HttpProxyOptions = {}

  Object.entries(options).forEach(([key, value]) => {
    proxyOptions[key] = {
      router(req) {
        return {
          host: req.hostname
        }
      },
      ...(value as any)
    }
  })

  return proxyOptions
}

console.log()
