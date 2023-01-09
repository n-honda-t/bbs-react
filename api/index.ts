import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { useExpressServer } from 'routing-controllers'
import { TestController } from './controllers/TestController'
import { UserController } from './controllers/UserController'
import { PostController } from './controllers/PostController'
import { CommentController } from './controllers/CommentController'

const PORT = 3333

async function bootstrap() {
  const app = express()

  app.use(
    bodyParser.json(),
    cors({
      origin: 'http://localhost:5173', //アクセス許可するオリジン
      credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
      optionsSuccessStatus: 200, //レスポンスstatusを200に設定
    }),
  )

  useExpressServer(app, {
    controllers: [TestController, UserController, PostController, CommentController],
  })

  app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
  })
}

bootstrap()
