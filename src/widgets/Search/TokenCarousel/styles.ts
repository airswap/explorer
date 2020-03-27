import styled from 'styled-components';

import Flex from '../../../components/Flex';
import { H8 } from '../../../components/Typography';

export const TokenCarouselContainer = styled(Flex).attrs({ justify: 'center' })`
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
  overflow-x: auto;
  padding: 25px;
`;

export const CarouselContainer = styled.div`
  max-height: 150px;
  width: 100%;
`;

export const TokenCarouselItem = styled(Flex).attrs({ direction: 'row' })`
  position: relative;
  white-space: nowrap;
  width: 160px;
  height: 50px;
  cursor: pointer;
  opacity: 0.75;
  transition: 0.5s ease;

  &:hover {
    opacity: 1;
  }
`;

export const Divider = styled.div`
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;
  height: 1px;
`;

export const TokenCarouselLabel = styled(H8)`
  color: rgba(255, 255, 255, 0.25);
`;

export const TokenCarouselLabelContainer = styled(Flex).attrs({ direction: 'row', justify: 'space-between' })`
  position: absolute;
  width: 100%;
  left: 25px;
  top: 15px;
`;
