import { transparentize } from 'polished'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as ChevronRightIcon } from '../static/chevron-right-icon.svg'
import Flex from './Flex'
import { H7 } from './Typography'

interface OpenableProps {
  isOpen: boolean
}

const Container = styled(Flex).attrs({ expand: true })`
  position: relative;
`

const Toggle = styled(Flex)<OpenableProps>`
  cursor: pointer;
  z-index: 3;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  width: 100%;
  flex-direction: row;
  background-color: #3e3e49;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 5px 10px;
  border-width: 3px;
  border-style: solid;
  border-color: ${({ isOpen, theme }) => (isOpen ? transparentize(0.5, theme.palette.primaryColor) : '#3e3e49')};
  transition: ${({ theme }) => theme.animation.defaultTransition}s;
  will-change: auto;
`

const DropdownContainer = styled(Flex)<OpenableProps>`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 0;
  width: 100%;
  background-color: #3e3e49;
  height: auto;
  border-radius: 10px;
  min-height: ${({ isOpen }) => (isOpen ? '50px' : '0')};
  max-height: ${({ isOpen }) => (isOpen ? '100px' : '0')};
  transition: ${({ theme }) => theme.animation.defaultTransition}s ease;
  will-change: auto;
  padding: ${({ isOpen }) => (isOpen ? '20px 0 0 0' : '0')};
  overflow-y: auto;
`

const DropdownContent = styled(Flex)<OpenableProps>`
  width: 100%;
  height: 100%;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: ${({ theme }) => theme.animation.defaultTransition}s;
`

const DropdownItem = styled(Flex).attrs({ expand: true })`
  padding: 6px 0;
  cursor: pointer;

  &:hover {
    background-color: #292937;
  }
`

const DropdownArrowContainer = styled(Flex)`
  svg {
    transform: rotate(90deg);
    width: 15px;
    height: 15px;

    path {
      stroke: ${({ theme }) => theme.palette.primaryColor};
    }
  }
`

interface DropdownProps {
  value: string
  options: string[]
  selectValue(value: string): void
}

export default function Dropdown(props: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleClickOutside = (evt: MouseEvent) => {
    if (evt.target instanceof HTMLDivElement) {
      if (dropdownRef.current && !dropdownRef.current.contains(evt.target)) {
        setIsOpen(false)
      }
    }
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const selectDropdownItem = (option: string) => {
    props.selectValue(option)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <Container ref={dropdownRef}>
      <Toggle isOpen={isOpen} onClick={toggleDropdown}>
        <H7 color="white">{props.value}</H7>
        <DropdownArrowContainer>
          <ChevronRightIcon />
        </DropdownArrowContainer>
      </Toggle>
      <DropdownContainer isOpen={isOpen}>
        <DropdownContent isOpen={isOpen}>
          {props.options.map(option => (
            <DropdownItem onClick={() => selectDropdownItem(option)} key={option}>
              <H7 color="white">{option}</H7>
            </DropdownItem>
          ))}
        </DropdownContent>
      </DropdownContainer>
    </Container>
  )
}
