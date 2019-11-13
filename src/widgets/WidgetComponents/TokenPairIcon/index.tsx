import React, { useMemo } from 'react'
import styled from 'styled-components'

import Flex from '../../../components/Flex'
import Image from '../../../components/Image'
import { TokenMetadata } from '../../../types/Tokens'
import Container, { TokenPairIconProps } from './Container'

const TokenPairIconContainer = styled(Flex).attrs({ align: 'flex-start' })`
  position: relative;
  width: 50px;
  height: 30px;
`

const SenderTokenIcon = styled(Flex)`
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  top: 0;
  left: 20px;
`

const SignerTokenIcon = styled(Flex)`
  z-index: 1;
  background-color: #30303b;
  border: 2px solid #30303b;
  border-radius: 50%;
  overflow: hidden;
  margin: -2px;
`

function TokenPairIcon(props: TokenPairIconProps) {
  const senderToken: TokenMetadata | null = useMemo(() => {
    if (props.tokensByAddress) return props.tokensByAddress[props.senderToken]
    return null
  }, [props.senderToken, props.tokensByAddress])

  const signerToken: TokenMetadata | null = useMemo(() => {
    if (props.tokensByAddress) return props.tokensByAddress[props.signerToken]
    return null
  }, [props.signerToken, props.tokensByAddress])

  if (!senderToken || !signerToken) {
    return null
  }

  return (
    <TokenPairIconContainer>
      <SenderTokenIcon>
        <Image src={senderToken.airswap_img_url} width={30} height={30} />
      </SenderTokenIcon>
      <SignerTokenIcon>
        <Image src={signerToken.airswap_img_url} width={30} height={30} />
      </SignerTokenIcon>
    </TokenPairIconContainer>
  )
}

export default Container(TokenPairIcon)
