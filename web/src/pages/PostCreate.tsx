import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import useSWR from 'swr'
import { useFetcher } from '../hooks/useFetcher'
import { authState } from '../store/auth'
import { useRecoilValue } from 'recoil'
import { Layout } from '../components/Layout'

type Inputs = {
  userId: number
  title: string
  content: string
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled.label``
const Input = styled.input`
  width: 382px;
  height: 38px;
  border: 1px solid #eb6100;
  padding: 0 8px;
  font-size: 16px;
  border-radius: 8px;
  &:focus {
    border: 1px solid #f56500;
    z-index: 10;
    outline: 0;
  }
`

const Textarea = styled.textarea`
  width: 382px;
  border: 1px solid #eb6100;
  padding: 8px;
  font-size: 16px;
  border-radius: 8px;
  &:focus {
    border: 1px solid #f56500;
    z-index: 10;
    outline: 0;
  }
`

const Button = styled.button`
  width: 400px;
  height: 40px;
  color: #fff;
  background-color: #eb6100;
  border-radius: 8px;
  &:hover {
    color: #fff;
    background: #f56500;
  }
`

const FormError = styled.div`
  color: red;
`

export const PostCreate: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const navigate = useNavigate()
  const { fetcher } = useFetcher()
  const setAuthState = useSetRecoilState(authState)
  const state = useRecoilValue(authState)

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    fetcher('http://localhost:3333/posts', {
      method: 'POST',
      body: JSON.stringify({ ...formData, userId: state.id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        navigate('/posts')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Layout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputForm>
          <Label>タイトル</Label>
          <Input
            required
            {...register('title', {
              required: {
                value: true,
                message: '必須です。',
              },
              maxLength: {
                value: 255,
                message: '255文字を超える入力はできません。',
              },
            })}
          />
          <FormError>{errors.title?.message}</FormError>
        </InputForm>
        <InputForm>
          <Label>記事内容</Label>
          <Textarea
            rows={10}
            {...register('content', {
              required: {
                value: true,
                message: '必須です。',
              },
              maxLength: {
                value: 1000,
                message: '1000文字を超える入力はできません。',
              },
            })}
          />
          <FormError>{errors.content?.message}</FormError>
        </InputForm>
        <Button type="submit">記事を作成する</Button>
      </Form>
    </Layout>
  )
}
