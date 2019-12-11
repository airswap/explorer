import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import Carousel from '../../../components/Carousel'
import Flex from '../../../components/Flex'
import Image from '../../../components/Image'
import { HorizontalSpacer, VerticalSpacer } from '../../../components/Spacer'
import { H7, H8 } from '../../../components/Typography'
import Container, { TokenCarouselProps } from './Container'

const TokenCarouselContainer = styled.div`
  width: 100%;
  height: 100%;
`

const TokenCarouselItem = styled(Flex).attrs({ direction: 'row' })`
  width: 130px;
`

const Divider = styled.div`
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;
  height: 1px;
`

function TokenCarousel(props: TokenCarouselProps) {
  const carouselSettings = {
    className: 'token-carousel',
    dots: false,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 2,
  }

  return (
    <TokenCarouselContainer>
      <H8 color="rgba(255, 255, 255, 0.25)" expand textAlign="left">
        <FormattedMessage defaultMessage="Top Traded Tokens" />
      </H8>
      <Divider />
      <Carousel settings={carouselSettings}>
        {props.tokenVolumes.map(tokenVolume => (
          <div>
            <TokenCarouselItem>
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
