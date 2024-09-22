'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const PUBLISHER_ID = '0576105643820324'

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[]
  }
}

type GoogleAdProps = {
  slot: string
  format?: string
  responsive?: string
  style?: React.CSSProperties
}

export const GoogleAd = ({
  slot,
  format = 'auto',
  responsive = 'true',
  style
}: GoogleAdProps) => {
  const pathname = usePathname()
  const adRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   try {
  //     const adsbygoogle = window.adsbygoogle || []
  //     adsbygoogle.push({})
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }, [pathname])

  useEffect(() => {
    // 広告の再読み込みを確実にする
    try {
      if (adRef.current && typeof window !== 'undefined') {
        const adsbygoogle = window.adsbygoogle || []
        adsbygoogle.push({})
        console.log('広告の読み込みに成功しました。パス:', pathname)
      }
    } catch (err) {
      console.error('広告の読み込みエラー:', err)
    }
  }, [pathname])

  return (
    <div key={`${pathname.replace(/\//g, '-')}-${slot}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', ...style }}
        data-ad-client={`ca-pub-${PUBLISHER_ID}`}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  )
}
