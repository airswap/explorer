const { override, addBabelPlugin } = require('customize-cra');

module.exports = function doOverride(config, env) {
  const overridedConfig = override(
    addBabelPlugin('react-intl-auto'),
    env === 'production' ? addBabelPlugin('transform-remove-console') : undefined,
  )(config, env);

  if (env !== 'production') {
    overridedConfig.devtool = 'cheap-module-source-map' //eslint-disable-line
  }
  return overridedConfig;
};
