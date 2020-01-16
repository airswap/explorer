import { selectors as tokenSelectors } from 'airswap.js/src/tokens/redux';
import { connect } from 'react-redux';

import { selectors as tradeSelectors } from '../../../state/trades';
import { TradeVolumeByToken } from '../../../types/Swap';
import { TokenMetadata } from '../../../types/Tokens';
import { getFormattedNumber } from '../../../utils/transformations';

const { makeGetTradeVolumeByToken } = tradeSelectors;

const { getTokensBySymbol } = tokenSelectors;

export interface TokenVolume {
  token: TokenMetadata;
  volume: string;
}

interface PassedProps {
  timeframe: number;
}

interface ReduxProps {
  tokenVolumes: TokenVolume[];
  getTradeVolumeByToken(days: number): TradeVolumeByToken[];
}

export type TokenCarouselProps = PassedProps & ReduxProps;

const mapStateToProps = (state, ownProps: PassedProps) => {
  const tokens: TokenMetadata[] = getTokensBySymbol(state);
  const getTradeVolumeByToken = makeGetTradeVolumeByToken(state);
  const tradeVolumeByToken = getTradeVolumeByToken(ownProps.timeframe);
  const tokenVolumes = Object.keys(tradeVolumeByToken)
    .filter(symbol => tokens[symbol])
    .sort((volume1, volume2) => (tradeVolumeByToken[volume1] > tradeVolumeByToken[volume2] ? -1 : 1))
    .map(symbol => ({
      token: tokens[symbol],
      volume: `${getFormattedNumber({
        num: tradeVolumeByToken[symbol],
        digits: 10,
        minDecimals: 2,
        maxDecimals: 2,
        noEllipsis: true,
      })} ETH`,
    }));

  return {
    tokenVolumes,
    ...ownProps,
  };
};

const mapDispatchToProps = {};

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Component);
