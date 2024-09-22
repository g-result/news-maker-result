// 設定値を定義する

import type { LinkProps } from 'next/link'
import type { Route } from 'nextjs-routes'

// Cookieの有効期限
export const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 * 1000

// 認証後のリダイレクト先
export const AFTER_SIGNIN_PATH = '/' satisfies LinkProps['href']
export const AFTER_SIGNOUT_PATH = '/' satisfies LinkProps['href']

export const AFTER_SIGNUP_PATH = '/' satisfies LinkProps['href']

// footerのリンク先
export const FOOTER_LINKS: {
  text: string
  href: string
  target?: string
  rel?: string
}[] = [
  {
    text: 'サンプルギャラリー',
    href: 'https://if-tech.notion.site/NEWS-MAKER-5dc7abcb4a234bb79829c87a86b02fe4',
    target: '_blank',
    rel: 'noreferrer'
  },
  { text: '利用規約', href: '/' },
  { text: 'プライバシーポリシー', href: '/' },
  { text: '注意事項', href: '/' }
]

// ステップナビゲーション
export const STEP_NAVIGATION = [
  ['画像の', 'アップロード'],
  ['スタイル', 'の選択'],
  ['タイプ/カラー', 'の選択'],
  ['テキストの', '入力/選択']
]
