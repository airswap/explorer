import { STABLECOIN_TOKEN_ADDRESSES } from 'airswap.js/src/constants';
import { selectors as tokenSelectors } from 'airswap.js/src/tokens/redux';
import { connect } from 'react-redux';

import { TokenKind, TokenMetadata, TokenQuery } from '../../../types/Tokens';

const { getTokensByAddress, getAirSwapApprovedTokens, getAirSwapApprovedTokensBySymbol } = tokenSelectors;

interface PassedProps {}

interface ReduxProps {
  tokens: TokenMetadata[];
  tokensByAddress: Record<string, TokenMetadata>;
  airswapTokensBySymbol: Record<string, TokenMetadata>;
  getDisplayByToken(tokenQuery: TokenQuery, tokenAmount: string): string;
}

export type SearchInputProps = PassedProps & ReduxProps;

const mapStateToProps = (state, ownProps: PassedProps) => {
  const allAirSwapTokens: TokenMetadata[] = Object.values(getAirSwapApprovedTokens(state));
  const stablecoinTokens = allAirSwapTokens.filter(token => STABLECOIN_TOKEN_ADDRESSES.includes(token.address));
  const allOtherTokens = allAirSwapTokens.filter(
    token => !STABLECOIN_TOKEN_ADDRESSES.includes(token.address) && token.kind !== TokenKind.ERC721,
  );

  return {
    tokensByAddress: getTokensByAddress(state),
    airswapTokensBySymbol: getAirSwapApprovedTokensBySymbol(state),
    tokens: stablecoinTokens.concat(allOtherTokens),
    ...ownProps,
  };
};

const mapDispatchToProps = {};

export default Component => connect(mapStateToProps, mapDispatchToProps)(Component);
