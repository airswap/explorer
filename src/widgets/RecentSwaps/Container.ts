import { selectors as swapSelectors } from 'airswap.js/src/swap/redux/';
import _ from 'lodash';
import _fp from 'lodash/fp';
import { connect } from 'react-redux';

import { SwapEvent } from '../../types/Swap';

interface PassedProps {
  timeframe: number;
}

interface ReduxProps {
  trades: SwapEvent[];
}

export type RecentSwapProps = PassedProps & ReduxProps;

const mapStateToProps = (state, ownProps: PassedProps): PassedProps & ReduxProps => {
  const trades = swapSelectors.getFormattedSwapFills(state).filter(({ tokenSymbol }) => !!tokenSymbol);
  const sortedTrades = _fp.sortBy(trade => -1 * trade.timestamp, trades);

  const ts = Math.round(new Date().getTime() / 1000);
  const timeStamp24Hour = ts - 24 * 3600 * ownProps.timeframe;
  const [filteredTrades] = _.partition(sortedTrades, t => t.timestamp > timeStamp24Hour);

  return {
    trades: filteredTrades,
    ...ownProps,
  };
};

const mapDispatchToProps = {};

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Component);
