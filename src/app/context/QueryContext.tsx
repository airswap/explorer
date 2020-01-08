import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export const TimeframeDisplayMap = {
  7: '1 Week',
  14: '2 Weeks',
  30: '1 Month',
  '1 Week': 7,
  '2 Weeks': 14,
  '1 Month': 30,
};

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
  timeframe: 30,
  setTimeframe: () => {},
});

interface QueryContextProviderProps {
  children: React.ReactNode;
}

export default function QueryContextProvider(props: QueryContextProviderProps) {
  const history = useHistory();
  const location = useLocation();

  const [tokens, setTokens] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState<number>(30);

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
    if (query.timeframe && Number(query.timeframe) && Number(query.timeframe) > 0 && Number(query.timeframe) <= 30) {
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
