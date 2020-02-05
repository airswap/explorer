import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Flex from '../../components/Flex';
import { HorizontalSpacer } from '../../components/Spacer';
import Tooltip from '../../components/Tooltip';
import { H4, H8 } from '../../components/Typography';
import { ReactComponent as ExpandIcon } from '../../static/expand-icon.svg';
import { ReactComponent as TooltipIcon } from '../../static/tooltip-icon.svg';
import WidgetCard from '../WidgetComponents/WidgetCard';
import NetworkGraph from './NetworkGraph';

const TitleContainer = styled(Flex).attrs({
  expand: true,
  direction: 'row',
  justify: 'space-between',
})`
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  padding: ${({ theme }) => theme.spacing.widgetPadding};

  @media (max-width: ${({ theme }) => `${theme.breakpoints.sm[1]}px`}) {
    padding: ${({ theme }) => theme.spacing.mobileWidgetPadding};
  }
`;

const ExpandIconContainer = styled(Flex)`
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const TooltipIconContainer = styled(Flex)`
  opacity: 0.5;

  svg {
    circle,
    path {
      stroke: white;
    }
  }
`;

export default function Network() {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <WidgetCard
      width="630px"
      noPadding
      expanded={expanded}
      setExpanded={setExpanded}
      expandedContent={<NetworkGraph />}
    >
      <TitleContainer>
        <Flex direction="row">
          <H4 color="white" textAlign="left">
            <FormattedMessage defaultMessage="Network" />
          </H4>
          <HorizontalSpacer units={2} />
          <Tooltip
            maxWidth={600}
            tooltipContent={
              <H8 color="white">
                <FormattedMessage defaultMessage="The network graph visualizes swaps between peers on the AirSwap network. Each node represents a wallet address, while the links between each wallet represent at least a single transaction between the two peers. Pan, zoom, and rotate to see the graph from different angles. Click on a graph node to view the wallet activity through Etherscan." />
              </H8>
            }
          >
            <TooltipIconContainer>
              <TooltipIcon />
            </TooltipIconContainer>
          </Tooltip>
        </Flex>
        <ExpandIconContainer onClick={() => setExpanded(true)}>
          <ExpandIcon />
        </ExpandIconContainer>
      </TitleContainer>
      <NetworkGraph />
    </WidgetCard>
  );
}
