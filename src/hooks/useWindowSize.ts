import { useEffect, useState } from 'react';

import { useDebouncedCallback } from './useDebounce';

export default function useWindowSize() {
  const isClient = typeof window === 'object';

  const getSize = () => ({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  });

  const [windowSize, setWindowSize] = useState(getSize);

  const onResize = useDebouncedCallback(() => {
    setWindowSize(getSize());
  }, 150);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return windowSize;
}
