import styled from 'styled-components';

interface TypographyProps {
  weight?: number | string;
  opacity?: 0.25 | 0.5 | 0.75 | 1;
  textAlign?: 'left' | 'center' | 'right';
  display?: 'block' | 'inline' | 'inline-block' | 'inline-flex';
  noWrap?: boolean;
  expand?: boolean;
  decoration?: string;
}

export const BaseText = styled.p<TypographyProps>`
  font-weight: ${({ weight }) => weight || 'normal'};
  font-family: ${({ theme }) => theme.text.fontFamily};
  text-decoration: ${({ decoration }) => decoration || 'none'};
  opacity: ${({ opacity }) => opacity || 1};
  width: ${({ expand }) => (expand ? '100%' : 'auto')};
  text-align: ${({ textAlign }) => textAlign || 'center'};
  color: ${({ color }) => color || 'inherit'};
  display: ${({ display }) => display || 'auto'};
  white-space: ${({ noWrap }) => (noWrap ? 'nowrap' : 'auto')};
  cursor: inherit;
`;

export const H1 = styled(BaseText)`
  font-size: ${({ theme }) => theme.text.fontSize.h1};
`;

export const H2 = styled(BaseText)`
  font-size: ${({ theme }) => theme.text.fontSize.h2};
`;

export const H3 = styled(BaseText)`
  font-size: ${({ theme }) => theme.text.fontSize.h3};
`;

export const H4 = styled(BaseText)`
  font-size: ${({ theme }) => theme.text.fontSize.h4};
  line-height: 24px;
`;

export const H5 = styled(BaseText)`
  font-size: ${({ theme }) => theme.text.fontSize.h5};
`;

export const H6 = styled(BaseText)`
  font-size: ${({ theme }) => theme.text.fontSize.h6};
  line-height: 20px;
`;

export const H7 = styled(BaseText)`
  font-size: ${({ theme }) => theme.text.fontSize.h7};
`;

export const H8 = styled(BaseText)`
  font-size: ${({ theme }) => theme.text.fontSize.h8};
  line-height: 16px;
`;

export const H9 = styled(BaseText)`
  font-size: ${({ theme }) => theme.text.fontSize.h9};
`;

export const Callout = styled(H7)`
  color: ${({ theme }) => theme.palette.primaryColor};
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.text.fontWeight.medium};
`;
