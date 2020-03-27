import React, { useContext } from 'react';

import { QueryContext } from '../../app/context/QueryContext';
import MediaQuery from '../../components/MediaQuery';
import { HorizontalSpacer } from '../../components/Spacer';
import WidgetCard from '../WidgetComponents/WidgetCard';
import SearchInput from './SearchInput';
import { SearchSection, SearchWidgetContainer, SearchWidgetContent } from './styles';
import TokenCarousel from './TokenCarousel';

export default function SearchWidget() {
  const { timeframe } = useContext(QueryContext);

  return (
    <WidgetCard width="1440px" height="110px" noPadding>
      <SearchWidgetContent>
        <SearchWidgetContainer>
          <MediaQuery size="sm">
            <SearchInput />
          </MediaQuery>
          <MediaQuery size="md-up">
            <SearchSection>
              <SearchInput />
            </SearchSection>
          </MediaQuery>
        </SearchWidgetContainer>
        <MediaQuery size="md-up">
          <HorizontalSpacer units={3} />
          <TokenCarousel timeframe={timeframe} />
        </MediaQuery>
      </SearchWidgetContent>
    </WidgetCard>
  );
}
