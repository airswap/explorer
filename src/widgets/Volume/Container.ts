import { connect } from 'react-redux'

import { selectors as tradeSelectors } from '../../state/trades'
import { fetchTrades } from '../../state/trades/actions'
import { TradeQuery, TradeVolumeByDay } from '../../types/Swap'

const { makeGetTradeVolumeByDate } = tradeSelectors

interface PassedProps {}

interface ReduxProps {
  fetchTrades(): void
  getTradeVolumeByDate(query?: TradeQuery): TradeVolumeByDay[]
}

export type VolumeWidgetProps = PassedProps & ReduxProps

const mapStateToProps = (state, ownProps: PassedProps) => {
  return {
    getTradeVolumeByDate: makeGetTradeVolumeByDate(state),
    ...ownProps,
  }
}

const mapDispatchToProps = { fetchTrades }

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Component)
