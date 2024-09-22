import type { User } from '@supabase/supabase-js'
import type { TRPCLink } from '@trpc/client'
import { type AnyRouter, initTRPC } from '@trpc/server'
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

export type MyContext = {
  req?: Request
  cookies?: { [key: string]: string }
  links?: TRPCLink<AnyRouter>[]
  cookieStore?: ReadonlyRequestCookies
  supabaseUser?: User
}

export const t = initTRPC.context<MyContext>().create()
export const router = t.router
