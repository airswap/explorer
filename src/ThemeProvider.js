import React from 'react'
import { ThemeProvider as BaseThemeProvider } from 'styled-components'
import { ThemeProvider } from 'styled-components/primitives'
import theme from '@airswap/component-library/theme'

const Theme = Component => props => (
  <BaseThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <Component {...props} />
    </ThemeProvider>
  </BaseThemeProvider>
)

export default Theme
