import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Flex from '../components/Flex';
import Dashboard from '../screens/Dashboard';
import history from '../state/router/history';
import { ReactComponent as AirswapLogo } from '../static/airswap-logo.svg';
import QueryContextProvider from './context/QueryContext';
import IntlProvider from './providers/IntlProvider';
import ReduxProvider from './providers/ReduxProvider';
import ThemeProvider from './providers/ThemeProvider';

const AppContainer = styled(Flex)`
  position: relative;
`;

const AirswapLogoContainer = styled(Flex).attrs({ align: 'flex-start' })`
  width: 100%;
  max-width: 1440px;
  padding: 30px;
  margin: auto;

  svg {
    height: 30px;
  }

  @media (max-width: ${({ theme }) => `${theme.breakpoints.sm[1]}px`}) {
    align-items: center;
  }
`;

const ContentContainer = styled(Flex)`
  width: 100%;
`;

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
