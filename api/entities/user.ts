import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm'
import { Post } from './post'
import { Comment } from './comment'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    unique: true,
    length: 255,
  })
  email!: string

  @Column({ length: 20 })
  name!: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]

  @OneToMany((_type) => Comment, (comments) => comments.user)
  comments: Comment[]
}
