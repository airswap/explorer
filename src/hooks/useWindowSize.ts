import { useEffect, useState } from 'react'

export default function useWindowSize() {
  const isClient = typeof window === 'object'

  const getSize = () => ({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  })

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return
    }

    const onResize = () => {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return windowSize
}
