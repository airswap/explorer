import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import theme from '../../app/theme'
import ChartLegend from '../../components/ChartLegend'
import Flex from '../../components/Flex'
import PieChart from '../../components/PieChart'
import { VerticalSpacer } from '../../components/Spacer'
import { H5, H7 } from '../../components/Typography'
import { WidgetTitle } from '../styles'
import WidgetCard from '../WidgetComponents/WidgetCard'

const PeerDistributionWidgetContainer = styled(Flex).attrs({ expand: true, justify: 'space-between' })`
  height: 100%;
`

const PieChartHeader = styled(H5)`
  font-weight: ${theme.text.fontWeight.medium};
  color: white;
`

const PieChartSubheader = styled(H7)`
  font-weight: ${theme.text.fontWeight.thin};
  color: white;
`

export default function PeerDistributionWidget() {
  const [expanded, setExpanded] = useState(false)

  const tempData = [
    {
      name: 'Makers',
      value: 450,
    },
    {
      name: 'Takers',
      value: 550,
    },
  ]

  return (
    <WidgetCard width="315px" expanded={expanded} setExpanded={setExpanded} expandedContent={<div />}>
      <PeerDistributionWidgetContainer>
        <WidgetTitle>
          <FormattedMessage defaultMessage="Peer Distribution" />
        </WidgetTitle>
        <Flex expand justify="center">
          <PieChart strokeWidth={10} size={150} data={tempData} colors={theme.colors.blue}>
            <PieChartHeader>
              <FormattedMessage defaultMessage="150" />
            </PieChartHeader>
            <VerticalSpacer units={1} />
            <PieChartSubheader>
              <FormattedMessage defaultMessage="Total Peers" />
            </PieChartSubheader>
          </PieChart>
        </Flex>
        <ChartLegend data={tempData} colors={theme.colors.blue} />
      </PeerDistributionWidgetContainer>
    </WidgetCard>
  )
}
