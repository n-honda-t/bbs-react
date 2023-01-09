import { FC, Suspense, useEffect } from 'react'
import styled from "styled-components";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams} from 'react-router-dom'
import { useSetRecoilState } from 'recoil';
import useSWR from 'swr'
import { useFetcher } from '../hooks/useFetcher';
import { authState } from '../store/auth';
import { useRecoilValue } from 'recoil';
import { Link } from "react-router-dom";
import { Layout } from '../components/Layout';

type Post = {
  id: number
  userId: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  user: User
  comments: Comment[]
}

type User = {
  id: number
  email: string
  name: string
  createdAt: string
  updatedAt: string
}

type Comment = {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  user: User
}

type CommentInputs = {
  postId: number
  userId: number
  content: string
}

const PostSection = styled.div`
  border-bottom: 1px gray solid;
  padding: 8px;
  width: 600px;
`
const PostTitle = styled.div`
  color: black;
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 8px;
  &:hover {
    color: #f56500;
    cursor: pointer;
  }
`
const PostSubTitle = styled.div`
  display: flex;
  justify-content: space-between;
`

const SubContent = styled.div`
  color: gray;
`

const PostContent = styled.div`
  padding: 8px;
  font-size: 16px;
  border-radius: 8px;
`

const CommentSection = styled.div`
  border-bottom: 1px gray solid;
  padding: 8px;
  width: 600px;
`

const CommentContent = styled.div`
  padding: 8px;
  font-size: 16px;
`

const CommentCreateForm = styled.form`
`
const CommentCreateTitle = styled.h2`
margin: 0;
`
const CommentCreateContent = styled.textarea`
width: 382px;
border: 1px solid  #eb6100;
padding: 8px;
font-size: 16px;
border-radius: 8px;
&:focus {
  border: 1px solid #f56500;
  z-index: 10;
  outline: 0;
}
`

const CommentCreateButton = styled.button`
width: 100px;
height: 40px;
color: #fff;
background-color: #eb6100;
border-radius: 8px;
&:hover {
  color: #fff;
  background: #f56500;
}
`

const CommentDeleteButton = styled.button`
width: 100px;
height: 40px;
color: #fff;
background-color: #eb6100;
border-radius: 8px;
&:hover {
  color: #fff;
  background: #f56500;
}
`

const Label = styled.label``

const Div = styled.div`
display: flex;
flex-direction: column;
gap: 8px;
`

export const PostDetail: FC = () => {
  const navigate = useNavigate()
  const { fetcher } = useFetcher()
  const state = useRecoilValue(authState)
  const { id } = useParams()
  const { data, mutate } = useSWR<Post>(`http://localhost:3333/posts/${id}`, fetcher)
    const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CommentInputs>()

  const onSubmit: SubmitHandler<CommentInputs> = (formData) => {
    fetcher('http://localhost:3333/comments', {
      method: 'POST',
      body: JSON.stringify({...formData, userId: state.id, postId: id && +id}),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(() => {
      mutate()
      setValue('content', '')
    })
    .catch((error) => {
      console.error(error)
    })
  }

  const deleteComment = (commentId: number) => {
    fetcher(`http://localhost:3333/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(() => {
      mutate()
    })
    .catch((error) => {
      console.error(error)
    })
  }

  return (
      <Layout>
        <PostSection>
          <Link to={`/posts/${data?.id}/edit`}>
            <PostTitle>{ data?.title }</PostTitle>
          </Link>
          <PostSubTitle>
            <SubContent>{ data?.user.name }</SubContent>
            <SubContent>{ data?.createdAt }</SubContent>
          </PostSubTitle>
          <PostContent>{ data?.content }</PostContent>
        </PostSection>
        {data?.comments.map((comment) => (
          <CommentSection key={comment.id}>
            <SubContent>{ comment.user.name }</SubContent>
            <SubContent>{ comment.user.createdAt }</SubContent>
            <CommentContent>{ comment.content }</CommentContent>
            <CommentDeleteButton onClick={() => deleteComment(comment.id)}>削除</CommentDeleteButton>
          </CommentSection>
        ))}
        <CommentCreateForm onSubmit={ handleSubmit(onSubmit) }>
          <CommentCreateTitle>コメント</CommentCreateTitle>
          <Div>
            <CommentCreateContent rows={3} {...register('content', { required: {
            value: true,
            message: '必須です。'
          }, maxLength: {
            value: 1000,
            message: '1000文字を超える入力はできません。'
          } })}></CommentCreateContent>
            <CommentCreateButton type='submit'>投稿</CommentCreateButton>
          </Div>
        </CommentCreateForm>
      </Layout>
  )
}
