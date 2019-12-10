import React, { useState } from 'react'
import { Transition } from 'react-transition-group'

import useInterval from '../hooks/useInterval'
import { FadeInOutTransition } from '../utils/animations'
import Flex from './Flex'

interface FadeInProps {
  index: number
  delay?: number
  children: React.ReactNode
}

export default function FadeIn(props: FadeInProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useInterval(() => {
    setIsVisible(true)
  }, (props.index + 1) * (props.delay || 150))

  return (
    <Transition in={isVisible} timeout={0}>
      {state => (
        <Flex expand style={{ ...FadeInOutTransition[state] }}>
          {props.children}
        </Flex>
      )}
    </Transition>
  )
}
