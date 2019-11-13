import { openEtherscanLink } from 'airswap.js/src/utils/etherscan'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import theme from '../../app/theme'
import ArrowButton from '../../components/Button/ArrowButton'
import Flex from '../../components/Flex'
import { VerticalSpacer } from '../../components/Spacer'
import Table, { TableRow, TableRowItem } from '../../components/Table'
import { H6 } from '../../components/Typography'
import WithLoading from '../../components/WithLoading'
import { ReactComponent as ArrowUpRightIcon } from '../../static/arrow-up-right-icon.svg'
import { ReactComponent as SwapIcon } from '../../static/swap-icon.svg'
import { calculateDifferenceInTrade, getFormattedNumber } from '../../utils/transformations'
import { WidgetTitle } from '../styles'
import TokenPairIcon from '../WidgetComponents/TokenPairIcon'
import WidgetCard from '../WidgetComponents/WidgetCard'
import Container, { RecentSwapProps } from './Container'

const EtherscanIcon = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;

    path {
      stroke: ${theme.palette.primaryColor};
    }
  }
`

function RecentSwapsWidget(props: RecentSwapProps) {
  const [expanded, setExpanded] = useState(false)
  const columns = ['Trade', 'Sender Token', '', 'Signer Token', 'Value', 'Time', 'Details']

  const getDisplayAmount = (amount, symbol) => {
    return `${getFormattedNumber(Number(amount), 6, 6)} ${symbol}`
  }

  return (
    <WidgetCard width="700px" expanded={expanded} setExpanded={setExpanded} expandedContent={<div />}>
      <Flex expand direction="row" justify="space-between">
        <WidgetTitle>
          <FormattedMessage defaultMessage="Recent Swaps" />
        </WidgetTitle>
        <ArrowButton text="View All" onClick={() => setExpanded(true)} />
      </Flex>
      <VerticalSpacer units={6} />
      <WithLoading isLoading={!props.trades || props.trades.length < 4}>
        <Table columns={columns}>
          {props.trades.slice(0, 4).map(swap => (
            <TableRow key={swap.transactionHash}>
              <TableRowItem>
                <Flex>
                  <TokenPairIcon senderToken={swap.takerToken} signerToken={swap.makerToken} />
                </Flex>
              </TableRowItem>
              <TableRowItem>
                <H6 color="white" opacity={0.75}>
                  {getDisplayAmount(swap.makerAmountFormatted, swap.makerSymbol)}
                </H6>
              </TableRowItem>
              <TableRowItem>
                <SwapIcon />
              </TableRowItem>
              <TableRowItem>
                <H6 color="white" opacity={0.75}>
                  {getDisplayAmount(swap.takerAmountFormatted, swap.takerSymbol)}
                </H6>
              </TableRowItem>
              <TableRowItem>
                <H6 color="white" opacity={0.5} weight={theme.text.fontWeight.thin}>
                  {getDisplayAmount(swap.ethAmount, 'ETH')}
                </H6>
              </TableRowItem>
              <TableRowItem>
                <H6 color="white" opacity={0.5} weight={theme.text.fontWeight.thin}>
                  {calculateDifferenceInTrade(swap.timestamp * 1000)}
                </H6>
              </TableRowItem>
              <TableRowItem>
                <EtherscanIcon onClick={() => openEtherscanLink(swap.transactionHash, 'tx')}>
                  <ArrowUpRightIcon />
                </EtherscanIcon>
              </TableRowItem>
            </TableRow>
          ))}
        </Table>
      </WithLoading>
    </WidgetCard>
  )
}

export default Container(RecentSwapsWidget)
