import moment from 'moment'
import { createSelector } from 'reselect'

import { SwapEvent, TradeQuery, TradeVolumeByToken } from '../../types/Swap'

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

const makeGetTradeVolumeByDate = createSelector(
  getAllTrades,
  allTrades => (query: TradeQuery) => {
    const tradesByDay = {}

    for (let i = 0; i <= query.days; i++) {
      const formattedDate = moment()
        .subtract(i, 'd')
        .format('MMM D, YYYY')
      tradesByDay[formattedDate] = 0
    }

    // Pre-populate tradesByDay
    allTrades
      .filter((trade: SwapEvent) => {
        if (!query.tokens || !query.tokens.length) return true
        return query.tokens.indexOf(trade.makerSymbol) !== -1 || query.tokens.indexOf(trade.takerSymbol) !== -1
      })
      .forEach((trade: SwapEvent) => {
        if (trade.timestamp) {
          const timestampDate = moment.unix(trade.timestamp)
          const formattedDate = timestampDate.format('MMM D, YYYY')
          const dayDiff = moment().diff(timestampDate, 'days')

          // Don't show today or days past
          if (dayDiff >= query.days) {
            return
          }

          tradesByDay[formattedDate] += trade.ethAmount || 0
        }
      })
    return Object.keys(tradesByDay)
      .map(date => ({ date, volume: tradesByDay[date] }))
      .reverse()
  },
)

const makeGetTradeVolumeByToken = createSelector(
  getAllTrades,
  allTrades => (days: number) => {
    const tradesByToken = {}

    allTrades.forEach((trade: SwapEvent) => {
      if (trade.timestamp) {
        const timestampDate = moment.unix(trade.timestamp)
        const dayDiff = moment().diff(timestampDate, 'days')

        // Don't show today or days past
        if (dayDiff >= days) {
          return
        }

        if (tradesByToken[trade.makerSymbol]) {
          tradesByToken[trade.makerSymbol] += trade.ethAmount
        } else {
          tradesByToken[trade.makerSymbol] = trade.ethAmount
        }

        if (tradesByToken[trade.takerSymbol]) {
          tradesByToken[trade.takerSymbol] += trade.ethAmount
        } else {
          tradesByToken[trade.takerSymbol] = trade.ethAmount
        }
      }
    })

    return tradesByToken
  },
)

// const getAirSwapVolumeByToken = createSelector()

export const selectors = {
  getAllTrades,
  makeGetTradeVolumeByDate,
  makeGetTradeVolumeByToken,
}
