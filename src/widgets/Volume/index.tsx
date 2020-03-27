import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { QueryContext } from '../../app/context/QueryContext';
import Flex from '../../components/Flex';
import MediaQuery from '../../components/MediaQuery';
import { HorizontalSpacer, VerticalSpacer } from '../../components/Spacer';
import WithLoading from '../../components/WithLoading';
import { TradeVolumeByDay } from '../../types/Swap';
import { getFormattedNumber } from '../../utils/transformations';
import WidgetCard from '../WidgetComponents/WidgetCard';
import Container, { VolumeWidgetProps } from './Container';
import {
  VolumeAmount,
  VolumeFooterContainer,
  VolumeHeaderContainer,
  VolumeSubtitle,
  VolumeTitle,
  VolumeWidgetContainer,
} from './styles';
import VolumeChart from './VolumeChart';

function VolumeWidget(props: VolumeWidgetProps) {
  const [tradeVolume, setTradeVolume] = useState<TradeVolumeByDay[]>([]);
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

  useEffect(() => {
    const volume = props.getTradeVolumeByDate({ days: timeframe, tokens });
    setTradeVolume(volume);
  }, [tokens, timeframe, props.getTradeVolumeByDate]);

  return (
    <WidgetCard width="630px" noPadding>
      <WithLoading isLoading={!tradeVolume || !tradeVolume.length}>
        <VolumeWidgetContainer>
          <VolumeHeaderContainer>
            <Flex direction="row" align="flex-end">
              <VolumeTitle>
                <FormattedMessage defaultMessage="Volume" />
              </VolumeTitle>
              <HorizontalSpacer units={1} />
              <VolumeSubtitle>
                <FormattedMessage defaultMessage="({days} Days)" values={{ days: timeframe }} />
              </VolumeSubtitle>
            </Flex>
            <VerticalSpacer units={2} />
            <VolumeAmount>{getTotalVolume()}</VolumeAmount>
          </VolumeHeaderContainer>
          <VolumeChart data={tradeVolume} />
        </VolumeWidgetContainer>
      </WithLoading>
    </WidgetCard>
  );
}

export default Container(VolumeWidget);
