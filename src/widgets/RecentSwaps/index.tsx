import { openEtherscanLink } from 'airswap.js/src/utils/etherscan';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import theme from '../../app/theme';
import Flex from '../../components/Flex';
import MediaQuery from '../../components/MediaQuery';
import { HorizontalSpacer, VerticalSpacer } from '../../components/Spacer';
import Tooltip from '../../components/Tooltip';
import { H6, H7, H8 } from '../../components/Typography';
import WithLoading from '../../components/WithLoading';
import { STABLECOIN_SYMBOLS } from '../../constants';
import { ReactComponent as ArrowUpRightIcon } from '../../static/arrow-up-right-icon.svg';
import { ReactComponent as SwapIcon } from '../../static/swap-icon.svg';
import { SwapEvent } from '../../types/Swap';
import { calculateDifferenceInTrade, getFormattedNumber } from '../../utils/transformations';
import { WidgetTitle } from '../styles';
import TokenPairIcon from '../WidgetComponents/TokenPairIcon';
import WidgetCard from '../WidgetComponents/WidgetCard';
import Container, { RecentSwapProps } from './Container';
import {
  EtherscanIcon,
  HeaderContainer,
  HeaderItem,
  ItemContainer,
  SwapList,
  SwapListContainer,
  SwapListItem,
} from './styles';

