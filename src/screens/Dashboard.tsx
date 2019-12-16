import React, { useContext } from 'react'

import { QueryContext } from '../app/context/QueryContext'
import NetworkWidget from '../widgets/Network'
import PeerDistributionWidget from '../widgets/PeerDistribution'
import RecentSwapsWidget from '../widgets/RecentSwaps'
import SearchWidget from '../widgets/Search'
import TopTradersWidget from '../widgets/TopTraders'
import VolumeWidget from '../widgets/Volume'
import WidgetGrid from '../widgets/WidgetComponents/WidgetGrid'
import { ScreenContainer } from './styles'

interface DashboardProps {
  temp?: string
}

export default function Dashboard(props: DashboardProps) {
  const { timeframe, tokens } = useContext(QueryContext)

  return (
    <ScreenContainer>
      <WidgetGrid>
        <SearchWidget />
      </WidgetGrid>
      <WidgetGrid>
        <VolumeWidget />
        <TopTradersWidget timeframe={timeframe} tokens={tokens} />
        <PeerDistributionWidget />
        <NetworkWidget />
        <RecentSwapsWidget />
      </WidgetGrid>
    </ScreenContainer>
  )
}
