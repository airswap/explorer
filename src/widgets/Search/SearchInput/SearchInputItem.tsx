import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Flex from '../../../components/Flex';
import { HorizontalSpacer } from '../../../components/Spacer';
import TokenIcon from '../../../components/TokenIcon';
import { H6, H7 } from '../../../components/Typography';

const ItemContainer = styled(Flex).attrs({
  expand: true,
  direction: 'row',
  align: 'center',
  justify: 'flex-start',
})`
  padding: 10px 30px;
  min-height: 45px;
  transition: ${({ theme }) => theme.animation.defaultTransition}s;
  cursor: pointer;

  &:hover {
    background-color: #292937;
  }
`;

interface SearchInputItemProps {
  image?: string;
  title: string;
  description?: string;
  onClick(): void;
}

export default function SearchInputItem(props: SearchInputItemProps) {
  return (
    <ItemContainer onClick={props.onClick}>
      <TokenIcon symbol={props.title} src={props.image} size={25} />
      <HorizontalSpacer units={3} />
      <H6 color="white">{props.title}</H6>
      <HorizontalSpacer units={1} />
      <H7 color="white">
        <FormattedMessage defaultMessage="({description})" values={{ description: props.description }} />
      </H7>
    </ItemContainer>
  );
}
