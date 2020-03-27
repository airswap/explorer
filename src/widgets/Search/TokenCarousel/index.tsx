import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { QueryContext } from '../../../app/context/QueryContext';
import Carousel from '../../../components/Carousel';
import Flex from '../../../components/Flex';
import { HorizontalSpacer, VerticalSpacer } from '../../../components/Spacer';
import TokenIcon from '../../../components/TokenIcon';
import { H7 } from '../../../components/Typography';
import { TokenMetadata } from '../../../types/Tokens';
import Container, { TokenCarouselProps, TokenVolume } from './Container';
import {
  CarouselContainer,
  TokenCarouselContainer,
  TokenCarouselItem,
  TokenCarouselLabel,
  TokenCarouselLabelContainer,
} from './styles';

function TokenCarousel(props: TokenCarouselProps) {
  const [tokenVolumes, setTokenVolumes] = useState<TokenVolume[]>(props.tokenVolumes);
  const { tokens, addToken, removeToken } = useContext(QueryContext);

  const carouselSettings = {
    className: 'token-carousel',
    dots: false,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const onTokenClick = (token: TokenMetadata) => {
    if (tokens.indexOf(token.address) !== -1) {
      removeToken(token.address);
    } else {
      addToken(token.address);
    }
  };

  useEffect(() => {
    setTokenVolumes(props.tokenVolumes);
  }, [props.tokenVolumes]);

  return (
    <TokenCarouselContainer>
      <TokenCarouselLabelContainer>
        <TokenCarouselLabel>
          <FormattedMessage defaultMessage="Top Traded Tokens" />
        </TokenCarouselLabel>
      </TokenCarouselLabelContainer>
      <CarouselContainer>
        <Carousel settings={carouselSettings}>
          {tokenVolumes.map(tokenVolume => (
            <div key={tokenVolume.token.address}>
              <TokenCarouselItem onClick={() => onTokenClick(tokenVolume.token)}>
                <TokenIcon symbol={tokenVolume.token.symbol} src={tokenVolume.token.airswap_img_url} size={30} />
                <HorizontalSpacer units={2} />
                <Flex align="flex-start">
                  <H7 color="white">{tokenVolume.token.symbol}</H7>
                  <H7 color="white" weight={200}>
                    {tokenVolume.volume}
                  </H7>
                </Flex>
              </TokenCarouselItem>
            </div>
          ))}
        </Carousel>
      </CarouselContainer>
    </TokenCarouselContainer>
  );
}

export default Container(TokenCarousel);
