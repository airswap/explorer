import styled from 'styled-components';

import Flex from '../../components/Flex';

export const TitleContainer = styled(Flex).attrs({
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

export const ExpandIconContainer = styled(Flex)`
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const TooltipIconContainer = styled(Flex)`
  opacity: 0.5;

  svg {
    circle,
    path {
      stroke: white;
    }
  }
`;
