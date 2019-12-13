import { connect } from 'react-redux'

import { selectors as tradeSelectors } from '../../state/trades'
import { fetchTrades } from '../../state/trades/actions'
import { SwapEvent, TradeQuery, TradeVolumeByDay, TradeVolumeByToken } from '../../types/Swap'

const { getAllTrades, makeGetTradeVolumeByDate, makeGetTradeVolumeByToken } = tradeSelectors
// const tradeVolumeByDate = createSelector(() => {})

interface PassedProps {}

interface ReduxProps {
  trades: SwapEvent[]
  fetchTrades(): void
  getTradeVolumeByDate(query?: TradeQuery): TradeVolumeByDay[]
}

export type VolumeWidgetProps = PassedProps & ReduxProps

const mapStateToProps = (state, ownProps: PassedProps) => {
  return {
    trades: getAllTrades(state),
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
