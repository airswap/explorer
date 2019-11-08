import React from 'react'
import styled from 'styled-components'

import Flex from '../../components/Flex'

const Grid = styled(Flex).attrs({ expand: true })`
  flex-flow: row wrap;
  margin-right: -20px;

  @media (max-width: ${({ theme }) => `${theme.breakpoints.sm[1]}px`}) {
    margin: 0;
  }
`

interface WidgetGrid {
  children: React.ReactNode
}

export default function WidgetGrid(props: WidgetGrid) {
  return <Grid>{props.children}</Grid>
}
