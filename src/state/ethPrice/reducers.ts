export const defaultState = 1;

const ethPrice = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_ETH_PRICE':
      return action.price;
    default:
      return state;
  }
};

export default ethPrice;

const getEthPrice = state => state.ethPrice;

export const selectors = {
  getEthPrice,
};
