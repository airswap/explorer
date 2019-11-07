import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'airswap.js/src/redux/configureStore'

const store = configureStore()

const Redux = Component => props => (
  <Provider store={store}>
    <Component {...props} />
  </Provider>
)

export default Redux
