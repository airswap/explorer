import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../screens/Dashboard';
import history from '../state/router/history';
import QueryContextProvider from './context/QueryContext';
import Header from './Header';
import IntlProvider from './providers/IntlProvider';
import ReduxProvider from './providers/ReduxProvider';
import ThemeProvider from './providers/ThemeProvider';
import { AppContainer, ContentContainer } from './styles';

function App() {
  return (
    <AppContainer>
      <ConnectedRouter history={history}>
        <Header />
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
