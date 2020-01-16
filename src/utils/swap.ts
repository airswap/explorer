import { STABLECOIN_SYMBOLS } from '../constants';
import { SwapEvent } from '../types/Swap';
import { getFormattedNumber } from './transformations';

export const getSwapValue = (swap: SwapEvent) => {
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

export const getFormattedSwapValue = (swap: SwapEvent) => {
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
