import { Body, Post, JsonController, Res, Delete, Param } from 'routing-controllers'
import { MaxLength, IsInt } from 'class-validator'
import { Response } from 'express'
import { Post as PostEntity } from '../entities/post'
import { User } from '../entities/user'
import { Comment } from '../entities/comment'

class CreateCommentBody {
  @IsInt({ message: '数値を入力してください' })
  userId: number
  @IsInt({ message: '数値を入力してください' })
  postId: number
  @MaxLength(500, { message: '500文字以下で入力してください。' })
  content: string
}

@JsonController('/comments')
export class CommentController {
  @Post()
  async store(@Body() { userId, postId, content }: CreateCommentBody, @Res() response: Response) {
    const user = await User.findOneBy({
      id: userId,
    })

    if (!user) {
      return response.status(404).json({ message: 'ユーザー見つかりません。' })
    }

    const post = await PostEntity.findOneBy({
      id: postId,
    })

    if (!post) {
      return response.status(404).json({ message: '記事が見つかりません。' })
    }

    return await Comment.create({
      userId,
      postId,
      content,
    }).save()
  }

  @Delete('/:id')
  async destroy(@Param('id') id: number) {
    return await Comment.delete(id)
  }
}
