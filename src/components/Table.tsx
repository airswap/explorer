import React from 'react'
import styled from 'styled-components'

import { H8 } from './Typography'

export const TableRow = styled.tr``

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
        <TableRow>
          {props.columns.map(column => (
            <TableHeader>
              <TableHeaderText>{column}</TableHeaderText>
            </TableHeader>
          ))}
        </TableRow>
      </thead>
      <tbody>{props.children}</tbody>
    </TableContainer>
  )
}
