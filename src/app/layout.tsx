import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TRPCProvider } from '~/lib/trpc/client-api'
import '@mantine/core/styles.css'
import { Box, ColorSchemeScript, MantineProvider } from '@mantine/core'
import { ControlViewport } from '@/components/ControlViewport'
import { Header } from '@/components/Common/Header'
import { Footer } from '@/components/Common/Footer'
import { THEME_COLOR } from '@/const/color'
import './fonts.css'
import { GoogleAdScript } from './_components/GoogleAdsScript'

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'NEWS MAKER',
  description: '画像をアップロードしてNews画像を手軽に作成!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <TRPCProvider>
      <html lang="ja">
        <head>
          <ControlViewport />
          <ColorSchemeScript />
        </head>
        <body className={inter.className}>
          <MantineProvider
            theme={{
              components: {
                TextInput: {
                  styles: {
                    label: {
                      fontWeight: 600
                    }
                  }
                },
                Select: {
                  styles: {
                    label: {
                      fontWeight: 600
                    },
                    dropdown: {
                      color: THEME_COLOR.DARK6
                    }
                  }
                },
                RadioGroup: {
                  styles: {
                    label: {
                      fontWeight: 600
                    }
                  }
                },
                Checkbox: {
                  styles: {
                    label: {
                      fontWeight: 600
                    }
                  }
                }
              }
            }}
          >
            <Box
              style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr auto',
                gridTemplateColumns: '100%',
                minHeight: '100vh'
              }}
            >
              <Header />
              {children}
              <Footer />
            </Box>
          </MantineProvider>
          <GoogleAdScript />
        </body>
      </html>
    </TRPCProvider>
  )
}
