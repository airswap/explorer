import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import theme from '../../app/theme'
import ArrowButton from '../../components/Button/ArrowButton'
import Flex from '../../components/Flex'
import { VerticalSpacer } from '../../components/Spacer'
import Table, { TableRow, TableRowItem } from '../../components/Table'
import { H6 } from '../../components/Typography'
import { ReactComponent as ArrowUpRightIcon } from '../../static/arrow-up-right-icon.svg'
import { ReactComponent as SwapIcon } from '../../static/swap-icon.svg'
import { WidgetTitle } from '../styles'
import TokenPairIcon from '../WidgetComponents/TokenPairIcon'
import WidgetCard from '../WidgetComponents/WidgetCard'

const EtherscanIcon = styled(Flex)`
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;

    path {
      stroke: ${theme.palette.primaryColor};
    }
  }
`

export default function SwapsWidget() {
  const [expanded, setExpanded] = useState(false)
  const columns = ['Trade', 'Sender Token', '', 'Signer Token', 'Value', 'Time', 'Details']
  const swaps = [
    {
      senderToken: 'AST',
      senderAmount: 100,
      signerToken: 'WETH',
      signerAmount: 0.5,
      value: '$0.18',
      time: '2 min ago',
    },
    {
      senderToken: 'DAI',
      senderAmount: 100,
      signerToken: 'AST',
      signerAmount: 0.5,
      value: '$0.18',
      time: '2 min ago',
    },
    {
      senderToken: 'WETH',
      senderAmount: 100,
      signerToken: 'DAI',
      signerAmount: 0.5,
      value: '$0.18',
      time: '2 min ago',
    },
    {
      senderToken: 'AST',
      senderAmount: 100,
      signerToken: 'DAI',
      signerAmount: 0.5,
      value: '$0.18',
      time: '2 min ago',
    },
  ]

  const getDisplayAmount = (amount, symbol) => {
    return `${amount} ${symbol}`
  }

  return (
    <WidgetCard width="455px" expanded={expanded} setExpanded={setExpanded} expandedContent={<div />}>
      <Flex expand direction="row" justify="space-between">
        <WidgetTitle>
          <FormattedMessage defaultMessage="Recent Swaps" />
        </WidgetTitle>
        <ArrowButton text="View All" onClick={() => setExpanded(true)} />
      </Flex>
      <VerticalSpacer units={6} />
      <Table columns={columns}>
        {swaps.slice(0, 4).map(swap => (
          <TableRow>
            <TableRowItem>
              <Flex>
                <TokenPairIcon senderToken={swap.senderToken} signerToken={swap.signerToken} />
              </Flex>
            </TableRowItem>
            <TableRowItem>
              <H6 color="white" opacity={0.75}>
                {getDisplayAmount(swap.senderAmount, swap.senderToken)}
              </H6>
            </TableRowItem>
            <TableRowItem>
              <SwapIcon />
            </TableRowItem>
            <TableRowItem>
              <H6 color="white" opacity={0.75}>
                {getDisplayAmount(swap.signerAmount, swap.signerToken)}
              </H6>
            </TableRowItem>
            <TableRowItem>
              <H6 color="white" opacity={0.5} weight={theme.text.fontWeight.thin}>
                {swap.value}
              </H6>
            </TableRowItem>
            <TableRowItem>
              <H6 color="white" opacity={0.5} weight={theme.text.fontWeight.thin}>
                {swap.time}
              </H6>
            </TableRowItem>
            <TableRowItem>
              <EtherscanIcon>
                <ArrowUpRightIcon />
              </EtherscanIcon>
            </TableRowItem>
          </TableRow>
        ))}
      </Table>
    </WidgetCard>
  )
}
