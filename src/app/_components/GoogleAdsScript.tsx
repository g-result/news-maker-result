import Script from 'next/script'

const PUBLISHER_ID = '0576105643820324'

export const GoogleAdScript = () => {
  if (process.env.VERCEL_ENV === 'production') {
    return (
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${PUBLISHER_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    )
  }
  return <></>
}
