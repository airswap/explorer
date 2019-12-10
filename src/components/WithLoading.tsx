import React from 'react'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'

import { FadeInOutTransition } from '../utils/animations'
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
  transition: ${({ theme }) => theme.animation.defaultTransition}s;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
`

const ChildrenContainer = styled(Flex)<LoadingProps>`
  z-index: 1;
  transition: ${({ theme }) => theme.animation.defaultTransition}s;
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
      <Transition in={props.isLoading} timeout={0}>
        {state => (
          <LoadingContainer style={{ ...FadeInOutTransition[state] }} isLoading={props.isLoading}>
            <Spinner size={100} />
          </LoadingContainer>
        )}
      </Transition>
      <Transition in={!props.isLoading} timeout={0}>
        {state => (
          <ChildrenContainer style={{ ...FadeInOutTransition[state] }} isLoading={props.isLoading}>
            {props.children}
          </ChildrenContainer>
        )}
      </Transition>
    </Container>
  )
}