function RecentSwapsWidget(props: RecentSwapProps) {
  const tableConfig = [
    {
      label: 'Trade',
      width: '10%',
    },
    {
      label: 'Sender Token',
      width: '25%',
    },
    {
      label: '',
      width: '5%',
    },
    {
      label: 'Signer Token',
      width: '25%',
    },
    {
      label: 'Value',
      width: '20%',
    },
    {
      label: 'Time',
      width: '15%',
    },
    {
      label: 'Details',
      width: '10%',
    },
  ];

  const getDisplayAmountFormatted = (amount, symbol) => {
    return `${getFormattedNumber({ num: Number(amount), digits: 6, minDecimals: 0, maxDecimals: 6 })} ${symbol}`;
  };

  const getSwapValue = (swap: SwapEvent) => {
    if (
      swap.makerSymbol === 'ETH' ||
      swap.makerSymbol === 'WETH' ||
      swap.takerSymbol === 'ETH' ||
      swap.takerSymbol === 'WETH'
    ) {
      return `${swap.ethAmount} ETH`;
    }

    if (STABLECOIN_SYMBOLS.indexOf(swap.makerSymbol) !== -1) {
      return `${swap.makerAmountFormatted} ${swap.makerSymbol}`;
    }

    if (STABLECOIN_SYMBOLS.indexOf(swap.takerSymbol) !== -1) {
      return `${swap.takerAmountFormatted} ${swap.takerSymbol}`;
    }

    return 'N/A';
  };

  const getFormattedSwapValue = (swap: SwapEvent) => {
    if (
      swap.makerSymbol === 'ETH' ||
      swap.makerSymbol === 'WETH' ||
      swap.takerSymbol === 'ETH' ||
      swap.takerSymbol === 'WETH'
    ) {
      return `${getFormattedNumber({ num: Number(swap.ethAmount), digits: 6, minDecimals: 0, maxDecimals: 6 })} ETH`;
    }

    if (STABLECOIN_SYMBOLS.indexOf(swap.makerSymbol) !== -1) {
      return `${getFormattedNumber({
        num: Number(swap.makerAmountFormatted),
        digits: 6,
        minDecimals: 0,
        maxDecimals: 6,
      })} ${swap.makerSymbol}`;
    }

    if (STABLECOIN_SYMBOLS.indexOf(swap.takerSymbol) !== -1) {
      return `${getFormattedNumber({
        num: Number(swap.takerAmountFormatted),
        digits: 6,
        minDecimals: 0,
        maxDecimals: 6,
      })} ${swap.takerSymbol}`;
    }

    return 'N/A';
  };

  const getDisplayAmount = (amount, symbol) => {
    return `${amount} ${symbol}`;
  };

  return (
    <WidgetCard width="700px">
      <Flex expand direction="row" justify="space-between">
        <WidgetTitle>
          <FormattedMessage defaultMessage="Recent Swaps" />
        </WidgetTitle>
      </Flex>
      <SwapListContainer>
        <WithLoading isLoading={!props.trades || props.trades.length < 5}>
          <MediaQuery size="sm">
            <VerticalSpacer units={3} />
          </MediaQuery>
          <MediaQuery size="md-up">
            <HeaderContainer>
              {tableConfig.map(config => (
                <HeaderItem width={config.width}>{config.label}</HeaderItem>
              ))}
            </HeaderContainer>
          </MediaQuery>
          <SwapList>
            {props.trades.map(swap => (
              <SwapListItem key={`swap-list-item-${swap.transactionHash}`}>
                <MediaQuery size="sm">
                  <Flex shrink={0} direction="row">
                    <TokenPairIcon senderToken={swap.takerToken} signerToken={swap.makerToken} />
                    <HorizontalSpacer units={2} />
                  </Flex>
                  <Flex expand grow={1} align="flex-start">
                    <H8 color="white" opacity={0.25}>
                      {calculateDifferenceInTrade(swap.timestamp * 1000)}
                    </H8>
                    <VerticalSpacer units={1} />
                    <Flex expand direction="row" justify="space-between">
                      <H8 color="white" opacity={0.75}>
                        {getDisplayAmountFormatted(swap.makerAmountFormatted, swap.makerSymbol)}
                      </H8>
                      <SwapIcon />
                      <H8 color="white" opacity={0.75}>
                        {getDisplayAmountFormatted(swap.takerAmountFormatted, swap.takerSymbol)}
                      </H8>
                    </Flex>
                  </Flex>
                </MediaQuery>
                <MediaQuery size="md-up">
                  <ItemContainer width={tableConfig[0].width}>
                    <Flex>
                      <TokenPairIcon senderToken={swap.takerToken} signerToken={swap.makerToken} />
                    </Flex>
                  </ItemContainer>
                  <ItemContainer width={tableConfig[1].width}>
                    <Tooltip
                      maxWidth={150}
                      tooltipContent={
                        <H7 noWrap color="white">
                          {getDisplayAmount(swap.makerAmountFormatted, swap.makerSymbol)}
                        </H7>
                      }
                    >
                      <H6 color="white" opacity={0.75}>
                        {getDisplayAmountFormatted(swap.makerAmountFormatted, swap.makerSymbol)}
                      </H6>
                    </Tooltip>
                  </ItemContainer>
                  <ItemContainer width={tableConfig[2].width}>
                    <SwapIcon />
                  </ItemContainer>
                  <ItemContainer width={tableConfig[3].width}>
                    <Tooltip
                      maxWidth={150}
                      tooltipContent={
                        <H7 noWrap color="white">
                          {getDisplayAmount(swap.takerAmountFormatted, swap.takerSymbol)}
                        </H7>
                      }
                    >
                      <H6 color="white" opacity={0.75}>
                        {getDisplayAmountFormatted(swap.takerAmountFormatted, swap.takerSymbol)}
                      </H6>
                    </Tooltip>
                  </ItemContainer>
                  <ItemContainer width={tableConfig[4].width}>
                    <Tooltip
                      maxWidth={150}
                      tooltipContent={
                        <H7 noWrap color="white">
                          {getSwapValue(swap)}
                        </H7>
                      }
                    >
                      <H6 color="white" opacity={0.5} weight={theme.text.fontWeight.thin}>
                        {getFormattedSwapValue(swap)}
                      </H6>
                    </Tooltip>
                  </ItemContainer>
                  <ItemContainer width={tableConfig[5].width}>
                    <H6 color="white" opacity={0.5} weight={theme.text.fontWeight.thin}>
                      {calculateDifferenceInTrade(swap.timestamp * 1000)}
                    </H6>
                  </ItemContainer>
                  <ItemContainer width={tableConfig[6].width}>
                    <EtherscanIcon onClick={() => openEtherscanLink(swap.transactionHash, 'tx')}>
                      <ArrowUpRightIcon />
                    </EtherscanIcon>
                  </ItemContainer>
                </MediaQuery>
              </SwapListItem>
            ))}
          </SwapList>
        </WithLoading>
      </SwapListContainer>
    </WidgetCard>
  );
}

export default Container(RecentSwapsWidget);
