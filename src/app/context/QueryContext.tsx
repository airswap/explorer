import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

interface QueryContextType {
  tokens: string[];
  addToken(token: string): void;
  removeToken(token: string): void;
  timeframe: number;
  setTimeframe(timeframe: number): void;
}

export const QueryContext = React.createContext<QueryContextType>({
  tokens: [],
  addToken: () => {},
  removeToken: () => {},
  timeframe: 14,
  setTimeframe: () => {},
});

interface QueryContextProviderProps {
  children: React.ReactNode;
}

export default function QueryContextProvider(props: QueryContextProviderProps) {
  const history = useHistory();
  const location = useLocation();

  const [tokens, setTokens] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState<number>(14);

  const addToken = (value: string) => {
    const newTokens = new Set(tokens);
    newTokens.add(value);
    setTokens(Array.from(newTokens));
  };

  const removeToken = (value: string) => {
    const newTokens = new Set(tokens);
    newTokens.delete(value);
    setTokens(Array.from(newTokens));
  };

  useEffect(() => {
    const query = queryString.parse(location.search, { arrayFormat: 'comma' });
    if (query.tokens) {
      if (Array.isArray(query.tokens)) {
        setTokens(query.tokens);
      } else {
        setTokens([query.tokens]);
      }
    }
    if (query.timeframe && Number(query.timeframe)) {
      setTimeframe(Number(query.timeframe));
    }
  }, []);

  useEffect(() => {
    const query = { tokens, timeframe };

    history.push(`?${queryString.stringify(query, { arrayFormat: 'comma' })}`);
  }, [tokens, timeframe]);

  const contextValue = { tokens, addToken, removeToken, timeframe, setTimeframe };

  return <QueryContext.Provider value={contextValue}>{props.children}</QueryContext.Provider>;
}
