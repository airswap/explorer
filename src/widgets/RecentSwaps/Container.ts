import { connect } from 'react-redux';

import { selectors } from '../../state/trades';
import { SwapEvent } from '../../types/Swap';

const { makeGetTradesForDate } = selectors;

interface PassedProps {
  timeframe: number;
}

interface ReduxProps {
  trades: SwapEvent[];
}

export type RecentSwapProps = PassedProps & ReduxProps;

const mapStateToProps = (state, ownProps: PassedProps): PassedProps & ReduxProps => {
  const getTradesForDate = makeGetTradesForDate(state);
  const trades = getTradesForDate(ownProps.timeframe);

  return {
    trades,
    ...ownProps,
  };
};

const mapDispatchToProps = {};

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Component);
