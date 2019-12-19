import React, { useContext } from 'react'

import { QueryContext } from '../app/context/QueryContext'
import NetworkWidget from '../widgets/Network'
import PeerDistributionWidget from '../widgets/PeerDistribution'
import RecentSwapsWidget from '../widgets/RecentSwaps'
import ResourcesWidget from '../widgets/Resources'
import SearchWidget from '../widgets/Search'
import TopTradersWidget from '../widgets/TopTraders'
import VolumeWidget from '../widgets/Volume'
import WidgetGrid from '../widgets/WidgetComponents/WidgetGrid'
import { ScreenContainer } from './styles'

export default function Dashboard() {
  const { timeframe, tokens } = useContext(QueryContext)

  return (
    <ScreenContainer>
      <WidgetGrid>
        <SearchWidget />
        <ResourcesWidget />
      </WidgetGrid>
      <WidgetGrid>
        <VolumeWidget />
        <TopTradersWidget timeframe={timeframe} tokens={tokens} />
        <PeerDistributionWidget timeframe={timeframe} tokens={tokens} />
        <NetworkWidget />
        <RecentSwapsWidget />
      </WidgetGrid>
    </ScreenContainer>
  )
}
