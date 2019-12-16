import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import Flex from '../../components/Flex'
import { H4 } from '../../components/Typography'
import WidgetCard from '../WidgetComponents/WidgetCard'
import NetworkGraph from './NetworkGraph'

const TitleContainer = styled(Flex)`
  z-index: 2;
  position: absolute;
  top: 40px;
  left: 40px;
`

export default function Network() {
  return (
    <WidgetCard width="580px" noPadding>
      <TitleContainer>
        <H4 color="white" textAlign="left">
          <FormattedMessage defaultMessage="Network" />
        </H4>
      </TitleContainer>
      <NetworkGraph />
    </WidgetCard>
  )
}
