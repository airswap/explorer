import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Flex from '../../components/Flex';
import { HorizontalSpacer } from '../../components/Spacer';
import Tooltip from '../../components/Tooltip';
import { H4, H8 } from '../../components/Typography';
import { ReactComponent as ExpandIcon } from '../../static/expand-icon.svg';
import { ReactComponent as TooltipIcon } from '../../static/tooltip-icon.svg';
import WidgetCard from '../WidgetComponents/WidgetCard';
import NetworkGraph from './NetworkGraph';
import { ExpandIconContainer, TitleContainer, TooltipIconContainer } from './styles';

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
            maxWidth={450}
            tooltipContent={
              <H8 expand textAlign="left" color="white">
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
