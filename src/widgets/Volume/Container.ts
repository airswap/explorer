import { connect } from 'react-redux';

import { selectors as tradeSelectors } from '../../state/trades';
import { TradeQuery, TradeVolumeByDay } from '../../types/Swap';

const { makeGetTradeVolumeByDate } = tradeSelectors;

interface PassedProps {}

interface ReduxProps {
  getTradeVolumeByDate(query?: TradeQuery): TradeVolumeByDay[];
}

export type VolumeWidgetProps = PassedProps & ReduxProps;

const mapStateToProps = (state, ownProps: PassedProps) => {
  return {
    getTradeVolumeByDate: makeGetTradeVolumeByDate(state),
    ...ownProps,
  };
};

const mapDispatchToProps = {};

export default Component => connect(mapStateToProps, mapDispatchToProps)(Component);
