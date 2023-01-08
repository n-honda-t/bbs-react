import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'
import { useExpressServer } from 'routing-controllers'
import { DataSource } from 'typeorm'
import { TestController } from './controllers/TestController'

const PORT = 3333

async function bootstrap() {
  const app = express()

  app.use(bodyParser.json())

  useExpressServer(app, {
    controllers: [TestController],
  })

  app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
  })
}

bootstrap()
