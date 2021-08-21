const { createServer, DEV_SERVER_PORT } = require('../dist/node')

createServer({
  port: DEV_SERVER_PORT
})
