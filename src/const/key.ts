export const SESSION_COOKIE_KEY = 'session'

export type SectionKeys = (typeof SECTIONS)[number]
export const SECTIONS = [
  'upload',
  'style',
  'type&color',
  'text',
  'export'
] as const satisfies string[]
