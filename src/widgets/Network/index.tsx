import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Flex from '../../components/Flex';
import { H4 } from '../../components/Typography';
import { ReactComponent as ExpandIcon } from '../../static/expand-icon.svg';
import WidgetCard from '../WidgetComponents/WidgetCard';
import NetworkGraph from './NetworkGraph';

const TitleContainer = styled(Flex)`
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
      <TitleContainer expand direction="row" justify="space-between">
        <H4 color="white" textAlign="left">
          <FormattedMessage defaultMessage="Network" />
        </H4>
        <ExpandIconContainer onClick={() => setExpanded(true)}>
          <ExpandIcon />
        </ExpandIconContainer>
      </TitleContainer>
      <NetworkGraph />
    </WidgetCard>
  );
}
