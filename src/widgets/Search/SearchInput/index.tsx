import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';

import { QueryContext } from '../../../app/context/QueryContext';
import MediaQuery from '../../../components/MediaQuery';
import { ReactComponent as SearchIcon } from '../../../static/search-icon.svg';
import { TokenMetadata } from '../../../types/Tokens';
import { findTokens } from '../../../utils/tokens';
import MobileTimeframe from '../MobileTimeframe';
import { SearchLabel, SearchLabelContainer } from '../styles';
import Container, { SearchInputProps } from './Container';
import SearchInputItem from './SearchInputItem';
import {
  DropdownContainer,
  DropdownContent,
  IconContainer,
  InputContainer,
  InputEl,
  SearchInputContainer,
} from './styles';

function SearchInput(props: SearchInputProps) {
  const searchInputRef = useRef<HTMLDivElement>(null);
  const [searchString, setSearchString] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [tokens, setTokens] = useState<TokenMetadata[]>(props.tokens);
  const { addToken } = useContext(QueryContext);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setSearchString(evt.target.value);

    setTokens(findTokens(evt.target.value, props.tokens));
  };

  const onEnter = (evt: React.FormEvent) => {
    evt.preventDefault();
    const searchedToken = props.tokensByAddress[searchString];
    if (searchedToken) {
      addToken(searchedToken.address);
    }
  };

  const handleClickOutside = (evt: MouseEvent) => {
    if (evt.target instanceof HTMLDivElement) {
      if (searchInputRef.current && !searchInputRef.current.contains(evt.target)) {
        setShowDropdown(false);
      }
    }
  };

  const selectToken = (tokenSymbol: string) => {
    const searchedToken = props.airswapTokensBySymbol[tokenSymbol];
    if (searchedToken) {
      addToken(searchedToken.address);
    }
    setShowDropdown(false);
  };

  const onInputFocus = () => {
    setShowDropdown(true);
  };

  const TokenListItem = useMemo(
    () => ({ index, style }) => {
      const token = tokens[index];
      return (
        <div style={style}>
          <SearchInputItem
            key={token.address}
            title={token.symbol}
            description={token.name}
            image={token.airswap_img_url}
            onClick={() => selectToken(token.symbol)}
          />
        </div>
      );
    },
    [tokens.length],
  );

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  useEffect(() => {
    setTokens(findTokens(searchString, props.tokens));
  }, [props.tokens.length, searchString]);

  return (
    <SearchInputContainer ref={searchInputRef}>
      <SearchLabelContainer>
        <SearchLabel>
          <FormattedMessage defaultMessage="Filter by token" />
        </SearchLabel>
        <MediaQuery size="sm">
          <MobileTimeframe />
        </MediaQuery>
      </SearchLabelContainer>
      <InputContainer onSubmit={onEnter} showDropdown={showDropdown}>
        <IconContainer>
          <SearchIcon />
        </IconContainer>
        <InputEl value={searchString} onChange={onChange} onFocus={onInputFocus} />
      </InputContainer>
      <DropdownContainer showDropdown={showDropdown}>
        <DropdownContent showDropdown={showDropdown}>
          <AutoSizer>
            {({ width, height }) => (
              <FixedSizeList
                className="token-selector-list"
                width={width}
                height={height}
                itemCount={tokens.length}
                itemSize={50}
              >
                {TokenListItem}
              </FixedSizeList>
            )}
          </AutoSizer>
        </DropdownContent>
      </DropdownContainer>
    </SearchInputContainer>
  );
}

export default Container(SearchInput);
