import React, { useEffect, useState } from 'react'

import WithLoading from '../../components/WithLoading'
import WidgetCard from '../WidgetComponents/WidgetCard'
import Container, { VolumeWidgetProps } from './Container'
import VolumeChart from './VolumeChart'

function VolumeWidget(props: VolumeWidgetProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const data = [
    {
      date: 'Monday',
      volume: 100,
    },
    {
      date: 'Tuesday',
      volume: 132,
    },
    {
      date: 'Wednesday',
      volume: 30,
    },
    {
      date: 'Thursday',
      volume: 250,
    },
    {
      date: 'Friday',
      volume: 210,
    },
    {
      date: 'Saturday',
      volume: 30,
    },
    {
      date: 'Sunday',
      volume: 41,
    },
  ]

  useEffect(() => {
    props.fetchTrades()
  }, [])

  return (
    <WidgetCard grouped noPadding>
      <WithLoading isLoading={isLoading}>
        <VolumeChart data={data} />
      </WithLoading>
    </WidgetCard>
  )
}

export default Container(VolumeWidget)
