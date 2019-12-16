import { fetchTrades, storeFetchedTrades } from './actions'

async function fetchAllTrades(store) {
  try {
    const [tradesResponse, swapsResponse] = await Promise.all([
      fetch('https://maker-stats.production.airswap.io/trades?days=30'),
      fetch('https://maker-stats.production.airswap.io/swaps?days=30'),
    ])
    const [trades, swaps] = await Promise.all([tradesResponse.json(), swapsResponse.json()])
    store.dispatch(storeFetchedTrades(trades.concat(swaps)))
  } catch (err) {
    // Add retry count
    store.dispatch(fetchTrades())
  }
}

export default function tradesMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FETCH_TRADES':
        fetchAllTrades(store)
        next(action)
        break
      default:
        next(action)
    }
  }
}
