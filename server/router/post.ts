import { z } from 'zod'
import { router } from '~/lib/trpc/trpc'
import { postRepository } from '../repository/post'
import { userProcedure } from '../middleware'

export const postRouter = router({
  list: userProcedure.query(async () => {
    return await postRepository.findMany()
  }),
  find: userProcedure.input(z.number()).query(async ({ input }) => {
    return await postRepository.findUnique(input)
  }),
  create: userProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string()
      })
    )
    .mutation(async ({ input }) => {
      return await postRepository.create(input)
    }),
  update: userProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        content: z.string()
      })
    )
    .mutation(async ({ input }) => {
      return await postRepository.update({
        id: input.id,
        data: input
      })
    }),
  delete: userProcedure.input(z.number()).mutation(async ({ input }) => {
    return await postRepository.delete(input)
  })
})
