import RCSlider from 'rc-slider'
import React from 'react'
import styled from 'styled-components'

import theme from '../app/theme'
import Flex from './Flex'
import { H8 } from './Typography'

interface HandleContainerProps {
  offset: string
}

const SliderContainer = styled(Flex).attrs({ expand: true })`
  opacity: 0.75;
  transition: 0.4s;

  &:hover,
  &:active,
  &:focus {
    opacity: 1;
  }
`

const HandleContainer = styled(Flex)<HandleContainerProps>`
  position: absolute;
  left: ${({ offset }) => offset};
  top: 50%;
  transform: translateY(-50%);
`

const HandleContent = styled(Flex)`
  position: relative;
  cursor: pointer;
`

const BlueCircle = styled(Flex)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${theme.palette.primaryColor};
`

const SliderLabel = styled(Flex)`
  width: 100px;
  position: absolute;
  left: 0;
  transform: translateX(calc(-50% + 6px));
  bottom: calc(100% + 2px);
`

interface SliderProps {
  min: number
  max: number
  value: number
  getLabelText(value: number): string
  onChange(value: number): void
  onAfterChange?(value: number): void
}

export default function Slider(props: SliderProps) {
  const handle = handleProps => {
    const leftOffset = `calc(${handleProps.offset}% - 6px)`

    return (
      <HandleContainer offset={leftOffset}>
        <HandleContent>
          <SliderLabel>
            <H8 color="white">{props.getLabelText(props.value)}</H8>
          </SliderLabel>
          <BlueCircle />
        </HandleContent>
      </HandleContainer>
    )
  }

  return (
    <SliderContainer>
      <RCSlider
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={props.onChange}
        onAfterChange={props.onAfterChange}
        trackStyle={{ backgroundColor: theme.palette.primaryColor }}
        railStyle={{ backgroundColor: '#3E3E49' }}
        handle={handle}
      />
    </SliderContainer>
  )
}
