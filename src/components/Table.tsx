import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';

import useInterval from '../hooks/useInterval';
import { FadeInOutTransition } from '../utils/animations';
import { H8 } from './Typography';

export const TableRowEl = styled.tr`
  transition: 2s ease;
`;

export const TableRowItem = styled.td`
  height: 30px;
  padding-top: 40px;
  padding-bottom: 0;
  vertical-align: middle;
`;

const TableContainer = styled.table`
  width: 100%;
`;

const TableHeader = styled.th`
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
`;

const TableHeaderText = styled(H8)`
  color: rgba(255, 255, 255, 0.25);
`;

const TableBody = styled.tbody``;

interface TableProps {
  columns: string[];
  children: React.ReactNode;
}

export default function Table(props: TableProps) {
  return (
    <TableContainer>
      <thead>
        <TableRowEl>
          {props.columns.map(column => (
            <TableHeader key={column}>
              <TableHeaderText>{column}</TableHeaderText>
            </TableHeader>
          ))}
        </TableRowEl>
      </thead>
      <TableBody>{props.children}</TableBody>
    </TableContainer>
  );
}

interface TableRowProps {
  fadeIn?: boolean;
  index: number;
  children: React.ReactNode;
}

export function TableRow(props: TableRowProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useInterval(() => {
    setIsVisible(true);
  }, (props.index + 1) * 150);

  if (!props.fadeIn) {
    return <TableRowEl>{props.children}</TableRowEl>;
  }

  return (
    <Transition in={isVisible} timeout={0}>
      {state => <TableRowEl style={{ ...FadeInOutTransition[state] }}>{props.children}</TableRowEl>}
    </Transition>
  );
}
