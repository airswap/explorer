import { selectors as swapSelectors } from 'airswap.js/src/swap/redux/';
import _fp from 'lodash/fp';
import { connect } from 'react-redux';

import { SwapEvent } from '../../types/Swap';

interface PassedProps {}

interface ReduxProps {
  trades: SwapEvent[];
}

export type RecentSwapProps = PassedProps & ReduxProps;

const mapStateToProps = (state, ownProps: PassedProps) => {
  const trades = swapSelectors.getFormattedSwapFills(state).filter(({ tokenSymbol }) => !!tokenSymbol);
  const sortedTrades = _fp.sortBy(trade => -1 * trade.timestamp, trades);

  return {
    trades: sortedTrades,
    ...ownProps,
  };
};

const mapDispatchToProps = {};

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Component);
