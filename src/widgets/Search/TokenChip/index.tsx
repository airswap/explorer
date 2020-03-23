import React from 'react';

import theme from '../../../app/theme';
import { HorizontalSpacer } from '../../../components/Spacer';
import TokenIcon from '../../../components/TokenIcon';
import { H8 } from '../../../components/Typography';
import { ReactComponent as CloseIcon } from '../../../static/close-icon.svg';
import Container, { TokenChipProps } from './Container';
import { ChipContainer, DismissTokenButton } from './styles';

function TokenChip(props: TokenChipProps) {
  if (!props.token) return null;

  return (
    <ChipContainer color={props.token.colors ? props.token.colors[0] : theme.palette.primaryColor}>
      <TokenIcon symbol={props.token.symbol} src={props.token.airswap_img_url || props.token.cmc_img_url} size={14} />
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
