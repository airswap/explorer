export const fetchTrades = () => ({
  type: 'FETCH_TRADES',
})

export const storeFetchedTrades = trades => ({
  type: 'STORE_FETCHED_TRADES',
  trades,
})
