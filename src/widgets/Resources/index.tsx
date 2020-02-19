import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Carousel from '../../components/Carousel';
import Flex from '../../components/Flex';
import Link from '../../components/Link';
import { HorizontalSpacer, VerticalSpacer } from '../../components/Spacer';
import { H4, H7 } from '../../components/Typography';
import {
  AIRSWAP_DISCORD_URL,
  AIRSWAP_DOCS_URL,
  AIRSWAP_FAQ_URL,
  AIRSWAP_INSTANT_URL,
  AIRSWAP_TRADER_URL,
} from '../../constants';
import WidgetCard from '../WidgetComponents/WidgetCard';

const LinkContainer = styled(Flex).attrs({ expand: true, direction: 'row' })`
  height: 100%;
`;

const LinkText = styled(H7)`
  color: rgba(255, 255, 255, 0.25);
`;

const ResourcesTitle = styled(H4)`
  color: white;
  position: absolute;
  top: 20px;
  left: ${({ theme }) => theme.spacing.widgetPadding};

  @media (max-width: ${({ theme }) => `${theme.breakpoints.sm[1]}px`}) {
    left: ${({ theme }) => theme.spacing.mobileWidgetPadding};
  }
`;

interface ResourceLinkProps {
  label: string;
  url: string;
}

function ResourceLink(props: ResourceLinkProps) {
  return (
    <Flex align="flex-start" direction="row">
      <Link url={props.url}>
        <LinkText>{props.label}</LinkText>
      </Link>
      <HorizontalSpacer units={4} />
    </Flex>
  );
}

export default function Resources() {
  const carouselSettings = {
    className: 'resource-carousel',
    dots: false,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
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
    <WidgetCard width="420px" height="110px">
      <ResourcesTitle>
        <FormattedMessage defaultMessage="Resources" />
      </ResourcesTitle>
      <VerticalSpacer units={3} />
      <LinkContainer>
        <Carousel settings={carouselSettings}>
          <ResourceLink label="AirSwap" url={AIRSWAP_INSTANT_URL} />
          <ResourceLink label="OTC" url={AIRSWAP_TRADER_URL} />
          <ResourceLink label="Developers" url={AIRSWAP_DOCS_URL} />
          <ResourceLink label="Discord" url={AIRSWAP_DISCORD_URL} />
          <ResourceLink label="FAQ" url={AIRSWAP_FAQ_URL} />
        </Carousel>
      </LinkContainer>
    </WidgetCard>
  );
}
