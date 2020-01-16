import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import ChartLegend from '../../components/ChartLegend';
import Flex from '../../components/Flex';
import PieChart from '../../components/PieChart';
import { VerticalSpacer } from '../../components/Spacer';
import { H5, H7 } from '../../components/Typography';
import { WidgetTitle } from '../styles';
import WidgetCard from '../WidgetComponents/WidgetCard';
import Container, { PeerDistributionWidgetProps } from './Container';

const PeerDistributionWidgetContainer = styled(Flex).attrs({ expand: true, justify: 'space-between' })`
  height: 100%;
`;

const PieChartHeader = styled(H5)`
  font-weight: ${({ theme }) => theme.text.fontWeight.medium};
  color: white;
`;

const PieChartSubheader = styled(H7)`
  font-weight: ${({ theme }) => theme.text.fontWeight.thin};
  color: white;
`;

function PeerDistributionWidget(props: PeerDistributionWidgetProps) {
  const [expanded, setExpanded] = useState(false);

  const chartColors = ['#2B71FF', '#304CD2', '#DB6C33', '#C58A80', '#416A75'];

  return (
    <WidgetCard width="315px" expanded={expanded} setExpanded={setExpanded} expandedContent={<div />}>
      <PeerDistributionWidgetContainer>
        <WidgetTitle>
          <FormattedMessage defaultMessage="Integrations" />
        </WidgetTitle>
        <Flex expand justify="center">
          <PieChart strokeWidth={10} size={150} data={props.volumeDistributionBySource} colors={chartColors}>
            <PieChartHeader>{props.volumeDistributionBySource.length}</PieChartHeader>
            <VerticalSpacer units={1} />
            <PieChartSubheader>
              <FormattedMessage defaultMessage="Total Integrators" />
            </PieChartSubheader>
          </PieChart>
        </Flex>
        <ChartLegend data={props.volumeDistributionBySource} colors={chartColors} />
      </PeerDistributionWidgetContainer>
    </WidgetCard>
  );
}

export default Container(PeerDistributionWidget);
