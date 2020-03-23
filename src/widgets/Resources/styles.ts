import styled from 'styled-components';

import Flex from '../../components/Flex';
import { H4, H7 } from '../../components/Typography';

export const LinkContainer = styled(Flex).attrs({ expand: true, direction: 'row' })`
  height: 100%;
`;

export const LinkText = styled(H7)`
  color: rgba(255, 255, 255, 0.25);
`;

export const ResourcesTitle = styled(H4)`
  color: white;
  position: absolute;
  top: 20px;
  left: ${({ theme }) => theme.spacing.widgetPadding};

  @media (max-width: ${({ theme }) => `${theme.breakpoints.sm[1]}px`}) {
    left: ${({ theme }) => theme.spacing.mobileWidgetPadding};
  }
`;
