import { selectors as tokenSelectors } from 'airswap.js/src/tokens/redux';
import { connect } from 'react-redux';

import { TokenMetadata } from '../../../types/Tokens';

const { getTokensByAddress } = tokenSelectors;

interface PassedProps {
  tokenAddress: string;
  onDismiss(): void;
}

interface ReduxProps {
  token: TokenMetadata;
  color: string;
}

export type TokenChipProps = PassedProps & ReduxProps;

const mapStateToProps = (state, ownProps: PassedProps) => {
  const { tokenAddress } = ownProps;

  const tokensByAddress: TokenMetadata[] = getTokensByAddress(state);
  const token = tokensByAddress[tokenAddress];

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
