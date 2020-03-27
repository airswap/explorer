import { transparentize } from 'polished';
import styled from 'styled-components';

import { H8 } from '../../../components/Typography';
import Flex from '../../../components/Flex';

export const SearchInputContainer = styled(Flex).attrs({ expand: true, justify: 'center' })`
  position: relative;
  max-height: 150px;
  height: 100%;
  padding: 25px 0;
`;

interface InputContainerProps {
  showDropdown: boolean;
}

export const InputContainer = styled.form<InputContainerProps>`
  display: flex;
  z-index: 3;
  align-items: center;
  height: 35px;
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
  transition: ${({ theme }) => theme.animation.defaultTransition}s;
  will-change: auto;
`;

export const IconContainer = styled(Flex)`
  flex-shrink: 0;
  margin-right: 10px;

  svg {
    width: 18px;
    height: 18px;

    path {
      stroke: ${({ theme }) => theme.palette.primaryColor};
    }
  }
`;

export const InputEl = styled.input`
  font-size: ${({ theme }) => theme.text.fontSize.h7};
  color: white;
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
`;

interface DropdownContainerProps {
  showDropdown: boolean;
}

export const DropdownContainer = styled(Flex)<DropdownContainerProps>`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 0;
  width: 100%;
  background-color: #3e3e49;
  height: auto;
  border-radius: 10px;
  min-height: ${({ showDropdown }) => (showDropdown ? '100px' : '0')};
  max-height: ${({ showDropdown }) => (showDropdown ? '350px' : '0')};
  height: ${({ showDropdown }) => (showDropdown ? '350px' : '0')};
  transition: ${({ theme }) => theme.animation.defaultTransition}s ease;
  will-change: auto;
  overflow-y: auto;
`;

export const DropdownContent = styled(Flex).attrs({ align: 'flex-start' })<DropdownContainerProps>`
  width: 100%;
  height: 100%;
  opacity: ${({ showDropdown }) => (showDropdown ? 1 : 0)};
  transition: ${({ theme }) => theme.animation.defaultTransition}s;
`;

export const TokenTypeHeaderContainer = styled(Flex).attrs({ expand: true })`
  padding: 5px 30px;
  min-height: 30px;
`;

export const SearchInputLabel = styled(H8)`
  color: rgba(255, 255, 255, 0.25);
`;

export const SearchInputLabelContainer = styled(Flex).attrs({ direction: 'row', justify: 'space-between' })`
  position: absolute;
  width: 100%;
  left: 0;
  top: 15px;
`;
