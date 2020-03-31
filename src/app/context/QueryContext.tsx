import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
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
  const [network, setNetwork] = useState<number>();
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
    if (Number(query.network)) {
      setNetwork(Number(query.network));
    }
    const queryTimeframe = Number(query.timeframe);
    if (queryTimeframe && (queryTimeframe === 7 || queryTimeframe === 14 || queryTimeframe === 30)) {
      setTimeframe(queryTimeframe);
    }
  }, []);

  useEffect(() => {
    const query = { tokens, timeframe, network };

    history.push(`?${queryString.stringify(query, { arrayFormat: 'comma' })}`);
  }, [tokens, timeframe, network]);

  const contextValue = useMemo(
    () => ({
      tokens,
      addToken,
      removeToken,
      timeframe,
      setTimeframe,
    }),
    [tokens, timeframe],
  );

  return <QueryContext.Provider value={contextValue}>{props.children}</QueryContext.Provider>;
}
