import React, { useEffect, useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'

import theme from '../../app/theme'
import Flex from '../../components/Flex'
import { ReactComponent as CloseIcon } from '../../static/close-icon.svg'
import { FadeIn, FadeInOutTransition } from '../../utils/animations'

interface ContainerProps {
  width: string
}

const Close = styled(Flex)`
  position: absolute;
  top: 40px;
  right: 40px;
  cursor: pointer;

  svg {
    width: 15px;
    height: 15px;

    path {
      stroke: ${theme.palette.primaryColor};
    }
  }
`

export const WidgetCardContainer = styled(Flex)<ContainerProps>`
  flex: auto;
  min-width: ${({ width }) => width};
  max-width: 100%;
  height: 450px;
  background-color: #30303b;
  border-radius: 20px;
  padding: 40px;
  margin: 0 20px 20px 0;

  @media (max-width: ${`${theme.breakpoints.sm[1]}px`}) {
    width: 100%;
    min-width: 100%;
    margin: 0 0 20px 0;
  }
`

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
`

const ExpandedCard = styled.div`
  z-index: 2;
  border-radius: 20px;
  background-color: #30303b;
  position: fixed;
  transition: ${theme.animation.defaultTransition}s ease;
  will-change: auto;
`

const ExpandedCardContent = styled(Flex).attrs({
  expand: true,
})`
  padding: 40px;
  position: relative;
  height: 100%;
  transition: ${theme.animation.defaultTransition}s ease;
  animation: ${FadeIn} 2s ease;
`

export const GroupedWidgetContainer = styled(Flex)<ContainerProps>`
  flex: auto;
  min-width: ${({ width }) => width};
  max-width: 100%;
  height: 450px;
  margin: 0 20px 20px 0;

  @media (max-width: ${`${theme.breakpoints.sm[1]}px`}) {
    width: 100%;
    min-width: 100%;
    margin: 0 0 20px 0;
  }
`

const GroupedWidgetCard = styled(Flex).attrs({ expand: true, direction: 'column' })`
  background-color: #30303b;
  padding: 40px;
  border-radius: 20px;

  ${({ height }) =>
    height
      ? `
    height: ${height}px;
    flex-shrink: 0;
    margin-bottom: 20px;
  `
      : `
    height: 100%;
  `}
`

interface BaseWidgetCardProps {
  expanded?: boolean
  expandedContent?: React.ReactNode
  children: React.ReactNode
  setExpanded?(expanded: boolean): void
}

interface WidgetCardProps extends BaseWidgetCardProps {
  grouped?: false
  width: string
}

interface GroupedWidgetCardProps extends BaseWidgetCardProps {
  height?: string
  grouped: true
}

type Props = WidgetCardProps | GroupedWidgetCardProps

export default function WidgetCard(props: Props) {
  const [cardTransitionStyles, setCardTransitionStyles] = useState({})
  const cardRef = useRef<HTMLDivElement>(null)

  const transitionTimeout = {
    appear: theme.animation.defaultTransition * 100,
  }

  const closeExpandedCard = () => {
    if (props.setExpanded) {
      props.setExpanded(false)
    }
  }

  useEffect(() => {
    if (cardRef.current) {
      const dimensions = cardRef.current.getBoundingClientRect()
      const matchDimensions = {
        top: `${dimensions.top}px`,
        left: `${dimensions.left}px`,
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }

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
      }
      setCardTransitionStyles(transitionStyles)
    }
  }, [props.expanded, cardRef.current])

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
                  <ExpandedCardContent>
                    {props.setExpanded && (
                      <Close onClick={closeExpandedCard}>
                        <CloseIcon />
                      </Close>
                    )}
                    {props.expandedContent}
                  </ExpandedCardContent>
                )}
              </ExpandedCard>
            )}
          </Transition>
        </>
      )}
      {props.grouped ? (
        <GroupedWidgetCard height={props.height} ref={cardRef}>
          {props.children}
        </GroupedWidgetCard>
      ) : (
        <WidgetCardContainer width={props.width} ref={cardRef}>
          {props.children}
        </WidgetCardContainer>
      )}
    </>
  )
}
