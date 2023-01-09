import { FC, Suspense, useEffect } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import { useFetcher } from '../hooks/useFetcher'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'

type Post = {
  id: number
  userId: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  user: User
}

type User = {
  id: number
  email: string
  name: string
  createdAt: string
  updatedAt: string
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

export const Posts: FC = () => {
  const { fetcher } = useFetcher()
  const navigate = useNavigate()

  const { data } = useSWR<Post[]>('http://localhost:3333/posts', fetcher)
  return (
    <Layout>
      <Button onClick={() => navigate('/posts/create')}>投稿する</Button>
      {data?.map((post) => (
        <PostSection key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <PostTitle>{post.title}</PostTitle>
          </Link>
          <PostSubTitle>
            <SubContent>{post.user.name}</SubContent>
            <SubContent>{post.createdAt}</SubContent>
          </PostSubTitle>
        </PostSection>
      ))}
    </Layout>
  )
}
