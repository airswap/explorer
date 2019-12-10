import { connect } from 'react-redux'

import { fetchTrades } from '../../state/trades/actions'
import { SwapEvent } from '../../types/Swap'

interface PassedProps {}

interface ReduxProps {
  trades: SwapEvent[]
  fetchTrades(): void
}

export type VolumeWidgetProps = PassedProps & ReduxProps

const mapStateToProps = (state, ownProps: PassedProps) => {
  return {
    ...ownProps,
  }
}

const mapDispatchToProps = { fetchTrades }

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Component)
