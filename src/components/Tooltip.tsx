import React, { useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'

import { FadeInOutTransition } from '../utils/animations'
import Flex from './Flex'

const Container = styled(Flex)`
  position: relative;
`

const TooltipContainer = styled(Flex)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

const ChildContainer = styled(Flex)``

enum TooltipPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
}

interface TooltipProps {
  position?: TooltipPosition
  tooltipContent: React.ReactNode
  children: React.ReactNode
}

export default function Tooltip(props: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false)

  return (
    <Container>
      <Transition in={showTooltip} timeout={0}>
        {state => (
          <TooltipContainer style={{ ...FadeInOutTransition[state] }}>
            <div />
          </TooltipContainer>
        )}
      </Transition>
      <ChildContainer onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
        {props.children}
      </ChildContainer>
    </Container>
  )
}
