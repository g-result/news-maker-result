import { router } from '~/lib/trpc/trpc'
import { adminProcedure, publicProcedure, userProcedure } from '../middleware'
import { postRouter } from './post'
import { userRouter } from './user'

/**
 *
 * このファイルは、ルーターを定義するためのファイルです。
 * ルーターは、クライアントからのリクエストを受け取り、
 * リクエストに応じた処理を行います。
 *
 * v10のドキュメントを参照してください。
 * https://trpc.io/docs/v10/
 *
 * */
export const appRouter = router({
  user: userRouter,
  post: postRouter,
  // Public proceduresは、認証が不要なエンドポイントです。
  hello: publicProcedure.query(() => ({ msg: 'Hello World' })),
  // User proceduresは、ユーザーがログインしている場合にのみアクセスできるエンドポイントです。
  userInfo: userProcedure.query(({ ctx: { supabaseUser } }) => {
    return supabaseUser
  }),
  // Admin proceduresは、ユーザーが管理者である場合にのみアクセスできるエンドポイントです。
  adminInfo: adminProcedure.query(({ ctx: { supabaseUser } }) => {
    return supabaseUser
  })
})

export type AppRouter = typeof appRouter
