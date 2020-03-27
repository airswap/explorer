import styled from 'styled-components';

import Flex from '../../components/Flex';
import { H5, H7 } from '../../components/Typography';

export const PeerDistributionWidgetContainer = styled(Flex).attrs({ expand: true, justify: 'space-between' })`
  height: 100%;
`;

export const PieChartHeader = styled(H5)`
  font-weight: ${({ theme }) => theme.text.fontWeight.medium};
  color: white;
`;

export const PieChartSubheader = styled(H7)`
  font-weight: ${({ theme }) => theme.text.fontWeight.thin};
  color: white;
`;
