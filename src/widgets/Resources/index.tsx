import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import Flex from '../../components/Flex'
import Link from '../../components/Link'
import { HorizontalSpacer } from '../../components/Spacer'
import { H7 } from '../../components/Typography'
import {
  AIRSWAP_DISCORD_URL,
  AIRSWAP_DOCS_URL,
  AIRSWAP_FAQ_URL,
  AIRSWAP_INSTANT_URL,
  AIRSWAP_TRADER_URL,
  AIRSWAP_TWITTER_URL,
} from '../../constants'
import { WidgetTitle } from '../styles'
import WidgetCard from '../WidgetComponents/WidgetCard'

const LinkContainer = styled(Flex).attrs({ expand: true, direction: 'row' })`
  height: 100%;
`

const LinkText = styled(H7)`
  color: rgba(255, 255, 255, 0.25);
`

export default function Resources() {
  return (
    <WidgetCard width="420px" height="150px">
      <WidgetTitle>
        <FormattedMessage defaultMessage="Resources" />
      </WidgetTitle>
      <LinkContainer>
        <Link url={AIRSWAP_INSTANT_URL}>
          <LinkText>
            <FormattedMessage defaultMessage="Instant" />
          </LinkText>
        </Link>
        <HorizontalSpacer units={4} />
        <Link url={AIRSWAP_TRADER_URL}>
          <LinkText>
            <FormattedMessage defaultMessage="Trader" />
          </LinkText>
        </Link>
        <HorizontalSpacer units={4} />
        <Link url={AIRSWAP_FAQ_URL}>
          <LinkText>
            <FormattedMessage defaultMessage="FAQ" />
          </LinkText>
        </Link>
        <HorizontalSpacer units={4} />
        <Link url={AIRSWAP_DOCS_URL}>
          <LinkText>
            <FormattedMessage defaultMessage="Docs" />
          </LinkText>
        </Link>
        <HorizontalSpacer units={4} />
        <Link url={AIRSWAP_DISCORD_URL}>
          <LinkText>
            <FormattedMessage defaultMessage="Discord" />
          </LinkText>
        </Link>
        <HorizontalSpacer units={4} />
        <Link url={AIRSWAP_TWITTER_URL}>
          <LinkText>
            <FormattedMessage defaultMessage="Twitter" />
          </LinkText>
        </Link>
      </LinkContainer>
    </WidgetCard>
  )
}
