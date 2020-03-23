import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { QueryContext } from '../../../app/context/QueryContext';
import Carousel from '../../../components/Carousel';
import Flex from '../../../components/Flex';
import { HorizontalSpacer, VerticalSpacer } from '../../../components/Spacer';
import TokenIcon from '../../../components/TokenIcon';
import { H7, H8 } from '../../../components/Typography';
import { TokenMetadata } from '../../../types/Tokens';
import Container, { TokenCarouselProps, TokenVolume } from './Container';
import { Divider, TokenCarouselContainer, TokenCarouselItem } from './styles';

function TokenCarousel(props: TokenCarouselProps) {
  const [tokenVolumes, setTokenVolumes] = useState<TokenVolume[]>(props.tokenVolumes);
  const { tokens, addToken, removeToken } = useContext(QueryContext);

  const carouselSettings = {
    className: 'token-carousel',
    dots: false,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
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
    if (tokens && tokens.length) {
      // filter
      const filteredTokenVolumes = props.tokenVolumes.filter(
        tokenVolume => tokens.indexOf(tokenVolume.token.address) !== -1,
      );
      setTokenVolumes(filteredTokenVolumes);
    } else {
      setTokenVolumes(props.tokenVolumes);
    }
  }, [tokens, props.tokenVolumes]);

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
              <TokenIcon symbol={tokenVolume.token.symbol} src={tokenVolume.token.airswap_img_url} size={30} />
              <HorizontalSpacer units={3} />
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
  );
}

export default Container(TokenCarousel);
