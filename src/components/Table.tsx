import React from 'react'
import styled from 'styled-components'

import { H8 } from './Typography'

export const TableRow = styled.tr``

export const TableRowItem = styled.td`
  height: 30px;
  padding-top: 30px;
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
  const getTextAlign = index => {
    if (index === 0) return 'left'
    if (index === props.columns.length - 1) return 'right'
    return 'center'
  }

  return (
    <TableContainer>
      <tbody>
        <TableRow>
          {props.columns.map((column, index) => (
            <TableHeader>
              <TableHeaderText>{column}</TableHeaderText>
            </TableHeader>
          ))}
        </TableRow>
        {props.children}
      </tbody>
    </TableContainer>
  )
}
