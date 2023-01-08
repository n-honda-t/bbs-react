import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'
import { useExpressServer } from 'routing-controllers'
import { TestController } from './controllers/TestController'
import { UserController } from './controllers/UserController'
import { PostController } from './controllers/PostController'
import { CommentController } from './controllers/CommentController'

const PORT = 3333

async function bootstrap() {
  const app = express()

  app.use(bodyParser.json())

  useExpressServer(app, {
    controllers: [TestController, UserController, PostController, CommentController],
  })

  app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
  })
}

bootstrap()
