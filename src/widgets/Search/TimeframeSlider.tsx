import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { QueryContext } from '../../app/context/QueryContext';
import Slider from '../../components/Slider';
import { SliderContainer, SliderLabel, SliderLabelContainer } from './styles';

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
      {/* <SearchLabelContainer>
        <SearchLabel>
          <FormattedMessage defaultMessage="Filter by time" />
        </SearchLabel>
      </SearchLabelContainer> */}
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
