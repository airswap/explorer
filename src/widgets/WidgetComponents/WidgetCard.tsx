import React, { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';

import theme from '../../app/theme';
import Flex from '../../components/Flex';
import useWindowSize from '../../hooks/useWindowSize';
import { ReactComponent as CloseIcon } from '../../static/close-icon.svg';
import { FadeIn, FadeInOutTransition } from '../../utils/animations';

interface ContainerProps {
  width: string;
  noPadding?: boolean;
}

const Close = styled(Flex)`
  position: absolute;
  top: ${theme.spacing.widgetPadding};
  right: ${theme.spacing.widgetPadding};
  cursor: pointer;
  z-index: 4;

  svg {
    width: 15px;
    height: 15px;

    path {
      stroke: ${theme.palette.primaryColor};
    }
  }

  @media (max-width: ${`${theme.breakpoints.sm[1]}px`}) {
    top: ${theme.spacing.mobileWidgetPadding};
    right: ${theme.spacing.mobileWidgetPadding};
  }
`;

export const WidgetCardContainer = styled(Flex)<ContainerProps>`
  flex: auto;
  position: relative;
  width: ${({ width }) => width};
  max-width: 100%;
  padding: ${({ noPadding }) => (noPadding ? '0' : theme.spacing.widgetPadding)};
  height: ${({ height }) => height || '450px'};
  background-color: #30303b;
  border-radius: 20px;
  margin: 0 20px 20px 0;

  @media (max-width: ${`${theme.breakpoints.sm[1]}px`}) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    margin: 0 0 20px 0;
    padding: ${({ noPadding }) => (noPadding ? '0' : theme.spacing.mobileWidgetPadding)};
  }
`;

const ExpandedBackgroundOverlay = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.25);
  transition: ${theme.animation.defaultTransition}s ease;
  will-change: auto;
`;

const ExpandedCard = styled.div`
  z-index: 4;
  border-radius: 20px;
  background-color: #30303b;
  position: fixed;
  transition: ${theme.animation.defaultTransition}s ease;
  will-change: auto;
`;

const ExpandedCardContentContainer = styled(Flex).attrs({
  expand: true,
})`
  padding: ${theme.spacing.widgetPadding};
  position: relative;
  height: 100%;
  transition: ${theme.animation.defaultTransition}s ease;

  @media (max-width: ${`${theme.breakpoints.sm[1]}px`}) {
    padding: ${theme.spacing.mobileWidgetPadding};
  }
`;

const ExpandedCardContent = styled(Flex).attrs({
  expand: true,
})`
  height: 100%;
  animation: ${FadeIn} 1s ease;
`;

interface WidgetCardProps {
  expanded?: boolean;
  expandedContent?: React.ReactNode;
  children: React.ReactNode;
  noPadding?: boolean;
  height?: string;
  width: string;
  setExpanded?(expanded: boolean): void;
}

export default function WidgetCard(props: WidgetCardProps) {
  const [completedTransition, setCompletedTransition] = useState<boolean>(false);
  const [cardTransitionStyles, setCardTransitionStyles] = useState({});
  const cardRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  const transitionTimeout = {
    appear: theme.animation.defaultTransition * 100,
  };

  const closeExpandedCard = () => {
    if (props.setExpanded) {
      props.setExpanded(false);
    }
  };

  useEffect(() => {
    if (!props.expanded) {
      setCompletedTransition(false);
    }
  }, [props.expanded]);

  useEffect(() => {
    if (cardRef.current) {
      const dimensions = cardRef.current.getBoundingClientRect();
      const matchDimensions = {
        top: `${dimensions.top}px`,
        left: `${dimensions.left}px`,
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      };

      const transitionStyles = {
        entering: {
          opacity: 1,
          ...matchDimensions,
        },
        entered: {
          opacity: 1,
          top: '20px',
          left: '20px',
          width: 'calc(100vw - 40px)',
          height: 'calc(100vh - 40px)',
        },
        exiting: {
          opacity: 0,
          ...matchDimensions,
        },
        exited: {
          opacity: 0,
          visibility: 'hidden',
          ...matchDimensions,
        },
      };
      setCardTransitionStyles(transitionStyles);
    }
  }, [windowSize, props.expanded, cardRef.current]);

  return (
    <>
      {props.expandedContent && (
        <>
          <Transition in={props.expanded} timeout={transitionTimeout}>
            {state => (
              <ExpandedBackgroundOverlay style={{ ...FadeInOutTransition[state] }} onClick={closeExpandedCard} />
            )}
          </Transition>

          <Transition in={props.expanded} timeout={transitionTimeout}>
            {state => (
              <ExpandedCard style={{ ...cardTransitionStyles[state] }}>
                {props.expanded && (
                  <ExpandedCardContentContainer
                    onTransitionEnd={() => {
                      setCompletedTransition(true);
                    }}
                  >
                    {props.setExpanded && (
                      <Close onClick={closeExpandedCard}>
                        <CloseIcon />
                      </Close>
                    )}
                    {completedTransition && <ExpandedCardContent>{props.expandedContent}</ExpandedCardContent>}
                  </ExpandedCardContentContainer>
                )}
              </ExpandedCard>
            )}
          </Transition>
        </>
      )}
      <WidgetCardContainer height={props.height} width={props.width} ref={cardRef} noPadding={props.noPadding}>
        {props.children}
      </WidgetCardContainer>
    </>
  );
}
