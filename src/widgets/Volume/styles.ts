import styled from 'styled-components';

import Flex from '../../components/Flex';
import { H2, H4, H8 } from '../../components/Typography';

export const VolumeTitle = styled(H4).attrs({ textAlign: 'left' })`
  color: ${({ theme }) => theme.palette.primaryColor};
  line-height: ${({ theme }) => theme.text.fontSize.h4};
`;

export const VolumeSubtitle = styled(H8)`
  color: ${({ theme }) => theme.palette.primaryColor};
`;

export const VolumeAmount = styled(H2).attrs({ expand: true, textAlign: 'left' })`
  color: white;
`;

export const VolumeHeaderContainer = styled(Flex).attrs({ expand: true, align: 'flex-start' })`
  flex-shrink: 0;
  padding: ${({ theme }) => theme.spacing.widgetPadding};
  padding-bottom: 15px;

  @media (max-width: ${({ theme }) => `${theme.breakpoints.sm[1]}px`}) {
    padding: ${({ theme }) => theme.spacing.mobileWidgetPadding};
    padding-bottom: 15px;
  }
`;

export const VolumeFooterContainer = styled(Flex).attrs({ expand: true })`
  flex-shrink: 0;
  padding: 0 ${({ theme }) => theme.spacing.widgetPadding};
  padding-top: 15px;
  padding-bottom: 30px;

  @media (max-width: ${({ theme }) => `${theme.breakpoints.sm[1]}px`}) {
    padding: 0 ${({ theme }) => theme.spacing.mobileWidgetPadding};
    padding-top: 15px;
    padding-bottom: 30px;
  }
`;

export const VolumeWidgetContainer = styled(Flex)`
  width: 100%;
  height: 100%;
`;
