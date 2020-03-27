import { selectors as swapSelectors } from 'airswap.js/src/swap/redux/';
import _ from 'lodash';
import _fp from 'lodash/fp';
import moment from 'moment';
import { createSelector } from 'reselect';

import { SwapSourceMap } from '../../constants';
import { SwapEvent, TradeQuery } from '../../types/Swap';

const { getFormattedSwapFills } = swapSelectors;

const makeGetTradesForDate = createSelector(
  getFormattedSwapFills,
  (allTrades: SwapEvent[]) => days => {
    const trades = allTrades.filter(({ tokenSymbol }) => !!tokenSymbol);
    const sortedTrades = _fp.sortBy(trade => -1 * trade.timestamp, trades);
    const ts = Math.round(new Date().getTime() / 1000);
    const timeStamp24Hour = ts - 24 * 3600 * days;
    const [filteredTrades] = _.partition(sortedTrades, t => t.timestamp > timeStamp24Hour);
    return filteredTrades;
  },
);

const makeGetTradesByQuery = createSelector(
  getFormattedSwapFills,
  (allTrades: SwapEvent[]) => (query: TradeQuery) => {
    return allTrades
      .filter(({ tokenSymbol }) => !!tokenSymbol)
      .filter((trade: SwapEvent) => {
        // Filter by date
        if (trade.timestamp && query.days) {
          const timestampDate = moment.unix(trade.timestamp);
          const dayDiff = moment().diff(timestampDate, 'days');

          if (dayDiff >= query.days) {
            return false;
          }
        }

        // Filter by tokens
        if (query.tokens && query.tokens.length) {
          return query.tokens.indexOf(trade.makerToken) !== -1 || query.tokens.indexOf(trade.takerToken) !== -1;
        }

        return true;
      });
  },
);

const makeGetTradeVolumeByDate = createSelector(
  makeGetTradesForDate,
  getTradesForDate => (query: TradeQuery) => {
    const tradesByDay = {};

    const filteredTrades = getTradesForDate(query.days);

    if (!filteredTrades || !filteredTrades.length) return [];

    for (let i = 0; i <= query.days; i++) {
      const formattedDate = moment()
        .subtract(i, 'd')
        .format('MMM D, YYYY');
      tradesByDay[formattedDate] = 0;
    }

    // Pre-populate tradesByDay
    filteredTrades
      .filter((trade: SwapEvent) => {
        if (!query.tokens || !query.tokens.length) return true;
        return query.tokens.indexOf(trade.makerToken) !== -1 || query.tokens.indexOf(trade.takerToken) !== -1;
      })
      .forEach((trade: SwapEvent) => {
        if (trade.timestamp) {
          const timestampDate = moment.unix(trade.timestamp);
          const formattedDate = timestampDate.format('MMM D, YYYY');
          tradesByDay[formattedDate] += trade.ethAmount || 0;
        }
      });
    return Object.keys(tradesByDay)
      .map(date => ({ date, volume: tradesByDay[date] }))
      .reverse();
  },
);

const makeGetTradeVolumeByToken = createSelector(
  makeGetTradesForDate,
  getTradesForDate => (days: number) => {
    const tradesByToken = {};
    const filteredTrades = getTradesForDate(days);

    filteredTrades.forEach((trade: SwapEvent) => {
      if (trade.timestamp) {
        if (tradesByToken[trade.makerToken]) {
          tradesByToken[trade.makerToken] += trade.ethAmount || 0;
        } else {
          tradesByToken[trade.makerToken] = trade.ethAmount || 0;
        }

        if (tradesByToken[trade.takerToken]) {
          tradesByToken[trade.takerToken] += trade.ethAmount || 0;
        } else {
          tradesByToken[trade.takerToken] = trade.ethAmount || 0;
        }
      }
    });

    return tradesByToken;
  },
);

const makeGetTradeVolumeByTrader = createSelector(
  makeGetTradesForDate,
  getTradesForDate => (query: TradeQuery) => {
    const tradeVolumeByTrader = {};
    const filteredTrades = getTradesForDate(query.days);

    filteredTrades
      .filter((trade: SwapEvent) => {
        if (query.tokens && query.tokens.length) {
          return query.tokens.indexOf(trade.takerToken) !== -1 || query.tokens.indexOf(trade.makerToken) !== -1;
        }
        return true;
      })
      .forEach((trade: SwapEvent) => {
        if (trade.timestamp) {
          if (tradeVolumeByTrader[trade.makerAddress]) {
            tradeVolumeByTrader[trade.makerAddress] = {
              totalTrades: tradeVolumeByTrader[trade.makerAddress].totalTrades + 1,
              volume: tradeVolumeByTrader[trade.makerAddress].volume + trade.ethAmount || 0,
            };
          } else {
            tradeVolumeByTrader[trade.makerAddress] = {
              totalTrades: 1,
              volume: trade.ethAmount || 0,
            };
          }

          if (tradeVolumeByTrader[trade.takerAddress]) {
            tradeVolumeByTrader[trade.takerAddress] = {
              totalTrades: tradeVolumeByTrader[trade.takerAddress].totalTrades + 1,
              volume: tradeVolumeByTrader[trade.takerAddress].volume + trade.ethAmount || 0,
            };
          } else {
            tradeVolumeByTrader[trade.takerAddress] = {
              totalTrades: 1,
              volume: trade.ethAmount || 0,
            };
          }
        }
      });

    return tradeVolumeByTrader;
  },
);

const makeGetVolumeDistributionBySource = createSelector(
  makeGetTradesByQuery,
  getTradesByQuery => (query: TradeQuery) => {
    const volumeDistributionBySource = {};
    const filteredTrades = getTradesByQuery(query);

    filteredTrades.forEach(trade => {
      const source = SwapSourceMap[trade.affiliateWallet] || SwapSourceMap[trade.takerAddress] || 'AirSwap';
      volumeDistributionBySource[source] = (volumeDistributionBySource[source] || 0) + trade.ethAmount;
    });

    return volumeDistributionBySource;
  },
);

// const getAirSwapVolumeByToken = createSelector()

export const selectors = {
  makeGetTradesForDate,
  makeGetTradesByQuery,
  makeGetTradeVolumeByDate,
  makeGetTradeVolumeByToken,
  makeGetTradeVolumeByTrader,
  makeGetVolumeDistributionBySource,
};
