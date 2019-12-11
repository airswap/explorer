import { selectors as tokenSelectors } from 'airswap.js/src/tokens/redux'
import { connect } from 'react-redux'

import { TokenMetadata } from '../../../types/Tokens'

const { getAirSwapApprovedTokens } = tokenSelectors

export interface TokenVolume {
  token: TokenMetadata
  volume: string
}

interface PassedProps {}

interface ReduxProps {
  tokenVolumes: TokenVolume[]
}

export type TokenCarouselProps = PassedProps & ReduxProps

const mapStateToProps = (state, ownProps: PassedProps) => {
  const tokens: TokenMetadata[] = getAirSwapApprovedTokens(state)
  const tokenVolumes = tokens.map(token => ({ token, volume: '1 ETH' }))

  return {
    tokenVolumes,
    ...ownProps,
  }
}

const mapDispatchToProps = {}

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Component)
