import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import ArrowButton from '../../components/Button/ArrowButton'
import Flex from '../../components/Flex'
import { VerticalSpacer } from '../../components/Spacer'
import Table, { TableRow, TableRowItem } from '../../components/Table'
import { H6 } from '../../components/Typography'
import WithLoading from '../../components/WithLoading'
import { WidgetTitle } from '../styles'
import WidgetCard from '../WidgetComponents/WidgetCard'
import Container, { TopTradersWidgetProps } from './Container'

const TraderImage = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.primaryColor};
`

function TopTradersWidget(props: TopTradersWidgetProps) {
  const [expanded, setExpanded] = useState(false)
  const columns = ['Trader', 'Total Trades', 'Trade Volume']

  const expandedContent = (
    <>
      <WidgetTitle>
        <FormattedMessage defaultMessage="Top Traders" />
      </WidgetTitle>
      <VerticalSpacer units={6} />
      <Table columns={columns}>
        {props.tradeVolumeByTrader.map((trader, index) => (
          <TableRow fadeIn index={index} key={trader.address}>
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
      <WithLoading isLoading={!props.tradeVolumeByTrader || !props.tradeVolumeByTrader.length}>
        <Flex expand direction="row" justify="space-between">
          <WidgetTitle>
            <FormattedMessage defaultMessage="Top Traders" />
          </WidgetTitle>
          <ArrowButton text="View All" onClick={() => setExpanded(true)} />
        </Flex>
        <VerticalSpacer units={6} />
        <Table columns={columns}>
          {props.tradeVolumeByTrader.slice(0, 4).map((trader, index) => (
            <TableRow fadeIn index={index} key={trader.address}>
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
      </WithLoading>
    </WidgetCard>
  )
}

export default Container(TopTradersWidget)
