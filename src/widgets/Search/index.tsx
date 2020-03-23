import React, { useContext } from 'react';

import { QueryContext } from '../../app/context/QueryContext';
import MediaQuery from '../../components/MediaQuery';
import WidgetCard from '../WidgetComponents/WidgetCard';
import SearchInput from './SearchInput';
import { SearchChipContainer, SearchSection, SearchSectionDivider, SearchWidgetContainer } from './styles';
import TimeframeSlider from './TimeframeSlider';
import TokenChip from './TokenChip';

export default function SearchWidget() {
  const { removeToken, tokens } = useContext(QueryContext);

  return (
    <WidgetCard width="880px" height="110px">
      <SearchWidgetContainer>
        <MediaQuery size="sm">
          <SearchInput />
        </MediaQuery>
        <MediaQuery size="md-up">
          <SearchSection>
            <SearchInput />
          </SearchSection>
          <SearchSectionDivider />
          <SearchSection>
            <TimeframeSlider />
          </SearchSection>
        </MediaQuery>
      </SearchWidgetContainer>
      <SearchChipContainer>
        {tokens.map(tokenAddress => (
          <TokenChip key={tokenAddress} tokenAddress={tokenAddress} onDismiss={() => removeToken(tokenAddress)} />
        ))}
      </SearchChipContainer>
    </WidgetCard>
  );
}
