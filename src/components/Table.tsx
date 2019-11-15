import React, { useState } from 'react'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'

import { FadeInOutTransition } from '../utils/animations'
import useInterval from '../utils/useInterval'
import { H8 } from './Typography'

export const TableRowEl = styled.tr`
  transition: 2s ease;
`

export const TableRowItem = styled.td`
  height: 30px;
  padding-top: 40px;
  padding-bottom: 0;
  vertical-align: middle;
`

const TableContainer = styled.table`
  width: 100%;
`

const TableHeader = styled.th`
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
`

const TableHeaderText = styled(H8)`
  color: rgba(255, 255, 255, 0.25);
`

interface TableProps {
  columns: string[]
  children: React.ReactNode
}

export default function Table(props: TableProps) {
  return (
    <TableContainer>
      <thead>
        <TableRowEl>
          {props.columns.map(column => (
            <TableHeader>
              <TableHeaderText>{column}</TableHeaderText>
            </TableHeader>
          ))}
        </TableRowEl>
      </thead>
      <tbody>{props.children}</tbody>
    </TableContainer>
  )
}

interface TableRowProps {
  fadeIn?: boolean
  index: number
  children: React.ReactNode
}

export function TableRow(props: TableRowProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  if (!props.fadeIn) {
    return <TableRowEl>{props.children}</TableRowEl>
  }

  useInterval(() => {
    setIsVisible(true)
  }, (props.index + 1) * 150)

  return (
    <Transition in={isVisible} timeout={0}>
      {state => <TableRowEl style={{ ...FadeInOutTransition[state] }}>{props.children}</TableRowEl>}
    </Transition>
  )
}
