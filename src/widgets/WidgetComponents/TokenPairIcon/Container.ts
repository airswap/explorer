import { selectors as tokenSelectors } from 'airswap.js/src/tokens/redux/';
import { connect } from 'react-redux';

import { TokenMetadata } from '../../../types/Tokens';

const { getTokensByAddress } = tokenSelectors;

interface PassedProps {
  senderToken: string;
  signerToken: string;
}

interface ReduxProps {
  tokensByAddress: Record<string, TokenMetadata>[];
}

export type TokenPairIconProps = PassedProps & ReduxProps;

const mapStateToProps = (state, ownProps: PassedProps) => {
  return {
    tokensByAddress: getTokensByAddress(state),
    ...ownProps,
  };
};

const mapDispatchToProps = {};

export default Component => connect(mapStateToProps, mapDispatchToProps)(Component);
