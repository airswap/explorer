import React, { useContext, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { QueryContext } from '../../app/context/QueryContext';
import Flex from '../../components/Flex';
import Slider from '../../components/Slider';
import { H9 } from '../../components/Typography';
import { SearchLabel } from './styles';

const SliderContainer = styled(Flex).attrs({ expand: true, justify: 'center' })`
  height: 30px;
  position: relative;
`;

const SliderLabelContainer = styled(Flex).attrs({ expand: true, direction: 'row', justify: 'space-between' })`
  position: absolute;
  bottom: -10px;
`;

const SliderLabel = styled(H9)`
  color: rgba(255, 255, 255, 0.25);
`;

export default function TimeframeSlider() {
  const { timeframe, setTimeframe } = useContext(QueryContext);
  const [value, setValue] = useState<number>(timeframe);

  const getLabelText = days => {
    return `${days} days`;
  };

  const onAfterChange = days => {
    setTimeframe(days);
  };

  useEffect(() => {
    if (value !== timeframe) {
      setValue(timeframe);
    }
  }, [timeframe]);

  return (
    <SliderContainer expand>
      <SearchLabel>
        <FormattedMessage defaultMessage="Filter by time" />
      </SearchLabel>
      <Slider
        min={7}
        max={30}
        onChange={setValue}
        onAfterChange={onAfterChange}
        value={value}
        getLabelText={getLabelText}
      />
      <SliderLabelContainer>
        <SliderLabel>
          <FormattedMessage defaultMessage="7 Days" />
        </SliderLabel>
        <SliderLabel>
          <FormattedMessage defaultMessage="30 Days" />
        </SliderLabel>
      </SliderLabelContainer>
    </SliderContainer>
  );
}
