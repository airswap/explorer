import { openEtherscanLink } from 'airswap.js/src/utils/etherscan';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Flex from '../../components/Flex';
import Image from '../../components/Image';
import { VerticalSpacer } from '../../components/Spacer';
import Table, { TableRow, TableRowItem } from '../../components/Table';
import { H6 } from '../../components/Typography';
import WithLoading from '../../components/WithLoading';
import Trader1Image from '../../static/trader-1.png';
import Trader2Image from '../../static/trader-2.png';
import Trader3Image from '../../static/trader-3.png';
import Trader4Image from '../../static/trader-4.png';
import Trader5Image from '../../static/trader-5.png';
import { WidgetTitle } from '../styles';
import WidgetCard from '../WidgetComponents/WidgetCard';
import Container, { TopTradersWidgetProps } from './Container';

const TraderImageContainer = styled(Flex)`
  cursor: pointer;
  transition: ${({ theme }) => theme.animation.defaultTransition}s;

  &:hover {
    transform: scale(0.9);
  }
`;

function TopTradersWidget(props: TopTradersWidgetProps) {
  const columns = ['Trader', 'Total Trades', 'Trade Volume'];
  const traderImages = [Trader1Image, Trader2Image, Trader3Image, Trader4Image, Trader5Image];

  return (
    <WidgetCard width="315px">
      <WithLoading isLoading={!props.tradeVolumeByTrader || !props.tradeVolumeByTrader.length}>
        <Flex expand direction="row" justify="space-between">
          <WidgetTitle>
            <FormattedMessage defaultMessage="Top Traders" />
          </WidgetTitle>
        </Flex>
        <VerticalSpacer units={6} />
        <Table columns={columns}>
          {props.tradeVolumeByTrader.slice(1, 5).map((trader, index) => (
            <TableRow fadeIn index={index} key={trader.address}>
              <TableRowItem>
                <TraderImageContainer onClick={() => openEtherscanLink(trader.address, 'address')}>
                  <Image src={traderImages[index]} circle width={30} height={30} />
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
  );
}

export default Container(TopTradersWidget);
