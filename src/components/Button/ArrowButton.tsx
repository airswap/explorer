import React from 'react'
import styled from 'styled-components'

import { ReactComponent as ArrowRightIcon } from '../../static/arrow-right-icon.svg'
import Flex from '../Flex'
import { H7 } from '../Typography'

const ButtonText = styled(H7)`
  color: ${({ theme }) => theme.palette.primaryColor};
  font-weight: ${({ theme }) => theme.text.fontWeight.semibold};
  margin-right: 10px;
`

const ViewAllButtonEl = styled.button`
  cursor: pointer;
  flex-shrink: 0;
  border: none;
  outline: none;
  background-color: transparent;
`

const ArrowRight = styled(Flex)`
  svg {
    width: 15px;
    height: 15px;

    path {
      stroke: ${({ theme }) => theme.palette.primaryColor};
    }
  }
`

interface ArrowButtonProps {
  text?: string
  onClick(): void
}

export default function ArrowButton(props: ArrowButtonProps) {
  return (
    <ViewAllButtonEl onClick={props.onClick}>
      <Flex direction="row">
        {props.text && <ButtonText>{props.text}</ButtonText>}
        <ArrowRight>
          <ArrowRightIcon />
        </ArrowRight>
      </Flex>
    </ViewAllButtonEl>
  )
}
