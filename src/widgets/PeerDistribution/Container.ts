import { connect } from 'react-redux';

import { selectors as tradeSelectors } from '../../state/trades';

const { makeGetVolumeDistributionBySource } = tradeSelectors;

interface SourceVolume {
  name: string;
  value: number;
}

interface PassedProps {
  timeframe: number;
  tokens?: string[];
}

interface ReduxProps {
  volumeDistributionBySource: SourceVolume[];
}

export type PeerDistributionWidgetProps = PassedProps & ReduxProps;

const mapStateToProps = (state, ownProps: PassedProps) => {
  const getVolumeDistributionBySource = makeGetVolumeDistributionBySource(state);
  const volumeDistributionBySource = getVolumeDistributionBySource({
    days: ownProps.timeframe,
    tokens: ownProps.tokens,
  });
  let totalVolume = 0;
  const formattedVolumeDistribution = Object.keys(volumeDistributionBySource)
    .map(source => {
      totalVolume += Number(volumeDistributionBySource[source]);

      return {
        name: source,
        value: volumeDistributionBySource[source],
      };
    })
    .sort((distribution1, distribution2) => (distribution1.value > distribution2.value ? -1 : 1));
  const filteredFormattedVolumeDistribution = formattedVolumeDistribution.filter(distribution => {
    const percentage = (distribution.value / totalVolume) * 100;
    return percentage >= 0.1;
  });

  return {
    volumeDistributionBySource: filteredFormattedVolumeDistribution,
    ...ownProps,
  };
};

const mapDispatchToProps = {};

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Component);
