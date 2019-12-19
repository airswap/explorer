import React from 'react';
import { createGlobalStyle, ThemeProvider as BaseThemeProvider } from 'styled-components';
import reset from 'styled-reset';

import theme from '../theme';

const BaseStyles = createGlobalStyle`
  ${reset}
  div {
    box-sizing: border-box;
  }
  #root {
    height: 100%;
    overflow-x: hidden;
  }
  html, body {
    background-color: #292937;
    cursor: default;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
  }
  *,
  div,
  span,
  p,
  a,
  button {
    font-family: ${theme.text.fontFamily};
    letter-spacing: 0.5px;

    ::selection {
        background: #2b71ff; /*AirSwap Blue*/
      }

    ::-moz-selection {
        background: #2b71ff; /*AirSwap Blue*/
      }
  }
  body {
    margin: 0;
    padding: 0;
  }
`;

theme.palette.borderColor = '#E5E5E5';

const Theme = Component => props => (
  <BaseThemeProvider theme={theme}>
    <>
      <Component {...props} />
      <BaseStyles />
    </>
  </BaseThemeProvider>
);

export default Theme;
