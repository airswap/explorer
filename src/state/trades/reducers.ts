import { createSelector } from 'reselect'

export const defaultState = {
  trades: [],
}

const trades = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCHED_TRADES':
      if (!action.trades) break
      return { ...state, trades: action.trades }
    default:
      return state
  }
}

export default trades

// get trade by timeframe
// get volume by timeframe

const getAllTrades = state => state.trades

const getAirSwapVolume = createSelector(
  getAllTrades,
  allTrades => days => {
    //
  },
)

// const getAirSwapVolumeByToken = createSelector()
