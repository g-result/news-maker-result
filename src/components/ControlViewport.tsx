'use client'

import { useEffect } from 'react'

export function ControlViewport(): null {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const resizeViewport = () => {
      const viewport = document.querySelector('meta[name=viewport]')
      if (!viewport) return
      viewport.setAttribute(
        'content',
        window.innerWidth > 620
          ? 'width=device-width, initial-scale=1'
          : 'width=620'
      )
    }
    window.addEventListener('resize', resizeViewport)
    resizeViewport()
    return () => window.removeEventListener('resize', resizeViewport)
  }, [])

  return null
}
