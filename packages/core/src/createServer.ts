import * as express from "express";
import * as cors  from 'cors'
import * as bodyParser  from 'body-parser'
import * as launchEditor from '@umijs/launch-editor'
import { SERVER_PORT } from './index'

export const createServer = () => {
  const app = express()

  app.use(cors())
  app.use(bodyParser.json())

  app.post('/launchEditor',async (req,res)=>{
      const {filePath}  = req.body
        await launchEditor(process.cwd()+ filePath)
      res.send('ok')
  })


  app.listen(SERVER_PORT, () => {
    console.log(`dev-plugin is listening ${SERVER_PORT}`)
  })
}
