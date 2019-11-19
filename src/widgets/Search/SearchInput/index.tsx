import { transparentize } from 'polished'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { QueryContext } from '../../../app/context/QueryContext'
import Flex from '../../../components/Flex'
import { ReactComponent as SearchIcon } from '../../../static/search-icon.svg'
import { TokenMetadata } from '../../../types/Tokens'
import Container, { SearchInputProps } from './Container'

const SearchInputContainer = styled(Flex).attrs({ expand: true })`
  position: relative;
`

interface InputContainerProps {
  showDropdown: boolean
}

const InputContainer = styled.form<InputContainerProps>`
  display: flex;
  z-index: 1;
  align-items: center;
  height: 40px;
  width: 100%;
  flex-direction: row;
  background-color: #3e3e49;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 5px 10px;
  border-width: 3px;
  border-style: solid;
  border-color: ${({ showDropdown, theme }) =>
    showDropdown ? transparentize(0.5, theme.palette.primaryColor) : '#3e3e49'};
  transition: ${({ theme }) => theme.animation.defaultTransition}s ease;
  will-change: auto;
`

const IconContainer = styled(Flex)`
  flex-shrink: 0;
  margin-right: 10px;

  svg {
    width: 18px;
    height: 18px;

    path {
      stroke: ${({ theme }) => theme.palette.primaryColor};
    }
  }
`

const InputEl = styled.input`
  font-size: ${({ theme }) => theme.text.fontSize.h6};
  color: white;
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
`

interface DropdownContainerProps {
  showDropdown: boolean
}

const DropdownContainer = styled(Flex)<DropdownContainerProps>`
  position: absolute;
  z-index: 0;
  top: 50%;
  left: 0;
  width: 100%;
  background-color: #3e3e49;
  height: auto;
  border-radius: 10px;
  min-height: ${({ showDropdown }) => (showDropdown ? '100px' : '0')};
  max-height: ${({ showDropdown }) => (showDropdown ? '350px' : '0')};
  transition: ${({ theme }) => theme.animation.defaultTransition}s ease;
  will-change: auto;
  padding: ${({ showDropdown }) => (showDropdown ? '40px 30px' : '0 30px')};
  overflow-y: auto;
`

function SearchInput(props: SearchInputProps) {
  const [searchString, setSearchString] = useState<string>('')
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [stablecoinTokens, setStablecoinTokens] = useState<TokenMetadata[]>(props.stablecoinTokens)
  const [allOtherTokens, setAllOtherTokens] = useState<TokenMetadata[]>(props.allOtherTokens)
  const { tokens, addToken, removeToken } = useContext(QueryContext)

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    setSearchString(evt.target.value)
  }

  const onEnter = (evt: React.FormEvent) => {
    evt.preventDefault()
    addToken(searchString)
  }

  useEffect(() => {
    console.log(tokens)
  }, [tokens])

  return (
    <SearchInputContainer>
      <InputContainer onSubmit={onEnter} showDropdown={showDropdown}>
        <IconContainer>
          <SearchIcon />
        </IconContainer>
        <InputEl
          value={searchString}
          onChange={onChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setShowDropdown(false)}
        />
      </InputContainer>
      <DropdownContainer showDropdown={showDropdown}>
        <div />
      </DropdownContainer>
    </SearchInputContainer>
  )
}

export default Container(SearchInput)
