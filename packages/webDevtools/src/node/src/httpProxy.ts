import type { ProxyOptions } from 'vite'

export function httpProxy(
  options: Record<string, string | ProxyOptions>
): Record<string, string | ProxyOptions> {
  // const ProxyOptions  = {};

  //   Object.entries(options).forEach(([key,value],idx)=>{

  //   })

  return {
    // onProxyRes(app, server, compiler) {},
    '/': {},
    ...options
  }
}
