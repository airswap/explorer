import React from 'react';
import styled from 'styled-components';

import Flex from './Flex';

interface ImageSizeProps {
  width?: number;
  height?: number;
}

interface AspectRatioProps extends ImageSizeProps {
  ratio?: string;
}

const AspectRatioContainer = styled.div<AspectRatioProps>`
  position: relative;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  padding-top: ${({ ratio }) => ratio};
`;

interface ImageElProps extends ImageSizeProps {
  circle?: boolean;
}

const ImageEl = styled.img<ImageElProps>`
  border-radius: ${({ circle }) => (circle ? '50%' : 'none')};
  object-fit: contain;
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
`;

const RatioImageEl = styled.img<ImageElProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: ${({ circle }) => (circle ? '50%' : 'none')};
`;

interface ImageProps {
  width?: number;
  height?: number;
  ratio?: number;
  circle?: boolean;
  src: string;
}

export default function Image(props: ImageProps) {
  const getRatio = () => {
    if (props.ratio) return `${props.ratio}%`;
    if (props.width && props.height) return `${(props.width / props.height) * 100}%`;
    return '0';
  };

  if (props.ratio || (props.width && props.height)) {
    return (
      <Flex>
        <AspectRatioContainer width={props.width} height={props.height} ratio={getRatio()}>
          <RatioImageEl src={props.src} circle={props.circle} />
        </AspectRatioContainer>
      </Flex>
    );
  }

  return <ImageEl width={props.width} height={props.height} src={props.src} circle={props.circle} />;
}
