import { connect } from 'react-redux'

import { selectors as tradeSelectors } from '../../../state/trades'
import { SwapEvent } from '../../../types/Swap'

const { getAllTrades } = tradeSelectors

interface PassedProps {}

interface ReduxProps {
  trades: SwapEvent[]
}

export type NetworkGraphProps = PassedProps & ReduxProps

const mapStateToProps = (state, ownProps: PassedProps) => {
  return {
    trades: getAllTrades(state),
    ...ownProps,
  }
}

const mapDispatchToProps = {}

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Component)
