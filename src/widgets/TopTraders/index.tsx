import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import ArrowButton from '../../components/Button/ArrowButton'
import Flex from '../../components/Flex'
import { VerticalSpacer } from '../../components/Spacer'
import Spinner from '../../components/Spinner'
import Table, { TableRow, TableRowItem } from '../../components/Table'
import { H6 } from '../../components/Typography'
import { WidgetTitle } from '../styles'
import WidgetCard from '../WidgetComponents/WidgetCard'

const TraderImage = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.primaryColor};
`

export default function TopTradersWidget() {
  const [expanded, setExpanded] = useState(false)
  const columns = ['Trader', 'Total Trades', 'Trade Volume']
  const traders = [
    {
      trader: 'a',
      totalTrades: 200,
      volume: '$10,789.55',
    },
    {
      trader: 'b',
      totalTrades: 32,
      volume: '$589.53',
    },
    {
      trader: 'c',
      totalTrades: 14,
      volume: '$102,666.11',
    },
    {
      trader: 'd',
      totalTrades: 32,
      volume: '$589.53',
    },
    {
      trader: 'e',
      totalTrades: 14,
      volume: '$102,666.00',
    },
  ]

  const expandedContent = (
    <>
      <WidgetTitle>
        <FormattedMessage defaultMessage="Top Traders" />
      </WidgetTitle>
      <VerticalSpacer units={6} />
      <Table columns={columns}>
        {traders.map(trader => (
          <TableRow>
            <TableRowItem>
              <TraderImage />
            </TableRowItem>
            <TableRowItem>
              <H6 color="white" opacity={0.5}>
                {trader.totalTrades}
              </H6>
            </TableRowItem>
            <TableRowItem>
              <H6 color="white" opacity={0.75} textAlign="right">
                {trader.volume}
              </H6>
            </TableRowItem>
          </TableRow>
        ))}
      </Table>
    </>
  )

  return (
    <WidgetCard width="315px" expanded={expanded} setExpanded={setExpanded} expandedContent={expandedContent}>
      <Flex expand direction="row" justify="space-between">
        <WidgetTitle>
          <FormattedMessage defaultMessage="Top Traders" />
        </WidgetTitle>
        <ArrowButton text="View All" onClick={() => setExpanded(true)} />
      </Flex>
      <VerticalSpacer units={6} />
      <Table columns={columns}>
        {traders.slice(0, 4).map(trader => (
          <TableRow>
            <TableRowItem>
              <Flex>
                <TraderImage />
              </Flex>
            </TableRowItem>
            <TableRowItem>
              <H6 color="white" opacity={0.5}>
                {trader.totalTrades}
              </H6>
            </TableRowItem>
            <TableRowItem>
              <H6 color="white" opacity={0.75}>
                {trader.volume}
              </H6>
            </TableRowItem>
          </TableRow>
        ))}
      </Table>
    </WidgetCard>
  )
}
