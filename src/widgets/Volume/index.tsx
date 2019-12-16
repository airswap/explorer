import React, { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { QueryContext, TimeframeDaysMap } from '../../app/context/QueryContext'
import { VerticalSpacer } from '../../components/Spacer'
import WithLoading from '../../components/WithLoading'
import { TradeVolumeByDay } from '../../types/Swap'
import { getFormattedNumber } from '../../utils/transformations'
import WidgetCard from '../WidgetComponents/WidgetCard'
import Container, { VolumeWidgetProps } from './Container'
import { VolumeAmount, VolumeFooterContainer, VolumeHeaderContainer, VolumeTitle } from './styles'
import TokenCarousel from './TokenCarousel'
import VolumeChart from './VolumeChart'

function VolumeWidget(props: VolumeWidgetProps) {
  const [tradeVolume, setTradeVolume] = useState<TradeVolumeByDay[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { tokens, timeframe } = useContext(QueryContext)

  const getTotalVolume = () => {
    const totalVolume = tradeVolume.reduce((result, dateVolume) => result + dateVolume.volume, 0)
    return `${getFormattedNumber(totalVolume, 10, 2, true)} ETH`
  }

  // Fetch trades on load
  useEffect(() => {
    props.fetchTrades()
  }, [])

  // Set a minimum of 2 seconds for loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  })

  useEffect(() => {
    const volume = props.getTradeVolumeByDate({ days: TimeframeDaysMap[timeframe], tokens })
    setTradeVolume(volume)
  }, [tokens, timeframe, props.getTradeVolumeByDate])

  return (
    <WidgetCard width="630px" noPadding>
      <WithLoading isLoading={isLoading || !tradeVolume.length}>
        <VolumeHeaderContainer>
          <VolumeTitle>
            <FormattedMessage defaultMessage="Volume" />
          </VolumeTitle>
          <VerticalSpacer units={2} />
          <VolumeAmount>{getTotalVolume()}</VolumeAmount>
        </VolumeHeaderContainer>
        <VolumeChart data={tradeVolume} />
        <VolumeFooterContainer>
          <TokenCarousel timeframe={timeframe} />
        </VolumeFooterContainer>
      </WithLoading>
    </WidgetCard>
  )
}

export default Container(VolumeWidget)
