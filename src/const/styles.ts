// STYLE_TYPEの定義：スタイル選択の追加や修正はこちら
export const STYLE_TYPE = ['title', 'comment', 'emphasis'] as const
export type StyleType = (typeof STYLE_TYPE)[number]

// TYPESの定義：タイプ選択の追加や修正はこちら
export const TYPES = {
  A: 'タイプA',
  B: 'タイプB',
  C: 'タイプC',
  D: 'タイプD',
  E: 'タイプE',
  F: 'タイプF',
  G: 'タイプG',
  H: 'タイプH'
} as const

// カラーコードの定義：カラーコードの追加や修正はこちら
export const COLOR_CODES = {
  RED: '#EA1C24',
  ORANGE: '#F44C1E',
  PINK: '#FF4477',
  YELLOW: '#FFEF00',
  GREEN: '#00F722',
  BLUE: '#00BFFF',
  DARK_GREEN: '#004E37',
  DARK_RED: '#8A001F',
  PURPLE: '#1B1457',
  DARK_BLUE: '#004EDA'
} as const

export const STYLE_COLORS = Object.values(
  COLOR_CODES
) as (typeof COLOR_CODES)[keyof typeof COLOR_CODES][]

export type TypeKeys = (typeof TYPES)[keyof typeof TYPES]
export type ColorKeys = (typeof STYLE_COLORS)[number]
type StyleCategory = {
  base: string
  label: string
  types: Record<TypeKeys, StyleTypeDetails>
}

type StyleTypeDetails = {
  base: string
  colors: Record<ColorKeys, string>
}

type Styles = Record<StyleType, StyleCategory>

/**
 * STYLESオブジェクトの定義。上記の型に適合するように定義します。
 *
 * 修正方法：
 * 1. スタイル選択が増える場合は、STYLE_TYPEに定義を追加します。
 * 2. タイプ選択が増える場合は、TYPESに定義を追加します。
 * 3. カラーコードが増える場合は、STYLE_COLORSに定義を追加します。
 * 4. 上記の設定を行ったと、STYLESオブジェクトのそれぞれのスタイルに対して、baseとtypesの設定を行います。
 * */
const generateStyleCategory = (
  color: string,
  label: string,
  prefix = ''
): StyleCategory => {
  const types: Record<TypeKeys, StyleTypeDetails> = {} as Record<
    TypeKeys,
    StyleTypeDetails
  >
  for (const typeKey in TYPES) {
    types[TYPES[typeKey as keyof typeof TYPES]] = {
      base: `${prefix}${color}-${typeKey}.png`,
      colors: {
        [COLOR_CODES.RED]: `${prefix}1-${typeKey}.png`,
        [COLOR_CODES.ORANGE]: `${prefix}2-${typeKey}.png`,
        [COLOR_CODES.PINK]: `${prefix}3-${typeKey}.png`,
        [COLOR_CODES.YELLOW]: `${prefix}4-${typeKey}.png`,
        [COLOR_CODES.GREEN]: `${prefix}5-${typeKey}.png`,
        [COLOR_CODES.BLUE]: `${prefix}6-${typeKey}.png`,
        [COLOR_CODES.DARK_GREEN]: `${prefix}7-${typeKey}.png`,
        [COLOR_CODES.DARK_RED]: `${prefix}8-${typeKey}.png`,
        [COLOR_CODES.PURPLE]: `${prefix}9-${typeKey}.png`,
        [COLOR_CODES.DARK_BLUE]: `${prefix}10-${typeKey}.png`
      }
    }
  }
  return { base: `${prefix}${color}-A.png`, label, types }
}

export const STYLES: Styles = {
  title: generateStyleCategory('1', 'タイトル画面'),
  comment: generateStyleCategory('1', '発言画面', 'M-'),
  emphasis: generateStyleCategory('1', '強調画面', 'M-')
} as const satisfies Styles
