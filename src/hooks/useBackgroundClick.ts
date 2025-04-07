import { useEffect } from 'react'

export const useBackgroundClick = (
  callback: () => void,
  id: string | string,
) => {
  const handleClick = (ev: MouseEvent) => {
    if (
      ev.target instanceof HTMLElement &&
      Array.isArray(id) &&
      id.includes(ev.target.id)
    ) {
      return
    }
    if (ev.target instanceof HTMLElement && ev.target.id === id) {
      return
    }
    callback()
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [callback])
}
