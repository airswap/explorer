import styled from 'styled-components';

import { H4 } from '../components/Typography';

export const WidgetTitle = styled(H4).attrs({ expand: true, textAlign: 'left' })`
  color: white;
  font-weight: ${({ theme }) => theme.text.fontWeight.medium};
`;
