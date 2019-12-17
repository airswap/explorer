import { TRADER_AFFILIATE_ADDRESS } from 'airswap.js/src/constants'
import moment from 'moment'
import { createSelector } from 'reselect'

import { SwapEvent, TradeQuery } from '../../types/Swap'

export const defaultState = {
  trades: [],
}

const trades = (state = defaultState, action) => {
  switch (action.type) {
    case 'STORE_FETCHED_TRADES':
      if (!action.trades) break
      return { ...state, trades: action.trades }
    default:
      return state
  }
}

export default trades

// get trade by timeframe
// get volume by timeframe

const getAllTrades = state => state.trades.trades

const makeGetTradesForDate = createSelector(
  getAllTrades,
  allTrades => days => {
    return allTrades.filter((trade: SwapEvent) => {
      if (trade.timestamp) {
        const timestampDate = moment.unix(trade.timestamp)
        const dayDiff = moment().diff(timestampDate, 'days')

        // Don't show today or days past
        if (dayDiff >= days) {
          return false
        }
        return true
      }
      return false
    })
    //
  },
)

const makeGetTradesByQuery = createSelector(
  getAllTrades,
  allTrades => (query: TradeQuery) => {
    return allTrades.filter((trade: SwapEvent) => {
      // Filter by date
      if (trade.timestamp && query.days) {
        const timestampDate = moment.unix(trade.timestamp)
        const dayDiff = moment().diff(timestampDate, 'days')

        if (dayDiff >= query.days) {
          return false
        }
      }

      // Filter by tokens
      if (query.tokens && query.tokens.length) {
        return query.tokens.indexOf(trade.makerSymbol) !== -1 || query.tokens.indexOf(trade.takerSymbol) !== -1
      }

      return true
    })
  },
)

const makeGetTradeVolumeByDate = createSelector(
  makeGetTradesForDate,
  getTradesForDate => (query: TradeQuery) => {
    const tradesByDay = {}

    const filteredTrades = getTradesForDate(query.days)

    for (let i = 0; i <= query.days; i++) {
      const formattedDate = moment()
        .subtract(i, 'd')
        .format('MMM D, YYYY')
      tradesByDay[formattedDate] = 0
    }

    // Pre-populate tradesByDay
    filteredTrades
      .filter((trade: SwapEvent) => {
        if (!query.tokens || !query.tokens.length) return true
        return query.tokens.indexOf(trade.makerSymbol) !== -1 || query.tokens.indexOf(trade.takerSymbol) !== -1
      })
      .forEach((trade: SwapEvent) => {
        if (trade.timestamp) {
          const timestampDate = moment.unix(trade.timestamp)
          const formattedDate = timestampDate.format('MMM D, YYYY')
          tradesByDay[formattedDate] += trade.ethAmount || 0
        }
      })
    return Object.keys(tradesByDay)
      .map(date => ({ date, volume: tradesByDay[date] }))
      .reverse()
  },
)

const makeGetTradeVolumeByToken = createSelector(
  makeGetTradesForDate,
  getTradesForDate => (days: number) => {
    const tradesByToken = {}
    const filteredTrades = getTradesForDate(days)

    filteredTrades.forEach((trade: SwapEvent) => {
      if (trade.timestamp) {
        if (tradesByToken[trade.makerSymbol]) {
          tradesByToken[trade.makerSymbol] += trade.ethAmount || 0
        } else {
          tradesByToken[trade.makerSymbol] = trade.ethAmount || 0
        }

        if (tradesByToken[trade.takerSymbol]) {
          tradesByToken[trade.takerSymbol] += trade.ethAmount || 0
        } else {
          tradesByToken[trade.takerSymbol] = trade.ethAmount || 0
        }
      }
    })

    return tradesByToken
  },
)

const makeGetTradeVolumeByTrader = createSelector(
  makeGetTradesForDate,
  getTradesForDate => (query: TradeQuery) => {
    const tradeVolumeByTrader = {}
    const filteredTrades = getTradesForDate(query.days)

    filteredTrades
      .filter((trade: SwapEvent) => {
        if (query.tokens && query.tokens.length) {
          return query.tokens.includes(trade.takerSymbol) || query.tokens.includes(trade.makerSymbol)
        }
        return true
      })
      .forEach((trade: SwapEvent) => {
        if (trade.timestamp) {
          if (tradeVolumeByTrader[trade.makerAddress]) {
            tradeVolumeByTrader[trade.makerAddress] = {
              totalTrades: tradeVolumeByTrader[trade.makerAddress].totalTrades + 1,
              volume: tradeVolumeByTrader[trade.makerAddress].volume + trade.ethAmount || 0,
            }
          } else {
            tradeVolumeByTrader[trade.makerAddress] = {
              totalTrades: 1,
              volume: trade.ethAmount || 0,
            }
          }

          if (tradeVolumeByTrader[trade.takerAddress]) {
            tradeVolumeByTrader[trade.takerAddress] = {
              totalTrades: tradeVolumeByTrader[trade.takerAddress].totalTrades + 1,
              volume: tradeVolumeByTrader[trade.takerAddress].volume + trade.ethAmount || 0,
            }
          } else {
            tradeVolumeByTrader[trade.takerAddress] = {
              totalTrades: 1,
              volume: trade.ethAmount || 0,
            }
          }
        }
      })

    return tradeVolumeByTrader
  },
)

const makeGetVolumeDistributionBySource = createSelector(
  makeGetTradesByQuery,
  getTradesByQuery => (query: TradeQuery) => {
    const volumeDistributionBySource = {}
    const filteredTrades = getTradesByQuery(query)

    filteredTrades.forEach(trade => {
      if (trade.source) {
        if (trade.source === TRADER_AFFILIATE_ADDRESS) {
          volumeDistributionBySource['AirSwap Trader'] =
            (volumeDistributionBySource['AirSwap Trader'] || 0) + trade.ethAmount
        } else {
          volumeDistributionBySource[trade.source] = (volumeDistributionBySource[trade.source] || 0) + trade.ethAmount
        }
      } else {
        volumeDistributionBySource['AirSwap Instant'] =
          (volumeDistributionBySource['AirSwap Instant'] || 0) + trade.ethAmount
      }
    })

    return volumeDistributionBySource
  },
)

// const getAirSwapVolumeByToken = createSelector()

export const selectors = {
  getAllTrades,
  makeGetTradesByQuery,
  makeGetTradeVolumeByDate,
  makeGetTradeVolumeByToken,
  makeGetTradeVolumeByTrader,
  makeGetVolumeDistributionBySource,
}