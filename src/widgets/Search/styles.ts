import styled from 'styled-components';

import Flex from '../../components/Flex';
import { H8 } from '../../components/Typography';

export const SearchLabel = styled(H8)`
  color: rgba(255, 255, 255, 0.25);
`;

export const SearchLabelContainer = styled(Flex).attrs({ direction: 'row', justify: 'space-between' })`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: calc(100% + 5px);
`;
