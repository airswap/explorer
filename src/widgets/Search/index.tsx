import React, { useContext } from 'react'
import styled from 'styled-components'

import { QueryContext, Timeframe, TimeframeDisplayMap } from '../../app/context/QueryContext'
import Dropdown from '../../components/Dropdown'
import Flex from '../../components/Flex'
import { HorizontalSpacer } from '../../components/Spacer'
import WidgetCard from '../WidgetComponents/WidgetCard'
import SearchInput from './SearchInput'
import TokenChip from './TokenChip'

const SearchWidgetContainer = styled(Flex).attrs({ expand: true, justify: 'center', direction: 'row' })`
  height: 100%;
`

const SearchChipContainer = styled(Flex).attrs({ expand: true, direction: 'row' })`
  position: absolute;
  bottom: 15px;
  left: 40px;
`

const TimeframeDropdownContainer = styled(Flex)`
  width: 95px;
  flex-shrink: 0;
`

export default function SearchWidget() {
  const { removeToken, tokens, timeframe, setTimeframe } = useContext(QueryContext)

  const selectTimeframe = timeframeDisplayValue => {
    setTimeframe(TimeframeDisplayMap[timeframeDisplayValue])
  }

  return (
    <WidgetCard width="50%" height="120px">
      <SearchWidgetContainer>
        <SearchInput />
        <HorizontalSpacer units={2} />
        <TimeframeDropdownContainer>
          <Dropdown
            value={TimeframeDisplayMap[timeframe]}
            options={Object.values(Timeframe).map(value => TimeframeDisplayMap[value])}
            selectValue={selectTimeframe}
          />
        </TimeframeDropdownContainer>
      </SearchWidgetContainer>
      <SearchChipContainer>
        {tokens.map(token => (
          <TokenChip tokenSymbol={token} onDismiss={() => removeToken(token)} />
        ))}
      </SearchChipContainer>
    </WidgetCard>
  )
}
