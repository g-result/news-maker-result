import type { Prisma, Post } from '@prisma/client'
import { prisma } from '~/prisma/prismaClient'

export const postRepository = {
  async create(data: Prisma.PostCreateManyInput): Promise<Post> {
    return prisma.post.create({ data })
  },
  async findMany(): Promise<Post[]> {
    return prisma.post.findMany({
      orderBy: { id: 'asc' }
    })
  },
  async findUnique(id: number): Promise<Post | null> {
    return prisma.post.findUnique({
      where: { id }
    })
  },
  async update({
    id,
    data
  }: {
    id: number
    data: Prisma.PostUpdateInput
  }): Promise<Post> {
    return prisma.post.update({
      where: { id },
      data
    })
  },
  async delete(id: number): Promise<Post> {
    return prisma.post.delete({
      where: { id }
    })
  }
}
