import React, { useMemo } from 'react'
import styled from 'styled-components'

import Flex from '../../../components/Flex'
import { TokenMetadata } from '../../../types/Tokens'
import Container, { TokenPairIconProps } from './Container'

const TokenPairIconContainer = styled(Flex).attrs({ align: 'flex-start' })`
  position: relative;
  width: 50px;
  height: 30px;
`

const TokenIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: contain;
`

const SignerTokenIcon = styled(TokenIcon)`
  position: absolute;
  top: 0;
  left: 20px;
`

const SenderTokenIcon = styled(TokenIcon)`
  z-index: 1;
  border: 2px solid #30303b;
  margin: -2px;
`

function TokenPairIcon(props: TokenPairIconProps) {
  const senderToken: TokenMetadata | null = useMemo(() => {
    if (props.tokensBySymbol) return props.tokensBySymbol[props.senderToken]
    return null
  }, [props.senderToken, props.tokensBySymbol])

  const signerToken: TokenMetadata | null = useMemo(() => {
    if (props.tokensBySymbol) return props.tokensBySymbol[props.signerToken]
    return null
  }, [props.signerToken, props.tokensBySymbol])

  if (!senderToken || !signerToken) {
    return null
  }

  return (
    <TokenPairIconContainer>
      <SignerTokenIcon src={signerToken.airswap_img_url} />
      <SenderTokenIcon src={senderToken.airswap_img_url} />
    </TokenPairIconContainer>
  )
}

export default Container(TokenPairIcon)
