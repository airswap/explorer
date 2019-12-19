import React, { useContext } from 'react';
import styled from 'styled-components';

import { QueryContext } from '../../app/context/QueryContext';
import Flex from '../../components/Flex';
import WidgetCard from '../WidgetComponents/WidgetCard';
import SearchInput from './SearchInput';
import TimeframeSlider from './TimeframeSlider';
import TokenChip from './TokenChip';

const SearchWidgetContainer = styled(Flex).attrs({ expand: true, justify: 'center', direction: 'row' })`
  height: 100%;
`;

const SearchChipContainer = styled(Flex).attrs({ expand: true, direction: 'row' })`
  position: absolute;
  bottom: 15px;
  left: 40px;
`;

const SearchSection = styled(Flex)`
  width: 50%;
  flex-grow: 1;
`;

const SearchSectionDivider = styled(Flex)`
  height: 100%;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  margin: 0 40px;
`;

export default function SearchWidget() {
  const { removeToken, tokens } = useContext(QueryContext);

  return (
    <WidgetCard width="880px" height="150px">
      <SearchWidgetContainer>
        <SearchSection>
          <SearchInput />
        </SearchSection>
        <SearchSectionDivider />
        <SearchSection>
          <TimeframeSlider />
        </SearchSection>
      </SearchWidgetContainer>
      <SearchChipContainer>
        {tokens.map(token => (
          <TokenChip key={token} tokenSymbol={token} onDismiss={() => removeToken(token)} />
        ))}
      </SearchChipContainer>
    </WidgetCard>
  );
}
