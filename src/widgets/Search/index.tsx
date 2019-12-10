import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import { QueryContext } from '../../app/context/QueryContext'
import Flex from '../../components/Flex'
import WidgetCard from '../WidgetComponents/WidgetCard'
import SearchInput from './SearchInput'
import TokenChip from './TokenChip'

const SearchWidgetContainer = styled(Flex).attrs({ expand: true, justify: 'center' })`
  height: 100%;
`

const SearchChipContainer = styled(Flex).attrs({ expand: true, direction: 'row' })`
  position: absolute;
  bottom: 15px;
  left: 40px;
`

export default function SearchWidget() {
  const { removeToken, tokens } = useContext(QueryContext)

  return (
    <WidgetCard grouped height="120px">
      <SearchWidgetContainer>
        <SearchInput />
      </SearchWidgetContainer>
      <SearchChipContainer>
        {tokens.map(token => (
          <TokenChip tokenSymbol={token} onDismiss={() => removeToken(token)} />
        ))}
      </SearchChipContainer>
    </WidgetCard>
  )
}
