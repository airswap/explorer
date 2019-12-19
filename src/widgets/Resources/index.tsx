import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Carousel from '../../components/Carousel';
import Flex from '../../components/Flex';
import Link from '../../components/Link';
import { HorizontalSpacer } from '../../components/Spacer';
import { H7 } from '../../components/Typography';
import {
  AIRSWAP_DISCORD_URL,
  AIRSWAP_DOCS_URL,
  AIRSWAP_FAQ_URL,
  AIRSWAP_INSTANT_URL,
  AIRSWAP_TRADER_URL,
  AIRSWAP_TWITTER_URL,
} from '../../constants';
import { WidgetTitle } from '../styles';
import WidgetCard from '../WidgetComponents/WidgetCard';

const LinkContainer = styled(Flex).attrs({ expand: true, direction: 'row' })`
  height: 100%;
`;

const LinkText = styled(H7)`
  color: rgba(255, 255, 255, 0.25);
`;

interface ResourceLinkProps {
  label: string;
  url: string;
}

function ResourceLink(props: ResourceLinkProps) {
  return (
    <Flex align="flex-start">
      <Link url={props.url}>
        <LinkText>{props.label}</LinkText>
      </Link>
    </Flex>
  );
}

export default function Resources() {
  const carouselSettings = {
    className: 'resource-carousel',
    dots: false,
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <WidgetCard width="420px" height="140px">
      <WidgetTitle>
        <FormattedMessage defaultMessage="Resources" />
      </WidgetTitle>
      <LinkContainer>
        <Carousel settings={carouselSettings}>
          <ResourceLink label="Instant" url={AIRSWAP_INSTANT_URL} />
          <ResourceLink label="Trader" url={AIRSWAP_TRADER_URL} />
          <ResourceLink label="FAQ" url={AIRSWAP_FAQ_URL} />
          <ResourceLink label="Docs" url={AIRSWAP_DOCS_URL} />
          <ResourceLink label="Discord" url={AIRSWAP_DISCORD_URL} />
          <ResourceLink label="Twitter" url={AIRSWAP_TWITTER_URL} />
        </Carousel>
      </LinkContainer>
    </WidgetCard>
  );
}
