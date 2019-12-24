import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
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
  ChartContainer,
  VolumeAmount,
  VolumeFooterContainer,
  VolumeHeaderContainer,
  VolumeTitle,
  VolumeWidgetContainer,
} from './styles';
import TokenCarousel from './TokenCarousel';
import VolumeChart from './VolumeChart';

function VolumeWidget(props: VolumeWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [tradeVolume, setTradeVolume] = useState<TradeVolumeByDay[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { tokens, timeframe } = useContext(QueryContext);

  const getTotalVolume = () => {
    const totalVolume = tradeVolume.reduce((result, dateVolume) => result + dateVolume.volume, 0);
    return `${getFormattedNumber(totalVolume, 10, 2, true)} ETH`;
  };

  const chartHeight = useMemo(() => {
    if (containerRef.current && headerRef.current && footerRef.current) {
      return (
        containerRef.current.getBoundingClientRect().height -
        headerRef.current.getBoundingClientRect().height -
        footerRef.current.getBoundingClientRect().height
      );
    }
  }, [isLoading, containerRef.current, headerRef.current, footerRef.current]);

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
        <VolumeWidgetContainer ref={containerRef}>
          <VolumeHeaderContainer ref={headerRef}>
            <VolumeTitle>
              <FormattedMessage defaultMessage="Volume" />
            </VolumeTitle>
            <VerticalSpacer units={2} />
            <VolumeAmount>{getTotalVolume()}</VolumeAmount>
          </VolumeHeaderContainer>
          <ChartContainer height={chartHeight}>
            <VolumeChart data={tradeVolume} />
          </ChartContainer>
          <VolumeFooterContainer ref={footerRef}>
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
