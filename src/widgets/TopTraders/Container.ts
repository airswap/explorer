import { connect } from 'react-redux';

import { selectors as tradeSelectors } from '../../state/trades';
import { TradeVolumeByToken } from '../../types/Swap';
import { getFormattedNumber } from '../../utils/transformations';

const { makeGetTradeVolumeByTrader } = tradeSelectors;

export interface TradeVolumeByTrader {
  address: string;
  totalTrades: number;
  volume: string;
}

interface PassedProps {
  timeframe: number;
  tokens?: string[];
}

interface ReduxProps {
  tradeVolumeByTrader: TradeVolumeByTrader[];
  getTradeVolumeByToken(days: number): TradeVolumeByToken[];
}

export type TopTradersWidgetProps = PassedProps & ReduxProps;

const mapStateToProps = (state, ownProps: PassedProps) => {
  const getTradeVolumeByTrader = makeGetTradeVolumeByTrader(state);
  const tradeVolumeByTrader = getTradeVolumeByTrader({
    days: ownProps.timeframe,
    tokens: ownProps.tokens,
  });

  const tradeVolumes = Object.keys(tradeVolumeByTrader)
    .sort((address1, address2) =>
      tradeVolumeByTrader[address1].volume > tradeVolumeByTrader[address2].volume ? -1 : 1,
    )
    .map(address => ({
      address,
      totalTrades: tradeVolumeByTrader[address].totalTrades,
      volume: `${getFormattedNumber(tradeVolumeByTrader[address].volume, 10, 2, true)} ETH`,
    }));

  return {
    tradeVolumeByTrader: tradeVolumes,
    ...ownProps,
  };
};

const mapDispatchToProps = {};

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Component);
