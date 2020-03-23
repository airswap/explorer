import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../screens/Dashboard';
import history from '../state/router/history';
import { ReactComponent as AirswapLogo } from '../static/airswap-logo.svg';
import QueryContextProvider from './context/QueryContext';
import IntlProvider from './providers/IntlProvider';
import ReduxProvider from './providers/ReduxProvider';
import ThemeProvider from './providers/ThemeProvider';
import { AirswapLogoContainer, AppContainer, ContentContainer } from './styles';

function App() {
  return (
    <AppContainer>
      <ConnectedRouter history={history}>
        <AirswapLogoContainer>
          <AirswapLogo height={30} />
        </AirswapLogoContainer>
        <QueryContextProvider>
          <ContentContainer>
            <Switch>
              <Route path="/" component={Dashboard} />
            </Switch>
          </ContentContainer>
        </QueryContextProvider>
      </ConnectedRouter>
    </AppContainer>
  );
}

export default ReduxProvider(IntlProvider(ThemeProvider(App)));
