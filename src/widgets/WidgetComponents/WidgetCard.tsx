import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import Flex from '../../components/Flex'
import { ReactComponent as CloseIcon } from '../../static/close-icon.svg'

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
      stroke: ${({ theme }) => theme.palette.primaryColor};
    }
  }
`

const Container = styled.div<ContainerProps>`
  flex: auto;
  min-width: ${({ width }) => width};
  max-width: 100%;
  height: 450px;
  background-color: #30303b;
  border-radius: 20px;
  padding: 40px;
  margin: 0 20px 20px 0;

  @media (max-width: ${({ theme }) => `${theme.breakpoints.sm[1]}px`}) {
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
  opacity: 0;
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.25);
  transition: ${({ theme }) => theme.animation.defaultTransition}s ease;
  will-change: auto;
`

const ExpandedCard = styled.div`
  z-index: 2;
  border-radius: 20px;
  visibility: hidden;
  background-color: #30303b;
  position: fixed;
  transition: ${({ theme }) => theme.animation.defaultTransition}s ease;
  opacity: 0;
  will-change: auto;
`

const ExpandedCardContent = styled(Flex).attrs({
  expand: true,
})`
  position: relative;
  height: 100%;
`

interface WidgetCardProps {
  expanded?: boolean
  width: string
  expandedContent?: React.ReactNode
  children: React.ReactNode
  setExpanded?(expanded: boolean): void
}

export default function WidgetCard(props: WidgetCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const expandedCardRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const closeExpandedCard = () => {
    if (props.setExpanded) {
      props.setExpanded(false)
    }
  }

  useEffect(() => {
    if (cardRef.current && expandedCardRef.current && overlayRef.current) {
      if (props.expanded) {
        const dimensions = cardRef.current.getBoundingClientRect()
        expandedCardRef.current.style.visibility = 'visible'
        expandedCardRef.current.style.opacity = '1'
        expandedCardRef.current.style.left = `${dimensions.left}px`
        expandedCardRef.current.style.top = `${dimensions.top}px`
        expandedCardRef.current.style.width = `${dimensions.width}px`
        expandedCardRef.current.style.height = `${dimensions.height}px`

        setTimeout(() => {
          if (expandedCardRef.current && overlayRef.current) {
            overlayRef.current.style.opacity = '1'
            overlayRef.current.style.visibility = 'visible'
            expandedCardRef.current.style.left = '20px'
            expandedCardRef.current.style.top = '20px'
            expandedCardRef.current.style.width = 'calc(100vw - 40px)'
            expandedCardRef.current.style.height = 'calc(100vh - 40px)'
          }
        }, 100)
      } else {
        const dimensions = cardRef.current.getBoundingClientRect()
        overlayRef.current.style.opacity = '0'
        overlayRef.current.style.visibility = 'hidden'
        expandedCardRef.current.style.visibility = 'hidden'
        expandedCardRef.current.style.opacity = '0'
        expandedCardRef.current.style.left = `${dimensions.left}px`
        expandedCardRef.current.style.top = `${dimensions.top}px`
        expandedCardRef.current.style.width = `${dimensions.width}px`
        expandedCardRef.current.style.height = `${dimensions.height}px`
      }
    }
  }, [props.expanded])

  return (
    <>
      {props.expandedContent && (
        <>
          <ExpandedBackgroundOverlay ref={overlayRef} onClick={closeExpandedCard} />
          <ExpandedCard ref={expandedCardRef}>
            <ExpandedCardContent>
              {props.setExpanded && (
                <Close onClick={closeExpandedCard}>
                  <CloseIcon />
                </Close>
              )}
              {props.expanded && props.expandedContent}
            </ExpandedCardContent>
          </ExpandedCard>
        </>
      )}
      <Container width={props.width} ref={cardRef}>
        {props.children}
      </Container>
    </>
  )
}
