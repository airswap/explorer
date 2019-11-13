import React from 'react'
import styled from 'styled-components'

import Flex from './Flex'
import Spinner from './Spinner'

interface LoadingProps {
  isLoading: boolean
}

const Container = styled(Flex)`
  position: relative;
  width: 100%;
  height: 100%;
`

const LoadingContainer = styled(Flex).attrs({
  justify: 'center',
  align: 'center',
})<LoadingProps>`
  opacity: ${({ isLoading }) => (isLoading ? 1 : 0)};
  transition: ${({ theme }) => theme.animation.defaultTransition}s ease;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const ChildrenContainer = styled(Flex)<LoadingProps>`
  opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
  transition: ${({ theme }) => theme.animation.defaultTransition}s ease;
  width: 100%;
  height: 100%;
`

interface WithLoadingProps {
  isLoading: boolean
  children: React.ReactNode
}

export default function WithLoading(props: WithLoadingProps) {
  return (
    <Container>
      <LoadingContainer isLoading={props.isLoading}>
        <Spinner size={100} />
      </LoadingContainer>
      <ChildrenContainer isLoading={props.isLoading}>{props.children}</ChildrenContainer>
    </Container>
  )
}
