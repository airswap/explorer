import React, { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { QueryContext } from '../../../app/context/QueryContext'
import Carousel from '../../../components/Carousel'
import Flex from '../../../components/Flex'
import Image from '../../../components/Image'
import { HorizontalSpacer, VerticalSpacer } from '../../../components/Spacer'
import { H7, H8 } from '../../../components/Typography'
import { TokenMetadata } from '../../../types/Tokens'
import Container, { TokenCarouselProps, TokenVolume } from './Container'

const TokenCarouselContainer = styled.div`
  width: 100%;
  height: 100%;
`

const TokenCarouselItem = styled(Flex).attrs({ direction: 'row' })`
  width: 140px;
  cursor: pointer;
`

const Divider = styled.div`
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;
  height: 1px;
`

function TokenCarousel(props: TokenCarouselProps) {
  const [tokenVolumes, setTokenVolumes] = useState<TokenVolume[]>(props.tokenVolumes)
  const { tokens, addToken, removeToken } = useContext(QueryContext)

  const carouselSettings = {
    className: 'token-carousel',
    dots: false,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 2,
  }

  const onTokenClick = (token: TokenMetadata) => {
    if (tokens.indexOf(token.symbol) !== -1) {
      removeToken(token.symbol)
    } else {
      addToken(token.symbol)
    }
  }

  useEffect(() => {
    if (tokens && tokens.length) {
      // filter
      const filteredTokenVolumes = props.tokenVolumes.filter(
        tokenVolume => tokens.indexOf(tokenVolume.token.symbol) !== -1,
      )
      setTokenVolumes(filteredTokenVolumes)
    } else {
      setTokenVolumes(props.tokenVolumes)
    }
  }, [tokens, props.tokenVolumes])

  return (
    <TokenCarouselContainer>
      <H8 color="rgba(255, 255, 255, 0.25)" expand textAlign="left">
        {tokens && tokens.length ? (
          <FormattedMessage defaultMessage="Selected Tokens" />
        ) : (
          <FormattedMessage defaultMessage="Top Traded Tokens" />
        )}
      </H8>
      <Divider />
      <Carousel settings={carouselSettings}>
        {tokenVolumes.map(tokenVolume => (
          <div key={tokenVolume.token.address}>
            <TokenCarouselItem onClick={() => onTokenClick(tokenVolume.token)}>
              <Flex>
                <Image
                  circle
                  width={30}
                  height={30}
                  src={tokenVolume.token.airswap_img_url || tokenVolume.token.cmc_img_url}
                />
              </Flex>
              <HorizontalSpacer units={4} />
              <Flex align="flex-start">
                <H7 color="white">{tokenVolume.token.symbol}</H7>
                <VerticalSpacer units={1} />
                <H7 color="white" weight={200}>
                  {tokenVolume.volume}
                </H7>
              </Flex>
            </TokenCarouselItem>
          </div>
        ))}
      </Carousel>
    </TokenCarouselContainer>
  )
}

export default Container(TokenCarousel)
