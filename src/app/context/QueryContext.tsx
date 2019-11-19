import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

export enum Timeframe {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
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
  timeframe: Timeframe.DAY,
  setTimeframe: () => {},
})

interface QueryContextProviderProps {
  children: React.ReactNode
}

export default function QueryContextProvider(props: QueryContextProviderProps) {
  const location = useLocation()
  const params = useParams()

  const [tokens, setTokens] = useState<string[]>([])
  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.DAY)

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

  const contextValue = { tokens, addToken, removeToken, timeframe, setTimeframe }

  return <QueryContext.Provider value={contextValue}>{props.children}</QueryContext.Provider>
}
