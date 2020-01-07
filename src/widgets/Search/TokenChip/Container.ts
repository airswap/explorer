import { selectors as tokenSelectors } from 'airswap.js/src/tokens/redux';
import { connect } from 'react-redux';

import { TokenMetadata } from '../../../types/Tokens';

const { getAirSwapApprovedTokensBySymbol } = tokenSelectors;

interface PassedProps {
  tokenSymbol: string;
  onDismiss(): void;
}

interface ReduxProps {
  token: TokenMetadata;
  color: string;
}

export type TokenChipProps = PassedProps & ReduxProps;

const mapStateToProps = (state, ownProps: PassedProps) => {
  const { tokenSymbol } = ownProps;

  const tokensBySymbol: TokenMetadata[] = getAirSwapApprovedTokensBySymbol(state);
  const token = tokensBySymbol[tokenSymbol];

  return {
    token,
    ...ownProps,
  };
};

const mapDispatchToProps = {};

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Component);
