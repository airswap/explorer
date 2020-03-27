import React from 'react';
import styled from 'styled-components';

const LinkEl = styled.a`
  cursor: pointer;
  text-decoration: none;
`;

interface LinkProps {
  url: string;
  children: React.ReactNode;
}

export default function Link(props: LinkProps) {
  return (
    <LinkEl href={props.url} target="_blank">
      {props.children}
    </LinkEl>
  );
}
