import { openEtherscanLink } from 'airswap.js/src/utils/etherscan'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import ArrowButton from '../../components/Button/ArrowButton'
import Flex from '../../components/Flex'
import { VerticalSpacer } from '../../components/Spacer'
import Table, { TableRow, TableRowItem } from '../../components/Table'
import { H6 } from '../../components/Typography'
import WithLoading from '../../components/WithLoading'
import { ReactComponent as Trader1Image } from '../../static/trader-1.svg'
import { ReactComponent as Trader2Image } from '../../static/trader-2.svg'
import { ReactComponent as Trader3Image } from '../../static/trader-3.svg'
import { ReactComponent as Trader4Image } from '../../static/trader-4.svg'
import { WidgetTitle } from '../styles'
import WidgetCard from '../WidgetComponents/WidgetCard'
import Container, { TopTradersWidgetProps } from './Container'

const TraderImageContainer = styled(Flex)`
  cursor: pointer;
`

function TopTradersWidget(props: TopTradersWidgetProps) {
  const [expanded, setExpanded] = useState(false)
  const columns = ['Trader', 'Total Trades', 'Trade Volume']

  const getTraderImage = index => {
    switch (index) {
      case 0:
        return <Trader1Image />
      case 1:
        return <Trader2Image />
      case 2:
        return <Trader3Image />
      case 3:
      default:
        return <Trader4Image />
    }
  }

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
              <TraderImageContainer onClick={() => openEtherscanLink(trader.address, 'address')}>
                {getTraderImage(index)}
              </TraderImageContainer>
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
                <TraderImageContainer onClick={() => openEtherscanLink(trader.address, 'address')}>
                  {getTraderImage(index)}
                </TraderImageContainer>
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
