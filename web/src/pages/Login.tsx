import { FC } from 'react'
import styled from "styled-components";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { authState } from '../store/auth';
import { useFetcher } from '../hooks/useFetcher'
import { useSetRecoilState } from 'recoil'

type Inputs = {
  name: string,
  email: string,
}

type User = {
  id: number
  email: string
  name: string
  createdAt: string
  updatedAt: string
}

export const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()
  const navigate = useNavigate()
  const { fetcher } = useFetcher()
  const setAuthState = useSetRecoilState(authState)

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    fetcher<User>('http://localhost:3333/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((user) => {
      setAuthState({
        id: user.id
      })
      navigate('/posts')
    }).catch((error) => {
      console.error(error)
    })
  }

  const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 92vh;
    gap: 16px;
  `

  const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `

  const InputForm = styled.div`
    display: flex;
    flex-direction: column;
  `
  const Label = styled.label`

  `
  const Input = styled.input`
    width: 382px;
    height: 38px;
    border: 1px solid  #eb6100;
    padding: 0 8px;
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

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputForm>cs
          <Label>email</Label>
          <Input {...register('email', { required: {
            value: true,
            message: '必須です。'
          }, pattern: {
                value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                message: "入力形式がメールアドレスではありません。"
              } })} />
          <FormError>
            {errors.email?.message}
          </FormError>
        </InputForm>
        <InputForm>
          <Label>name</Label>
          <Input {...register('name', { required: {
            value: true,
            message: '必須です。'
          }, maxLength: {
            value: 20,
            message: '必須です。'
          } })} />
          <FormError>
            {errors.name?.message}
          </FormError>
        </InputForm>
        <Button type='submit'>ログイン</Button>
      </Form>
    </Wrapper>
  )
}
