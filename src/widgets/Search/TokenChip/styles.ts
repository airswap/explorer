import styled from 'styled-components';

import Flex from '../../../components/Flex';
import { FadeIn } from '../../../utils/animations';

export const ChipContainer = styled(Flex).attrs({ direction: 'row' })`
  padding: 5px;
  background-color: ${({ color, theme }) => color || theme.palette.primaryColor}80;
  border-color: ${({ color, theme }) => color || theme.palette.primaryColor};
  border-width: 1px;
  border-style: solid;
  height: 20px;
  border-radius: 10px;
  margin-right: 5px;
  animation: ${FadeIn} 1s;
`;

export const DismissTokenButton = styled(Flex)`
  cursor: pointer;
  opacity: 0.5;
  transition: ${({ theme }) => theme.animation.defaultTransition}s;

  svg {
    width: 8px;
    height: 8px;

    path {
      stroke: white;
    }
  }

  &:hover {
    opacity: 1;
  }
`;
