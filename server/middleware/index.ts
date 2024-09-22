import { TRPCError } from '@trpc/server'
import { userRepository } from '../repository/user'
import { $Enums } from '@prisma/client'
import { supabaseUserProcedure } from './supabaseAuth'
import { t } from '~/lib/trpc/trpc'

// 認証ミドルウェア
/**
 * ユーザーがログインしているかどうかを確認する
 * */
export const publicProcedure = t.procedure.use(async ({ path, next, ctx }) => {
  console.log(`tRPC Request path: ${path}`)
  return next({ ctx })
})

export const userProcedure = supabaseUserProcedure

/**
 *  ユーザーがADMINかどうかを確認する
 * */
export const adminProcedure = userProcedure.use(
  async ({ path, next, ctx: { userId, req } }) => {
    const user = await userRepository.findUnique(userId)
    if (user?.role === $Enums.Role.ADMIN) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be an admin'
      })
    }
    return next({
      ctx: {
        userId
      }
    })
  }
)
