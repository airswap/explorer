import React from 'react'

import Flex from '../components/Flex'
import PeerDistributionWidget from '../widgets/PeerDistribution'
import RecentSwapsWidget from '../widgets/RecentSwaps'
import SearchWidget from '../widgets/Search'
import TopTradersWidget from '../widgets/TopTraders'
import VolumeWidget from '../widgets/Volume'
import WidgetCard from '../widgets/WidgetComponents/WidgetCard'
import WidgetGrid from '../widgets/WidgetComponents/WidgetGrid'
import { ScreenContainer } from './styles'

interface DashboardProps {
  temp?: string
}

export default function Dashboard(props: DashboardProps) {
  return (
    <ScreenContainer>
      <Flex expand align="flex-start">
        <SearchWidget />
      </Flex>
      <WidgetGrid>
        <VolumeWidget />
        <TopTradersWidget />
        <PeerDistributionWidget />
        <WidgetCard width="580px">
          <div />
        </WidgetCard>
        <RecentSwapsWidget />
      </WidgetGrid>
    </ScreenContainer>
  )
}
