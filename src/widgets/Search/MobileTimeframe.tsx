import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { QueryContext } from '../../app/context/QueryContext';
import Flex from '../../components/Flex';
import { HorizontalSpacer } from '../../components/Spacer';
import { TimeframeOption } from './styles';

export default function MobileTimeframe() {
  const { timeframe, setTimeframe } = useContext(QueryContext);

  return (
    <Flex direction="row">
      <TimeframeOption selected={timeframe === 7} onClick={() => setTimeframe(7)}>
        <FormattedMessage defaultMessage="1w" />
      </TimeframeOption>
      <HorizontalSpacer units={2} />
      <TimeframeOption selected={timeframe === 14} onClick={() => setTimeframe(14)}>
        <FormattedMessage defaultMessage="2w" />
      </TimeframeOption>
      <HorizontalSpacer units={2} />
      <TimeframeOption selected={timeframe === 30} onClick={() => setTimeframe(30)}>
        <FormattedMessage defaultMessage="1m" />
      </TimeframeOption>
    </Flex>
  );
}
