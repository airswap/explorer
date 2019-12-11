import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { VerticalSpacer } from '../../components/Spacer'
import WithLoading from '../../components/WithLoading'
import WidgetCard from '../WidgetComponents/WidgetCard'
import Container, { VolumeWidgetProps } from './Container'
import { VolumeAmount, VolumeContentContainer, VolumeTitle } from './styles'
import TokenCarousel from './TokenCarousel'
import VolumeChart from './VolumeChart'

function VolumeWidget(props: VolumeWidgetProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<any>()

  useEffect(() => {
    props.fetchTrades()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
      const tempData = [
        {
          date: 'Monday',
          volume: 100,
        },
        {
          date: 'Monday',
          volume: 120,
        },
        {
          date: 'Tuesday',
          volume: 132,
        },
        {
          date: 'Tuesday',
          volume: 90,
        },
        {
          date: 'Wednesday',
          volume: 30,
        },
        {
          date: 'Wednesday',
          volume: 150,
        },
        {
          date: 'Thursday',
          volume: 250,
        },
        {
          date: 'Thursday',
          volume: 220,
        },
        {
          date: 'Friday',
          volume: 210,
        },
        {
          date: 'Friday',
          volume: 160,
        },
        {
          date: 'Saturday',
          volume: 30,
        },
        {
          date: 'Saturday',
          volume: 35,
        },
        {
          date: 'Sunday',
          volume: 41,
        },
        {
          date: 'Sunday',
          volume: 50,
        },
      ]
      setData(tempData)
    }, 2000)
  })

  return (
    <WidgetCard width="630px" noPadding>
      <WithLoading isLoading={isLoading}>
        <VolumeContentContainer>
          <VolumeTitle>
            <FormattedMessage defaultMessage="Volume" />
          </VolumeTitle>
          <VerticalSpacer units={2} />
          <VolumeAmount>
            <FormattedMessage defaultMessage="3214.56 ETH" />
          </VolumeAmount>
        </VolumeContentContainer>
        <VolumeChart data={data} />
        <VolumeContentContainer>
          <TokenCarousel />
        </VolumeContentContainer>
      </WithLoading>
    </WidgetCard>
  )
}

export default Container(VolumeWidget)
