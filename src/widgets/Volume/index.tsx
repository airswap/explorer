import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { QueryContext } from '../../app/context/QueryContext';
import MediaQuery from '../../components/MediaQuery';
import { VerticalSpacer } from '../../components/Spacer';
import WithLoading from '../../components/WithLoading';
import { TradeVolumeByDay } from '../../types/Swap';
import { getFormattedNumber } from '../../utils/transformations';
import WidgetCard from '../WidgetComponents/WidgetCard';
import Container, { VolumeWidgetProps } from './Container';
import {
  VolumeAmount,
  VolumeFooterContainer,
  VolumeHeaderContainer,
  VolumeTitle,
  VolumeWidgetContainer,
} from './styles';
import TokenCarousel from './TokenCarousel';
import VolumeChart from './VolumeChart';

function VolumeWidget(props: VolumeWidgetProps) {
  const [tradeVolume, setTradeVolume] = useState<TradeVolumeByDay[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { tokens, timeframe } = useContext(QueryContext);

  const getTotalVolume = () => {
    const totalVolume = tradeVolume.reduce((result, dateVolume) => result + dateVolume.volume, 0);
    return `${getFormattedNumber({
      num: totalVolume,
      digits: 10,
      minDecimals: 2,
      maxDecimals: 2,
      noEllipsis: true,
    })} ETH`;
  };

  // Fetch trades on load
  useEffect(() => {
    props.fetchTrades();
  }, []);

  // Set a minimum of 2 seconds for loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });

  useEffect(() => {
    const volume = props.getTradeVolumeByDate({ days: timeframe, tokens });
    setTradeVolume(volume);
  }, [tokens, timeframe, props.getTradeVolumeByDate]);

  return (
    <WidgetCard width="630px" noPadding>
      <WithLoading isLoading={isLoading || !tradeVolume.length}>
        <VolumeWidgetContainer>
          <VolumeHeaderContainer>
            <VolumeTitle>
              <FormattedMessage defaultMessage="Volume" />
            </VolumeTitle>
            <VerticalSpacer units={2} />
            <VolumeAmount>{getTotalVolume()}</VolumeAmount>
          </VolumeHeaderContainer>
          <VolumeChart data={tradeVolume} />
          <VolumeFooterContainer>
            <MediaQuery size="md-up">
              <TokenCarousel timeframe={timeframe} />
            </MediaQuery>
          </VolumeFooterContainer>
        </VolumeWidgetContainer>
      </WithLoading>
    </WidgetCard>
  );
}

export default Container(VolumeWidget);
