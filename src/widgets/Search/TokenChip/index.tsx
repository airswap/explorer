import React from 'react';
import styled from 'styled-components';

import theme from '../../../app/theme';
import Flex from '../../../components/Flex';
import Image from '../../../components/Image';
import { HorizontalSpacer } from '../../../components/Spacer';
import { H8 } from '../../../components/Typography';
import { ReactComponent as CloseIcon } from '../../../static/close-icon.svg';
import { FadeIn } from '../../../utils/animations';
import Container, { TokenChipProps } from './Container';

const ChipContainer = styled(Flex).attrs({ direction: 'row' })`
  padding: 5px;
  background-color: ${({ color }) => color || theme.palette.primaryColor}80;
  border-color: ${({ color }) => color || theme.palette.primaryColor};
  border-width: 1px;
  border-style: solid;
  height: 20px;
  border-radius: 10px;
  margin-right: 5px;
  animation: ${FadeIn} 1s;
`;

const DismissTokenButton = styled(Flex)`
  cursor: pointer;
  opacity: 0.5;
  transition: ${theme.animation.defaultTransition}s;

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

function TokenChip(props: TokenChipProps) {
  if (!props.token) return null;

  return (
    <ChipContainer color={props.token.colors ? props.token.colors[0] : theme.palette.primaryColor}>
      <Image src={props.token.airswap_img_url || props.token.cmc_img_url} width={14} height={14} circle />
      <HorizontalSpacer units={1} />
      <H8 color="rgba(255, 255, 255, 0.75)">{props.token.symbol}</H8>
      <HorizontalSpacer units={1} />
      <DismissTokenButton onClick={props.onDismiss}>
        <CloseIcon />
      </DismissTokenButton>
    </ChipContainer>
  );
}

export default Container(TokenChip);
