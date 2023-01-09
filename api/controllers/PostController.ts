import { Body, Post, JsonController, Res, Delete, Param, Put, Get } from 'routing-controllers'
import { MaxLength, IsInt } from 'class-validator'
import { Response } from 'express'
import { Post as PostEntity } from '../entities/post'
import { User } from '../entities/user'

class CreatePostBody {
  @IsInt({ message: '数値を入力してください' })
  userId: number
  @MaxLength(255, { message: '255文字以下で入力してください。' })
  title: string
  @MaxLength(1000, { message: '1000文字以下で入力してください。' })
  content: string
}

@JsonController('/posts')
export class PostController {
  @Get()
  async index() {
    return await PostEntity.find({
      relationLoadStrategy: 'query',
      relations: ['user'],
    })
  }

  @Post()
  async store(@Body() { userId, title, content }: CreatePostBody, @Res() response: Response) {
    const user = await User.findOneBy({
      id: userId,
    })

    if (!user) {
      return response.status(404).json({ message: 'ユーザー見つかりません。' })
    }

    return await PostEntity.create({
      userId,
      title,
      content,
    }).save()
  }

  @Get('/:id')
  async show(@Param('id') id: number) {
    return await PostEntity.findOne({
      relationLoadStrategy: 'query',
      relations: ['comments'],
      where: {
        id,
      },
    })
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() { userId, title, content }: CreatePostBody,
    @Res() response: Response,
  ) {
    const user = await User.findOneBy({
      id: userId,
    })

    if (!user) {
      return response.status(404).json({ message: 'ユーザー見つかりません。' })
    }

    return await PostEntity.create({
      id,
      userId,
      title,
      content,
    }).save()
  }

  @Delete('/:id')
  async destroy(@Param('id') id: number) {
    return await PostEntity.delete(id)
  }
}
