import styled from 'styled-components';

import Flex from '../../components/Flex';
import { H8, H9 } from '../../components/Typography';
import { hexWithOpacity } from '../../utils/style';

export const SearchWidgetContent = styled(Flex).attrs({ expand: true, direction: 'row', justify: 'center' })`
  height: 100%;
  padding: 0 40px;
`;

export const SearchWidgetContainer = styled(Flex).attrs({ expand: true, justify: 'center', direction: 'row' })`
  max-width: 500px;
  height: 100%;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => `${theme.breakpoints.sm[1]}px`}) {
    max-width: 100%;
  }
`;

export const SearchChipContainer = styled(Flex).attrs({ expand: true, direction: 'row' })`
  position: absolute;
  bottom: 10px;
  left: ${({ theme }) => theme.spacing.widgetPadding};

  @media (max-width: ${({ theme }) => `${theme.breakpoints.sm[1]}px`}) {
    left: ${({ theme }) => theme.spacing.mobileWidgetPadding};
  }
`;

export const SearchSection = styled(Flex).attrs({ expand: true })`
  height: 100%;
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
  color: ${({ selected, theme }) => (selected ? theme.palette.primaryColor : 'rgba(255, 255, 255, 0.25)')};
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    color: ${({ selected, theme }) => hexWithOpacity(theme.palette.primaryColor, selected ? 1 : 0.5)};
  }
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

export const TokenCarouselContainer = styled.div`
  width: 100%;
  position: relative;
`;
