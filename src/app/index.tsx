import { ConnectedRouter } from 'connected-react-router'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import history from '../state/router/history'
import IntlProvider from './providers/IntlProvider'
import ReduxProvider from './providers/ReduxProvider'
import ThemeProvider from './providers/ThemeProvider'

function App() {
  return (
    <ConnectedRouter history={history}>
      <div>
        <FormattedMessage defaultMessage="Hello there" />
      </div>
    </ConnectedRouter>
  )
}

export default ReduxProvider(IntlProvider(ThemeProvider(App)))
