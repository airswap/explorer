import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import WidgetCard from '../WidgetComponents/WidgetCard'
import SearchInput from './SearchInput'

export default function SearchWidget() {
  const [searchString, setSearchString] = useState<string>('')

  return (
    <WidgetCard grouped height="120px">
      <SearchInput />
    </WidgetCard>
  )
}
