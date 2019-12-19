import React, { useContext } from 'react';
import styled from 'styled-components';

import { QueryContext, TimeframeDisplayMap } from '../../app/context/QueryContext';
import Flex from '../../components/Flex';
import MediaQuery from '../../components/MediaQuery';
import WidgetCard from '../WidgetComponents/WidgetCard';
import MobileTimeframe from './MobileTimeframe';
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

  @media (max-width: ${({ theme }) => `${theme.breakpoints.sm[1]}px`}) {
    margin: 0 15px;
  }
`;

const MobileTimeframeContainer = styled(Flex)`
  position: absolute;
  right: 40px;
  top: 30px;
`;

export default function SearchWidget() {
  const { removeToken, tokens } = useContext(QueryContext);

  return (
    <WidgetCard width="880px" height="140px">
      <SearchWidgetContainer>
        <MediaQuery size="sm">
          <SearchInput />
          <MobileTimeframeContainer>
            <MobileTimeframe />
          </MobileTimeframeContainer>
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
        {tokens.map(token => (
          <TokenChip key={token} tokenSymbol={token} onDismiss={() => removeToken(token)} />
        ))}
      </SearchChipContainer>
    </WidgetCard>
  );
}
