import styled from 'styled-components';

import Flex from '../../components/Flex';
import { H8, H9 } from '../../components/Typography';

export const SearchLabel = styled(H8)`
  color: rgba(255, 255, 255, 0.25);
`;

export const SearchLabelContainer = styled(Flex).attrs({ direction: 'row', justify: 'space-between' })`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: calc(100% + 5px);
`;

export const SearchWidgetContainer = styled(Flex).attrs({ expand: true, justify: 'center', direction: 'row' })`
  height: 100%;
`;

export const SearchChipContainer = styled(Flex).attrs({ expand: true, direction: 'row' })`
  position: absolute;
  bottom: 10px;
  left: ${({ theme }) => theme.spacing.widgetPadding};

  @media (max-width: ${({ theme }) => `${theme.breakpoints.sm[1]}px`}) {
    left: ${({ theme }) => theme.spacing.mobileWidgetPadding};
  }
`;

export const SearchSection = styled(Flex)`
  width: 50%;
  flex-grow: 1;
`;

export const SearchSectionDivider = styled(Flex)`
  height: 100%;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  margin: 0 ${({ theme }) => theme.spacing.widgetPadding};

  @media (max-width: ${({ theme }) => `${theme.breakpoints.sm[1]}px`}) {
    margin: 0 15px;
  }
`;

interface TimeframeOptionProps {
  selected: boolean;
}

export const TimeframeOption = styled(H8)<TimeframeOptionProps>`
  text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')};
  color: ${({ selected }) => (selected ? 'white' : 'rgba(255, 255, 255, 0.25)')};
  transition: 0.4s;
  cursor: pointer;
`;

export const SliderContainer = styled(Flex).attrs({ expand: true, justify: 'center' })`
  height: 30px;
  position: relative;
`;

export const SliderLabelContainer = styled(Flex).attrs({ expand: true, direction: 'row', justify: 'space-between' })`
  position: absolute;
  bottom: -10px;
`;

export const SliderLabel = styled(H9)`
  color: rgba(255, 255, 255, 0.25);
`;
