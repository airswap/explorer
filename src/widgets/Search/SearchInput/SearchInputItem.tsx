import React from 'react'
import styled from 'styled-components'

import Flex from '../../../components/Flex'
import Image from '../../../components/Image'
import { HorizontalSpacer } from '../../../components/Spacer'
import { H4, H6 } from '../../../components/Typography'

const ItemContainer = styled(Flex).attrs({
  expand: true,
  direction: 'row',
  align: 'center',
  justify: 'flex-start',
})`
  padding: 10px 30px;
  transition: ${({ theme }) => theme.animation.defaultTransition}s;
  cursor: pointer;

  &:hover {
    background-color: #292937;
  }
`

interface SearchInputItemProps {
  image?: string
  title: string
  description?: string
  onClick(): void
}

export default function SearchInputItem(props: SearchInputItemProps) {
  return (
    <ItemContainer onClick={props.onClick}>
      {props.image && (
        <>
          <Flex>
            <Image src={props.image} circle width={25} height={25} />
          </Flex>
          <HorizontalSpacer units={3} />
        </>
      )}
      <H4 color="white">{props.title}</H4>
      <HorizontalSpacer units={1} />
      <H6 color="white">{props.description}</H6>
    </ItemContainer>
  )
}
