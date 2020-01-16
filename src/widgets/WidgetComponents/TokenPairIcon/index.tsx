import React, { useMemo } from 'react';
import styled from 'styled-components';

import Flex from '../../../components/Flex';
import Image from '../../../components/Image';
import { TokenMetadata } from '../../../types/Tokens';
import Container, { TokenPairIconProps } from './Container';

const TokenPairIconContainer = styled(Flex).attrs({ align: 'flex-start' })`
  position: relative;
  width: 50px;
  /* height: 30px; */
`;

interface ColorProps {
  color?: string;
}

const BaseTokenIcon = styled(Flex)`
  padding: 3px;
  border-radius: 50%;
  background-color: ${({ color }) => color || '#292937'};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
`;

const SenderTokenIcon = styled(BaseTokenIcon)`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  left: 20px;
`;

const SignerTokenIcon = styled(BaseTokenIcon)`
  width: calc(30px + 4px);
  height: calc(30px + 4px);
  z-index: 1;
  border: 2px solid #30303b;
  box-sizing: border-box;
  margin: -2px;
`;

function TokenPairIcon(props: TokenPairIconProps) {
  const senderToken: TokenMetadata | null = useMemo(() => {
    if (props.tokensByAddress) return props.tokensByAddress[props.senderToken];
    return null;
  }, [props.senderToken, props.tokensByAddress]);

  const signerToken: TokenMetadata | null = useMemo(() => {
    if (props.tokensByAddress) return props.tokensByAddress[props.signerToken];
    return null;
  }, [props.signerToken, props.tokensByAddress]);

  if (!senderToken || !signerToken) {
    return null;
  }

  return (
    <TokenPairIconContainer>
      <SenderTokenIcon color={senderToken.colors ? senderToken.colors[0] : undefined}>
        <Image src={senderToken.airswap_img_url} />
      </SenderTokenIcon>
      <SignerTokenIcon color={signerToken.colors ? signerToken.colors[0] : undefined}>
        <Image src={signerToken.airswap_img_url} />
      </SignerTokenIcon>
    </TokenPairIconContainer>
  );
}

export default Container(TokenPairIcon);
