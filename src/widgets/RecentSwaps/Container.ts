import { connect } from 'react-redux';

import { selectors } from '../../state/trades';
import { SwapEvent } from '../../types/Swap';

const { makeGetTradesByQuery } = selectors;

interface PassedProps {
  timeframe: number;
  tokens?: string[];
}

interface ReduxProps {
  trades: SwapEvent[];
}

export type RecentSwapProps = PassedProps & ReduxProps;

const mapStateToProps = (state, ownProps: PassedProps): PassedProps & ReduxProps => {
  const getTradesByQuery = makeGetTradesByQuery(state);
  const trades = getTradesByQuery({ days: ownProps.timeframe, tokens: ownProps.tokens });

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
