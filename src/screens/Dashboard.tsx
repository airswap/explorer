import React from 'react'

import PeerDistributionWidget from '../widgets/PeerDistribution'
import SwapsWidget from '../widgets/Swaps'
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
      <WidgetGrid>
        <VolumeWidget />
        <TopTradersWidget />
        <PeerDistributionWidget />
        <WidgetCard width="580px">
          <div />
        </WidgetCard>
        <SwapsWidget />
        <WidgetCard width="500px">
          <div />
        </WidgetCard>
        <WidgetCard width="450px">
          <div />
        </WidgetCard>
      </WidgetGrid>
    </ScreenContainer>
  )
}
