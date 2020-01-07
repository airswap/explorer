import { MAKER_STATS_URL } from 'airswap.js/src/constants';

import { fetchTrades, storeFetchedTrades } from './actions';

async function fetchAllTrades(store) {
  try {
    const [tradesResponse, swapsResponse] = await Promise.all([
      fetch(`${MAKER_STATS_URL}trades?days=30`),
      fetch(`${MAKER_STATS_URL}swaps?days=30`),
    ]);
    const [trades, swaps] = await Promise.all([tradesResponse.json(), swapsResponse.json()]);
    store.dispatch(storeFetchedTrades(trades.concat(swaps)));
  } catch (err) {
    // Add retry count
    store.dispatch(fetchTrades());
  }
}

export default function tradesMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FETCH_TRADES':
        fetchAllTrades(store);
        next(action);
        break;
      default:
        next(action);
    }
  };
}
