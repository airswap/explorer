import React from 'react'
import MediaQuery from 'react-responsive'

import theme from '../app/theme'

interface Props {
  children: React.ReactNode
  size: 'sm' | 'md' | 'lg' | 'xl' | 'md-down' | 'lg-down' | 'xl-down' | 'sm-up' | 'md-up' | 'lg-up'
}

const MediaQueryWrapper = ({ children, size }: Props) => {
  const baseSize = size.substring(0, 2)
  const modifier = size.length > 3 ? size.substring(3) : undefined
  const minWidth = modifier === 'down' ? theme.breakpoints.sm[0] : theme.breakpoints[baseSize][0]
  const maxWidth = modifier === 'up' ? theme.breakpoints.xl[1] : theme.breakpoints[baseSize][1]

  return (
    <MediaQuery minWidth={minWidth} maxWidth={maxWidth}>
      {children}
    </MediaQuery>
  )
}

export default MediaQueryWrapper
