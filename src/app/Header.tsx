import React from 'react';

import Flex from '../components/Flex';
import Link from '../components/Link';
import MediaQuery from '../components/MediaQuery';
import NetworkSwitch from '../components/NetworkSwitch';
import { HorizontalSpacer } from '../components/Spacer';
import {
  AIRSWAP_DISCORD_URL,
  AIRSWAP_DOCS_URL,
  AIRSWAP_FAQ_URL,
  AIRSWAP_INSTANT_URL,
  AIRSWAP_TRADER_URL,
} from '../constants';
import { ReactComponent as AirswapLogo } from '../static/airswap-logo.svg';
import { AirswapLogoContainer, HeaderContainer, ResourceContainer, ResourceLinkText } from './styles';

interface ResourceLinkProps {
  label: string;
  url: string;
}

function ResourceLink(props: ResourceLinkProps) {
  return (
    <Flex align="flex-start" direction="row">
      <Link url={props.url}>
        <ResourceLinkText>{props.label}</ResourceLinkText>
      </Link>
      <HorizontalSpacer units={4} />
    </Flex>
  );
}

export default function Header() {
  return (
    <HeaderContainer>
      <AirswapLogoContainer>
        <AirswapLogo height={30} />
      </AirswapLogoContainer>
      <ResourceContainer>
        <MediaQuery size="md-up">
          <ResourceLink label="AirSwap" url={AIRSWAP_INSTANT_URL} />
          <ResourceLink label="OTC" url={AIRSWAP_TRADER_URL} />
          <ResourceLink label="Developers" url={AIRSWAP_DOCS_URL} />
          <ResourceLink label="Discord" url={AIRSWAP_DISCORD_URL} />
          <ResourceLink label="FAQ" url={AIRSWAP_FAQ_URL} />
          <NetworkSwitch />
        </MediaQuery>
      </ResourceContainer>
    </HeaderContainer>
  );
}
