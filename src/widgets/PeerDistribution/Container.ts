import { connect } from 'react-redux'

import { Timeframe, TimeframeDaysMap } from '../../app/context/QueryContext'
import { selectors as tradeSelectors } from '../../state/trades'

const { makeGetVolumeDistributionBySource } = tradeSelectors

interface SourceVolume {
  name: string
  value: number
}

interface PassedProps {
  timeframe: Timeframe
  tokens?: string[]
}

interface ReduxProps {
  volumeDistributionBySource: SourceVolume[]
}

export type PeerDistributionWidgetProps = PassedProps & ReduxProps

const mapStateToProps = (state, ownProps: PassedProps) => {
  const getVolumeDistributionBySource = makeGetVolumeDistributionBySource(state)
  const volumeDistributionBySource = getVolumeDistributionBySource({
    days: TimeframeDaysMap[ownProps.timeframe],
    tokens: ownProps.tokens,
  })
  const formattedVolumeDistribution = Object.keys(volumeDistributionBySource).map(source => ({
    name: source,
    value: volumeDistributionBySource[source],
  }))

  return {
    volumeDistributionBySource: formattedVolumeDistribution,
    ...ownProps,
  }
}

const mapDispatchToProps = {}

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Component)
