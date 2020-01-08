import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Flex from '../components/Flex';
import Image from '../components/Image';
import MediaQuery from '../components/MediaQuery';
import Dashboard from '../screens/Dashboard';
import history from '../state/router/history';
import AirswapLogo from '../static/airswap-logo.png';
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
          <MediaQuery size="sm">
            <Image height={20} src={AirswapLogo} />
          </MediaQuery>
          <MediaQuery size="md-up">
            <Image height={30} src={AirswapLogo} />
          </MediaQuery>
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
