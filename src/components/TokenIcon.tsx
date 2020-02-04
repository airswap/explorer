import React from 'react';
import styled from 'styled-components';

import Flex from './Flex';
import { BaseText } from './Typography';

interface SizeProps {
  size: number;
}

const TokenIconContainer = styled(Flex)<SizeProps>`
  border-radius: 50%;
  overflow: hidden;
  width: ${({ size }) => size || 20}px;
  height: ${({ size }) => size || 20}px;
  max-width: 100%;
  max-height: 100%;
`;

const TokenImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UnknownTokenIcon = styled(Flex).attrs({
  align: 'center',
  justify: 'center',
})`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.primaryColor};
`;

const UnknownTokenIconText = styled(BaseText)<SizeProps>`
  color: white;
  font-size: ${({ size }) => size * 0.6}px;
  font-weight: 600;
`;

interface TokenIconProps {
  src?: string;
  symbol: string;
  size: number;
}

export default function TokenIcon(props: TokenIconProps) {
  return (
    <TokenIconContainer size={props.size}>
      {props.src ? (
        <TokenImage src={props.src} />
      ) : (
        <UnknownTokenIcon>
          <UnknownTokenIconText size={props.size}>{props.symbol ? props.symbol.charAt(0) : 'T'}</UnknownTokenIconText>
        </UnknownTokenIcon>
      )}
    </TokenIconContainer>
  );
}
