import React, { Component } from 'react'
import { Flex, FlexItem } from '@airswap/component-library/components/Flex'
import { Header1 } from '@airswap/component-library/components/Typography'
import Theme from "./ThemeProvider"
import Redux from './ReduxProvider'

class App extends Component {
  render() {
    return (
      <Flex>
        <FlexItem direction="column" expand>
          <Header1>{'My new sic AirSwap dapp 😜🤙'}</Header1>
        </FlexItem>
      </Flex>
    )
  }
}

export default Redux(Theme(App))
