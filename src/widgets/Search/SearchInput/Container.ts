import { selectors as tokenSelectors } from 'airswap.js/src/tokens/redux';
import { connect } from 'react-redux';

import { STABLECOIN_SYMBOLS } from '../../../constants';
import { TokenMetadata, TokenQuery } from '../../../types/Tokens';

const { getTokensByAddress, getAirSwapApprovedTokens, getAirSwapApprovedTokensBySymbol } = tokenSelectors;

interface PassedProps {}

interface ReduxProps {
  stablecoinTokens: TokenMetadata[];
  allOtherTokens: TokenMetadata[];
  tokensByAddress: Record<string, TokenMetadata>;
  airswapTokensBySymbol: Record<string, TokenMetadata>;
  getDisplayByToken(tokenQuery: TokenQuery, tokenAmount: string): string;
}

export type SearchInputProps = PassedProps & ReduxProps;

const mapStateToProps = (state, ownProps: PassedProps) => {
  const allAirSwapTokens: TokenMetadata[] = Object.values(getAirSwapApprovedTokens(state));
  const stablecoinTokens = allAirSwapTokens.filter(token => STABLECOIN_SYMBOLS.includes(token.symbol));
  const allOtherTokens = allAirSwapTokens.filter(token => !STABLECOIN_SYMBOLS.includes(token.symbol));

  return {
    tokensByAddress: getTokensByAddress(state),
    airswapTokensBySymbol: getAirSwapApprovedTokensBySymbol(state),
    stablecoinTokens,
    allOtherTokens,
    ...ownProps,
  };
};

const mapDispatchToProps = {};

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Component);
