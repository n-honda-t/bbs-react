import { Body, Post, JsonController } from 'routing-controllers'
import { IsEmail, MaxLength } from 'class-validator'
import { User } from '../entities/user'
import { PsqlDataSource } from '../config/database/postgres'

class LoginBody {
  @IsEmail(undefined, { message: 'email 形式で入力してください。' })
  email: string
  @MaxLength(20, { message: '20文字以下で入力してください。' })
  name: string
}

@JsonController()
export class UserController {
  @Post('/login')
  async login(@Body() { email, name }: LoginBody): Promise<User> {
    const userRepository = PsqlDataSource.getRepository(User)
    let user = await userRepository.findOneBy({
      email,
    })

    if (!user) {
      const userModel = User.create({
        email,
        name,
      })
      user = await userRepository.save(userModel)
    }

    return user
  }
}
