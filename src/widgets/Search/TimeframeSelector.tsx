import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { QueryContext } from '../../app/context/QueryContext';
import Flex from '../../components/Flex';
import MediaQuery from '../../components/MediaQuery';
import { TimeframeOption } from './styles';

export default function TimeframeSelector() {
  const { timeframe, setTimeframe } = useContext(QueryContext);

  return (
    <Flex direction="row">
      <MediaQuery size="sm">
        <TimeframeOption selected={timeframe === 7} onClick={() => setTimeframe(7)}>
          <FormattedMessage defaultMessage="7d" />
        </TimeframeOption>
      </MediaQuery>
      <MediaQuery size="md-up">
        <TimeframeOption selected={timeframe === 7} onClick={() => setTimeframe(7)}>
          <FormattedMessage defaultMessage="7 Days" />
        </TimeframeOption>
      </MediaQuery>
    </Flex>
  );
}
