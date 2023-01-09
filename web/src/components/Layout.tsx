import { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { authState } from '../store/auth'
import { useRecoilValue } from 'recoil'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-x: scroll;
  gap: 16px;
`

type Props = {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  const state = useRecoilValue(authState)

  if (state.id === null) {
    navigate('/')
  }

  return <Wrapper>{children}</Wrapper>
}
