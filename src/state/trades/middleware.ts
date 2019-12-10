import { storeFetchedTrades } from './actions'

async function fetchTrades(store) {
  try {
    const response = await fetch('https://maker-stats.production.airswap.io/trades?days=30')
    const trades = await response.json()
    store.dispatch(storeFetchedTrades(trades))
  } catch (err) {
    // TODO: error handling
    console.log(err)
  }
}

export default function tradesMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FETCH_TRADES':
        fetchTrades(store)
        // fetch trades here
        next(action)
        break
      default:
        next(action)
    }
  }
}
