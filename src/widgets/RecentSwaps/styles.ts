import styled from 'styled-components';

import Flex from '../../components/Flex';
import { H8 } from '../../components/Typography';

export const HeaderContainer = styled(Flex).attrs({ direction: 'row', expand: true })`
  height: 50px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
`;

interface ListItemProps {
  width?: string;
}

export const HeaderItem = styled(H8)<ListItemProps>`
  color: rgba(255, 255, 255, 0.25);
  width: ${({ width }) => width};
`;

export const ItemContainer = styled(Flex)<ListItemProps>`
  width: ${({ width }) => width};
`;

export const EtherscanIcon = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;

    path {
      stroke: ${({ theme }) => theme.palette.primaryColor};
    }
  }
`;

export const SwapListContainer = styled(Flex).attrs({ expand: true })`
  overflow: auto;
  flex: 1;
`;

export const SwapList = styled(Flex).attrs({ expand: true })`
  height: 100%;
  overflow-y: auto;
`;

export const SwapListItem = styled(Flex).attrs({ expand: true, direction: 'row' })`
  padding: 15px 0;
`;
