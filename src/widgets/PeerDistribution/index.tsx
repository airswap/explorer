import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import theme from '../../app/theme';
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
  font-weight: ${theme.text.fontWeight.medium};
  color: white;
`;

const PieChartSubheader = styled(H7)`
  font-weight: ${theme.text.fontWeight.thin};
  color: white;
`;

function PeerDistributionWidget(props: PeerDistributionWidgetProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <WidgetCard width="315px" expanded={expanded} setExpanded={setExpanded} expandedContent={<div />}>
      <PeerDistributionWidgetContainer>
        <WidgetTitle>
          <FormattedMessage defaultMessage="Integrators" />
        </WidgetTitle>
        <Flex expand justify="center">
          <PieChart strokeWidth={10} size={150} data={props.volumeDistributionBySource} colors={theme.colors.blue}>
            <PieChartHeader>{props.volumeDistributionBySource.length}</PieChartHeader>
            <VerticalSpacer units={1} />
            <PieChartSubheader>
              <FormattedMessage defaultMessage="Total Integrators" />
            </PieChartSubheader>
          </PieChart>
        </Flex>
        <ChartLegend data={props.volumeDistributionBySource} colors={theme.colors.blue} />
      </PeerDistributionWidgetContainer>
    </WidgetCard>
  );
}

export default Container(PeerDistributionWidget);
