import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { QueryContext } from '../../app/context/QueryContext';
import Flex from '../../components/Flex';
import { HorizontalSpacer } from '../../components/Spacer';
import { H8 } from '../../components/Typography';

interface TimeframeOptionProps {
  selected: boolean;
}

const TimeframeOption = styled(H8)<TimeframeOptionProps>`
  text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')};
  color: ${({ selected }) => (selected ? 'white' : 'rgba(255, 255, 255, 0.25)')};
  transition: 0.4s;
  cursor: pointer;
`;

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
