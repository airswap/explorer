import styled from 'styled-components';

import Flex from '../../components/Flex';
import { H2, H4 } from '../../components/Typography';

export const VolumeTitle = styled(H4).attrs({ expand: true, textAlign: 'left' })`
  color: ${({ theme }) => theme.palette.primaryColor};
`;

export const VolumeAmount = styled(H2).attrs({ expand: true, textAlign: 'left' })`
  color: white;
`;

export const VolumeHeaderContainer = styled(Flex).attrs({ expand: true })`
  padding: 40px 40px 15px 40px;
  flex-shrink: 0;
`;

export const VolumeFooterContainer = styled(Flex).attrs({ expand: true })`
  padding: 15px 40px 40px 40px;
  flex-shrink: 0;
`;
