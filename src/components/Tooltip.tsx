import React, { useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'

import { FadeInOutTransition } from '../utils/animations'
import Flex from './Flex'

const Container = styled(Flex)`
  position: relative;
`

interface TooltipContainerProps {
  maxWidth?: number
}

const TooltipContainer = styled(Flex)<TooltipContainerProps>`
  position: absolute;
  left: 50%;
  top: -50px;
  transform: translateX(-50%);
  z-index: 1;
  padding: 5px 10px;
  background-color: black;
  opacity: 0.75;
  width: auto;
  border-radius: 5px;
  transition: ${({ theme }) => theme.animation.defaultTransition}s ease;
`

const ChildContainer = styled(Flex)``

enum TooltipPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
}

interface TooltipProps {
  position?: TooltipPosition
  maxWidth?: number
  tooltipContent: React.ReactNode
  children: React.ReactNode
}

export default function Tooltip(props: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false)

  return (
    <Container>
      <Transition in={showTooltip} timeout={0}>
        {state => (
          <TooltipContainer maxWidth={props.maxWidth} style={{ ...FadeInOutTransition[state] }}>
            {props.tooltipContent}
          </TooltipContainer>
        )}
      </Transition>
      <ChildContainer onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
        {props.children}
      </ChildContainer>
    </Container>
  )
}
