import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';

import { FadeInOutTransition } from '../utils/animations';
import Flex from './Flex';

const Container = styled(Flex)`
  position: relative;
`;

interface TooltipContainerProps {
  maxWidth?: number;
}

const TooltipContainer = styled(Flex)<TooltipContainerProps>`
  position: absolute;
  left: 50%;
  top: -100%;
  transform: translateX(-50%);
  z-index: 3;
  padding: 5px 10px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.75);
  width: auto;
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : 'auto')};
  border-radius: 5px;
  transition: ${({ theme }) => theme.animation.defaultTransition}s ease;
`;

interface TooltipProps {
  maxWidth?: number;
  tooltipContent: React.ReactNode;
  children: React.ReactNode;
}

export default function Tooltip(props: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <Container>
      <Transition in={showTooltip} timeout={0}>
        {state => (
          <TooltipContainer maxWidth={props.maxWidth} style={{ ...FadeInOutTransition[state] }}>
            {props.tooltipContent}
          </TooltipContainer>
        )}
      </Transition>
      <Flex onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
        {props.children}
      </Flex>
    </Container>
  );
}
