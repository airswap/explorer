const fetchETHPrice = () =>
  window
    .fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
    .then(resp => resp.json())
    .then(resp => {
      const { USD } = resp;
      return Number(USD);
    });

export default function ethPriceMiddleware(store) {
  fetchETHPrice().then(price =>
    store.dispatch({
      type: 'SET_ETH_PRICE',
      price,
    }),
  );
  return next => action => {
    switch (action.type) {
      default:
    }
    return next(action);
  };
}
