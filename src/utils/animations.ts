import { keyframes } from 'styled-components';

export const FadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const FadeInOutTransition = {
  entering: {
    opacity: 1,
    visibility: 'visible',
  },
  entered: {
    opacity: 1,
  },
  exiting: {
    opacity: 0,
  },
  exited: {
    opacity: 0,
    visibility: 'hidden',
  },
};
