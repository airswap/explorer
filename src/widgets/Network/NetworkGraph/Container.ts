import { connect } from 'react-redux';

import { selectors as tradeSelectors } from '../../../state/trades';
import { SwapEvent, TradeQuery } from '../../../types/Swap';

const { makeGetTradesByQuery } = tradeSelectors;

interface PassedProps {}

interface ReduxProps {
  getTradesByQuery(query: TradeQuery): SwapEvent[];
}

export type NetworkGraphProps = PassedProps & ReduxProps;

const mapStateToProps = (state, ownProps: PassedProps) => {
  return {
    getTradesByQuery: makeGetTradesByQuery(state),
    ...ownProps,
  };
};

const mapDispatchToProps = {};

export default Component => connect(mapStateToProps, mapDispatchToProps)(Component);
