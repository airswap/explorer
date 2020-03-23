import styled from 'styled-components';

import Flex from '../components/Flex';

export const AppContainer = styled(Flex)`
  position: relative;
`;

export const AirswapLogoContainer = styled(Flex).attrs({ align: 'flex-start' })`
  width: 100%;
  max-width: 1440px;
  padding: 30px;
  margin: auto;

  svg {
    height: 30px;
  }

  @media (max-width: ${({ theme }) => `${theme.breakpoints.sm[1]}px`}) {
    align-items: center;
  }
`;

export const ContentContainer = styled(Flex)`
  width: 100%;
`;
