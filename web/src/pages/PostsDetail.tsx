import { FC, useEffect } from 'react'
import styled from "styled-components";
import useSWR from 'swr'
import { useFetcher } from '../hooks/useFetcher';

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

const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
overflow-x: scroll;
gap: 16px;
`
const PostSection = styled.div`
border-bottom: 1px gray solid;
padding: 8px;
width: 600px;
`
const PostTitle = styled.div`
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

export const Posts: FC = () => {
  const { fetcher } = useFetcher()

  const { data } = useSWR<Post[]>('http://localhost:3333/posts', fetcher)
  return (
    <Wrapper>
      { data?.map((post) => (
        <PostSection>
          <PostTitle>{ post.title }</PostTitle>
          <PostSubTitle>
            <SubContent>{ post.user.name }</SubContent>
            <SubContent>{ post.createdAt }</SubContent>
          </PostSubTitle>
        </PostSection>
      ))}
    </Wrapper>
  )
}