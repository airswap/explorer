import './style.scss'

import React from 'react'

interface SpinnerProps {
  size?: number
  strokeWidth?: number
}

export default function Spinner(props: SpinnerProps) {
  const styles = {
    width: `${props.size || 20}px`,
    height: `${props.size || 20}px`,
    borderWidth: `${props.strokeWidth || 5}px`,
  }

  return <div className="airswap-spinner" style={styles} />
}
