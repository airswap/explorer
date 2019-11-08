import { ConnectedRouter } from 'connected-react-router'
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dashboard from '../screens/Dashboard'
import history from '../state/router/history'
import IntlProvider from './providers/IntlProvider'
import ReduxProvider from './providers/ReduxProvider'
import ThemeProvider from './providers/ThemeProvider'

function App() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={Dashboard} />
      </Switch>
    </ConnectedRouter>
  )
}

export default ReduxProvider(IntlProvider(ThemeProvider(App)))
