import styled from 'styled-components';

import Flex from '../../../components/Flex';

export const TokenCarouselContainer = styled.div`
  max-height: 150px;
  width: 100%;
  height: 100%;
`;

export const TokenCarouselItem = styled(Flex).attrs({ direction: 'row' })`
  width: 140px;
  height: 60px;
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
