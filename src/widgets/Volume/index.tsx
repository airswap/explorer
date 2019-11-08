import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import WidgetCard from '../WidgetComponents/WidgetCard'

export default function VolumeWidget() {
  const [expanded, setExpanded] = useState(false)

  return (
    <WidgetCard width="630px" expanded={expanded} setExpanded={setExpanded} expandedContent={<div />}>
      <button type="button" onClick={() => setExpanded(true)}>
        <FormattedMessage defaultMessage="expand" />
      </button>
    </WidgetCard>
  )
}
