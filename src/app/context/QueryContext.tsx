import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'

export enum Timeframe {
  WEEK = 'week',
  MONTH = 'month',
}

export const TimeframeDisplayMap = {
  [Timeframe.WEEK]: '1 Week',
  [Timeframe.MONTH]: '1 Month',
  '1 Week': [Timeframe.WEEK],
  '1 Month': [Timeframe.MONTH],
}

export const TimeframeDaysMap = {
  [Timeframe.WEEK]: 7,
  [Timeframe.MONTH]: 30,
}

interface QueryContextType {
  tokens: string[]
  addToken(token: string): void
  removeToken(token: string): void
  timeframe: Timeframe
  setTimeframe(timeframe: Timeframe): void
}

export const QueryContext = React.createContext<QueryContextType>({
  tokens: [],
  addToken: () => {},
  removeToken: () => {},
  timeframe: Timeframe.WEEK,
  setTimeframe: () => {},
})

interface QueryContextProviderProps {
  children: React.ReactNode
}

export default function QueryContextProvider(props: QueryContextProviderProps) {
  const history = useHistory()
  const location = useLocation()

  const [tokens, setTokens] = useState<string[]>([])
  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.WEEK)

  const addToken = (value: string) => {
    const newTokens = new Set(tokens)
    newTokens.add(value)
    setTokens(Array.from(newTokens))
  }

  const removeToken = (value: string) => {
    const newTokens = new Set(tokens)
    newTokens.delete(value)
    setTokens(Array.from(newTokens))
  }

  useEffect(() => {
    const query = queryString.parse(location.search, { arrayFormat: 'comma' })
    if (query.tokens) {
      if (Array.isArray(query.tokens)) {
        setTokens(query.tokens)
      } else {
        setTokens([query.tokens])
      }
    }
  }, [])

  useEffect(() => {
    const query = { tokens, timeframe }

    history.push(`?${queryString.stringify(query, { arrayFormat: 'comma' })}`)
  }, [tokens, timeframe])

  const contextValue = { tokens, addToken, removeToken, timeframe, setTimeframe }

  return <QueryContext.Provider value={contextValue}>{props.children}</QueryContext.Provider>
}
